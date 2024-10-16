package com.userManagement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repository interface for accessing and managing user data in the database.
 * Extends JpaRepository to provide CRUD operations for UserEntity.
 * Methods include:
 *  - findByUsername: Fetch user by username (for login)
 *  - save: Save user data to the database
 */
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByBusinessName(String businessName);
}

