package com.customerRelationship.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.customerRelationship.repository.LoyaltyProgramRepository;
import com.customerRelationship.entity.LoyaltyProgram;

import java.util.List;
import java.util.Optional;

@Service
public class LoyaltyProgramService {

    @Autowired
    private LoyaltyProgramRepository loyaltyProgramRepository;

    public List<LoyaltyProgram> getAllLoyaltyPrograms() {
        return loyaltyProgramRepository.findAll();
    }

    public Optional<LoyaltyProgram> getLoyaltyProgramById(Long id) {
        return loyaltyProgramRepository.findById(id);
    }

    public LoyaltyProgram createLoyaltyProgram(LoyaltyProgram loyaltyProgram) {
        return loyaltyProgramRepository.save(loyaltyProgram);
    }

    public LoyaltyProgram updateLoyaltyProgram(Long id, LoyaltyProgram loyaltyProgramDetails) {
        LoyaltyProgram loyaltyProgram = loyaltyProgramRepository.findById(id).orElse(null);
        if (loyaltyProgram != null) {
            loyaltyProgram.setName(loyaltyProgramDetails.getName());
            loyaltyProgram.setDescription(loyaltyProgramDetails.getDescription());
            loyaltyProgram.setPointsPerPurchase(loyaltyProgramDetails.getPointsPerPurchase());
            loyaltyProgram.setRedemptionRatio(loyaltyProgramDetails.getRedemptionRatio());
            return loyaltyProgramRepository.save(loyaltyProgram);
        }
        return null;
    }

    public void deleteLoyaltyProgram(Long id) {
        loyaltyProgramRepository.deleteById(id);
    }
}