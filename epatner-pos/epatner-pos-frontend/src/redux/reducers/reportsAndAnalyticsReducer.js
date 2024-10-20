import {
    FETCH_SALES_REPORT_SUCCESS,
    FETCH_INVENTORY_REPORT_SUCCESS,
    FETCH_DASHBOARD_METRICS_SUCCESS,
    GENERATE_CUSTOM_REPORT_SUCCESS,
    FETCH_TOP_SELLING_PRODUCTS_SUCCESS,
    FETCH_REVENUE_BY_CATEGORY_SUCCESS,
    FETCH_CUSTOMER_ACQUISITION_REPORT_SUCCESS,
    FETCH_PROFIT_MARGIN_REPORT_SUCCESS
  } from '../actions/reportsAndAnalyticsActions';
  
  const initialState = {
    salesReport: null,
    inventoryReport: null,
    dashboardMetrics: null,
    customReport: null,
    topSellingProducts: null,
    revenueByCategory: null,
    customerAcquisitionReport: null,
    profitMarginReport: null,
    loading: false,
    error: null
  };
  
  const reportsAndAnalyticsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SALES_REPORT_SUCCESS:
        return {
          ...state,
          salesReport: action.payload,
          loading: false
        };
  
      case FETCH_INVENTORY_REPORT_SUCCESS:
        return {
          ...state,
          inventoryReport: action.payload,
          loading: false
        };
  
      case FETCH_DASHBOARD_METRICS_SUCCESS:
        return {
          ...state,
          dashboardMetrics: action.payload,
          loading: false
        };
  
      case GENERATE_CUSTOM_REPORT_SUCCESS:
        return {
          ...state,
          customReport: action.payload,
          loading: false
        };
  
      case FETCH_TOP_SELLING_PRODUCTS_SUCCESS:
        return {
          ...state,
          topSellingProducts: action.payload,
          loading: false
        };
  
      case FETCH_REVENUE_BY_CATEGORY_SUCCESS:
        return {
          ...state,
          revenueByCategory: action.payload,
          loading: false
        };
  
      case FETCH_CUSTOMER_ACQUISITION_REPORT_SUCCESS:
        return {
          ...state,
          customerAcquisitionReport: action.payload,
          loading: false
        };
  
      case FETCH_PROFIT_MARGIN_REPORT_SUCCESS:
        return {
          ...state,
          profitMarginReport: action.payload,
          loading: false
        };
  
      default:
        return state;
    }
  };
  
  export default reportsAndAnalyticsReducer;