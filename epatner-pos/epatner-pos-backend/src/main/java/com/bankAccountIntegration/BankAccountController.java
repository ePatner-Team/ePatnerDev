package com.bankAccountIntegration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bankAccountIntegration.dto.Balance;
import com.bankAccountIntegration.dto.BankAccount;
import com.bankAccountIntegration.dto.BankAccountCredentials;
import com.bankAccountIntegration.dto.BankSlip;
import com.bankAccountIntegration.dto.DepositDetails;
import com.bankAccountIntegration.dto.PaymentDetails;
import com.bankAccountIntegration.dto.Transaction;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class BankAccountController {

    private final BankAccountService bankAccountService;

    @Autowired
    public BankAccountController(BankAccountService bankAccountService) {
        this.bankAccountService = bankAccountService;
    }

    @PostMapping("/connect")
    public ResponseEntity<BankAccount> connectAccount(@RequestBody BankAccountCredentials credentials) {
        BankAccount connectedAccount = bankAccountService.connectAccount(credentials);
        return new ResponseEntity<>(connectedAccount, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BankAccount>> getUserAccounts(@PathVariable Long userId) {
        List<BankAccount> accounts = bankAccountService.getUserAccounts(userId);
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/{accountId}/balance")
    public ResponseEntity<Balance> getRealtimeBalance(@PathVariable Long accountId) {
        Balance balance = bankAccountService.getRealtimeBalance(accountId);
        return ResponseEntity.ok(balance);
    }

    @PostMapping("/{accountId}/payment-slip")
    public ResponseEntity<BankSlip> generatePaymentSlip(@PathVariable Long accountId,
            @RequestBody PaymentDetails paymentDetails) {
        BankSlip paymentSlip = bankAccountService.generatePaymentSlip(accountId, paymentDetails);
        return ResponseEntity.ok(paymentSlip);
    }

    @PostMapping("/{accountId}/deposit-slip")
    public ResponseEntity<BankSlip> generateDepositSlip(@PathVariable Long accountId,
            @RequestBody DepositDetails depositDetails) {
        BankSlip depositSlip = bankAccountService.generateDepositSlip(accountId, depositDetails);
        return ResponseEntity.ok(depositSlip);
    }

    @GetMapping("/{accountId}/transactions")
    public ResponseEntity<List<Transaction>> getAccountTransactions(@PathVariable Long accountId) {
        List<Transaction> transactions = bankAccountService.getAccountTransactions(accountId);
        return ResponseEntity.ok(transactions);
    }
}
