# Quick Start - Perl CGI Backend

## ✅ CGI Backend is Ready!

Your Perl backend has been successfully converted to CGI architecture.

---

## 🚀 Start the Server (3 Simple Steps)

### Step 1: Install Dependencies (First Time Only)
```powershell
cd e:\Final_Project_Tarun_Wed\Go_App_For_HIL\Go_App\BE_Perl_CGI
cpanm --installdeps .
```

### Step 2: Start CGI Development Server
```powershell
.\start_cgi.bat
```

Or manually:
```powershell
perl server_simple.pl 8081
```

**Server will start on:** `http://localhost:8081`

### Step 3: Test the API
```powershell
# Health check
Invoke-WebRequest -Uri http://localhost:8081/health -UseBasicParsing

# Login
Invoke-RestMethod -Uri http://localhost:8081/api/auth/login -Method Post -Body '{"username":"admin","password":"Admin123"}' -ContentType "application/json"
```

---

## 🎯 Running with React Frontend

### Terminal 1: Start CGI Backend
```powershell
cd e:\Final_Project_Tarun_Wed\Go_App_For_HIL\Go_App\BE_Perl_CGI
.\start_cgi.bat
```

### Terminal 2: Start React Frontend
```powershell
cd e:\Final_Project_Tarun_Wed\Go_App_For_HIL\Go_App\FE
npm start
```

**Access Application:** http://localhost:3000

**Login Credentials:**
- Username: `admin`
- Password: `Admin123`

---

## 📋 All API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/auth/login` | Login |
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks/:id` | Get task by ID |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create project |
| GET | `/api/projects/:id` | Get project by ID |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| GET | `/api/dashboard` | Dashboard stats |
| GET | `/api/teams` | Team info |
| GET | `/api/notifications` | Notifications |

---

## 🔧 What is CGI?

**CGI (Common Gateway Interface)** is a standard protocol for web servers to execute programs. Key points:

- ✅ Works with Apache, IIS, and other traditional web servers
- ✅ No special server requirements
- ✅ Easy to deploy on shared hosting
- ✅ Industry-standard technology
- ⚠️ New process per request (slower than persistent frameworks)

---

## 📁 Project Structure

```
BE_Perl_CGI/
├── api.cgi                 # Main CGI script (entry point)
├── server.pl               # Development server
├── start_cgi.bat          # Quick start script
├── lib/
│   ├── Controller/CGI/    # CGI controllers
│   ├── Service/           # Business logic
│   └── Utils/             # Utilities (JWT, Database)
├── README.md              # Full documentation
├── CGI_SETUP_GUIDE.md     # Detailed setup guide
└── QUICK_START.md         # This file
```

---

## 🧪 Testing Commands

### PowerShell Commands

**Login:**
```powershell
Invoke-RestMethod -Uri http://localhost:8081/api/auth/login -Method Post -Body '{"username":"admin","password":"Admin123"}' -ContentType "application/json"
```

**Create Task:**
```powershell
$task = @{
    title = "My Task"
    description = "Task description"
    status = "pending"
    priority = "high"
    project_id = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:8081/api/tasks -Method Post -Body $task -ContentType "application/json"
```

**Get Dashboard:**
```powershell
Invoke-RestMethod -Uri http://localhost:8081/api/dashboard
```

---

## 🐛 Troubleshooting

### Server won't start
```powershell
# Install missing dependencies
cpanm CGI JSON DBI DBD::SQLite HTTP::Server::Simple::CGI
```

### Port 8081 already in use
```powershell
# Find and kill process
netstat -ano | findstr :8081
taskkill /F /PID <PID>
```

### Can't connect from frontend
1. Ensure backend is running on port 8081
2. Check `FE/package.json` has `"proxy": "http://localhost:8081"`
3. Restart React dev server

---

## 📚 Documentation Files

- **`README.md`** - Complete documentation
- **`CGI_SETUP_GUIDE.md`** - Step-by-step setup guide
- **`QUICK_START.md`** - This file (quick reference)

---

## 🔄 Differences from Mojolicious Version

| Feature | Mojolicious | CGI |
|---------|-------------|-----|
| Server Type | Persistent process | New process per request |
| Performance | Faster | Slower |
| Deployment | Requires Mojolicious | Works with Apache/IIS |
| Setup | Simple | Moderate |
| API Compatibility | ✅ Same | ✅ Same |
| Business Logic | ✅ Same | ✅ Same |

**Both versions are 100% compatible with your React frontend!**

---

## ✨ Features

✅ **RESTful API** - All CRUD operations  
✅ **JWT Authentication** - Secure token-based auth  
✅ **CORS Enabled** - Works with React frontend  
✅ **Modular Architecture** - Clean separation of concerns  
✅ **SQLite Database** - Lightweight data storage  
✅ **Professional Structure** - Controllers, Services, Utils  

---

## 🎉 You're All Set!

Your CGI backend is **ready to use**. Just run:

```powershell
cd e:\Final_Project_Tarun_Wed\Go_App_For_HIL\Go_App\BE_Perl_CGI
.\start_cgi.bat
```

Then access your application at **http://localhost:3000** (after starting the React frontend).

For production deployment with Apache, see **`CGI_SETUP_GUIDE.md`**.
