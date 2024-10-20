package com.customerRelationship;

import com.customerRelationship.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {

    // Find customer by email
    Optional<CustomerEntity> findByEmail(String email);

    // Find customer by phone number
    Optional<CustomerEntity> findByPhoneNumber(String phoneNumber);

    // Find customers by last name
    List<CustomerEntity> findByLastName(String lastName);

    // Find active customers
    List<CustomerEntity> findByIsActiveTrue();

    // Find customers by loyalty program
    List<CustomerEntity> findByLoyaltyProgramId(Long loyaltyProgramId);

    // Find customers with loyalty points greater than a specified value
    List<CustomerEntity> findByLoyaltyPointsGreaterThan(Integer points);

    // Find customers who have a specific discount
    @Query("SELECT c FROM CustomerEntity c JOIN c.discounts d WHERE d.id = :discountId")
    List<CustomerEntity> findCustomersWithDiscount(@Param("discountId") Long discountId);

    // Find customers who registered between two dates
    List<CustomerEntity> findByRegistrationDateBetween(LocalDate startDate, LocalDate endDate);

    // Find customers whose birthday is in the given month
    @Query("SELECT c FROM CustomerEntity c WHERE MONTH(c.dateOfBirth) = :month")
    List<CustomerEntity> findCustomersWithBirthdayInMonth(@Param("month") int month);

    // Search customers by name (first name or last name)
    @Query("SELECT c FROM CustomerEntity c WHERE LOWER(c.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(c.lastName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<CustomerEntity> searchCustomersByName(@Param("name") String name);

    // Count customers by loyalty program
    @Query("SELECT COUNT(c) FROM CustomerEntity c WHERE c.loyaltyProgram.id = :programId")
    Long countCustomersByLoyaltyProgram(@Param("programId") Long programId);

    // Find top customers by loyalty points
    @Query("SELECT c FROM CustomerEntity c ORDER BY c.loyaltyPoints DESC")
    List<CustomerEntity> findTopCustomersByLoyaltyPoints(org.springframework.data.domain.Pageable pageable);

    // Update customer's loyalty points
    @Query("UPDATE CustomerEntity c SET c.loyaltyPoints = c.loyaltyPoints + :points WHERE c.id = :customerId")
    void updateCustomerLoyaltyPoints(@Param("customerId") Long customerId, @Param("points") Integer points);
}