@echo off
title DIVYAM HOSPITAL - QUICK RECONNECT
color 0A
cls

echo.
echo  ============================================================
echo   DIVYAM HOSPITAL - QUICK RDP RECONNECT
echo  ============================================================
echo.

:: Check credentials
aws sts get-caller-identity >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] AWS not configured. Run CONNECT-RDP.bat first.
    pause
    exit /b 1
)

echo  Finding your Windows instance...

for /f "tokens=*" %%i in ('aws ec2 describe-instances --filters "Name=tag:Name,Values=DivyamHospital-Dev" "Name=instance-state-name,Values=running,stopped" --query "Reservations[0].Instances[0].InstanceId" --output text 2^>nul') do set INSTANCE_ID=%%i

if "%INSTANCE_ID%"=="None" set INSTANCE_ID=
if "%INSTANCE_ID%"=="" (
    echo  [ERROR] No instance found. Run CONNECT-RDP.bat to create one.
    pause
    exit /b 1
)

echo  [OK] Instance: %INSTANCE_ID%

:: Check state
for /f "tokens=*" %%i in ('aws ec2 describe-instances --instance-ids %INSTANCE_ID% --query "Reservations[0].Instances[0].State.Name" --output text 2^>nul') do set STATE=%%i
echo  State: %STATE%

if "%STATE%"=="stopped" (
    echo  Starting instance...
    aws ec2 start-instances --instance-ids %INSTANCE_ID% >nul 2>&1
    echo  Waiting for instance to start (60-90 seconds)...
    aws ec2 wait instance-running --instance-ids %INSTANCE_ID%
    echo  [OK] Instance started.
)

:: Get IP
for /f "tokens=*" %%i in ('aws ec2 describe-instances --instance-ids %INSTANCE_ID% --query "Reservations[0].Instances[0].PublicIpAddress" --output text 2^>nul') do set PUBLIC_IP=%%i
echo  [OK] IP: %PUBLIC_IP%

:: Update RDP file with new IP (IP changes on restart)
set RDP_FILE=%~dp0DivyamHospital-Connect.rdp
if exist "%RDP_FILE%" (
    powershell -Command "(Get-Content '%RDP_FILE%') -replace 'full address:s:.*', 'full address:s:%PUBLIC_IP%:3389' | Set-Content '%RDP_FILE%'"
    echo  [OK] RDP file updated with new IP.
) else (
    echo  RDP file not found. Run CONNECT-RDP.bat first.
    pause
    exit /b 1
)

echo.
echo  ============================================================
echo   IP: %PUBLIC_IP%  ^|  App: http://%PUBLIC_IP%:3000
echo  ============================================================
echo.
echo  Connecting in 2 seconds...
timeout /t 2 /nobreak >nul
start mstsc "%RDP_FILE%"
echo  [OK] RDP launched!
echo.

:: Also open app URL in browser
timeout /t 8 /nobreak >nul
start http://%PUBLIC_IP%:3000

pause
