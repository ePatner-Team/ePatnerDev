package com.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// Marks this class as a configuration class
@Configuration
// Enables Spring Security's web security support
@EnableWebSecurity
// Enables method-level security and allows for @PreAuthorize annotations
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    // JWT authentication filter
    private final JwtAuthenticationFilter jwtAuthFilter;
    // Custom entry point for handling authentication exceptions
    private final JwtAuthenticationEntryPoint jwtAuthEntryPoint;

    // Constructor injection of dependencies
    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter, JwtAuthenticationEntryPoint jwtAuthEntryPoint) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.jwtAuthEntryPoint = jwtAuthEntryPoint;
    }

    // Defines the security filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disables CSRF protection as it's not needed for stateless JWT authentication
                .csrf().disable()
                // Configures exception handling
                .exceptionHandling().authenticationEntryPoint(jwtAuthEntryPoint)
                .and()
                // Configures session management to be stateless
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // Configures authorization rules
                .authorizeHttpRequests(authz -> authz
                        // Allows public access to auth and public endpoints
                        .requestMatchers("/api/auth/**", "/api/public/**").permitAll()
                        // Restricts admin endpoints to ADMIN role
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        // Restricts manager endpoints to ADMIN and MANAGER roles
                        .requestMatchers("/api/manager/**").hasAnyRole("ADMIN", "MANAGER")
                        // Restricts cashier endpoints to ADMIN, MANAGER, and CASHIER roles
                        .requestMatchers("/api/cashier/**").hasAnyRole("ADMIN", "MANAGER", "CASHIER")
                        // All other requests need authentication
                        .anyRequest().authenticated())
                // Adds the JWT authentication filter before the standard authentication filter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        // Builds and returns the security filter chain
        return http.build();
    }
}