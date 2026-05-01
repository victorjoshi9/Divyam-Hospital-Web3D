# ============================================================
#  DIVYAM HOSPITAL - SERVER AUTO SETUP
#  Run this on the AWS Windows RDP as Administrator
# ============================================================

$Host.UI.RawUI.WindowTitle = "Divyam Hospital - Server Setup"
Write-Host ""
Write-Host "  ============================================================" -ForegroundColor Green
Write-Host "   DIVYAM HOSPITAL - AWS SERVER AUTO SETUP" -ForegroundColor Green
Write-Host "  ============================================================" -ForegroundColor Green
Write-Host ""

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

# ── Install Chocolatey ───────────────────────────────────────
Write-Host "  [1/6] Installing Chocolatey..." -ForegroundColor Cyan
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    $env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")
    Write-Host "  [OK] Chocolatey installed." -ForegroundColor Green
} else {
    Write-Host "  [OK] Chocolatey already installed." -ForegroundColor Green
}

# ── Install Node.js ──────────────────────────────────────────
Write-Host "  [2/6] Installing Node.js LTS..." -ForegroundColor Cyan
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    choco install nodejs-lts -y --no-progress
    $env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")
    Write-Host "  [OK] Node.js: $(node --version)" -ForegroundColor Green
} else {
    Write-Host "  [OK] Node.js already installed: $(node --version)" -ForegroundColor Green
}

# ── Install Git ──────────────────────────────────────────────
Write-Host "  [3/6] Installing Git..." -ForegroundColor Cyan
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    choco install git -y --no-progress
    $env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")
    Write-Host "  [OK] Git installed." -ForegroundColor Green
} else {
    Write-Host "  [OK] Git already installed." -ForegroundColor Green
}

# ── Install VS Code ──────────────────────────────────────────
Write-Host "  [4/6] Installing VS Code..." -ForegroundColor Cyan
if (!(Get-Command code -ErrorAction SilentlyContinue)) {
    choco install vscode -y --no-progress
    Write-Host "  [OK] VS Code installed." -ForegroundColor Green
} else {
    Write-Host "  [OK] VS Code already installed." -ForegroundColor Green
}

# ── Setup Project ────────────────────────────────────────────
Write-Host "  [5/6] Setting up project..." -ForegroundColor Cyan
$PROJECT_DIR = "C:\DivyamHospital"
if (!(Test-Path $PROJECT_DIR)) {
    New-Item -ItemType Directory -Path $PROJECT_DIR -Force | Out-Null
}

if (Test-Path "$PROJECT_DIR\apps\web\package.json") {
    Write-Host "  [OK] Project found. Installing dependencies..." -ForegroundColor Green
    Set-Location "$PROJECT_DIR\apps\web"
    npm install --legacy-peer-deps
    Write-Host "  [OK] Dependencies installed." -ForegroundColor Green
} else {
    Write-Host "  [WARN] Project not found at $PROJECT_DIR" -ForegroundColor Yellow
    Write-Host "  Copy your NewWeb3D folder to C:\DivyamHospital then re-run." -ForegroundColor Yellow
}

# ── Firewall Rules ───────────────────────────────────────────
Write-Host "  [6/6] Opening firewall ports..." -ForegroundColor Cyan
foreach ($port in @(3000, 5173, 80, 443)) {
    $rule = "DivyamHospital-$port"
    if (!(Get-NetFirewallRule -DisplayName $rule -ErrorAction SilentlyContinue)) {
        New-NetFirewallRule -DisplayName $rule -Direction Inbound -Protocol TCP -LocalPort $port -Action Allow | Out-Null
    }
    Write-Host "  [OK] Port $port open." -ForegroundColor Green
}

# ── Get Public IP ────────────────────────────────────────────
$PUBLIC_IP = (Invoke-WebRequest -Uri "https://api.ipify.org" -UseBasicParsing).Content.Trim()

# ── Desktop shortcuts ────────────────────────────────────────
$DESKTOP = [System.Environment]::GetFolderPath("Desktop")

@"
@echo off
title Divyam Hospital - Web App
color 0A
echo.
echo  Starting Divyam Hospital...
cd /d C:\DivyamHospital\apps\web
start http://localhost:3000
npm run dev -- --host 0.0.0.0 --port 3000
pause
"@ | Out-File -FilePath "$DESKTOP\START-APP.bat" -Encoding ASCII

@"
@echo off
taskkill /f /im node.exe 2>nul
echo App stopped.
pause
"@ | Out-File -FilePath "$DESKTOP\STOP-APP.bat" -Encoding ASCII

Write-Host "  [OK] Desktop shortcuts created." -ForegroundColor Green

# ── Auto start if project ready ──────────────────────────────
if (Test-Path "C:\DivyamHospital\apps\web\package.json") {
    Write-Host ""
    Write-Host "  Starting app..." -ForegroundColor Cyan
    Start-Process "cmd.exe" -ArgumentList "/k cd /d C:\DivyamHospital\apps\web && npm run dev -- --host 0.0.0.0 --port 3000"
    Start-Sleep -Seconds 5
    Start-Process "http://localhost:3000"
}

Write-Host ""
Write-Host "  ============================================================" -ForegroundColor Green
Write-Host "   SETUP COMPLETE" -ForegroundColor Green
Write-Host "  ============================================================" -ForegroundColor Green
Write-Host "   Server IP : $PUBLIC_IP" -ForegroundColor White
Write-Host "   App URL   : http://${PUBLIC_IP}:3000" -ForegroundColor Cyan
Write-Host "   Project   : C:\DivyamHospital" -ForegroundColor White
Write-Host "  ============================================================" -ForegroundColor Green
Write-Host ""
Read-Host "  Press Enter to exit"
