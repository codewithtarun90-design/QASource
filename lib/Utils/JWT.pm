package Utils::JWT;
use strict;
use warnings;
use Digest::SHA qw(hmac_sha256_hex);
use MIME::Base64;
use JSON;
use Exporter 'import';

our @EXPORT_OK = qw(generate_jwt verify_jwt);

my $JWT_SECRET = 'your-secret-key-change-this-in-production';

sub encode_base64url {
    my $str = shift;
    my $encoded = encode_base64($str, '');
    $encoded =~ tr{+/}{-_};
    $encoded =~ s/=+$//;
    return $encoded;
}

sub generate_jwt {
    my ($username) = @_;
    my $header = encode_base64url(encode_json({alg => 'HS256', typ => 'JWT'}));
    my $now = time();
    my $exp = $now + (24 * 60 * 60);
    
    my $payload = encode_base64url(encode_json({
        username => $username,
        exp => $exp,
        iat => $now,
    }));
    
    my $signature = encode_base64url(hmac_sha256_hex("$header.$payload", $JWT_SECRET));
    return "$header.$payload.$signature";
}

sub verify_jwt {
    my ($token) = @_;
    return unless $token;
    
    my @parts = split /\./, $token;
    return unless @parts == 3;
    
    my ($header, $payload, $signature) = @parts;
    my $expected_signature = encode_base64url(hmac_sha256_hex("$header.$payload", $JWT_SECRET));
    
    return $signature eq $expected_signature;
}

1;
