import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const posAPI = {
  fetchProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchProductByBarcode: async (barcode) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/barcode/${barcode}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  processTransaction: async (transaction) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/transactions`, transaction);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  syncOfflineTransactions: async (transactions) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/sync-transactions`, transactions);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  generateInvoice: async (invoiceData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/invoices`, invoiceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Hardware integration APIs

  initializeBarcodeScanner: async () => {
    // This would typically be handled by a library specific to your hardware
    // For example purposes, we'll just return a success message
    return { success: true, message: 'Barcode scanner initialized' };
  },

  printReceipt: async (receiptData) => {
    // This would typically be handled by a library specific to your hardware
    // For example purposes, we'll just return a success message
    return { success: true, message: 'Receipt printed successfully' };
  }
};

export default posAPI;