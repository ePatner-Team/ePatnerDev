package com.bankAccountIntegration.dto;

public class BankSlip {

    private String slipNumber;
    private String accountNumber;
    private String slipType; // e.g., "deposit" or "payment"
    private String date;
    private String reference;

    public BankSlip() {
    }

    public BankSlip(String slipNumber, String accountNumber, String slipType, String date, String reference) {
        this.slipNumber = slipNumber;
        this.accountNumber = accountNumber;
        this.slipType = slipType;
        this.date = date;
        this.reference = reference;
    }

    public String getSlipNumber() {
        return slipNumber;
    }

    public void setSlipNumber(String slipNumber) {
        this.slipNumber = slipNumber;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getSlipType() {
        return slipType;
    }

    public void setSlipType(String slipType) {
        this.slipType = slipType;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }
}
