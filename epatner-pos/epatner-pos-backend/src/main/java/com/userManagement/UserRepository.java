package com.userManagement;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    
    // Method to find a user by their email
    Optional<UserEntity> findByEmail(String email);
}
