package com.accountingAndFinance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.accountingAndFinance.AccountingModel.AccountPayable;
import com.accountingAndFinance.AccountingModel.AccountReceivable;
import com.accountingAndFinance.AccountingModel.BalanceSheet;
import com.accountingAndFinance.AccountingModel.Budget;
import com.accountingAndFinance.AccountingModel.CashFlowStatement;
import com.accountingAndFinance.AccountingModel.IncomeStatement;
import com.accountingAndFinance.AccountingModel.JournalEntry;
import com.accountingAndFinance.AccountingModel.Payment;

import java.util.Date;
import java.util.List;

public class AccountingRepository {

    @Repository
    public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {
        List<JournalEntry> findByDateBetween(Date startDate, Date endDate);
    }

    @Repository
    public interface AccountReceivableRepository extends JpaRepository<AccountReceivable, Long> {
        // Add custom query methods if needed
    }

    @Repository
    public interface AccountPayableRepository extends JpaRepository<AccountPayable, Long> {
        // Add custom query methods if needed
    }

    public interface PaymentRepository extends CrudRepository<Payment, Long> {
        List<Payment> findByDateBetween(Date startDate, Date endDate);
    }

    @Repository
    public interface BudgetRepository extends JpaRepository<Budget, Long> {
        Budget findByYear(int year);
    }
    // new

    public interface IncomeStatementRepository extends CrudRepository<IncomeStatement, Long> {
        List<IncomeStatement> findByDateBetween(Date startDate, Date endDate);
    }

    public interface BalanceSheetRepository extends CrudRepository<BalanceSheet, Long> {
        List<BalanceSheet> findByDateBetween(Date startDate, Date endDate);
    }

    public interface CashFlowStatementRepository extends CrudRepository<CashFlowStatement, Long> {
        List<CashFlowStatement> findByDateBetween(Date startDate, Date endDate);
    }

}