@echo off
echo Starting Perl CGI Backend Server...
echo.
echo Installing dependencies if needed...
cpanm --installdeps . 2>nul

echo.
perl server_simple.pl 8082
