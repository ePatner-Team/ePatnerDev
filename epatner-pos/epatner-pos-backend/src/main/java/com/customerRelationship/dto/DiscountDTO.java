package com.customerRelationship.dto;

import lombok.Data;

@Data
public class DiscountDTO {
    private Long id;
    private String name;
    private String description;
    private double percentage;
    private String startDate;
    private String endDate;
}
