package com.customerRelationship;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
//compilation of all entities involved in CustomerEntity package
@Entity
@Table(name = "customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerEntity {
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

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PurchaseHistory> purchaseHistory = new HashSet<>();
}

@Entity
@Table(name = "loyalty_programs")
@Data
@NoArgsConstructor
@AllArgsConstructor
class LoyaltyProgram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column(nullable = false)
    private Integer pointsPerPurchase;

    @Column(nullable = false)
    private Integer pointsThreshold;

    @Column(nullable = false)
    private Double rewardValue;

    @OneToMany(mappedBy = "loyaltyProgram", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CustomerEntity> customers = new HashSet<>();

    public void addCustomer(CustomerEntity customer) {
        customers.add(customer);
        customer.setLoyaltyProgram(this);
    }

    public void removeCustomer(CustomerEntity customer) {
        customers.remove(customer);
        customer.setLoyaltyProgram(null);
    }
}

@Entity
@Table(name = "discounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column(nullable = false)
    private Double value;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @ManyToMany(mappedBy = "discounts")
    private Set<CustomerEntity> customers = new HashSet<>();
}

@Entity
@Table(name = "rewards")
@Data
@NoArgsConstructor
@AllArgsConstructor
class Reward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column(nullable = false)
    private Integer pointsRequired;

    @Column(nullable = false)
    private Double value;

    @Column(nullable = false)
    private LocalDate issuedDate;

    @Column
    private LocalDate expirationDate;

    @Column
    private Boolean isRedeemed = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private CustomerEntity customer;
}

@Entity
@Table(name = "purchase_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
class PurchaseHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private LocalDateTime purchaseDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private CustomerEntity customer;
}