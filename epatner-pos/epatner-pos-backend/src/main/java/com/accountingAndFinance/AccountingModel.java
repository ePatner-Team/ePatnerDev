package com.accountingAndFinance;

import java.util.Date;
import java.util.List;
import java.math.BigDecimal;

public class AccountingModel {

    public static class JournalEntry {
        private Long id;
        private Date date;
        private String description;
        private List<Transaction> transactions;

        // Getters and setters
    }

    public static class GeneralLedger {
        private Long id;
        private List<Account> accounts;
        private List<JournalEntry> entries;

        // Getters and setters
    }

    public static class Account {
        private Long id;
        private String name;
        private AccountType type;
        private BigDecimal balance;

        public enum AccountType {
            ASSET, LIABILITY, INCOME, EXPENSE, EQUITY
        }

        // Getters and setters
    }

    public static class Transaction {
        private Long id;
        private Account account;
        private BigDecimal amount;
        private TransactionType type;

        public enum TransactionType {
            DEBIT, CREDIT
        }

        // Getters and setters
    }

    public static abstract class FinancialStatement {
        private Long id;
        private Date startDate;
        private Date endDate;
        private String companyName;

        // Getters and setters
    }

    public static class IncomeStatement extends FinancialStatement {
        private BigDecimal revenue;
        private BigDecimal expenses;
        private BigDecimal netIncome;

        // Getters and setters
    }

    public static class BalanceSheet extends FinancialStatement {
        private BigDecimal totalAssets;
        private BigDecimal totalLiabilities;
        private BigDecimal totalEquity;

        // Getters and setters
    }

    public static class CashFlowStatement extends FinancialStatement {
        private BigDecimal operatingCashFlow;
        private BigDecimal investingCashFlow;
        private BigDecimal financingCashFlow;
        private BigDecimal netCashFlow;

        // Getters and setters
    }

    public static class AccountReceivable {
        private Long id;
        private String customerName;
        private BigDecimal amount;
        private Date dueDate;
        private boolean isPaid;
        private List<Payment> payments;

        // Getters and setters
    }

    public static class Payment {
        private Long id;
        private BigDecimal amount;
        private Date paymentDate;
        private String paymentMethod;
        private String referenceNumber;

        // Getters and setters
    }

    public static class AccountPayable {
        private Long id;
        private String vendorName;
        private BigDecimal amount;
        private Date dueDate;
        private boolean isPaid;
        private List<Payment> payments;

        // Getters and setters
    }

    public static class Budget {
        private Long id;
        private String name;
        private Date startDate;
        private Date endDate;
        private List<BudgetItem> items;

        // Getters and setters
    }

    public static class BudgetItem {
        private Long id;
        private String category;
        private BigDecimal plannedAmount;
        private BigDecimal actualAmount;

        // Getters and setters
    }

}