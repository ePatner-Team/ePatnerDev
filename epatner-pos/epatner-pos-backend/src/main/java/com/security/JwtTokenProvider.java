package com.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

// MD NASIM
@Component // Marks this class as a Spring component
public class JwtTokenProvider {

    @Value("${jwt.secret}") // Injects the JWT secret from application properties
    private String jwtSecret;

    @Value("${jwt.expiration}") // Injects the JWT expiration time from application properties
    private int jwtExpirationInMs;

    @SuppressWarnings({ "deprecation", "hiding" })
    public <CustomUserDetails> String generateToken(Authentication authentication) {
        @SuppressWarnings("unchecked")
        CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        // Builds the JWT token
        return Jwts.builder()
                .setSubject(((org.springframework.security.core.userdetails.UserDetails) userPrincipal).getUsername())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret) // Signs the token with HS512 algorithm and secret key
                .compact();
    }

    public String getUsernameFromToken(String token) {
        @SuppressWarnings("deprecation")
        // Parses the JWT token to extract claims
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject(); // Returns the subject (username) from the token
    }

    @SuppressWarnings("deprecation")
    public boolean validateToken(String authToken) {
        try {
            // Attempts to parse the token. If successful, the token is valid.
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException
                | IllegalArgumentException ex) {
            // Catches various exceptions that can occur during token validation
            // Log the exception (logging code not shown here)
            return false; // Returns false if token is invalid
        }
    }
}