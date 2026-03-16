#!/usr/bin/env perl
use strict;
use warnings;
use DBI;

my $db = DBI->connect('dbi:SQLite:dbname=taskflow.db', '', '', {
    RaiseError => 1,
    AutoCommit => 1,
});

print "=== Projects in Database ===\n";
my $sth = $db->prepare('SELECT * FROM projects');
$sth->execute();

my $count = 0;
while (my $row = $sth->fetchrow_hashref) {
    $count++;
    print "ID: $row->{id}\n";
    print "Name: $row->{name}\n";
    print "Description: $row->{description}\n";
    print "Status: $row->{status}\n";
    print "Created: $row->{created_at}\n";
    print "-" x 40 . "\n";
}

print "Total projects: $count\n";
