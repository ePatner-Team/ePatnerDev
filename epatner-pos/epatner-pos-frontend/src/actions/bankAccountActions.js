import bankAccountAPI from '../api/bankAccountAPI';
import {
  CONNECT_BANK_ACCOUNT_SUCCESS,
  CONNECT_BANK_ACCOUNT_FAILURE,
  FETCH_CONNECTED_ACCOUNTS_SUCCESS,
  FETCH_CONNECTED_ACCOUNTS_FAILURE,
  FETCH_ACCOUNT_BALANCE_SUCCESS,
  FETCH_ACCOUNT_BALANCE_FAILURE,
  FETCH_ALL_ACCOUNT_BALANCES_SUCCESS,
  FETCH_ALL_ACCOUNT_BALANCES_FAILURE,
  GENERATE_PAYMENT_SLIP_SUCCESS,
  GENERATE_PAYMENT_SLIP_FAILURE,
  GENERATE_DEPOSIT_SLIP_SUCCESS,
  GENERATE_DEPOSIT_SLIP_FAILURE,
  DISCONNECT_BANK_ACCOUNT_SUCCESS,
  DISCONNECT_BANK_ACCOUNT_FAILURE,
  FETCH_TRANSACTION_HISTORY_SUCCESS,
  FETCH_TRANSACTION_HISTORY_FAILURE
} from './types';

// Connect a new bank account
export const connectBankAccount = (accountData) => async (dispatch) => {
  try {
    const response = await bankAccountAPI.connectBankAccount(accountData);
    dispatch({
      type: CONNECT_BANK_ACCOUNT_SUCCESS,
      payload: response
    });
  } catch (error) {
    dispatch({
      type: CONNECT_BANK_ACCOUNT_FAILURE,
      payload: error.response.data
    });
  }
};

// Fetch all connected bank accounts
export const fetchConnectedAccounts = () => async (dispatch) => {
  try {
    const response = await bankAccountAPI.fetchConnectedAccounts();
    dispatch({
      type: FETCH_CONNECTED_ACCOUNTS_SUCCESS,
      payload: response
    });
  } catch (error) {
    dispatch({
      type: FETCH_CONNECTED_ACCOUNTS_FAILURE,
      payload: error.response.data
    });
  }
};

// Fetch real-time balance for a specific account
export const fetchAccountBalance = (accountId) => async (dispatch) => {
  try {
    const response = await bankAccountAPI.fetchAccountBalance(accountId);
    dispatch({
      type: FETCH_ACCOUNT_BALANCE_SUCCESS,
      payload: { accountId, balance: response.balance }
    });
  } catch (error) {
    dispatch({
      type: FETCH_ACCOUNT_BALANCE_FAILURE,
      payload: error.response.data
    });
  }
};

// Fetch real-time balances for all connected accounts
export const fetchAllAccountBalances = () => async (dispatch) => {
  try {
    const response = await bankAccountAPI.fetchAllAccountBalances();
    dispatch({
      type: FETCH_ALL_ACCOUNT_BALANCES_SUCCESS,
      payload: response
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_ACCOUNT_BALANCES_FAILURE,
      payload: error.response.data
    });
  }
};

// Generate a bank slip for payment
export const generatePaymentSlip = (paymentData) => async (dispatch) => {
  try {
    const response = await bankAccountAPI.generatePaymentSlip(paymentData);
    dispatch({
      type: GENERATE_PAYMENT_SLIP_SUCCESS,
      payload: response
    });
  } catch (error) {
    dispatch({
      type: GENERATE_PAYMENT_SLIP_FAILURE,
      payload: error.response.data
    });
  }
};

// Generate a bank slip for deposit
export const generateDepositSlip = (depositData) => async (dispatch) => {
  try {
    const response = await bankAccountAPI.generateDepositSlip(depositData);
    dispatch({
      type: GENERATE_DEPOSIT_SLIP_SUCCESS,
      payload: response
    });
  } catch (error) {
    dispatch({
      type: GENERATE_DEPOSIT_SLIP_FAILURE,
      payload: error .response.data
    });
  }
};

// Disconnect a bank account
export const disconnectBankAccount = (accountId) => async (dispatch) => {
  try {
    const response = await bankAccountAPI.disconnectBankAccount(accountId);
    dispatch({
      type: DISCONNECT_BANK_ACCOUNT_SUCCESS,
      payload: response
    });
  } catch (error) {
    dispatch({
      type: DISCONNECT_BANK_ACCOUNT_FAILURE,
      payload: error.response.data
    });
  }
};

// Fetch transaction history for a specific account
export const fetchTransactionHistory = (accountId, startDate, endDate) => async (dispatch) => {
  try {
    const response = await bankAccountAPI.fetchTransactionHistory(accountId, startDate, endDate);
    dispatch({
      type: FETCH_TRANSACTION_HISTORY_SUCCESS,
      payload: { accountId, transactions: response.transactions }
    });
  } catch (error) {
    dispatch({
      type: FETCH_TRANSACTION_HISTORY_FAILURE,
      payload: error.response.data
    });
  }
};