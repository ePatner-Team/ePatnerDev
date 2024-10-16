package com.userManagement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Method to register a new user
    public UserEntity registerUser(UserEntity user) {
        // You can add additional business logic here (e.g., validation)
        return userRepository.save(user);
    }

    // Method to find all users
    public List<UserEntity> findAllUsers() {
        return userRepository.findAll();
    }

    // Method to find a user by ID
    public Optional<UserEntity> findUserById(Long id) {
        return userRepository.findById(id);
    }

    // Method to delete a user by ID
    public void deleteUser(Long id) {
        // Optionally, you could check if the user exists before deleting
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }
}


