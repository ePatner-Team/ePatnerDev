import { message } from 'antd';
import reportsAndAnalyticsAPI from '../api/reportsAndAnalyticsAPI';

// Action Types
export const FETCH_SALES_REPORT_SUCCESS = 'FETCH_SALES_REPORT_SUCCESS';
export const FETCH_INVENTORY_REPORT_SUCCESS = 'FETCH_INVENTORY_REPORT_SUCCESS';
export const FETCH_DASHBOARD_METRICS_SUCCESS = 'FETCH_DASHBOARD_METRICS_SUCCESS';
export const GENERATE_CUSTOM_REPORT_SUCCESS = 'GENERATE_CUSTOM_REPORT_SUCCESS';
export const FETCH_TOP_SELLING_PRODUCTS_SUCCESS = 'FETCH_TOP_SELLING_PRODUCTS_SUCCESS';
export const FETCH_REVENUE_BY_CATEGORY_SUCCESS = 'FETCH_REVENUE_BY_CATEGORY_SUCCESS';
export const FETCH_CUSTOMER_ACQUISITION_REPORT_SUCCESS = 'FETCH_CUSTOMER_ACQUISITION_REPORT_SUCCESS';
export const FETCH_PROFIT_MARGIN_REPORT_SUCCESS = 'FETCH_PROFIT_MARGIN_REPORT_SUCCESS';

// Action Creators

export const fetchSalesReport = (startDate, endDate) => async (dispatch) => {
  try {
    const report = await reportsAndAnalyticsAPI.fetchSalesReport(startDate, endDate);
    dispatch({ type: FETCH_SALES_REPORT_SUCCESS, payload: report });
  } catch (error) {
    message.error('Failed to fetch sales report');
  }
};

export const fetchInventoryReport = () => async (dispatch) => {
  try {
    const report = await reportsAndAnalyticsAPI.fetchInventoryReport();
    dispatch({ type: FETCH_INVENTORY_REPORT_SUCCESS, payload: report });
  } catch (error) {
    message.error('Failed to fetch inventory report');
  }
};

export const fetchDashboardMetrics = () => async (dispatch) => {
  try {
    const metrics = await reportsAndAnalyticsAPI.fetchDashboardMetrics();
    dispatch({ type: FETCH_DASHBOARD_METRICS_SUCCESS, payload: metrics });
  } catch (error) {
    message.error('Failed to fetch dashboard metrics');
  }
};

export const generateCustomReport = (reportConfig) => async (dispatch) => {
  try {
    const report = await reportsAndAnalyticsAPI.generateCustomReport(reportConfig);
    dispatch({ type: GENERATE_CUSTOM_REPORT_SUCCESS, payload: report });
    message.success('Custom report generated successfully');
  } catch (error) {
    message.error('Failed to generate custom report');
  }
};

export const fetchTopSellingProducts = (limit) => async (dispatch) => {
  try {
    const report = await reportsAndAnalyticsAPI.fetchTopSellingProducts(limit);
    dispatch({ type: FETCH_TOP_SELLING_PRODUCTS_SUCCESS, payload: report });
  } catch (error) {
    message.error('Failed to fetch top selling products');
  }
};

export const fetchRevenueByCategory = (startDate, endDate) => async (dispatch) => {
  try {
    const report = await reportsAndAnalyticsAPI.fetchRevenueByCategory(startDate, endDate);
    dispatch({ type: FETCH_REVENUE_BY_CATEGORY_SUCCESS, payload: report });
  } catch (error) {
    message.error('Failed to fetch revenue by category');
  }
};

export const fetchCustomerAcquisitionReport = (startDate, endDate) => async (dispatch) => {
  try {
    const report = await reportsAndAnalyticsAPI.fetchCustomerAcquisitionReport(startDate, endDate);
    dispatch({ type: FETCH_CUSTOMER_ACQUISITION_REPORT_SUCCESS, payload: report });
  } catch (error) {
    message.error('Failed to fetch customer acquisition report');
  }
};

export const fetchProfitMarginReport = (startDate, endDate) => async (dispatch) => {
    try {
      const report = await reportsAndAnalyticsAPI.fetchProfitMarginReport(startDate, endDate);
      dispatch({ type: FETCH_PROFIT_MARGIN_REPORT_SUCCESS, payload: report });
    } catch (error) {
      message.error('Failed to fetch profit margin report');
    }
  };
  
  // You can add more action creators here as needed for additional report types or analytics features