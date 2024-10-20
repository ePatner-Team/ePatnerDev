package com.bankAccountIntegration;

// import com.bankAccountIntegration.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bankAccountIntegration.dto.BankAccount;

import java.util.List;

@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {

    /**
     * Find all bank accounts associated with a specific user.
     *
     * @param userId the ID of the user
     * @return a list of BankAccount entities associated with the user
     */
    List<BankAccount> findByUserId(Long userId);

    /**
     * Find a bank account by its account number.
     *
     * @param accountNumber the account number
     * @return the BankAccount entity if found, or null if not found
     */
    BankAccount findByAccountNumber(String accountNumber);

    /**
     * Find all bank accounts associated with a specific bank.
     *
     * @param bankName the name of the bank
     * @return a list of BankAccount entities associated with the bank
     */
    List<BankAccount> findByBankName(String bankName);

    /**
     * Check if a bank account exists for a given user and account number.
     *
     * @param userId        the ID of the user
     * @param accountNumber the account number
     * @return true if the account exists, false otherwise
     */
    boolean existsByUserIdAndAccountNumber(Long userId, String accountNumber);

    /**
     * Delete all bank accounts associated with a specific user.
     *
     * @param userId the ID of the user
     */
    void deleteByUserId(Long userId);

    /**
     * Count the number of bank accounts associated with a specific user.
     *
     * @param userId the ID of the user
     * @return the number of bank accounts
     */
    long countByUserId(Long userId);
}