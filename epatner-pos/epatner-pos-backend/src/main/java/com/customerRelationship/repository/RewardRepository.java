package com.customerRelationship.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.customerRelationship.entity.Reward;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

// Reward Repository
@Repository
 public interface RewardRepository extends JpaRepository<Reward, Long> {

    // Find reward by name
    Optional<Reward> findByName(String name);

    // Find rewards by points required
    List<Reward> findByPointsRequired(Integer pointsRequired);

    // Find rewards by value
    List<Reward> findByValue(Double value);

    // Find rewards by issued date
    List<Reward> findByIssuedDate(LocalDate issuedDate);

    // Find rewards by expiration date
    List<Reward> findbyExpirationDate(LocalDate expirationDate);

    // Find active rewards
    List<Reward> findByIsRedeemedFalse();
}