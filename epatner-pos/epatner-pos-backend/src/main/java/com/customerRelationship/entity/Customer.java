package com.customerRelationship.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String phone;

    @Column
    private LocalDate dateOfBirth;

    @Column
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loyalty_program_id")
    private LoyaltyProgram loyaltyProgram;

    @Column
    private Integer loyaltyPoints;

    @ManyToMany
    @JoinTable(
        name = "customer_discounts",
        joinColumns = @JoinColumn(name = "customer_id"),
        inverseJoinColumns = @JoinColumn(name = "discount_id")
    )
    private Set<Discount> discounts = new HashSet<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Reward> rewards = new HashSet<>();

}