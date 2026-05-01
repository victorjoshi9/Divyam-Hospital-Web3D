# DIVYAM HOSPITAL — AWS RDP ONE-CLICK SETUP

## FOLDER CONTENTS
```
aws-setup/
├── CONNECT-RDP.bat        ← FIRST TIME SETUP + CONNECT
├── QUICK-RECONNECT.bat    ← DAILY USE — fast reconnect
├── STOP-INSTANCE.bat      ← STOP to save AWS cost
├── setup-server.ps1       ← Run ON the RDP server
└── README.md              ← This file
```

---

## STEP 1 — FIRST TIME SETUP

1. Double-click `CONNECT-RDP.bat`
2. Enter when asked:
   - AWS Access Key ID
   - AWS Secret Access Key  
   - Region: `ap-south-1` (Mumbai) or your region
3. It will:
   - Create EC2 Windows Server 2022 (t3.large)
   - Open port 3389 (RDP) + 3000 (App)
   - Get your password automatically
   - Launch RDP connection

**Get AWS keys from:**
AWS Console → IAM → Users → Your User → Security Credentials → Create Access Key

---

## STEP 2 — ON THE RDP SERVER

Once connected via RDP:

1. Copy your `NewWeb3D` folder to `C:\DivyamHospital`
2. Open PowerShell as Administrator
3. Run:
```powershell
Set-ExecutionPolicy RemoteSigned -Force
C:\Users\Administrator\Desktop\setup-server.ps1
```
Or copy `setup-server.ps1` to the RDP and run it.

This auto-installs: Node.js, Git, VS Code, opens firewall ports, starts your app.

---

## DAILY USE

- **Start/Connect:** Double-click `QUICK-RECONNECT.bat`
- **Stop (save cost):** Double-click `STOP-INSTANCE.bat`

> NOTE: Public IP changes every time you start the instance.
> `QUICK-RECONNECT.bat` auto-updates the IP in the RDP file.

---

## YOUR APP URL

After setup: `http://<EC2-PUBLIC-IP>:3000`

Check `connection-info.txt` (auto-created) for saved IP and password.

---

## COST ESTIMATE

| Instance | Cost/hour | Cost/day (8hr) |
|----------|-----------|----------------|
| t3.large | ~$0.083   | ~$0.66         |
| t3.medium| ~$0.042   | ~$0.33         |

Stop instance when not working to save cost.
