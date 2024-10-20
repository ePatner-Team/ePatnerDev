import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    FETCH_CATEGORIES_SUCCESS,
    ADD_CATEGORY_SUCCESS,
    UPDATE_STOCK_SUCCESS,
    FETCH_PURCHASE_ORDERS_SUCCESS,
    CREATE_PURCHASE_ORDER_SUCCESS,
    FETCH_SUPPLIERS_SUCCESS,
    ADD_SUPPLIER_SUCCESS,
    FETCH_LOW_STOCK_ALERTS_SUCCESS,
    CREATE_BATCH_SUCCESS,
    FETCH_BATCHES_SUCCESS,
    UPDATE_EXPIRY_SUCCESS,
    FETCH_WAREHOUSES_SUCCESS,
    ADD_WAREHOUSE_SUCCESS
  } from '../actions/inventoryActions';
  
  const initialState = {
    products: [],
    categories: [],
    suppliers: [],
    purchaseOrders: [],
    lowStockAlerts: [],
    batches: [],
    warehouses: [],
    loading: false,
    error: null
  };
  
  const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          products: action.payload,
          loading: false,
          error: null
        };
  
      case FETCH_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      case ADD_PRODUCT_SUCCESS:
        return {
          ...state,
          products: [...state.products, action.payload],
          loading: false
        };
  
      case UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          products: state.products.map(product =>
            product.id === action.payload.id ? action.payload : product
          ),
          loading: false
        };
  
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          products: state.products.filter(product => product.id !== action.payload),
          loading: false
        };
  
      case FETCH_CATEGORIES_SUCCESS:
        return {
          ...state,
          categories: action.payload,
          loading: false
        };
  
      case ADD_CATEGORY_SUCCESS:
        return {
          ...state,
          categories: [...state.categories, action.payload],
          loading: false
        };
  
      case UPDATE_STOCK_SUCCESS:
        return {
          ...state,
          products: state.products.map(product =>
            product.id === action.payload.productId
              ? { ...product, stock: product.stock + action.payload.quantity }
              : product
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
  
      case FETCH_SUPPLIERS_SUCCESS:
        return {
          ...state,
          suppliers: action.payload,
          loading: false
        };
  
      case ADD_SUPPLIER_SUCCESS:
        return {
          ...state,
          suppliers: [...state.suppliers, action.payload],
          loading: false
        };
  
      case FETCH_LOW_STOCK_ALERTS_SUCCESS:
        return {
          ...state,
          lowStockAlerts: action.payload,
          loading: false
        };
  
      case CREATE_BATCH_SUCCESS:
        return {
          ...state,
          batches: [...state.batches, action.payload],
          loading: false
        };
  
      case FETCH_BATCHES_SUCCESS:
        return {
          ...state,
          batches: action.payload,
          loading: false
        };
  
      case UPDATE_EXPIRY_SUCCESS:
        return {
          ...state,
          batches: state.batches.map(batch =>
            batch.id === action.payload.batchId
              ? { ...batch, expiryDate: action.payload.expiryDate }
              : batch
          ),
          loading: false
        };
  
      case FETCH_WAREHOUSES_SUCCESS:
        return {
          ...state,
          warehouses: action.payload,
          loading: false
        };
  
      case ADD_WAREHOUSE_SUCCESS:
        return {
          ...state,
          warehouses: [...state.warehouses, action.payload],
          loading: false
        };
  
      default:
        return state;
    }
  };
  
  export default inventoryReducer;