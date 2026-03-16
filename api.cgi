#!/usr/bin/env perl
use strict;
use warnings;
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

my $cgi = CGI->new;
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

send_cors_headers();

if ($cgi->request_method eq 'OPTIONS') {
    print $cgi->header(-status => 204);
    exit;
}

init_db();

my $path = $ENV{PATH_INFO} || '/';
my $method = $cgi->request_method;

route_request($path, $method);

sub send_cors_headers {
    print $cgi->header(
        -type => 'application/json',
        -charset => 'utf-8',
        -Access_Control_Allow_Origin => '*',
        -Access_Control_Allow_Methods => 'GET, POST, PUT, DELETE, OPTIONS',
        -Access_Control_Allow_Headers => 'Content-Type, Authorization',
        -Access_Control_Max_Age => '86400'
    );
}

sub route_request {
    my ($path, $method) = @_;
    
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
