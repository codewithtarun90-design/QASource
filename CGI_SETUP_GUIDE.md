# CGI Setup Guide - Step by Step

## Quick Start (Development Server)

### Step 1: Install Dependencies
```powershell
cd e:\Final_Project_Tarun_Wed\Go_App_For_HIL\Go_App\BE_Perl_CGI
cpanm --installdeps .
cpanm HTTP::Server::Simple::CGI
```

### Step 2: Start Development Server
```powershell
.\start_cgi.bat
```

Or manually:
```powershell
perl server_simple.pl 8081
```

### Step 3: Test the API
```powershell
# Health check
Invoke-WebRequest -Uri http://localhost:8081/health -UseBasicParsing

# Login
Invoke-RestMethod -Uri http://localhost:8081/api/auth/login -Method Post -Body '{"username":"admin","password":"Admin123"}' -ContentType "application/json"
```

### Step 4: Start React Frontend
```powershell
cd e:\Final_Project_Tarun_Wed\Go_App_For_HIL\Go_App\FE
npm start
```

**Done!** Your CGI backend is running on port 8081.

---

## Production Setup (Apache)

### Prerequisites
- Apache 2.4+ installed
- Perl 5.16+ installed

### Step 1: Install Apache

**Download Apache:**
- Visit: https://www.apachelounge.com/download/
- Download Apache 2.4.x Win64
- Extract to `C:\Apache24`

### Step 2: Install Apache as Windows Service

```powershell
# Run as Administrator
cd C:\Apache24\bin
httpd -k install
```

### Step 3: Enable Required Modules

Edit `C:\Apache24\conf\httpd.conf` and ensure these are uncommented:

```apache
LoadModule cgi_module modules/mod_cgi.so
LoadModule rewrite_module modules/mod_rewrite.so
LoadModule headers_module modules/mod_headers.so
```

### Step 4: Configure Virtual Host

Add to `C:\Apache24\conf\httpd.conf`:

```apache
Listen 8081

<VirtualHost *:8081>
    ServerName localhost
    DocumentRoot "e:/Final_Project_Tarun_Wed/Go_App_For_HIL/Go_App/BE_Perl_CGI"
    
    <Directory "e:/Final_Project_Tarun_Wed/Go_App_For_HIL/Go_App/BE_Perl_CGI">
        Options +ExecCGI +FollowSymLinks
        AllowOverride All
        Require all granted
        
        AddHandler cgi-script .cgi
        DirectoryIndex api.cgi
        
        # CORS Headers
        Header always set Access-Control-Allow-Origin "*"
        Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
        Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
        Header always set Access-Control-Max-Age "86400"
    </Directory>
    
    # Enable mod_rewrite
    RewriteEngine On
    
    # Route all requests to api.cgi
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ /api.cgi/$1 [L,QSA]
    
    ErrorLog "logs/perl_cgi_error.log"
    CustomLog "logs/perl_cgi_access.log" combined
</VirtualHost>
```

### Step 5: Test Apache Configuration

```powershell
cd C:\Apache24\bin
httpd -t
```

Should output: `Syntax OK`

### Step 6: Start Apache

```powershell
httpd -k start
```

Or use Windows Services:
```powershell
net start Apache2.4
```

### Step 7: Test the CGI Backend

```powershell
Invoke-WebRequest -Uri http://localhost:8081/health -UseBasicParsing
```

---

## Testing CGI Script Directly

### Windows PowerShell

```powershell
# Set environment variables
$env:PATH_INFO = '/health'
$env:REQUEST_METHOD = 'GET'

# Run CGI script
perl api.cgi
```

### Test Login

```powershell
$env:PATH_INFO = '/api/auth/login'
$env:REQUEST_METHOD = 'POST'

# Create JSON input
$json = '{"username":"admin","password":"Admin123"}'
$json | perl api.cgi
```

---

## Troubleshooting

### Issue: "Can't locate CGI.pm"

**Solution:**
```powershell
cpanm CGI
```

### Issue: "500 Internal Server Error"

**Solutions:**
1. Check Apache error log:
   ```powershell
   Get-Content C:\Apache24\logs\error.log -Tail 50
   ```

2. Test CGI script directly:
   ```powershell
   perl api.cgi
   ```

3. Check Perl path in shebang line of `api.cgi`

### Issue: "Forbidden - You don't have permission"

**Solution:**
Check directory permissions in Apache config:
```apache
<Directory "...">
    Require all granted
</Directory>
```

### Issue: "CGI script not executed"

**Solutions:**
1. Ensure CGI module is loaded
2. Check file has `.cgi` extension
3. Verify `AddHandler cgi-script .cgi` is set

### Issue: CORS errors in browser

**Solution:**
Ensure headers module is loaded and CORS headers are set in Apache config.

### Issue: "Can't locate lib/Service/..."

**Solution:**
Set PERL5LIB environment variable:
```powershell
$env:PERL5LIB = "e:\Final_Project_Tarun_Wed\Go_App_For_HIL\Go_App\BE_Perl_CGI\lib"
```

Or in Apache config:
```apache
SetEnv PERL5LIB "e:/Final_Project_Tarun_Wed/Go_App_For_HIL/Go_App/BE_Perl_CGI/lib"
```

---

## Performance Optimization

### Use FastCGI

Install FastCGI module:
```powershell
cpanm FCGI
```

Modify `api.cgi` to use FastCGI:
```perl
use FCGI;
my $request = FCGI::Request();
while ($request->Accept() >= 0) {
    # Your code here
}
```

Configure Apache for FastCGI:
```apache
LoadModule fcgid_module modules/mod_fcgid.so
AddHandler fcgid-script .fcgi
```

### Use mod_perl

For maximum performance, use mod_perl to keep Perl interpreter persistent.

---

## Comparison: Development Server vs Apache

| Feature | Development Server | Apache |
|---------|-------------------|--------|
| Setup | Easy | Moderate |
| Performance | Good | Better |
| Production Ready | No | Yes |
| HTTPS | No | Yes |
| Load Balancing | No | Yes |
| Logging | Basic | Advanced |
| Use Case | Development | Production |

---

## File Permissions

### Windows
No special permissions needed, but ensure:
- Files are readable by Apache user
- CGI script is executable

### Linux/Unix
```bash
chmod 755 api.cgi
chmod 644 lib/**/*.pm
```

---

## Environment Variables

CGI scripts use these environment variables:

| Variable | Description |
|----------|-------------|
| PATH_INFO | URL path after script name |
| REQUEST_METHOD | HTTP method (GET, POST, etc.) |
| CONTENT_TYPE | Request content type |
| CONTENT_LENGTH | Request body length |
| QUERY_STRING | URL query parameters |
| HTTP_* | HTTP headers |

---

## Deployment Checklist

- [ ] Perl dependencies installed
- [ ] Apache installed and configured
- [ ] CGI module enabled
- [ ] Virtual host configured
- [ ] CORS headers set
- [ ] Error logging configured
- [ ] Test all endpoints
- [ ] Frontend proxy updated
- [ ] Security settings reviewed

---

## Next Steps

1. **Start Development Server**: `.\start_cgi.bat`
2. **Test API**: Use Postman or PowerShell commands
3. **Start Frontend**: `cd FE && npm start`
4. **Access Application**: http://localhost:3000

For production deployment, follow the Apache setup steps above.

---

## Additional Resources

- **CGI Specification**: https://www.w3.org/CGI/
- **Apache CGI Guide**: https://httpd.apache.org/docs/2.4/howto/cgi.html
- **Perl CGI Module**: https://metacpan.org/pod/CGI
- **FastCGI**: https://fastcgi-archives.github.io/

---

**Current Status:** ✅ CGI backend is ready and tested!
