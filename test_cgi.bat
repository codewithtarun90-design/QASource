@echo off
echo Testing CGI Script Directly...
echo.

set PATH_INFO=/health
set REQUEST_METHOD=GET

perl api.cgi

echo.
echo Test complete!
pause
