package com.customerRelationship.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.customerRelationship.entity.Customer;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
// Customer Repository
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Find customer by email
    Optional<Customer> findByEmail(String email);

    // Find customer by phone number
    Optional<Customer> findByPhoneNumber(String phoneNumber);

    // Find customers by last name
    List<Customer> findByLastName(String lastName);

    // Find active customers
    List<Customer> findByIsActiveTrue();

    // Find customers by loyalty program
    List<Customer> findByLoyaltyProgramId(Long loyaltyProgramId);

    // Find customers with loyalty points greater than a specified value
    List<Customer> findByLoyaltyPointsGreaterThan(Integer points);

    // Find customers who have a specific discount
    @Query("SELECT c FROM CustomerEntity c JOIN c.discounts d WHERE d.id = :discountId")
    List<Customer> findCustomersWithDiscount(@Param("discountId") Long discountId);

    // Find customers who registered between two dates
    List<Customer> findByRegistrationDateBetween(LocalDate startDate, LocalDate endDate);

    // Find customers whose birthday is in the given month
    @Query("SELECT c FROM CustomerEntity c WHERE MONTH(c.dateOfBirth) = :month")
    List<Customer> findCustomersWithBirthdayInMonth(@Param("month") int month);

    // Search customers by name (first name or last name)
    @Query("SELECT c FROM CustomerEntity c WHERE LOWER(c.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(c.lastName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Customer> searchCustomersByName(@Param("name") String name);

    // Count customers by loyalty program
    @Query("SELECT COUNT(c) FROM CustomerEntity c WHERE c.loyaltyProgram.id = :programId")
    Long countCustomersByLoyaltyProgram(@Param("programId") Long programId);

    // Find top customers by loyalty points
    @Query("SELECT c FROM CustomerEntity c ORDER BY c.loyaltyPoints DESC")
    List<Customer> findTopCustomersByLoyaltyPoints(org.springframework.data.domain.Pageable pageable);

    // Update customer's loyalty points
    @Query("UPDATE CustomerEntity c SET c.loyaltyPoints = c.loyaltyPoints + :points WHERE c.id = :customerId")
    void updateCustomerLoyaltyPoints(@Param("customerId") Long customerId, @Param("points") Integer points);
}