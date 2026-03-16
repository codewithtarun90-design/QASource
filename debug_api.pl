#!/usr/bin/env perl
use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/lib";
use Data::Dumper;

use Utils::Database qw(get_db init_db);
use Service::ProjectService;

init_db();

my $project_service = Service::ProjectService->new();
my $projects = $project_service->get_all_projects();

print "Projects returned from service:\n";
print Dumper($projects);
print "\nNumber of projects: " . scalar(@$projects) . "\n";
