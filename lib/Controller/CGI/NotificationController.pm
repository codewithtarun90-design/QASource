package Controller::CGI::NotificationController;
use strict;
use warnings;

sub new {
    my ($class, $cgi, $json) = @_;
    my $self = {
        cgi => $cgi,
        json => $json,
    };
    return bless $self, $class;
}

sub get_notifications {
    my $self = shift;
    
    print $self->{json}->encode({
        success => \1,
        data => {
            unread_count => 0,
            notifications => [],
        }
    });
}

1;
