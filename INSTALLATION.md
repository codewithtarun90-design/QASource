# Perl CGI Backend - Installation Guide

## Prerequisites

- **Perl** (usually pre-installed on Windows)
- **cpanm** (Perl module installer)

---

## Installation Steps

### 1. Install Strawberry Perl (if not installed)
Download from: https://strawberryperl.com/
- Run installer
- Accept defaults
- Restart terminal after installation

### 2. Navigate to Project Directory
```powershell
cd e:\Final_Project_Tarun_Wed\Go_App_For_HIL\Go_App\BE_Perl_CGI
```

### 3. Install Dependencies
```powershell
cpanm --installdeps .
```

This installs:
- CGI
- JSON
- DBI
- DBD::SQLite
- Digest::SHA
- MIME::Base64

### 4. Start the Server
```powershell
.\start_cgi.bat
```

Or manually:
```powershell
perl server_simple.pl 8081
```

### 5. Verify Server is Running
```powershell
Invoke-WebRequest -Uri http://localhost:8081/health -UseBasicParsing
```

Expected output: `{"status":"ok"}`

---

## Quick Test

### Login
```powershell
Invoke-RestMethod -Uri http://localhost:8081/api/auth/login -Method Post -Body '{"username":"admin","password":"Admin123"}' -ContentType "application/json"
```

### Create Project
```powershell
Invoke-RestMethod -Uri http://localhost:8081/api/projects -Method Post -Body '{"name":"Test","description":"Test project","status":"active"}' -ContentType "application/json"
```

### Get Projects
```powershell
Invoke-RestMethod -Uri http://localhost:8081/api/projects
```

---

## Running with Frontend

### Terminal 1 - Backend
```powershell
cd e:\Final_Project_Tarun_Wed\Go_App_For_HIL\Go_App\BE_Perl_CGI
.\start_cgi.bat
```

### Terminal 2 - Frontend
```powershell
cd e:\Final_Project_Tarun_Wed\Go_App_For_HIL\Go_App\FE
npm install
npm start
```

**Access:** http://localhost:3000  
**Login:** admin / Admin123

---

## Troubleshooting

### "cpanm not found"
```powershell
# Install cpanminus
curl -L https://cpanmin.us | perl - App::cpanminus
```

### "Port 8081 already in use"
```powershell
# Kill process on port 8081
Stop-Process -Id (Get-NetTCPConnection -LocalPort 8081).OwningProcess -Force
```

### "Can't locate module"
```powershell
# Install specific module
cpanm Module::Name
```

---

## File Structure

```
BE_Perl_CGI/
├── server_simple.pl       # Development server
├── start_cgi.bat         # Quick start script
├── taskflow.db           # SQLite database (auto-created)
├── lib/
│   ├── Controller/CGI/   # API controllers
│   ├── Service/          # Business logic
│   └── Utils/            # Database & JWT utilities
└── cpanfile              # Dependencies list
```

---

## Default Credentials

- **Username:** admin
- **Password:** Admin123

---

## Server Information

- **Port:** 8081
- **Base URL:** http://localhost:8081
- **Database:** SQLite (taskflow.db)
- **CORS:** Enabled for all origins

---

## That's It!

Your Perl CGI backend is ready. Data persists in SQLite database.
