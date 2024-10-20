package com.customerRelationship.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.customerRelationship.entity.Discount;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

// Discount Repository
@Repository
 public interface DiscountRepository extends JpaRepository<Discount, Long> {

    // Find discount by name
    Optional<Discount> findByName(String name);

    // Find discounts by type
    List<Discount> findByType(String type);

    // Find discounts by start date
    List<Discount> findByStartDate(LocalDate startDate);

    // Find discounts by end date
    List<Discount> findByEndDate(LocalDate endDate);

    // Find active discounts
    List<Discount> findByEndDateAfter(LocalDate currentDate);
}

