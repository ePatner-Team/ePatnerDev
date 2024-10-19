package com.customerRelationship;

import com.customerRelationship.entity.LoyaltyProgram;
import com.epatner.pos.customerRelationship.entity.CustomerEntity;
import com.epatner.pos.customerRelationship.repository.LoyaltyProgramRepository;
import com.epatner.pos.customerRelationship.repository.CustomerRepository;
import com.epatner.pos.customerRelationship.exception.LoyaltyProgramNotFoundException;
import com.epatner.pos.customerRelationship.exception.CustomerNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LoyaltyProgramService {

    private final LoyaltyProgramRepository loyaltyProgramRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public LoyaltyProgramService(LoyaltyProgramRepository loyaltyProgramRepository, CustomerRepository customerRepository) {
        this.loyaltyProgramRepository = loyaltyProgramRepository;
        this.customerRepository = customerRepository;
    }

    public List<LoyaltyProgram> getAllLoyaltyPrograms() {
        return loyaltyProgramRepository.findAll();
    }

    public LoyaltyProgram getLoyaltyProgramById(Long id) {
        return loyaltyProgramRepository.findById(id)
                .orElseThrow(() -> new LoyaltyProgramNotFoundException("Loyalty program not found with id: " + id));
    }

    public LoyaltyProgram createLoyaltyProgram(LoyaltyProgram loyaltyProgram) {
        return loyaltyProgramRepository.save(loyaltyProgram);
    }

    public LoyaltyProgram updateLoyaltyProgram(Long id, LoyaltyProgram loyaltyProgramDetails) {
        LoyaltyProgram loyaltyProgram = getLoyaltyProgramById(id);
        loyaltyProgram.setName(loyaltyProgramDetails.getName());
        loyaltyProgram.setDescription(loyaltyProgramDetails.getDescription());
        loyaltyProgram.setPointsPerPurchase(loyaltyProgramDetails.getPointsPerPurchase());
        loyaltyProgram.setPointsThreshold(loyaltyProgramDetails.getPointsThreshold());
        loyaltyProgram.setRewardValue(loyaltyProgramDetails.getRewardValue());
        return loyaltyProgramRepository.save(loyaltyProgram);
    }

    public void deleteLoyaltyProgram(Long id) {
        LoyaltyProgram loyaltyProgram = getLoyaltyProgramById(id);
        loyaltyProgramRepository.delete(loyaltyProgram);
    }

    @Transactional
    public void assignCustomerToLoyaltyProgram(Long customerId, Long programId) {
        CustomerEntity customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with id: " + customerId));
        LoyaltyProgram program = getLoyaltyProgramById(programId);
        customer.setLoyaltyProgram(program);
        customerRepository.save(customer);
    }

    public List<CustomerEntity> getCustomersInLoyaltyProgram(Long programId) {
        return customerRepository.findByLoyaltyProgramId(programId);
    }

    public int calculatePointsForPurchase(Long programId, double purchaseAmount) {
        LoyaltyProgram program = getLoyaltyProgramById(programId);
        return (int) (purchaseAmount * program.getPointsPerPurchase());
    }

    public boolean isEligibleForReward(Long programId, int customerPoints) {
        LoyaltyProgram program = getL oyaltyProgramById(programId);
        return customerPoints >= program.getPointsThreshold();
    }

    public double getRewardValue(Long programId) {
        LoyaltyProgram program = getLoyaltyProgramById(programId);
        return program.getRewardValue();
    }
}