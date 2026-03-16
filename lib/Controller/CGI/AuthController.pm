package Controller::CGI::AuthController;
use strict;
use warnings;

sub new {
    my ($class, $cgi, $json, $auth_service) = @_;
    my $self = {
        cgi => $cgi,
        json => $json,
        auth_service => $auth_service,
    };
    return bless $self, $class;
}

sub login {
    my $self = shift;
    
    my $input = $self->{cgi}->param('POSTDATA') || $self->{cgi}->param('XForms:Model');
    my $data = eval { $self->{json}->decode($input) };
    
    unless ($data) {
        print $self->{json}->encode({error => 'Invalid JSON'});
        return;
    }
    
    my $username = $data->{username} || '';
    my $password = $data->{password} || '';
    
    unless ($username && $password) {
        print $self->{json}->encode({error => 'Invalid request'});
        return;
    }
    
    my $result = $self->{auth_service}->login($username, $password);
    
    print $self->{json}->encode($result);
}

1;
