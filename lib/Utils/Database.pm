package Utils::Database;
use strict;
use warnings;
use DBI;
use FindBin;
use File::Spec;
use Exporter 'import';

our @EXPORT_OK = qw(get_db init_db);

my $DB_FILE = File::Spec->catfile($FindBin::Bin, 'taskflow.db');
my $dbh;

sub get_db {
    unless ($dbh && $dbh->ping) {
        $dbh = DBI->connect("dbi:SQLite:dbname=$DB_FILE", "", "", {
            RaiseError => 1,
            AutoCommit => 1,
            sqlite_unicode => 1,
        }) or die "Cannot connect to database: $DBI::errstr";
    }
    return $dbh;
}

sub init_db {
    my $db = get_db();
    
    # Create projects table
    $db->do(qq{
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            status TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    });
    
    # Create tasks table
    $db->do(qq{
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT,
            priority TEXT,
            project_id INTEGER,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) REFERENCES projects(id)
        )
    });
    
    return 1;
}

1;
