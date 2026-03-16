package Service::TaskService;
use strict;
use warnings;
use Utils::Database qw(get_db);

sub new {
    my $class = shift;
    my $self = {};
    return bless $self, $class;
}

sub get_all_tasks {
    my $self = shift;
    my $db = get_db();
    
    my $sth = $db->prepare(qq{
        SELECT t.*, p.name as project_name 
        FROM tasks t 
        LEFT JOIN projects p ON t.project_id = p.id 
        ORDER BY t.id DESC
    });
    $sth->execute();
    
    my @tasks;
    while (my $row = $sth->fetchrow_hashref) {
        $row->{project_name} ||= 'No Project';
        push @tasks, $row;
    }
    
    return \@tasks;
}

sub get_task_by_id {
    my ($self, $id) = @_;
    my $db = get_db();
    
    my $sth = $db->prepare(qq{
        SELECT t.*, p.name as project_name 
        FROM tasks t 
        LEFT JOIN projects p ON t.project_id = p.id 
        WHERE t.id = ?
    });
    $sth->execute($id);
    
    my $task = $sth->fetchrow_hashref;
    $task->{project_name} ||= 'No Project' if $task;
    return $task;
}

sub create_task {
    my ($self, $input, $project_name) = @_;
    my $db = get_db();
    
    my $sth = $db->prepare(qq{
        INSERT INTO tasks (title, description, status, priority, project_id, created_at) 
        VALUES (?, ?, ?, ?, ?, datetime("now"))
    });
    $sth->execute(
        $input->{title}, 
        $input->{description}, 
        $input->{status}, 
        $input->{priority}, 
        $input->{project_id}
    );
    
    my $id = $db->last_insert_id(undef, undef, 'tasks', 'id');
    
    return $self->get_task_by_id($id);
}

sub update_task {
    my ($self, $id, $input, $project_name) = @_;
    my $db = get_db();
    
    my $sth = $db->prepare(qq{
        UPDATE tasks 
        SET title = ?, description = ?, status = ?, priority = ?, project_id = ? 
        WHERE id = ?
    });
    my $rows = $sth->execute(
        $input->{title}, 
        $input->{description}, 
        $input->{status}, 
        $input->{priority}, 
        $input->{project_id}, 
        $id
    );
    
    return $rows > 0 ? $self->get_task_by_id($id) : undef;
}

sub delete_task {
    my ($self, $id) = @_;
    my $db = get_db();
    
    my $sth = $db->prepare('DELETE FROM tasks WHERE id = ?');
    my $rows = $sth->execute($id);
    
    return $rows > 0;
}

sub get_task_statistics {
    my $self = shift;
    my $db = get_db();
    
    my $sth = $db->prepare(qq{
        SELECT 
            COUNT(*) as total_tasks,
            SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
        FROM tasks
    });
    $sth->execute();
    
    my $stats = $sth->fetchrow_hashref;
    
    return {
        total_tasks => $stats->{total_tasks} || 0,
        in_progress => $stats->{in_progress} || 0,
        completed => $stats->{completed} || 0,
        pending => $stats->{pending} || 0,
    };
}

sub get_recent_tasks {
    my ($self, $limit) = @_;
    $limit ||= 5;
    my $db = get_db();
    
    my $sth = $db->prepare(qq{
        SELECT t.*, p.name as project_name 
        FROM tasks t 
        LEFT JOIN projects p ON t.project_id = p.id 
        ORDER BY t.id DESC 
        LIMIT ?
    });
    $sth->execute($limit);
    
    my @tasks;
    while (my $row = $sth->fetchrow_hashref) {
        $row->{project_name} ||= 'No Project';
        push @tasks, $row;
    }
    
    return \@tasks;
}

1;
