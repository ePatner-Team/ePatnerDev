import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const purchaseAPI = {
  // Vendor Management
  fetchVendors: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vendors`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addVendor: async (vendorData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/vendors`, vendorData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateVendor: async (vendorId, vendorData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/vendors/${vendorId}`, vendorData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Purchase Order Management
  fetchPurchaseOrders: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/purchase-orders`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createPurchaseOrder: async (orderData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/purchase-orders`, orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updatePurchaseOrder: async (orderId, orderData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/purchase-orders/${orderId}`, orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Goods Receipt
  receiveGoods: async (receiptData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/goods-receipts`, receiptData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Invoice Matching
  matchInvoice: async (invoiceData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/invoice-matching`, invoiceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Payment Management
  schedulePayment: async (paymentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/payments/schedule`, paymentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  trackPayment: async (paymentId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updatePaymentStatus: async (paymentId, statusData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/payments/${paymentId}/status`, statusData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Fetch all payments
  fetchPayments: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payments`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default purchaseAPI;