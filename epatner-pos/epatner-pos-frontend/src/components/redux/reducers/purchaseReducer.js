import {
    FETCH_VENDORS_SUCCESS,
    ADD_VENDOR_SUCCESS,
    UPDATE_VENDOR_SUCCESS,
    FETCH_PURCHASE_ORDERS_SUCCESS,
    CREATE_PURCHASE_ORDER_SUCCESS,
    UPDATE_PURCHASE_ORDER_SUCCESS,
    RECEIVE_GOODS_SUCCESS,
    MATCH_INVOICE_SUCCESS,
    SCHEDULE_PAYMENT_SUCCESS,
    TRACK_PAYMENT_SUCCESS,
    FETCH_PAYMENTS_SUCCESS
  } from '../actions/purchaseActions';
  
  const initialState = {
    vendors: [],
    purchaseOrders: [],
    goodsReceipts: [],
    invoices: [],
    payments: [],
    loading: false,
    error: null
  };
  
  const purchaseReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_VENDORS_SUCCESS:
        return {
          ...state,
          vendors: action.payload,
          loading: false
        };
  
      case ADD_VENDOR_SUCCESS:
        return {
          ...state,
          vendors: [...state.vendors, action.payload],
          loading: false
        };
  
      case UPDATE_VENDOR_SUCCESS:
        return {
          ...state,
          vendors: state.vendors.map(vendor =>
            vendor.id === action.payload.id ? action.payload : vendor
          ),
          loading: false
        };
  
      case FETCH_PURCHASE_ORDERS_SUCCESS:
        return {
          ...state,
          purchaseOrders: action.payload,
          loading: false
        };
  
      case CREATE_PURCHASE_ORDER_SUCCESS:
        return {
          ...state,
          purchaseOrders: [...state.purchaseOrders, action.payload],
          loading: false
        };
  
      case UPDATE_PURCHASE_ORDER_SUCCESS:
        return {
          ...state,
          purchaseOrders: state.purchaseOrders.map(order =>
            order.id === action.payload.id ? action.payload : order
          ),
          loading: false
        };
  
      case RECEIVE_GOODS_SUCCESS:
        return {
          ...state,
          goodsReceipts: [...state.goodsReceipts, action.payload],
          loading: false
        };
  
      case MATCH_INVOICE_SUCCESS:
        return {
          ...state,
          invoices: [...state.invoices, action.payload],
          loading: false
        };
  
      case SCHEDULE_PAYMENT_SUCCESS:
        return {
          ...state,
          payments: [...state.payments, action.payload],
          loading: false
        };
  
      case TRACK_PAYMENT_SUCCESS:
        return {
          ...state,
          payments: state.payments.map(payment =>
            payment.id === action.payload.id ? action.payload : payment
          ),
          loading: false
        };
  
      case FETCH_PAYMENTS_SUCCESS:
        return {
          ...state,
          payments: action.payload,
          loading: false
        };
  
      default:
        return state;
    }
  };
  
  export default purchaseReducer;