package com.customerRelationship;

import com.customerRelationship.CustomerEntity;
import com.customerRelationship.Discount;
import com.customerRelationship.LoyaltyProgram;
import com.customerRelationship.Reward;
import com.customerRelationship.CustomerRepository;
// import com.customerRelationship.exception.CustomerNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<CustomerEntity> getAllCustomers() {
        return customerRepository.findAll();
    }

    public CustomerEntity getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with id: " + id));
    }

    public CustomerEntity createCustomer(CustomerEntity customer) {
        customer.setRegistrationDate(LocalDate.now());
        return customerRepository.save(customer);
    }

    public CustomerEntity updateCustomer(Long id, CustomerEntity customerDetails) {
        CustomerEntity customer = getCustomerById(id);
        customer.setFirstName(customerDetails.getFirstName());
        customer.setLastName(customerDetails.getLastName());
        customer.setEmail(customerDetails.getEmail());
        customer.setPhoneNumber(customerDetails.getPhoneNumber());
        customer.setAddress(customerDetails.getAddress());
        customer.setDateOfBirth(customerDetails.getDateOfBirth());
        customer.setNotes(customerDetails.getNotes());
        customer.setIsActive(customerDetails.getIsActive());
        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id) {
        CustomerEntity customer = getCustomerById(id);
        customerRepository.delete(customer);
    }

    public Optional<CustomerEntity> findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    public Optional<CustomerEntity> findByPhoneNumber(String phoneNumber) {
        return customerRepository.findByPhoneNumber(phoneNumber);
    }

    public List<CustomerEntity> findByLastName(String lastName) {
        return customerRepository.findByLastName(lastName);
    }

    public List<CustomerEntity> getActiveCustomers() {
        return customerRepository.findByIsActiveTrue();
    }

    @Transactional
    public void updateLoyaltyPoints(Long customerId, int points) {
        CustomerEntity customer = getCustomerById(customerId);
        customer.updateLoyaltyPoints(points);
        customerRepository.save(customer);
    }

    public void assignLoyaltyProgram(Long customerId, LoyaltyProgram program) {
        CustomerEntity customer = getCustomerById(customerId);
        customer.setLoyaltyProgram(program);
        customerRepository.save(customer);
    }

    @Transactional
    public void addDiscount(Long customerId, Discount discount) {
        CustomerEntity customer = getCustomerById(customerId);
        customer.addDiscount(discount);
        customerRepository.save(customer);
    }

@Transactional
    public void removeDiscount(Long customerId, Discount discount) {
        CustomerEntity customer = getCustomerById(customerId);
        customer