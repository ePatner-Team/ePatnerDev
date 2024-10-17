import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const inventoryAPI = {
  // Product Management
  fetchProducts: async (categoryId = null, warehouseId = null) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, {
        params: { categoryId, warehouseId }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addProduct: async (productData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/products/${productId}`);
    } catch (error) {
      throw error;
    }
  },

  // Category Management
  fetchCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addCategory: async (categoryData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/categories`, categoryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Stock Management
  updateStock: async (productId, quantity, warehouseId, batchId = null) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/stock/update`, {
        productId,
        quantity,
        warehouseId,
        batchId
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Purchase Orders
  createPurchaseOrder: async (orderData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/purchase-orders`, orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchPurchaseOrders: async (status = null) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/purchase-orders`, {
        params: { status }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Supplier Management
  fetchSuppliers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/suppliers`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addSupplier: async (supplierData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/suppliers`, supplierData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Low Stock Alerts
  fetchLowStockAlerts: async (threshold) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stock/low-alerts`, {
        params: { threshold }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Batch Management
  createBatch: async (batchData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/batches`, batchData); return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchBatches: async (productId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/batches`, {
        params: { productId }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Expiry Management
  updateExpiry: async (batchId, expiryDate) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/batches/${batchId}/expiry`, {
        expiryDate
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Warehouse Management
  fetchWarehouses: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/warehouses`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addWarehouse: async (warehouseData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/warehouses`, warehouseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default inventoryAPI;