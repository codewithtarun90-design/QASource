# Perl CGI Backend for TaskFlow Application

This is a CGI-based Perl backend implementation, converted from Mojolicious to work with traditional CGI web servers like Apache.

## What is CGI?

**CGI (Common Gateway Interface)** is a standard protocol for web servers to execute programs and generate dynamic content. Unlike modern frameworks that run as persistent processes, CGI scripts are executed fresh for each request.

## Architecture

```
BE_Perl_CGI/
├── api.cgi                     # Main CGI script (entry point)
├── server.pl                   # Development server
├── lib/
│   ├── Controller/CGI/         # CGI-specific controllers
│   │   ├── AuthController.pm
│   │   ├── TaskController.pm
│   │   ├── ProjectController.pm
│   │   ├── DashboardController.pm
│   │   ├── TeamController.pm
│   │   └── NotificationController.pm
│   ├── Service/                # Business logic (same as Mojolicious version)
│   │   ├── AuthService.pm
│   │   ├── TaskService.pm
│   │   └── ProjectService.pm
│   └── Utils/                  # Utilities (same as Mojolicious version)
│       ├── JWT.pm
│       └── Database.pm
├── cpanfile                    # Perl dependencies
├── .htaccess                   # Apache rewrite rules
├── httpd.conf                  # Apache configuration example
├── start_cgi.bat              # Start development server
└── test_cgi.bat               # Test CGI script directly
```

## Prerequisites

- **Perl 5.16+** (usually pre-installed)
- **cpanm** (CPAN module installer)

## Installation

### 1. Install Dependencies

```powershell
cd e:\Final_Project_Tarun_Wed\Go_App_For_HIL\Go_App\BE_Perl_CGI
cpanm --installdeps .
```

Required modules:
- CGI
- JSON
- DBI
- DBD::SQLite
- Digest::SHA
- MIME::Base64
- HTTP::Server::Simple::CGI (for development server)

## Running the Application

### Option 1: Development Server (Recommended for Testing)

```powershell
cd e:\Final_Project_Tarun_Wed\Go_App_For_HIL\Go_App\BE_Perl_CGI
.\start_cgi.bat
```

Or manually:
```powershell
perl server_simple.pl 8081
```

The server will start on **http://localhost:8081**

### Option 2: Apache Web Server (Production)

#### Step 1: Install Apache
Download and install Apache from: https://www.apachelounge.com/download/

#### Step 2: Enable CGI Module
Edit `httpd.conf` and ensure these lines are uncommented:
```apache
LoadModule cgi_module modules/mod_cgi.so
LoadModule rewrite_module modules/mod_rewrite.so
LoadModule headers_module modules/mod_headers.so
```

#### Step 3: Add Virtual Host
Add the contents of `httpd.conf` to your Apache configuration or create a virtual host.

#### Step 4: Restart Apache
```powershell
httpd -k restart
```

### Option 3: Direct CGI Execution (Testing)

```powershell
.\test_cgi.bat
```

Or manually:
```powershell
$env:PATH_INFO='/health'
$env:REQUEST_METHOD='GET'
perl api.cgi
```

## API Endpoints

All endpoints are the same as the Mojolicious version:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/auth/login` | User login |
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
| GET | `/api/dashboard` | Dashboard statistics |
| GET | `/api/teams` | Team information |
| GET | `/api/notifications` | Notifications |

## Testing

### Health Check
```powershell
Invoke-WebRequest -Uri http://localhost:8081/health -UseBasicParsing
```

### Login
```powershell
Invoke-RestMethod -Uri http://localhost:8081/api/auth/login -Method Post -Body '{"username":"admin","password":"Admin123"}' -ContentType "application/json"
```

### Get Tasks
```powershell
Invoke-RestMethod -Uri http://localhost:8081/api/tasks
```

## How CGI Works

1. **Request arrives** at web server (Apache or development server)
2. **Web server** sets environment variables (PATH_INFO, REQUEST_METHOD, etc.)
3. **CGI script** (`api.cgi`) is executed as a new process
4. **Script reads** request data from STDIN and environment variables
5. **Script processes** request using controllers and services
6. **Script outputs** HTTP headers and response body to STDOUT
7. **Web server** sends response to client
8. **Process terminates**

## Differences from Mojolicious Version

### Similarities
- ✅ Same API endpoints
- ✅ Same business logic (Services)
- ✅ Same utilities (JWT, Database)
- ✅ Same response formats
- ✅ 100% compatible with React frontend

### Differences
- ❌ No persistent process (new process per request)
- ❌ Slower performance (process startup overhead)
- ✅ Works with traditional web servers (Apache, IIS)
- ✅ No special server requirements
- ✅ Easier deployment on shared hosting

## Performance Considerations

### CGI Drawbacks
- **Process overhead**: New Perl interpreter for each request
- **No connection pooling**: Database connections not reused
- **Memory**: Each request loads all modules

### Optimizations
- Use **FastCGI** instead of CGI for better performance
- Enable **mod_perl** in Apache for persistent interpreter
- Use **Plack** for PSGI-compatible deployment

## Converting to FastCGI

For better performance, convert to FastCGI:

```perl
#!/usr/bin/env perl
use FCGI;
use CGI;
# ... rest of code

my $request = FCGI::Request();
while ($request->Accept() >= 0) {
    # Handle request
}
```

## CORS Configuration

CORS headers are automatically added in `api.cgi`:
- Access-Control-Allow-Origin: *
- Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
- Access-Control-Allow-Headers: Content-Type, Authorization

## Troubleshooting

### CGI Script Not Executing
- Ensure script has execute permissions
- Check Apache CGI module is loaded
- Verify .htaccess is being read

### 500 Internal Server Error
- Check Apache error logs
- Verify Perl path in shebang (`#!/usr/bin/env perl`)
- Ensure all modules are installed

### CORS Errors
- Check CORS headers are being sent
- Verify Apache headers module is loaded
- Check .htaccess configuration

### Module Not Found
```powershell
cpanm Module::Name
```

## Development vs Production

### Development (server.pl)
- ✅ Easy to start/stop
- ✅ No Apache required
- ✅ Good for testing
- ❌ Not for production use

### Production (Apache)
- ✅ Robust and scalable
- ✅ Better performance with FastCGI
- ✅ Production-ready
- ❌ Requires Apache setup

## Deployment Checklist

- [ ] Install Perl dependencies
- [ ] Configure Apache virtual host
- [ ] Enable CGI module
- [ ] Set correct file permissions
- [ ] Test all endpoints
- [ ] Configure CORS headers
- [ ] Set up error logging
- [ ] Configure database path

## Frontend Integration

Update React frontend proxy in `package.json`:
```json
{
  "proxy": "http://localhost:8081"
}
```

No other changes needed - API is 100% compatible!

## Security Notes

- Change JWT secret in `Utils/JWT.pm`
- Implement proper authentication middleware
- Validate all user input
- Use HTTPS in production
- Restrict file permissions
- Enable Apache security modules

## Migration from Mojolicious

The CGI version maintains:
- ✅ Same API contract
- ✅ Same business logic
- ✅ Same data structures
- ✅ Same authentication

Only the HTTP handling layer changed from Mojolicious to CGI.pm.

## Support

For issues:
1. Check Apache error logs
2. Test CGI script directly
3. Verify module installation
4. Check file permissions

## License

Same as original project.
