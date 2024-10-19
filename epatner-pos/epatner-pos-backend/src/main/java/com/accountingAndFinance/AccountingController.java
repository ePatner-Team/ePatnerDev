package com.accountingAndFinance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

@RestController
@RequestMapping("/api/accounting")
public class AccountingController {

    @Autowired
    private AccountingService accountingService;

    @GetMapping("/general-ledger")
    public ResponseEntity<List<JournalEntry>> fetchGeneralLedger(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        List<JournalEntry> entries = accountingService.fetchGeneralLedger(startDate, endDate);
        return ResponseEntity.ok(entries);
    }

    @PostMapping("/journal-entry")
    public ResponseEntity<JournalEntry> postJournalEntry(@RequestBody JournalEntry entry) {
        JournalEntry savedEntry = accountingService.postJournalEntry(entry);
        return ResponseEntity.ok(savedEntry);
    }

    @GetMapping("/accounts-receivable")
    public ResponseEntity<List<AccountReceivable>> fetchAccountsReceivable() {
        List<AccountReceivable> receivables = accountingService.fetchAccountsReceivable();
        return ResponseEntity.ok(receivables);
    }

    @PostMapping("/payment-received")
    public ResponseEntity<Payment> recordPaymentReceived(@RequestBody Payment payment) {
        Payment recordedPayment = accountingService.recordPaymentReceived(payment);
        return ResponseEntity.ok(recordedPayment);
    }

    @GetMapping("/accounts-payable")
    public ResponseEntity<List<AccountPayable>> fetchAccountsPayable() {
        List<AccountPayable> payables = accountingService.fetchAccountsPayable();
        return ResponseEntity.ok(payables);
    }

    @PostMapping("/payment-made")
    public ResponseEntity<Payment> recordPaymentMade(@RequestBody Payment payment) {
        Payment recordedPayment = accountingService.recordPaymentMade(payment);
        return ResponseEntity.ok(recordedPayment);
    }

    @GetMapping("/income-statement")
    public ResponseEntity<IncomeStatement> generateIncomeStatement(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        IncomeStatement statement = accountingService.generateIncomeStatement(startDate, endDate);
        return ResponseEntity.ok(statement);
    }

    @GetMapping("/balance-sheet")
    public ResponseEntity<BalanceSheet> generateBalanceSheet(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        BalanceSheet balanceSheet = accountingService.generateBalanceSheet(date);
        return ResponseEntity.ok(balanceSheet);
    }

    @GetMapping("/cash-flow-statement")
    public ResponseEntity<CashFlowStatement> generateCashFlowStatement(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        CashFlowStatement statement = accountingService.generateCashFlowStatement(startDate, endDate);
        return ResponseEntity.ok(statement);
    }

    @GetMapping("/budget")
    public ResponseEntity<Budget> fetchBudget(@RequestParam int year) {
        Budget budget = accountingService.fetchBudget(year);
        return ResponseEntity.ok(budget);
    }
}