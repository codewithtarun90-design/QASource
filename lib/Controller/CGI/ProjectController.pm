package Controller::CGI::ProjectController;
use strict;
use warnings;

sub new {
    my ($class, $cgi, $json, $project_service) = @_;
    my $self = {
        cgi => $cgi,
        json => $json,
        project_service => $project_service,
    };
    return bless $self, $class;
}

sub get_all {
    my $self = shift;
    my $projects = $self->{project_service}->get_all_projects();
    print $self->{json}->encode({success => \1, projects => $projects});
}

sub get_by_id {
    my ($self, $id) = @_;
    
    my $project = $self->{project_service}->get_project_by_id($id);
    
    if ($project) {
        print $self->{json}->encode({success => \1, project => $project});
    } else {
        print $self->{json}->encode({success => \0, error => 'Project not found'});
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
    
    my $project = $self->{project_service}->create_project($data);
    
    print $self->{json}->encode({
        success => \1,
        message => 'Project created successfully',
        project => $project
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
    
    my $project = $self->{project_service}->update_project($id, $data);
    
    if ($project) {
        print $self->{json}->encode({
            success => \1,
            message => 'Project updated successfully',
            project => $project
        });
    } else {
        print $self->{json}->encode({success => \0, error => 'Project not found'});
    }
}

sub delete {
    my ($self, $id) = @_;
    
    if ($self->{project_service}->delete_project($id)) {
        print $self->{json}->encode({
            success => \1,
            message => 'Project deleted successfully'
        });
    } else {
        print $self->{json}->encode({success => \0, error => 'Project not found'});
    }
}

1;
