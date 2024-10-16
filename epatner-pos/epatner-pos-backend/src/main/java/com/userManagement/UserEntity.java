package com.userManagement;


import jakarta.persistence.*;
import lombok.Data;

// Lombok annotation to automatically generate getters, setters, equals, hashCode, and toString methods
@Data
// Marks this class as a JPA entity
@Entity
// Specifies the table name in the database
@Table(name = "users")
public class UserEntity {
    // Marks this field as the primary key
    @Id
    // Configures the way of increment of the specified column(field)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Specifies that the username should be unique and not null
    @Column(unique = true, nullable = false)
    private String bussinessName;

    // Specifies that the password should not be null
    @Column(nullable = false)
    private String password;

    // Specifies that the email should not be null
    @Column(nullable = false)
    private String email;

    // Specifies the column name in the database
    @Column(name = "first_name")
    private String firstName;

    // Specifies the column name in the database
    @Column(name = "last_name")
    private String lastName;

    // Specifies that this field should be stored as a string in the database
    @Enumerated(EnumType.STRING)
    private Role role;
}
// Enum to represent user roles
enum Role {
    ADMIN, CASHIER, MANAGER
}

