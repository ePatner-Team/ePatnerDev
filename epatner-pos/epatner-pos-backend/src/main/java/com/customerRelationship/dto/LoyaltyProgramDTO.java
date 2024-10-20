package com.customerRelationship.dto;

import lombok.Data;

@Data
public class LoyaltyProgramDTO {
    private Long id;
    private String name;
    private String description;
    private int pointsPerPurchase;
    private double redemptionRatio;
}
