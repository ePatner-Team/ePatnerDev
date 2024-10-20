import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const salesAPI = {
  // Customer Management
  fetchCustomers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customers`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createCustomer: async (customerData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/customers`, customerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCustomer: async (customerId, customerData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/customers/${customerId}`, customerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Sales Quotations
  fetchSalesQuotations: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sales-quotations`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createSalesQuotation: async (quotationData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/sales-quotations`, quotationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Sales Orders
  fetchSalesOrders: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sales-orders`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createSalesOrder: async (orderData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/sales-orders`, orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Invoicing
  fetchInvoices: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/invoices`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createInvoice: async (invoiceData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/invoices`, invoiceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Returns
  fetchReturns: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/returns`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createReturn: async (returnData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/returns`, returnData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Credit Limit Management
  updateCreditLimit: async (customerId, creditLimitData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/customers/${customerId}/credit-limit`, creditLimitData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Sales Analytics
  fetchSalesAnalytics: async (params) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sales-analytics`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default salesAPI;