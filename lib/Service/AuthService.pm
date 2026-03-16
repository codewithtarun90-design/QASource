package Service::AuthService;
use strict;
use warnings;
use Utils::JWT qw(generate_jwt);

sub new {
    my $class = shift;
    return bless {}, $class;
}

sub login {
    my ($self, $username, $password) = @_;
    
    return unless $username && $password;
    
    if ($username eq 'admin' && $password eq 'Admin123') {
        my $token = generate_jwt($username);
        return {
            success => \1,
            token => $token,
            user => {username => 'admin'}
        };
    }
    
    return {
        success => \0,
        error => 'invalid credentials'
    };
}

1;
