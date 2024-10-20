import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const bankAccountAPI = {
  // Connect a new bank account
  connectBankAccount: async (accountData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/bank-accounts/connect`, accountData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Fetch all connected bank accounts
  fetchConnectedAccounts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bank-accounts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Fetch real-time balance for a specific account
  fetchAccountBalance: async (accountId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bank-accounts/${accountId}/balance`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Fetch real-time balances for all connected accounts
  fetchAllAccountBalances: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bank-accounts/balances`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Generate a bank slip for payment
  generatePaymentSlip: async (paymentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/bank-accounts/payment-slip`, paymentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Generate a bank slip for deposit
  generateDepositSlip: async (depositData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/bank-accounts/deposit-slip`, depositData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Disconnect a bank account
  disconnectBankAccount: async (accountId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/bank-accounts/${accountId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Fetch transaction history for a specific account
  fetchTransactionHistory: async (accountId, startDate, endDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bank-accounts/${accountId}/transactions`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default bankAccountAPI;