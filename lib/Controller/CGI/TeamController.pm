package Controller::CGI::TeamController;
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

sub get_teams {
    my $self = shift;
    
    my $total_tasks = scalar(@{$self->{task_service}->get_all_tasks()});
    my $total_projects = $self->{project_service}->get_project_count();
    
    my @team_members = ({
        id => 1,
        name => 'Admin User',
        role => 'Administrator',
        avatar => 'A',
        tasks => $total_tasks,
        projects => $total_projects,
        status => 'active',
    });
    
    print $self->{json}->encode({
        success => \1,
        data => {
            members => \@team_members,
            total_members => scalar(@team_members),
            total_tasks => $total_tasks,
            total_projects => $total_projects,
        }
    });
}

1;
