package com.userManagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for user management.
 * Handles all incoming HTTP requests related to user actions such as:
 *  - User registration
 *  - User profile updates
 *  - Fetching user details
 *  - Managing roles and permissions
 */
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt password
        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // Login endpoint (to be integrated with JWT)
    @PostMapping("/login")
    public ResponseEntity<?> loginUser() {
        // JWT generation logic will be added here
        return ResponseEntity.ok("Login successful");
    }
}
