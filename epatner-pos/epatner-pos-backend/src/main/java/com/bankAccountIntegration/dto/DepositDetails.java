package com.bankAccountIntegration.dto;

import java.math.BigDecimal;

public class DepositDetails {

    private BigDecimal amount;
    private String sourceAccountNumber;
    private String depositReference;

    public DepositDetails() {
    }

    public DepositDetails(BigDecimal amount, String sourceAccountNumber, String depositReference) {
        this.amount = amount;
        this.sourceAccountNumber = sourceAccountNumber;
        this.depositReference = depositReference;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getSourceAccountNumber() {
        return sourceAccountNumber;
    }

    public void setSourceAccountNumber(String sourceAccountNumber) {
        this.sourceAccountNumber = sourceAccountNumber;
    }

    public String getDepositReference() {
        return depositReference;
    }

    public void setDepositReference(String depositReference) {
        this.depositReference = depositReference;
    }
}
