package com.customerRelationship;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.customerRelationship.entity.Discount;
import com.customerRelationship.entity.LoyaltyProgram;
import com.customerRelationship.entity.Reward;
import com.customerRelationship.entity.Customer;

import com.customerRelationship.service.DiscountService;
import com.customerRelationship.service.RewardService;
import com.customerRelationship.service.CustomerService;
import com.customerRelationship.service.LoyaltyProgramService;

import java.util.List;

@RestController
@RequestMapping("/api/crm")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private LoyaltyProgramService loyaltyProgramService;

    @Autowired
    private DiscountService discountService;

    @Autowired
    private RewardService rewardService;

    // Customer endpoints
    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/customers")
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        Customer createdCustomer = customerService.createCustomer(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCustomer);
    }

    @PutMapping("/customers/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.updateCustomer(id, customer));
    }

    @DeleteMapping("/customers/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }

    // Loyalty Program endpoints
    @GetMapping("/loyalty-programs")
    public ResponseEntity<List<LoyaltyProgram>> getAllLoyaltyPrograms() {
        return ResponseEntity.ok(loyaltyProgramService.getAllLoyaltyPrograms());
    }

    @PostMapping("/loyalty-programs")
    public ResponseEntity<LoyaltyProgram> createLoyaltyProgram(@RequestBody LoyaltyProgram program) {
        LoyaltyProgram createdProgram = loyaltyProgramService.createLoyaltyProgram(program);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProgram);
    }

    @PutMapping("/loyalty-programs/{id}")
    public ResponseEntity<LoyaltyProgram> updateLoyaltyProgram(@PathVariable Long id, @RequestBody LoyaltyProgram program) {
        return ResponseEntity.ok(loyaltyProgramService.updateLoyaltyProgram(id, program));
    }

    @DeleteMapping("/loyalty-programs/{id}")
    public ResponseEntity<Void> deleteLoyaltyProgram(@PathVariable Long id) {
        loyaltyProgramService.deleteLoyaltyProgram(id);
        return ResponseEntity.noContent().build();
    }

    // Discount endpoints
    @GetMapping("/discounts")
    public ResponseEntity<List<Discount>> getAllDiscounts() {
        return ResponseEntity.ok(discountService.getAllDiscounts());
    }

    @PostMapping("/discounts")
    public ResponseEntity<Discount> createDiscount(@RequestBody Discount discount) {
        Discount createdDiscount = discountService.createDiscount(discount);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDiscount);
    }

    @PutMapping("/discounts/{id}")
    public ResponseEntity<Discount> updateDiscount(@PathVariable Long id, @RequestBody Discount discount) {
        return ResponseEntity.ok(discountService.updateDiscount(id, discount));
    }

    @DeleteMapping ("/discounts/{id}")
    public ResponseEntity<Void> deleteDiscount(@PathVariable Long id) {
        discountService.deleteDiscount(id);
        return ResponseEntity.noContent().build();
    }

    // Reward endpoints
    @GetMapping("/rewards")
    public ResponseEntity<List<Reward>> getAllRewards() {
        return ResponseEntity.ok(rewardService.getAllRewards());
    }

    @PostMapping("/rewards")
    public ResponseEntity<Reward> createReward(@RequestBody Reward reward) {
        Reward createdReward = rewardService.createReward(reward);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReward);
    }

    @PutMapping("/rewards/{id}")
    public ResponseEntity<Reward> updateReward(@PathVariable Long id, @RequestBody Reward reward) {
        return ResponseEntity.ok(rewardService.updateReward(id, reward));
    }

    @DeleteMapping("/rewards/{id}")
    public ResponseEntity<Void> deleteReward(@PathVariable Long id) {
        rewardService.deleteReward(id);
        return ResponseEntity.noContent().build();
    }
}