package Service::ProjectService;
use strict;
use warnings;
use Utils::Database qw(get_db);

sub new {
    my $class = shift;
    my $self = {};
    return bless $self, $class;
}

sub get_all_projects {
    my $self = shift;
    my $db = get_db();
    
    my $sth = $db->prepare('SELECT * FROM projects ORDER BY id DESC');
    $sth->execute();
    
    my @projects;
    while (my $row = $sth->fetchrow_hashref) {
        push @projects, $row;
    }
    
    return \@projects;
}

sub get_project_by_id {
    my ($self, $id) = @_;
    my $db = get_db();
    
    my $sth = $db->prepare('SELECT * FROM projects WHERE id = ?');
    $sth->execute($id);
    
    return $sth->fetchrow_hashref;
}

sub get_project_name_by_id {
    my ($self, $id) = @_;
    
    return 'No Project' unless $id;
    
    my $project = $self->get_project_by_id($id);
    return $project ? $project->{name} : 'No Project';
}

sub create_project {
    my ($self, $input) = @_;
    my $db = get_db();
    
    my $sth = $db->prepare(
        'INSERT INTO projects (name, description, status, created_at) VALUES (?, ?, ?, datetime("now"))'
    );
    $sth->execute($input->{name}, $input->{description}, $input->{status});
    
    my $id = $db->last_insert_id(undef, undef, 'projects', 'id');
    
    return $self->get_project_by_id($id);
}

sub update_project {
    my ($self, $id, $input) = @_;
    my $db = get_db();
    
    my $sth = $db->prepare(
        'UPDATE projects SET name = ?, description = ?, status = ? WHERE id = ?'
    );
    my $rows = $sth->execute($input->{name}, $input->{description}, $input->{status}, $id);
    
    return $rows > 0 ? $self->get_project_by_id($id) : undef;
}

sub delete_project {
    my ($self, $id) = @_;
    my $db = get_db();
    
    my $sth = $db->prepare('DELETE FROM projects WHERE id = ?');
    my $rows = $sth->execute($id);
    
    return $rows > 0;
}

sub get_project_count {
    my $self = shift;
    my $db = get_db();
    
    my $sth = $db->prepare('SELECT COUNT(*) as count FROM projects');
    $sth->execute();
    
    my $row = $sth->fetchrow_hashref;
    return $row->{count} || 0;
}

1;
