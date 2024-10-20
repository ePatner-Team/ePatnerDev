package com.bankAccountIntegration.dto;

import java.math.BigDecimal;

public class PaymentDetails {

    private BigDecimal amount;
    private String recipient;
    private String paymentReference;

    public PaymentDetails() {
    }

    public PaymentDetails(BigDecimal amount, String recipient, String paymentReference) {
        this.amount = amount;
        this.recipient = recipient;
        this.paymentReference = paymentReference;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getPaymentReference() {
        return paymentReference;
    }

    public void setPaymentReference(String paymentReference) {
        this.paymentReference = paymentReference;
    }
}
