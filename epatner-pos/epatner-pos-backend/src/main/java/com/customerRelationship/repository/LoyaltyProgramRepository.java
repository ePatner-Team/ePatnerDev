package com.customerRelationship.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.customerRelationship.entity.LoyaltyProgram;
import java.util.List;
import java.util.Optional;



// Loyalty Program Repository
@Repository
 public interface LoyaltyProgramRepository extends JpaRepository<LoyaltyProgram, Long> {

    // Find loyalty program by name
    Optional<LoyaltyProgram> findByName(String name);

    // Find loyalty programs by points per purchase
    List<LoyaltyProgram> findByPointsPerPurchase(Integer pointsPerPurchase);

    // Find loyalty programs by points threshold
    List<LoyaltyProgram> findByPointsThreshold(Integer pointsThreshold);

    // Find loyalty programs by reward value
    List<LoyaltyProgram> findByRewardValue(Double rewardValue);
}




