import { message } from 'antd';
import inventoryAPI from '../api/inventoryAPI';

// Action Types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';

export const UPDATE_STOCK_SUCCESS = 'UPDATE_STOCK_SUCCESS';

export const FETCH_PURCHASE_ORDERS_SUCCESS = 'FETCH_PURCHASE_ORDERS_SUCCESS';
export const CREATE_PURCHASE_ORDER_SUCCESS = 'CREATE_PURCHASE_ORDER_SUCCESS';

export const FETCH_SUPPLIERS_SUCCESS = 'FETCH_SUPPLIERS_SUCCESS';
export const ADD_SUPPLIER_SUCCESS = 'ADD_SUPPLIER_SUCCESS';

export const FETCH_LOW_STOCK_ALERTS_SUCCESS = 'FETCH_LOW_STOCK_ALERTS_SUCCESS';

export const CREATE_BATCH_SUCCESS = 'CREATE_BATCH_SUCCESS';
export const FETCH_BATCHES_SUCCESS = 'FETCH_BATCHES_SUCCESS';
export const UPDATE_EXPIRY_SUCCESS = 'UPDATE_EXPIRY_SUCCESS';

export const FETCH_WAREHOUSES_SUCCESS = 'FETCH_WAREHOUSES_SUCCESS';
export const ADD_WAREHOUSE_SUCCESS = 'ADD_WAREHOUSE_SUCCESS';

// Action Creators
export const fetchProducts = (categoryId = null, warehouseId = null) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const products = await inventoryAPI.fetchProducts(categoryId, warehouseId);
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    message.error('Failed to fetch products');
  }
};

export const addProduct = (productData) => async (dispatch) => {
  try {
    const newProduct = await inventoryAPI.addProduct(productData);
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: newProduct });
    message.success('Product added successfully');
  } catch (error) {
    message.error('Failed to add product');
  }
};

export const updateProduct = (productId, productData) => async (dispatch) => {
  try {
    const updatedProduct = await inventoryAPI.updateProduct(productId, productData);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: updatedProduct });
    message.success('Product updated successfully');
  } catch (error) {
    message.error('Failed to update product');
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    await inventoryAPI.deleteProduct(productId);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
    message.success('Product deleted successfully');
  } catch (error) {
    message.error('Failed to delete product');
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    const categories = await inventoryAPI.fetchCategories();
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: categories });
  } catch (error) {
    message.error('Failed to fetch categories');
  }
};

export const addCategory = (categoryData) => async (dispatch) => {
  try {
    const newCategory = await inventoryAPI.addCategory(categoryData);
    dispatch({ type: ADD_CATEGORY_SUCCESS, payload: newCategory });
    message.success('Category added successfully ');
  } catch (error) {
    message.error('Failed to add category');
  }
};

export const updateStock = (productId, quantity, warehouseId, batchId = null) => async (dispatch) => {
  try {
    await inventoryAPI.updateStock(productId, quantity, warehouseId, batchId);
    dispatch({ type: UPDATE_STOCK_SUCCESS, payload: { productId, quantity, warehouseId, batchId } });
    message.success('Stock updated successfully');
  } catch (error) {
    message.error('Failed to update stock');
  }
};

export const createPurchaseOrder = (orderData) => async (dispatch) => {
  try {
    const newOrder = await inventoryAPI.createPurchaseOrder(orderData);
    dispatch({ type: CREATE_PURCHASE_ORDER_SUCCESS, payload: newOrder });
    message.success('Purchase order created successfully');
  } catch (error) {
    message.error('Failed to create purchase order');
  }
};

export const fetchPurchaseOrders = (status = null) => async (dispatch) => {
  try {
    const orders = await inventoryAPI.fetchPurchaseOrders(status);
    dispatch({ type: FETCH_PURCHASE_ORDERS_SUCCESS, payload: orders });
  } catch (error) {
    message.error('Failed to fetch purchase orders');
  }
};

export const fetchSuppliers = () => async (dispatch) => {
  try {
    const suppliers = await inventoryAPI.fetchSuppliers();
    dispatch({ type: FETCH_SUPPLIERS_SUCCESS, payload: suppliers });
  } catch (error) {
    message.error('Failed to fetch suppliers');
  }
};

export const addSupplier = (supplierData) => async (dispatch) => {
  try {
    const newSupplier = await inventoryAPI.addSupplier(supplierData);
    dispatch({ type: ADD_SUPPLIER_SUCCESS, payload: newSupplier });
    message.success('Supplier added successfully');
  } catch (error) {
    message.error('Failed to add supplier');
  }
};

export const fetchLowStockAlerts = (threshold) => async (dispatch) => {
  try {
    const alerts = await inventoryAPI.fetchLowStockAlerts(threshold);
    dispatch({ type: FETCH_LOW_STOCK_ALERTS_SUCCESS, payload: alerts });
  } catch (error) {
    message.error('Failed to fetch low stock alerts');
  }
};

export const createBatch = (batchData) => async (dispatch) => {
  try {
    const newBatch = await inventoryAPI.createBatch(batchData);
    dispatch({ type: CREATE_BATCH_SUCCESS, payload: newBatch });
    message.success('Batch created successfully');
  } catch (error) {
    message.error('Failed to create batch');
  }
};

export const fetchBatches = (productId) => async (dispatch) => {
  try {
    const batches = await inventoryAPI.fetchBatches(productId);
    dispatch({ type: FETCH_BATCHES_SUCCESS, payload: batches });
  } catch (error) {
    message.error('Failed to fetch batches');
  }
};

export const updateExpiry = (batchId, expiryDate) => async (dispatch) => {
  try {
    await inventoryAPI.updateExpiry(batchId, expiryDate);
    dispatch({ type: UPDATE_EXPIRY_SUCCESS, payload: { batchId, expiryDate } });
    message.success('Expiry date updated successfully');
  } catch (error) {
    message.error('Failed to update expiry date');
  }
};

export const fetchWarehouses = () => async (dispatch) => {
  try {
    const warehouses = await inventoryAPI.fetchWarehouses();
    dispatch({ type: FETCH_WAREHOUSES_SUCCESS, payload: warehouses });
  } catch (error) {
    message.error('Failed to fetch warehouses');
  }
};

export const addWarehouse = (warehouseData) => async (dispatch) => {
  try {
    const newWarehouse = await inventoryAPI.addWarehouse(warehouseData);
    dispatch({ type: ADD_WAREHOUSE_SUCCESS, payload: newWarehouse });
    message.success('Warehouse added successfully');
  } catch (error) {
    message.error('Failed to add warehouse');
  }
};