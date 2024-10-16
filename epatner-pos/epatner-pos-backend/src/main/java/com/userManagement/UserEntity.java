package com.userManagement;

import jakarta.persistence.*;
import lombok.Data;

// Lombok annotation to automatically generate getters, setters, equals, hashCode, and toString methods
@Data
@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String businessName;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private Role role;

    // Declare the Role enum within UserEntity or as a public enum in a separate file
    public enum Role {
        ADMIN, CASHIER, MANAGER
    }
}
