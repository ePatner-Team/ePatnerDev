import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const accountingAndFinanceAPI = {
  // General Ledger
  fetchGeneralLedger: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/accounting/general-ledger`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  postJournalEntry: async (entryData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/accounting/journal-entries`, entryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Accounts Receivable
  fetchAccountsReceivable: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/accounting/accounts-receivable`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  recordPaymentReceived: async (paymentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/accounting/payments-received`, paymentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Accounts Payable
  fetchAccountsPayable: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/accounting/accounts-payable`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  recordPaymentMade: async (paymentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/accounting/payments-made`, paymentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Financial Statements
  generateIncomeStatement: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/accounting/income-statement`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  generateBalanceSheet: async (date) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/accounting/balance-sheet`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  generateCashFlowStatement: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/accounting/cash-flow-statement`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Budgeting
  fetchBudget: async (year) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/accounting/budget`, {
        params: { year }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createBudget: async (budgetData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/accounting/budget`, budgetData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Tax Management
  calculateTaxLiability: async (year) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/accounting/tax-liability`, {
        params: { year }
      });
      return response.data; } catch (error) {
      throw error;
    }
  },

  submitTaxReturn: async (taxReturnData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/accounting/tax-return`, taxReturnData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default accountingAndFinanceAPI;