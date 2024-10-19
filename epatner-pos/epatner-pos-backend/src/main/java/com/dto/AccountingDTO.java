package com.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

public class AccountingDTO {

    private Long id;

    @NotBlank(message = "Transaction type is required")
    private String transactionType;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than zero")
    private BigDecimal amount;

    @NotNull(message = "Transaction date is required")
    private LocalDate transactionDate;

    @Size(max = 255, message = "Description must be less than 255 characters")
    private String description;

    @NotBlank(message = "Account name is required")
    private String accountName;

    @NotBlank(message = "Category is required")
    private String category;

    private String reference;

    // Constructors
    public AccountingDTO() {
    }

    public AccountingDTO(Long id, String transactionType, BigDecimal amount, LocalDate transactionDate,
            String description, String accountName, String category, String reference) {
        this.id = id;
        this.transactionType = transactionType;
        this.amount = amount;
        this.transactionDate = transactionDate;
        this.description = description;
        this.accountName = accountName;
        this.category = category;
        this.reference = reference;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    // equals and hashCode methods
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        AccountingDTO that = (AccountingDTO) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(transactionType, that.transactionType) &&
                Objects.equals(amount, that.amount) &&
                Objects.equals(transactionDate, that.transactionDate) &&
                Objects.equals(description, that.description) &&
                Objects.equals(accountName, that.accountName) &&
                Objects.equals(category, that.category) &&
                Objects.equals(reference, that.reference);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, transactionType, amount, transactionDate, description, accountName, category,
                reference);
    }

    @Override
    public String toString() {
        return "AccountingDTO{" +
                "id=" + id +
                ", transactionType='" + transactionType + '\'' +
                ", amount=" + amount +
                ", transactionDate=" + transactionDate +
                ", description='" + description + '\'' +
                ", accountName='" + accountName + '\'' +
                ", category='" + category + '\'' +
                ", reference='" + reference + '\'' +
                '}';
    }

    // Builder pattern for easy object creation
    public static class Builder {
        private Long id;
        private String transactionType;
        private BigDecimal amount;
        private LocalDate transactionDate;
        private String description;
        private String accountName;
        private String category;
        private String reference;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder transactionType(String transactionType) {
            this.transactionType = transactionType;
            return this;
        }

        public Builder amount(BigDecimal amount) {
            this.amount = amount;
            return this;
        }

        public Builder transactionDate(LocalDate transactionDate) {
            this.transactionDate = transactionDate;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder accountName(String accountName) {
            this.accountName = accountName;
            return this;
        }

        public Builder category(String category) {
            this.category = category;
            return this;
        }

        public Builder reference(String reference) {
            this.reference = reference;
            return this;
        }

        public AccountingDTO build() {
            return new AccountingDTO(id, transactionType, amount, transactionDate, description, accountName, category,
                    reference);
        }
    }

    public static Builder builder() {
        return new Builder();
    }

    // Copy method for creating a new instance with the same values
    public AccountingDTO copy() {
        return new AccountingDTO(this.id, this.transactionType, this.amount, this.transactionDate,
                this.description, this.accountName, this.category, this.reference);
    }

    // Method to check if the transaction is a debit
    public boolean isDebit() {
        return "DEBIT".equalsIgnoreCase(this.transactionType);
    }

    // Method to check if the transaction is a credit
    public boolean isCredit() {
        return "CREDIT".equalsIgnoreCase(this.transactionType);
    }

    // Method to get the absolute amount
    public BigDecimal getAbsoluteAmount() {
        return this.amount.abs();
    }

    // Method to get the sign of the amount based on transaction type
    public BigDecimal getSignedAmount() {
        return isDebit() ? this.amount.negate() : this.amount;
    }
}