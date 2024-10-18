import { message } from 'antd';
import posAPI from '../api/posAPI';

// Action Types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const PROCESS_TRANSACTION_REQUEST = 'PROCESS_TRANSACTION_REQUEST';
export const PROCESS_TRANSACTION_SUCCESS = 'PROCESS_TRANSACTION_SUCCESS';
export const PROCESS_TRANSACTION_FAILURE = 'PROCESS_TRANSACTION_FAILURE';
export const GENERATE_INVOICE = 'GENERATE_INVOICE';
export const SYNC_OFFLINE_TRANSACTIONS = 'SYNC_OFFLINE_TRANSACTIONS';

// Action Creators

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const products = await posAPI.fetchProducts();
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: products,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      payload: error.message,
    });
    message.error('Failed to fetch products');
  }
};

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const processTransaction = (transaction) => async (dispatch) => {
  dispatch({ type: PROCESS_TRANSACTION_REQUEST });
  try {
    const response = await posAPI.processTransaction(transaction);
    dispatch({
      type: PROCESS_TRANSACTION_SUCCESS,
      payload: response,
    });
    return response;
  } catch (error) {
    dispatch({
      type: PROCESS_TRANSACTION_FAILURE,
      payload: error.message,
    });
    throw error;
  }
};

export const generateInvoice = (invoiceData) => async (dispatch) => {
  try {
    const invoice = await posAPI.generateInvoice(invoiceData);
    dispatch({
      type: GENERATE_INVOICE,
      payload: invoice,
    });
  } catch (error) {
    message.error('Failed to generate invoice');
  }
};

export const syncOfflineTransactions = (transactions) => async (dispatch) => {
  try {
    const response = await posAPI.syncOfflineTransactions(transactions);
    dispatch({
      type: SYNC_OFFLINE_TRANSACTIONS,
      payload: response,
    });
    message.success('Offline transactions synced successfully');
  } catch (error) {
    message.error('Failed to sync offline transactions');
  }
};

// Hardware Integration Actions

export const initializeBarcodeScanner = () => async (dispatch) => {
  try {
    const result = await posAPI.initializeBarcodeScanner();
    if (result.success) {
      message.success(result.message);
    } else {
      message.error('Failed to initialize barcode scanner');
    }
  } catch (error) {
    message.error('Error initializing barcode scanner');
  }
};

export const fetchProductByBarcode = (barcode) => async (dispatch) => {
  try {
    const product = await posAPI.fetchProductByBarcode(barcode);
    if (product) {
      dispatch(addToCart(product));
    } else {
      message.error('Product not found');
    }
  } catch (error) {
    message.error('Failed to fetch product by barcode');
  }
};

export const printReceipt = (receiptData) => async (dispatch) => {
  try {
    const result = await posAPI.printReceipt(receiptData);
    if (result.success) {
      message.success(result.message);
    } else {
      message.error('Failed to print receipt');
    }
  } catch (error) {
    message.error('Error printing receipt');
  }
};