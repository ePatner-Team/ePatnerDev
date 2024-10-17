import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const customerRelationshipAPI = {
  // Customer Profiles
  fetchCustomers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customers`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCustomerById: async (customerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customers/${customerId}`);
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

  deleteCustomer: async (customerId) => {
    try {
      await axios.delete(`${API_BASE_URL}/customers/${customerId}`);
    } catch (error) {
      throw error;
    }
  },

  // Purchase History
  fetchCustomerPurchaseHistory: async (customerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customers/${customerId}/purchase-history`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Customer Ledger
  fetchCustomerLedger: async (customerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customers/${customerId}/ledger`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Loyalty Programs
  fetchLoyaltyPrograms: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/loyalty-programs`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createLoyaltyProgram: async (programData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/loyalty-programs`, programData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateLoyaltyProgram: async (programId, programData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/loyalty-programs/${programId}`, programData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteLoyaltyProgram: async (programId) => {
    try {
      await axios.delete(`${API_BASE_URL}/loyalty-programs/${programId}`);
    } catch (error) {
      throw error;
    }
  },

  // Discounts
  fetchDiscounts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/discounts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createDiscount: async (discountData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/discounts`, discountData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateDiscount: async (discountId, discountData) => {
     try {
      const response = await axios.put(`${API_BASE_URL}/discounts/${discountId}`, discountData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteDiscount: async (discountId) => {
    try {
      await axios.delete(`${API_BASE_URL}/discounts/${discountId}`);
    } catch (error) {
      throw error;
    }
  },

  // Rewards
  fetchRewards: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rewards`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createReward: async (rewardData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/rewards`, rewardData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateReward: async (rewardId, rewardData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/rewards/${rewardId}`, rewardData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteReward: async (rewardId) => {
    try {
      await axios.delete(`${API_BASE_URL}/rewards/${rewardId}`);
    } catch (error) {
      throw error;
    }
  },
};

export default customerRelationshipAPI;