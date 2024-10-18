import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const reportsAndAnalyticsAPI = {
  // Sales Reports
  fetchSalesReport: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/sales`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Inventory Reports
  fetchInventoryReport: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/inventory`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Real-time Dashboard Metrics
  fetchDashboardMetrics: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/metrics`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Custom Report Generation
  generateCustomReport: async (reportConfig) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reports/custom`, reportConfig);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Top Selling Products Report
  fetchTopSellingProducts: async (limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/top-selling-products`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Revenue by Category Report
  fetchRevenueByCategory: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/revenue-by-category`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Customer Acquisition Report
  fetchCustomerAcquisitionReport: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/customer-acquisition`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Profit Margin Report
  fetchProfitMarginReport: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/profit-margin`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default reportsAndAnalyticsAPI;