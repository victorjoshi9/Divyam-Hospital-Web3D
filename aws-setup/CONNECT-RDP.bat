@echo off
title DIVYAM HOSPITAL - AWS RDP AUTO SETUP
color 0A
cls

echo.
echo  ============================================================
echo   DIVYAM HOSPITAL - AWS RDP ONE-CLICK SETUP ^& CONNECT
echo  ============================================================
echo.

:: ── Check AWS CLI ────────────────────────────────────────────
aws --version >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] AWS CLI not found. Installing...
    winget install Amazon.AWSCLI -e --silent
    if %errorlevel% neq 0 (
        echo  [ERROR] Auto-install failed. Download from:
        echo  https://awscli.amazonaws.com/AWSCLIV2.msi
        pause
        exit /b 1
    )
    echo  [OK] AWS CLI installed.
)
echo  [OK] AWS CLI found.

:: ── Check credentials ────────────────────────────────────────
aws sts get-caller-identity >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  ── AWS CREDENTIALS SETUP ──────────────────────────────
    echo  Get these from: AWS Console ^> IAM ^> Users ^> Security Credentials
    echo.
    set /p AWS_ACCESS_KEY= Enter AWS Access Key ID     : 
    set /p AWS_SECRET_KEY= Enter AWS Secret Access Key : 
    set /p AWS_REGION=     Enter AWS Region (e.g. ap-south-1): 
    echo.
    aws configure set aws_access_key_id %AWS_ACCESS_KEY%
    aws configure set aws_secret_access_key %AWS_SECRET_KEY%
    aws configure set region %AWS_REGION%
    aws configure set output json
    echo  [OK] Credentials saved.
) else (
    echo  [OK] AWS credentials already configured.
    for /f "tokens=*" %%i in ('aws sts get-caller-identity --query "Account" --output text 2^>nul') do set ACCOUNT_ID=%%i
    echo  [OK] Account ID: %ACCOUNT_ID%
)

:: ── Get region ───────────────────────────────────────────────
for /f "tokens=*" %%i in ('aws configure get region 2^>nul') do set AWS_REGION=%%i
if "%AWS_REGION%"=="" set AWS_REGION=ap-south-1
echo  [OK] Region: %AWS_REGION%

echo.
echo  ── CHECKING FOR EXISTING WINDOWS EC2 INSTANCE ──────────
echo.

:: ── Find existing running Windows instance ───────────────────
for /f "tokens=*" %%i in ('aws ec2 describe-instances --filters "Name=instance-state-name,Values=running,stopped" "Name=platform,Values=windows" --query "Reservations[0].Instances[0].InstanceId" --output text 2^>nul') do set INSTANCE_ID=%%i

if "%INSTANCE_ID%"=="None" set INSTANCE_ID=
if "%INSTANCE_ID%"=="" (
    echo  No existing Windows instance found. Creating new one...
    goto :CREATE_INSTANCE
) else (
    echo  [OK] Found existing instance: %INSTANCE_ID%
    goto :CHECK_INSTANCE_STATE
)

:: ── Create new EC2 instance ──────────────────────────────────
:CREATE_INSTANCE
echo.
echo  ── CREATING WINDOWS SERVER 2022 INSTANCE ───────────────

:: Get latest Windows Server 2022 AMI
echo  Finding latest Windows Server 2022 AMI...
for /f "tokens=*" %%i in ('aws ec2 describe-images --owners amazon --filters "Name=name,Values=Windows_Server-2022-English-Full-Base-*" "Name=state,Values=available" --query "sort_by(Images,&CreationDate)[-1].ImageId" --output text 2^>nul') do set AMI_ID=%%i

if "%AMI_ID%"=="" (
    echo  [WARN] Could not find AMI automatically. Using fallback...
    :: ap-south-1 Windows 2022 fallback
    set AMI_ID=ami-0f5ee92e2d63afc18
)
echo  [OK] AMI: %AMI_ID%

:: Create key pair
set KEY_NAME=divyam-hospital-key
aws ec2 describe-key-pairs --key-names %KEY_NAME% >nul 2>&1
if %errorlevel% neq 0 (
    echo  Creating key pair: %KEY_NAME%...
    aws ec2 create-key-pair --key-name %KEY_NAME% --query "KeyMaterial" --output text > "%~dp0divyam-hospital-key.pem" 2>nul
    echo  [OK] Key saved: %~dp0divyam-hospital-key.pem
) else (
    echo  [OK] Key pair already exists: %KEY_NAME%
)

:: Create security group
set SG_NAME=divyam-hospital-sg
for /f "tokens=*" %%i in ('aws ec2 describe-security-groups --filters "Name=group-name,Values=%SG_NAME%" --query "SecurityGroups[0].GroupId" --output text 2^>nul') do set SG_ID=%%i

if "%SG_ID%"=="None" set SG_ID=
if "%SG_ID%"=="" (
    echo  Creating security group...
    for /f "tokens=*" %%i in ('aws ec2 create-security-group --group-name %SG_NAME% --description "Divyam Hospital Dev Server" --query "GroupId" --output text 2^>nul') do set SG_ID=%%i
    
    :: Add inbound rules
    aws ec2 authorize-security-group-ingress --group-id %SG_ID% --protocol tcp --port 3389 --cidr 0.0.0.0/0 >nul 2>&1
    aws ec2 authorize-security-group-ingress --group-id %SG_ID% --protocol tcp --port 3000 --cidr 0.0.0.0/0 >nul 2>&1
    aws ec2 authorize-security-group-ingress --group-id %SG_ID% --protocol tcp --port 80   --cidr 0.0.0.0/0 >nul 2>&1
    aws ec2 authorize-security-group-ingress --group-id %SG_ID% --protocol tcp --port 443  --cidr 0.0.0.0/0 >nul 2>&1
    aws ec2 authorize-security-group-ingress --group-id %SG_ID% --protocol tcp --port 5173 --cidr 0.0.0.0/0 >nul 2>&1
    echo  [OK] Security group created: %SG_ID%
) else (
    echo  [OK] Security group exists: %SG_ID%
)

:: Launch instance
echo  Launching Windows Server 2022 (t3.large)...
for /f "tokens=*" %%i in ('aws ec2 run-instances --image-id %AMI_ID% --instance-type t3.large --key-name %KEY_NAME% --security-group-ids %SG_ID% --block-device-mappings "[{\"DeviceName\":\"/dev/sda1\",\"Ebs\":{\"VolumeSize\":60,\"VolumeType\":\"gp3\"}}]" --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=DivyamHospital-Dev}]" --associate-public-ip-address --query "Instances[0].InstanceId" --output text 2^>nul') do set INSTANCE_ID=%%i

if "%INSTANCE_ID%"=="" (
    echo  [ERROR] Failed to launch instance. Check AWS Console.
    pause
    exit /b 1
)
echo  [OK] Instance launched: %INSTANCE_ID%

:: ── Check/Start instance state ───────────────────────────────
:CHECK_INSTANCE_STATE
echo.
echo  ── CHECKING INSTANCE STATE ─────────────────────────────

for /f "tokens=*" %%i in ('aws ec2 describe-instances --instance-ids %INSTANCE_ID% --query "Reservations[0].Instances[0].State.Name" --output text 2^>nul') do set INST_STATE=%%i
echo  Instance state: %INST_STATE%

if "%INST_STATE%"=="stopped" (
    echo  Starting stopped instance...
    aws ec2 start-instances --instance-ids %INSTANCE_ID% >nul 2>&1
    echo  Waiting for instance to start...
)

if "%INST_STATE%"=="stopping" (
    echo  Waiting for instance to finish stopping...
    aws ec2 wait instance-stopped --instance-ids %INSTANCE_ID%
    aws ec2 start-instances --instance-ids %INSTANCE_ID% >nul 2>&1
)

:: Wait for running state
echo  Waiting for instance to be running...
aws ec2 wait instance-running --instance-ids %INSTANCE_ID%
echo  [OK] Instance is running.

:: Wait for status checks
echo  Waiting for status checks (this takes 2-3 minutes)...
aws ec2 wait instance-status-ok --instance-ids %INSTANCE_ID%
echo  [OK] Status checks passed.

:: ── Get Public IP ────────────────────────────────────────────
for /f "tokens=*" %%i in ('aws ec2 describe-instances --instance-ids %INSTANCE_ID% --query "Reservations[0].Instances[0].PublicIpAddress" --output text 2^>nul') do set PUBLIC_IP=%%i
echo  [OK] Public IP: %PUBLIC_IP%

:: ── Get RDP Password ─────────────────────────────────────────
echo.
echo  ── GETTING RDP PASSWORD ────────────────────────────────

set PEM_FILE=%~dp0divyam-hospital-key.pem
if not exist "%PEM_FILE%" (
    echo  [WARN] Key file not found at: %PEM_FILE%
    echo  Please enter the path to your .pem key file:
    set /p PEM_FILE= PEM file path: 
)

if exist "%PEM_FILE%" (
    echo  Decrypting Windows password (may take up to 4 minutes after launch)...
    
    :: Try to get password - retry up to 10 times
    set /a RETRY=0
    :RETRY_PASSWORD
    set /a RETRY+=1
    if %RETRY% gtr 10 goto :MANUAL_PASSWORD
    
    for /f "tokens=*" %%i in ('aws ec2 get-password-data --instance-id %INSTANCE_ID% --priv-launch-key "%PEM_FILE%" --query "PasswordData" --output text 2^>nul') do set RDP_PASSWORD=%%i
    
    if "%RDP_PASSWORD%"=="" (
        echo  Password not ready yet, waiting 30 seconds... [Attempt %RETRY%/10]
        timeout /t 30 /nobreak >nul
        goto :RETRY_PASSWORD
    )
    if "%RDP_PASSWORD%"=="None" (
        echo  Password not ready yet, waiting 30 seconds... [Attempt %RETRY%/10]
        timeout /t 30 /nobreak >nul
        goto :RETRY_PASSWORD
    )
    echo  [OK] Password retrieved!
    goto :CREATE_RDP
) else (
    :MANUAL_PASSWORD
    echo  [WARN] Cannot auto-decrypt password without .pem file.
    echo  Get password manually from: AWS Console ^> EC2 ^> Instance ^> Connect ^> RDP
    set /p RDP_PASSWORD= Enter RDP Password manually: 
)

:: ── Create .RDP file ─────────────────────────────────────────
:CREATE_RDP
echo.
echo  ── CREATING RDP CONNECTION FILE ────────────────────────

set RDP_FILE=%~dp0DivyamHospital-Connect.rdp

(
echo full address:s:%PUBLIC_IP%:3389
echo username:s:Administrator
echo password 51:b:%RDP_PASSWORD%
echo prompt for credentials:i:0
echo authentication level:i:2
echo enablecredsspsupport:i:1
echo redirectclipboard:i:1
echo redirectdrives:i:1
echo redirectprinters:i:0
echo screen mode id:i:2
echo use multimon:i:0
echo desktopwidth:i:1920
echo desktopheight:i:1080
echo session bpp:i:32
echo winposstr:s:0,1,0,0,800,600
echo compression:i:1
echo keyboardhook:i:2
echo audiocapturemode:i:0
echo videoplaybackmode:i:1
echo connection type:i:7
echo networkautodetect:i:1
echo bandwidthautodetect:i:1
echo displayconnectionbar:i:1
echo enableworkspacereconnect:i:0
echo disable wallpaper:i:0
echo allow font smoothing:i:1
echo allow desktop composition:i:1
echo disable full window drag:i:1
echo disable menu anims:i:1
echo disable themes:i:0
echo disable cursor setting:i:0
echo bitmapcachepersistenable:i:1
echo audiomode:i:0
echo redirectcomports:i:0
echo redirectposdevices:i:0
echo autoreconnection enabled:i:1
echo negotiate security layer:i:1
echo remoteapplicationmode:i:0
echo alternate shell:s:
echo shell working directory:s:
echo gatewayhostname:s:
echo gatewayusagemethod:i:4
echo gatewaycredentialssource:i:4
echo gatewayprofileusagemethod:i:0
echo promptcredentialonce:i:0
echo use redirection server name:i:0
echo rdgiskdcproxy:i:0
echo kdcproxyname:s:
) > "%RDP_FILE%"

echo  [OK] RDP file created: %RDP_FILE%

:: ── Save connection info ──────────────────────────────────────
(
echo ============================================================
echo  DIVYAM HOSPITAL - AWS RDP CONNECTION INFO
echo ============================================================
echo  Instance ID : %INSTANCE_ID%
echo  Public IP   : %PUBLIC_IP%
echo  Username    : Administrator
echo  Password    : %RDP_PASSWORD%
echo  RDP Port    : 3389
echo  App Port    : 3000
echo  App URL     : http://%PUBLIC_IP%:3000
echo ============================================================
echo  SAVED ON: %date% %time%
) > "%~dp0connection-info.txt"

echo.
echo  ============================================================
echo   CONNECTION DETAILS SAVED
echo  ============================================================
echo   Instance  : %INSTANCE_ID%
echo   Public IP : %PUBLIC_IP%
echo   Username  : Administrator
echo   Password  : %RDP_PASSWORD%
echo   App URL   : http://%PUBLIC_IP%:3000
echo  ============================================================
echo.
echo  Saved to: %~dp0connection-info.txt
echo.

:: ── Auto-launch RDP ──────────────────────────────────────────
echo  Launching RDP connection in 3 seconds...
timeout /t 3 /nobreak >nul
start mstsc "%RDP_FILE%"

echo.
echo  [OK] RDP launched! Login with Administrator / %RDP_PASSWORD%
echo.
echo  ── NEXT STEPS ON RDP ───────────────────────────────────
echo   1. Open PowerShell as Administrator
echo   2. Run: setup-server.ps1 (auto-installs Node.js + project)
echo   3. App runs at: http://%PUBLIC_IP%:3000
echo  ────────────────────────────────────────────────────────
echo.
pause
