package com.userManagement;

import jakarta.persistence.*;
import lombok.Data;

// Lombok annotation to automatically generate getters, setters, equals, hashCode, and toString methods
@Data
@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    // Configures the way of increment of the specified column (field)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Specifies that the business name should be unique and not null
    @Column(name = "business_name", unique = true, nullable = false) // Corrected spelling
    private String businessName; // Corrected spelling

    @Column(nullable = false)
    private String password;

    // Specifies that the email should not be null and must be unique
    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    // Specifies that this field should be stored as a string in the database
    @Column(nullable = false) // Make sure this is required
    private String phone; // Added phone field

    // Specifies that the role should be stored as a string in the database
    @Enumerated(EnumType.STRING)
    private Role role;

    // Enum to represent user roles
    public enum Role {
        ADMIN, CASHIER, MANAGER
    }
}
