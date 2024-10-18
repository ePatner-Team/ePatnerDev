import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  connectBankAccount,
  fetchConnectedAccounts,
  fetchAllAccountBalances,
  generatePaymentSlip,
  generateDepositSlip,
  disconnectBankAccount,
  fetchTransactionHistory
} from '../actions/bankAccountActions';

const BankAccountIntegration = () => {
  const dispatch = useDispatch();
  const { 
    connectedAccounts, 
    accountBalances, 
    transactionHistory,
    paymentSlip,
    depositSlip,
    loading,
    error
  } = useSelector(state => state.bankAccount);

  const [newAccountData, setNewAccountData] = useState({
    accountNumber: '',
    bankName: '',
    accountType: ''
  });

  const [selectedAccount, setSelectedAccount] = useState('');
  const [slipData, setSlipData] = useState({
    amount: '',
    description: ''
  });

  useEffect(() => {
    dispatch(fetchConnectedAccounts());
    dispatch(fetchAllAccountBalances());
  }, [dispatch]);

  const handleConnectAccount = (e) => {
    e.preventDefault();
    dispatch(connectBankAccount(newAccountData));
    setNewAccountData({ accountNumber: '', bankName: '', accountType: '' });
  };

  const handleDisconnectAccount = (accountId) => {
    dispatch(disconnectBankAccount(accountId));
  };

  const handleGeneratePaymentSlip = (e) => {
    e.preventDefault();
    dispatch(generatePaymentSlip({ ...slipData, accountId: selectedAccount }));
  };

  const handleGenerateDepositSlip = (e) => {
    e.preventDefault();
    dispatch(generateDepositSlip({ ...slipData, accountId: selectedAccount }));
  };

  const handleFetchTransactions = () => {
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(); // Last 30 days
    const endDate = new Date().toISOString();
    dispatch(fetchTransactionHistory(selectedAccount, startDate, endDate));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Bank Account Integration</h2>

      <form onSubmit={handleConnectAccount}>
        <h3>Connect New Account</h3>
        <input
          type="text"
          placeholder="Account Number"
          value={newAccountData.accountNumber}
          onChange={(e) => setNewAccountData({ ...newAccountData, accountNumber: e.target.value })}
        />
        <input
          type="text"
          placeholder="Bank Name"
          value={newAccountData.bankName}
          onChange={(e) => setNewAccountData({ ...newAccountData, bankName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Account Type"
          value={newAccountData.accountType}
          onChange={(e) => setNewAccountData({ ...newAccountData, accountType: e.target.value })}
        />
        <button type="submit">Connect Account</button>
      </form>

      <h3>Connected Accounts</h3>
      <ul>
        {connectedAccounts.map(account => (
          <li key={account.id}>
            {account.bankName} - {account.accountNumber} - Balance: {accountBalances[account.id] || 'N/A'}
            <button onClick={() => handleDisconnectAccount(account.id)}>Disconnect</button>
          </li>
        ))}
      </ul>

      <h3>Generate Bank Slips</h3> <form onSubmit={handleGeneratePaymentSlip}>
        <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
          <option value="">Select Account</option>
          {connectedAccounts.map(account => (
            <option key={account.id} value={account.id}>{account.bankName} - {account.accountNumber}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={slipData.amount}
          onChange={(e) => setSlipData({ ...slipData, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={slipData.description}
          onChange={(e) => setSlipData({ ...slipData, description: e.target.value })}
        />
        <button type="submit">Generate Payment Slip</button>
        <button onClick={handleGenerateDepositSlip}>Generate Deposit Slip</button>
      </form>

      {paymentSlip && (
        <div>
          <h3>Payment Slip</h3>
          <p>Account: {paymentSlip.accountId}</p>
          <p>Amount: {paymentSlip.amount}</p>
          <p>Description: {paymentSlip.description}</p>
        </div>
      )}

      {depositSlip && (
        <div>
          <h3>Deposit Slip</h3>
          <p>Account: {depositSlip.accountId}</p>
          <p>Amount: {depositSlip.amount}</p>
          <p>Description: {depositSlip.description}</p>
        </div>
      )}

      <h3>Transaction History</h3>
      <button onClick={handleFetchTransactions}>Fetch Transactions</button>
      <ul>
        {transactionHistory.map(transaction => (
          <li key={transaction.id}>
            {transaction.date} - {transaction.description} - {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BankAccountIntegration;