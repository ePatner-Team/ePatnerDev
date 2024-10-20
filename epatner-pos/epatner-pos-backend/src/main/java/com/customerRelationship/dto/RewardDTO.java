package com.customerRelationship.dto;

import lombok.Data;

@Data
public class RewardDTO {
    private Long id;
    private String name;
    private String description;
    private int pointsRequired;
    private String expirationDate;
}