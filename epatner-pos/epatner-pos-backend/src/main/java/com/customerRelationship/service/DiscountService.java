package com.customerRelationship.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.customerRelationship.repository.DiscountRepository;
import com.customerRelationship.entity.Discount;

import java.util.List;
import java.util.Optional;

@Service
public class DiscountService {

    @Autowired
    private DiscountRepository discountRepository;

    public List<Discount> getAllDiscounts() {
        return discountRepository.findAll();
    }

    public Optional<Discount> getDiscountById(Long id) {
        return discountRepository.findById(id);
    }

    public Discount createDiscount(Discount discount) {
        return discountRepository.save(discount);
     }

    public Discount updateDiscount(Long id, Discount discountDetails) {
        Discount discount = discountRepository.findById(id).orElse(null);
        if (discount != null) {
            discount.setName(discountDetails.getName());
            discount.setDescription(discountDetails.getDescription());
            discount.setPercentage(discountDetails.getPercentage());
            return discountRepository.save(discount);
        }
        return null;
    }

    public void deleteDiscount(Long id) {
        discountRepository.deleteById(id);
    }
}