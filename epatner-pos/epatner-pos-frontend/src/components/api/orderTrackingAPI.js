import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const orderTrackingAPI = {
  fetchOrders: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOrderCountdown: async (orderId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/${orderId}/countdown`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOrderDetails: async (orderId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateDeliveryEstimate: async (orderId, estimatedDeliveryTime) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/orders/${orderId}/delivery-estimate`, { estimatedDeliveryTime });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addOrderNote: async (orderId, note) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders/${orderId}/notes`, { note });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOrderHistory: async (orderId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/${orderId}/history`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default orderTrackingAPI;