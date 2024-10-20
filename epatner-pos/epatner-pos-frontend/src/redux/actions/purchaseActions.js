import { message } from 'antd';
import purchaseAPI from '../api/purchaseAPI';

// Action Types
export const FETCH_VENDORS_SUCCESS = 'FETCH_VENDORS_SUCCESS';
export const ADD_VENDOR_SUCCESS = 'ADD_VENDOR_SUCCESS';
export const UPDATE_VENDOR_SUCCESS = 'UPDATE_VENDOR_SUCCESS';
export const FETCH_PURCHASE_ORDERS_SUCCESS = 'FETCH_PURCHASE_ORDERS_SUCCESS';
export const CREATE_PURCHASE_ORDER_SUCCESS = 'CREATE_PURCHASE_ORDER_SUCCESS';
export const UPDATE_PURCHASE_ORDER_SUCCESS = 'UPDATE_PURCHASE_ORDER_SUCCESS';
export const RECEIVE_GOODS_SUCCESS = 'RECEIVE_GOODS_SUCCESS';
export const MATCH_INVOICE_SUCCESS = 'MATCH_INVOICE_SUCCESS';
export const SCHEDULE_PAYMENT_SUCCESS = 'SCHEDULE_PAYMENT_SUCCESS';
export const TRACK_PAYMENT_SUCCESS = 'TRACK_PAYMENT_SUCCESS';
export const FETCH_PAYMENTS_SUCCESS = 'FETCH_PAYMENTS_SUCCESS';

// Action Creators

// Vendor Management
export const fetchVendors = () => async (dispatch) => {
  try {
    const vendors = await purchaseAPI.fetchVendors();
    dispatch({ type: FETCH_VENDORS_SUCCESS, payload: vendors });
  } catch (error) {
    message.error('Failed to fetch vendors');
  }
};

export const addVendor = (vendorData) => async (dispatch) => {
  try {
    const newVendor = await purchaseAPI.addVendor(vendorData);
    dispatch({ type: ADD_VENDOR_SUCCESS, payload: newVendor });
    message.success('Vendor added successfully');
  } catch (error) {
    message.error('Failed to add vendor');
  }
};

export const updateVendor = (vendorId, vendorData) => async (dispatch) => {
  try {
    const updatedVendor = await purchaseAPI.updateVendor(vendorId, vendorData);
    dispatch({ type: UPDATE_VENDOR_SUCCESS, payload: updatedVendor });
    message.success('Vendor updated successfully');
  } catch (error) {
    message.error('Failed to update vendor');
  }
};

// Purchase Order Management
export const fetchPurchaseOrders = () => async (dispatch) => {
  try {
    const purchaseOrders = await purchaseAPI.fetchPurchaseOrders();
    dispatch({ type: FETCH_PURCHASE_ORDERS_SUCCESS, payload: purchaseOrders });
  } catch (error) {
    message.error('Failed to fetch purchase orders');
  }
};

export const createPurchaseOrder = (orderData) => async (dispatch) => {
  try {
    const newOrder = await purchaseAPI.createPurchaseOrder(orderData);
    dispatch({ type: CREATE_PURCHASE_ORDER_SUCCESS, payload: newOrder });
    message.success('Purchase order created successfully');
  } catch (error) {
    message.error('Failed to create purchase order');
  }
};

export const updatePurchaseOrder = (orderId, orderData) => async (dispatch) => {
  try {
    const updatedOrder = await purchaseAPI.updatePurchaseOrder(orderId, orderData);
    dispatch({ type: UPDATE_PURCHASE_ORDER_SUCCESS, payload: updatedOrder });
    message.success('Purchase order updated successfully');
  } catch (error) {
    message.error('Failed to update purchase order');
  }
};

// Goods Receipt
export const receiveGoods = (receiptData) => async (dispatch) => {
  try {
    const goodsReceipt = await purchaseAPI.receiveGoods(receiptData);
    dispatch({ type: RECEIVE_GOODS_SUCCESS, payload: goodsReceipt });
    message.success('Goods received successfully');
  } catch (error) {
    message.error('Failed to receive goods');
  }
};

// Invoice Matching
export const matchInvoice = (invoiceData) => async ( dispatch) => {
  try {
    const matchedInvoice = await purchaseAPI.matchInvoice(invoiceData);
    dispatch({ type: MATCH_INVOICE_SUCCESS, payload: matchedInvoice });
    message.success('Invoice matched successfully');
  } catch (error) {
    message.error('Failed to match invoice');
  }
};

// Payment Management
export const schedulePayment = (paymentData) => async (dispatch) => {
  try {
    const scheduledPayment = await purchaseAPI.schedulePayment(paymentData);
    dispatch({ type: SCHEDULE_PAYMENT_SUCCESS, payload: scheduledPayment });
    message.success('Payment scheduled successfully');
  } catch (error) {
    message.error('Failed to schedule payment');
  }
};

export const trackPayment = (paymentId) => async (dispatch) => {
  try {
    const paymentStatus = await purchaseAPI.trackPayment(paymentId);
    dispatch({ type: TRACK_PAYMENT_SUCCESS, payload: paymentStatus });
  } catch (error) {
    message.error('Failed to track payment');
  }
};

export const fetchPayments = () => async (dispatch) => {
  try {
    const payments = await purchaseAPI.fetchPayments();
    dispatch({ type: FETCH_PAYMENTS_SUCCESS, payload: payments });
  } catch (error) {
    message.error('Failed to fetch payments');
  }
};