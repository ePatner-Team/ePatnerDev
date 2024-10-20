package com.bankAccountIntegration.dto;

public class BankAccount {
    private Long id;
    private Long userId;
    private String accountNumber;
    private String bankName;
    // Add other relevant fields as needed

    // Default constructor
    public BankAccount() {
    }

    // Constructor with fields
    public BankAccount(Long id, Long userId, String accountNumber, String bankName) {
        this.id = id;
        this.userId = userId;
        this.accountNumber = accountNumber;
        this.bankName = bankName;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    // You might want to override toString(), equals(), and hashCode() methods
}