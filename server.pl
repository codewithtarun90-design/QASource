#!/usr/bin/env perl
use strict;
use warnings;
use CGI;
use JSON;
use FindBin;
use lib "$FindBin::Bin/lib";
use HTTP::Server::Simple::CGI;

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

{
    package TaskFlowCGIServer;
    use base qw(HTTP::Server::Simple::CGI);
    
    sub handle_request {
        my ($self, $cgi) = @_;
        
        my $json = JSON->new->utf8;
        my $path = $cgi->path_info() || '/';
        my $method = $cgi->request_method();
        
        # CORS headers
        print "HTTP/1.0 200 OK\r\n";
        print "Content-Type: application/json; charset=utf-8\r\n";
        print "Access-Control-Allow-Origin: *\r\n";
        print "Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS\r\n";
        print "Access-Control-Allow-Headers: Content-Type, Authorization\r\n";
        print "Access-Control-Max-Age: 86400\r\n";
        print "\r\n";
        
        if ($method eq 'OPTIONS') {
            return;
        }
        
        Utils::Database::init_db();
        
        my $auth_service = Service::AuthService->new();
        my $task_service = Service::TaskService->new();
        my $project_service = Service::ProjectService->new();
        
        my $auth_controller = Controller::CGI::AuthController->new($cgi, $json, $auth_service);
        my $task_controller = Controller::CGI::TaskController->new($cgi, $json, $task_service, $project_service);
        my $project_controller = Controller::CGI::ProjectController->new($cgi, $json, $project_service);
        my $dashboard_controller = Controller::CGI::DashboardController->new($cgi, $json, $task_service, $project_service);
        my $team_controller = Controller::CGI::TeamController->new($cgi, $json, $task_service, $project_service);
        my $notification_controller = Controller::CGI::NotificationController->new($cgi, $json);
        
        if ($path eq '/health' && $method eq 'GET') {
            print $json->encode({status => 'ok'});
            return;
        }
        
        if ($path eq '/api/auth/login' && $method eq 'POST') {
            $auth_controller->login();
            return;
        }
        
        if ($path eq '/api/tasks' && $method eq 'GET') {
            $task_controller->get_all();
            return;
        }
        
        if ($path eq '/api/tasks' && $method eq 'POST') {
            $task_controller->create();
            return;
        }
        
        if ($path =~ m{^/api/tasks/(\d+)$} && $method eq 'GET') {
            $task_controller->get_by_id($1);
            return;
        }
        
        if ($path =~ m{^/api/tasks/(\d+)$} && $method eq 'PUT') {
            $task_controller->update($1);
            return;
        }
        
        if ($path =~ m{^/api/tasks/(\d+)$} && $method eq 'DELETE') {
            $task_controller->delete($1);
            return;
        }
        
        if ($path eq '/api/projects' && $method eq 'GET') {
            $project_controller->get_all();
            return;
        }
        
        if ($path eq '/api/projects' && $method eq 'POST') {
            $project_controller->create();
            return;
        }
        
        if ($path =~ m{^/api/projects/(\d+)$} && $method eq 'GET') {
            $project_controller->get_by_id($1);
            return;
        }
        
        if ($path =~ m{^/api/projects/(\d+)$} && $method eq 'PUT') {
            $project_controller->update($1);
            return;
        }
        
        if ($path =~ m{^/api/projects/(\d+)$} && $method eq 'DELETE') {
            $project_controller->delete($1);
            return;
        }
        
        if ($path eq '/api/dashboard' && $method eq 'GET') {
            $dashboard_controller->get_dashboard();
            return;
        }
        
        if ($path eq '/api/teams' && $method eq 'GET') {
            $team_controller->get_teams();
            return;
        }
        
        if ($path eq '/api/notifications' && $method eq 'GET') {
            $notification_controller->get_notifications();
            return;
        }
        
        print $json->encode({error => 'Not Found', path => $path, method => $method});
    }
}

my $port = $ARGV[0] || 8081;
my $server = TaskFlowCGIServer->new($port);

print "=" x 50 . "\n";
print "  Perl CGI Development Server\n";
print "=" x 50 . "\n";
print "Starting on port $port...\n";
print "Access at: http://localhost:$port\n";
print "Press Ctrl+C to stop\n";
print "=" x 50 . "\n\n";

$server->run();
