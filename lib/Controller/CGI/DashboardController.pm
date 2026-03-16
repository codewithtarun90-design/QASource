package Controller::CGI::DashboardController;
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

sub get_dashboard {
    my $self = shift;
    
    my $stats = $self->{task_service}->get_task_statistics();
    $stats->{total_projects} = $self->{project_service}->get_project_count();
    
    my $recent_tasks = $self->{task_service}->get_recent_tasks(5);
    
    print $self->{json}->encode({
        success => \1,
        data => {
            stats => $stats,
            recent_tasks => $recent_tasks,
            activities => [],
        }
    });
}

1;
