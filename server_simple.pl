#!/usr/bin/env perl
use strict;
use warnings;
use IO::Socket::INET;
use CGI;
use JSON;
use FindBin;
use lib "$FindBin::Bin/lib";

use Utils::Database qw(init_db);
use Service::AuthService;
use Service::TaskService;
use Service::ProjectService;
use Controller::CGI::AuthController;
use Controller::CGI::TaskController;
use Controller::CGI::ProjectController;
use Controller::CGI::DashboardController;
use Controller::CGI::TeamController;
use Controller::CGI::NotificationController;

my $port = $ARGV[0] || 8082;

my $server = IO::Socket::INET->new(
    LocalPort => $port,
    Type      => SOCK_STREAM,
    Reuse     => 1,
    Listen    => 10
) or die "Cannot create server on port $port: $!\n";

print "=" x 50 . "\n";
print "  Perl CGI Development Server\n";
print "=" x 50 . "\n";
print "Server running on http://localhost:$port\n";
print "Press Ctrl+C to stop\n";
print "=" x 50 . "\n\n";

Utils::Database::init_db();

while (my $client = $server->accept()) {
    my $request = '';
    my $content_length = 0;
    my $method = '';
    my $path = '';
    
    # Read request headers
    while (my $line = <$client>) {
        $request .= $line;
        last if $line =~ /^\r?\n$/;
        
        if ($line =~ /^(\w+)\s+(\S+)\s+HTTP/) {
            $method = $1;
            $path = $2;
        }
        if ($line =~ /^Content-Length:\s*(\d+)/i) {
            $content_length = $1;
        }
    }
    
    # Read request body if present
    my $body = '';
    if ($content_length > 0) {
        read($client, $body, $content_length);
    }
    
    # Set up CGI environment
    $ENV{REQUEST_METHOD} = $method;
    $ENV{PATH_INFO} = $path;
    $ENV{CONTENT_LENGTH} = $content_length;
    $ENV{CONTENT_TYPE} = 'application/json';
    
    # Create CGI object with POST data
    my $cgi = CGI->new();
    $cgi->param('POSTDATA', $body) if $body;
    my $json = JSON->new->utf8;
    
    my $auth_service = Service::AuthService->new();
    my $task_service = Service::TaskService->new();
    my $project_service = Service::ProjectService->new();
    
    my $auth_controller = Controller::CGI::AuthController->new($cgi, $json, $auth_service);
    my $task_controller = Controller::CGI::TaskController->new($cgi, $json, $task_service, $project_service);
    my $project_controller = Controller::CGI::ProjectController->new($cgi, $json, $project_service);
    my $dashboard_controller = Controller::CGI::DashboardController->new($cgi, $json, $task_service, $project_service);
    my $team_controller = Controller::CGI::TeamController->new($cgi, $json, $task_service, $project_service);
    my $notification_controller = Controller::CGI::NotificationController->new($cgi, $json);
    
    # Send headers
    print $client "HTTP/1.1 200 OK\r\n";
    print $client "Content-Type: application/json; charset=utf-8\r\n";
    print $client "Access-Control-Allow-Origin: *\r\n";
    print $client "Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS\r\n";
    print $client "Access-Control-Allow-Headers: Content-Type, Authorization\r\n";
    print $client "Access-Control-Max-Age: 86400\r\n";
    print $client "\r\n";
    
    # Handle OPTIONS
    if ($method eq 'OPTIONS') {
        close $client;
        next;
    }
    
    # Capture output
    my $output = '';
    {
        local *STDOUT;
        open STDOUT, '>', \$output or die "Cannot redirect STDOUT: $!";
        
        # Route request
        if ($path eq '/health' && $method eq 'GET') {
            print $json->encode({status => 'ok'});
        }
        elsif ($path eq '/api/auth/login' && $method eq 'POST') {
            $auth_controller->login();
        }
        elsif ($path eq '/api/tasks' && $method eq 'GET') {
            $task_controller->get_all();
        }
        elsif ($path eq '/api/tasks' && $method eq 'POST') {
            $task_controller->create();
        }
        elsif ($path =~ m{^/api/tasks/(\d+)$} && $method eq 'GET') {
            $task_controller->get_by_id($1);
        }
        elsif ($path =~ m{^/api/tasks/(\d+)$} && $method eq 'PUT') {
            $task_controller->update($1);
        }
        elsif ($path =~ m{^/api/tasks/(\d+)$} && $method eq 'DELETE') {
            $task_controller->delete($1);
        }
        elsif ($path eq '/api/projects' && $method eq 'GET') {
            $project_controller->get_all();
        }
        elsif ($path eq '/api/projects' && $method eq 'POST') {
            $project_controller->create();
        }
        elsif ($path =~ m{^/api/projects/(\d+)$} && $method eq 'GET') {
            $project_controller->get_by_id($1);
        }
        elsif ($path =~ m{^/api/projects/(\d+)$} && $method eq 'PUT') {
            $project_controller->update($1);
        }
        elsif ($path =~ m{^/api/projects/(\d+)$} && $method eq 'DELETE') {
            $project_controller->delete($1);
        }
        elsif ($path eq '/api/dashboard' && $method eq 'GET') {
            $dashboard_controller->get_dashboard();
        }
        elsif ($path eq '/api/teams' && $method eq 'GET') {
            $team_controller->get_teams();
        }
        elsif ($path eq '/api/notifications' && $method eq 'GET') {
            $notification_controller->get_notifications();
        }
        else {
            print $json->encode({error => 'Not Found', path => $path, method => $method});
        }
    }
    
    print $client $output;
    close $client;
    
    print "[" . localtime() . "] $method $path\n";
}
