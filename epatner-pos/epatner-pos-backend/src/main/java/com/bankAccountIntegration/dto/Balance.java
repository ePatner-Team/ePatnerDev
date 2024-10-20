package com.bankAccountIntegration.dto;

import java.math.BigDecimal;

public class Balance {

    private BigDecimal currentBalance;

    public Balance() {

    }

    public Balance(BigDecimal currentBalance) {
        this.currentBalance = currentBalance;
    }

    /**
     * Returns the current balance of the account.
     * 
     * @return the current balance of the account
     */
    public BigDecimal getCurrentBalance() {
        return currentBalance;
    }

    /**
     * Sets the current balance of the account.
     * 
     * @param currentBalance the current balance of the account
     */
    public void setCurrentBalance(BigDecimal currentBalance) {
        this.currentBalance = currentBalance;
    }

}
