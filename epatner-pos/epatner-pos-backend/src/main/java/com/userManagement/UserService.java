package com.userManagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for user management.
 * Contains business logic for handling user operations:
 *  - User registration (with password hashing)
 *  - Role assignment
 *  - Fetching user details from the database
 * Acts as an intermediary between the controller and repository.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Save a new user
    public void saveUser(UserEntity user) {
        userRepository.save(user);
    }

    // Fetch user by username
    public UserEntity findByUsername(String username) {
        return userRepository.findByBusinessName(username).orElse(null);
    }
}
