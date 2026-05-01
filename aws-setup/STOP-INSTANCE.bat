@echo off
title DIVYAM HOSPITAL - STOP INSTANCE (SAVE COST)
color 0C
cls

echo.
echo  ============================================================
echo   STOP AWS INSTANCE - SAVE COST
echo  ============================================================
echo   Stopping instance saves ~$0.07/hour
echo  ============================================================
echo.

set /p CONFIRM= Are you sure you want to stop? (Y/N): 
if /i not "%CONFIRM%"=="Y" (
    echo  Cancelled.
    pause
    exit /b 0
)

for /f "tokens=*" %%i in ('aws ec2 describe-instances --filters "Name=tag:Name,Values=DivyamHospital-Dev" "Name=instance-state-name,Values=running" --query "Reservations[0].Instances[0].InstanceId" --output text 2^>nul') do set INSTANCE_ID=%%i

if "%INSTANCE_ID%"=="None" set INSTANCE_ID=
if "%INSTANCE_ID%"=="" (
    echo  No running instance found.
    pause
    exit /b 0
)

echo  Stopping instance: %INSTANCE_ID%
aws ec2 stop-instances --instance-ids %INSTANCE_ID% >nul 2>&1
echo  [OK] Instance stopping. Your data is saved on the disk.
echo  Run QUICK-RECONNECT.bat to start again anytime.
echo.
pause
