import { message } from 'antd';
import salesAPI from '../api/salesAPI';

// Action Types
export const FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS';
export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS';
export const UPDATE_CUSTOMER_SUCCESS = 'UPDATE_CUSTOMER_SUCCESS';
export const FETCH_SALES_QUOTATIONS_SUCCESS = 'FETCH_SALES_QUOTATIONS_SUCCESS';
export const CREATE_SALES_QUOTATION_SUCCESS = 'CREATE_SALES_QUOTATION_SUCCESS';
export const FETCH_SALES_ORDERS_SUCCESS = 'FETCH_SALES_ORDERS_SUCCESS';
export const CREATE_SALES_ORDER_SUCCESS = 'CREATE_SALES_ORDER_SUCCESS';
export const FETCH_INVOICES_SUCCESS = 'FETCH_INVOICES_SUCCESS';
export const CREATE_INVOICE_SUCCESS = 'CREATE_INVOICE_SUCCESS';
export const FETCH_RETURNS_SUCCESS = 'FETCH_RETURNS_SUCCESS';
export const CREATE_RETURN_SUCCESS = 'CREATE_RETURN_SUCCESS';
export const UPDATE_CREDIT_LIMIT_SUCCESS = 'UPDATE_CREDIT_LIMIT_SUCCESS';
export const FETCH_SALES_ANALYTICS_SUCCESS = 'FETCH_SALES_ANALYTICS_SUCCESS';

// Action Creators

// Customer Management
export const fetchCustomers = () => async (dispatch) => {
  try {
    const customers = await salesAPI.fetchCustomers();
    dispatch({ type: FETCH_CUSTOMERS_SUCCESS, payload: customers });
  } catch (error) {
    message.error('Failed to fetch customers');
  }
};

export const createCustomer = (customerData) => async (dispatch) => {
  try {
    const newCustomer = await salesAPI.createCustomer(customerData);
    dispatch({ type: CREATE_CUSTOMER_SUCCESS, payload: newCustomer });
    message.success('Customer created successfully');
  } catch (error) {
    message.error('Failed to create customer');
  }
};

export const updateCustomer = (customerId, customerData) => async (dispatch) => {
  try {
    const updatedCustomer = await salesAPI.updateCustomer(customerId, customerData);
    dispatch({ type: UPDATE_CUSTOMER_SUCCESS, payload: updatedCustomer });
    message.success('Customer updated successfully');
  } catch (error) {
    message.error('Failed to update customer');
  }
};

// Sales Quotations
export const fetchSalesQuotations = () => async (dispatch) => {
  try {
    const quotations = await salesAPI.fetchSalesQuotations();
    dispatch({ type: FETCH_SALES_QUOTATIONS_SUCCESS, payload: quotations });
  } catch (error) {
    message.error('Failed to fetch sales quotations');
  }
};

export const createSalesQuotation = (quotationData) => async (dispatch) => {
  try {
    const newQuotation = await salesAPI.createSalesQuotation(quotationData);
    dispatch({ type: CREATE_SALES_QUOTATION_SUCCESS, payload: newQuotation });
    message.success('Sales quotation created successfully');
  } catch (error) {
    message.error('Failed to create sales quotation');
  }
};

// Sales Orders
export const fetchSalesOrders = () => async (dispatch) => {
  try {
    const orders = await salesAPI.fetchSalesOrders();
    dispatch({ type: FETCH_SALES_ORDERS_SUCCESS, payload: orders });
  } catch (error) {
    message.error('Failed to fetch sales orders');
  }
};

export const createSalesOrder = (orderData) => async (dispatch) => {
  try {
    const newOrder = await salesAPI.createSalesOrder(orderData);
    dispatch({ type: CREATE_SALES_ORDER_SUCCESS, payload: newOrder });
    message.success('Sales order created successfully');
  } catch (error) {
    message.error('Failed to create sales order');
  }
};

// Invoicing
export const fetchInvoices = () => async (dispatch) => {
  try {
    const invoices = await salesAPI.fetchInvoices();
    dispatch({ type: FETCH_INVOICES_SUCCESS, payload: invoices });
  } catch (error) {
    message.error('Failed to fetch invoices');
  }
};

export const createInvoice = (invoiceData) => async (dispatch) => {
  try {
    const newInvoice = await salesAPI.createInvoice(invoiceData);
    dispatch({ type: CREATE_INVOICE_SUCCESS, payload: newInvoice });
    message.success('Invoice created successfully');
  } catch (error) {
    message.error('Failed to create invoice');
  }
};

// Returns
export const fetchReturns = () => async (dispatch) => {
  try {
    const returns = await salesAPI.fetchReturns();
    dispatch({ type: FETCH_RETURNS_SUCCESS, payload: returns });
  } catch (error) {
    message.error('Failed to fetch returns');
  }
};

export const createReturn = (returnData) => async (dispatch) => {
  try {
    const newReturn = await salesAPI.createReturn(returnData);
    dispatch({ type: CREATE_RETURN_SUCCESS, payload: newReturn });
    message.success('Return created successfully');
  } catch (error) {
    message.error('Failed to create return');
  }
};

// Credit Limit Management
export const updateCreditLimit = (customerId, creditLimitData) => async (dispatch) => {
  try {
    const updatedCreditLimit = await salesAPI.updateCreditLimit(customerId, creditLimitData);
    dispatch({ type: UPDATE_CREDIT_LIMIT_SUCCESS, payload: updatedCreditLimit });
    message.success('Credit limit updated successfully');
  } catch (error) {
    message.error('Failed to update credit limit');
  }
};

// Sales Analytics
export const fetchSalesAnalytics = (params) => async (dispatch) => {
  try {
    const analytics = await salesAPI.fetchSalesAnalytics(params);
    dispatch({ type: FETCH_SALES_ANALYTICS_SUCCESS, payload: analytics });
  } catch (error) {
    message.error('Failed to fetch sales analytics');
  }
};