package com.customerRelationship.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "loyalty_programs")
public class LoyaltyProgram {

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
    private Double redemptionRatio;

    // Constructors
    public LoyaltyProgram() {}

    public LoyaltyProgram(String name, String description, Integer pointsPerPurchase, Double redemptionRatio) {
        this.name = name;
        this.description = description;
        this.pointsPerPurchase = pointsPerPurchase;
        this.redemptionRatio = redemptionRatio;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPointsPerPurchase() {
        return pointsPerPurchase;
    }

    public void setPointsPerPurchase(Integer pointsPerPurchase) {
        this.pointsPerPurchase = pointsPerPurchase;
    }

    public Double getRedemptionRatio() {
        return redemptionRatio;
    }

    public void setRedemptionRatio(Double redemptionRatio) {
        this.redemptionRatio = redemptionRatio;
    }

    // toString method
    @Override
    public String toString() {
        return "LoyaltyProgram{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", pointsPerPurchase=" + pointsPerPurchase +
                ", redemptionRatio=" + redemptionRatio +
                '}';
    }
}

