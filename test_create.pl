#!/usr/bin/env perl
use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/lib";

use Utils::Database qw(get_db init_db);
use Service::ProjectService;

print "Initializing database...\n";
init_db();

print "Creating project service...\n";
my $project_service = Service::ProjectService->new();

print "Creating project...\n";
my $project = $project_service->create_project({
    name => 'Test Project',
    description => 'Testing database',
    status => 'active'
});

print "Project created:\n";
print "ID: $project->{id}\n";
print "Name: $project->{name}\n";
print "Status: $project->{status}\n\n";

print "Retrieving all projects...\n";
my $projects = $project_service->get_all_projects();
print "Total projects: " . scalar(@$projects) . "\n";

foreach my $p (@$projects) {
    print "  - ID: $p->{id}, Name: $p->{name}\n";
}
