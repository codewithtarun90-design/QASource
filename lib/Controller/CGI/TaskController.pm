package Controller::CGI::TaskController;
use strict;
use warnings;

sub new {
    my ($class, $cgi, $json, $task_service, $project_service) = @_;
    my $self = {
        cgi => $cgi,
        json => $json,
        task_service => $task_service,
        project_service => $project_service,
    };
    return bless $self, $class;
}

sub get_all {
    my $self = shift;
    my $tasks = $self->{task_service}->get_all_tasks();
    print $self->{json}->encode({success => \1, tasks => $tasks});
}

sub get_by_id {
    my ($self, $id) = @_;
    
    my $task = $self->{task_service}->get_task_by_id($id);
    
    if ($task) {
        print $self->{json}->encode({success => \1, task => $task});
    } else {
        print $self->{json}->encode({success => \0, error => 'Task not found'});
    }
}

sub create {
    my $self = shift;
    
    my $input = $self->{cgi}->param('POSTDATA') || $self->{cgi}->param('XForms:Model');
    my $data = eval { $self->{json}->decode($input) };
    
    unless ($data) {
        print $self->{json}->encode({success => \0, error => 'Invalid JSON'});
        return;
    }
    
    my $project_name = $self->{project_service}->get_project_name_by_id($data->{project_id});
    my $task = $self->{task_service}->create_task($data, $project_name);
    
    print $self->{json}->encode({
        success => \1,
        message => 'Task created successfully',
        task => $task
    });
}

sub update {
    my ($self, $id) = @_;
    
    my $input = $self->{cgi}->param('POSTDATA') || $self->{cgi}->param('XForms:Model');
    my $data = eval { $self->{json}->decode($input) };
    
    unless ($data) {
        print $self->{json}->encode({success => \0, error => 'Invalid JSON'});
        return;
    }
    
    my $project_name = $self->{project_service}->get_project_name_by_id($data->{project_id});
    my $task = $self->{task_service}->update_task($id, $data, $project_name);
    
    if ($task) {
        print $self->{json}->encode({
            success => \1,
            message => 'Task updated successfully',
            task => $task
        });
    } else {
        print $self->{json}->encode({success => \0, error => 'Task not found'});
    }
}

sub delete {
    my ($self, $id) = @_;
    
    if ($self->{task_service}->delete_task($id)) {
        print $self->{json}->encode({
            success => \1,
            message => 'Task deleted successfully'
        });
    } else {
        print $self->{json}->encode({success => \0, error => 'Task not found'});
    }
}

1;
