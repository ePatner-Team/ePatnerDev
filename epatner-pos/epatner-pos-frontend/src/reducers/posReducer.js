import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    PROCESS_TRANSACTION_REQUEST,
    PROCESS_TRANSACTION_SUCCESS,
    PROCESS_TRANSACTION_FAILURE,
    GENERATE_INVOICE,
    SYNC_OFFLINE_TRANSACTIONS,
  } from '../actions/posActions';
  
  const initialState = {
    products: [],
    cart: [],
    loading: false,
    error: null,
    currentTransaction: null,
    invoice: null,
    offlineTransactions: [],
  };
  
  const posReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          loading: false,
          products: action.payload,
        };
      case FETCH_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case ADD_TO_CART:
        const existingItem = state.cart.find(item => item.id === action.payload.id);
        if (existingItem) {
          return {
            ...state,
            cart: state.cart.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        } else {
          return {
            ...state,
            cart: [...state.cart, { ...action.payload, quantity: 1 }],
          };
        }
      case REMOVE_FROM_CART:
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload),
        };
      case PROCESS_TRANSACTION_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case PROCESS_TRANSACTION_SUCCESS:
        return {
          ...state,
          loading: false,
          currentTransaction: action.payload,
          cart: [], // Clear the cart after successful transaction
        };
      case PROCESS_TRANSACTION_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case GENERATE_INVOICE:
        return {
          ...state,
          invoice: action.payload,
        };
      case SYNC_OFFLINE_TRANSACTIONS:
        return {
          ...state,
          offlineTransactions: [],
        };
      default:
        return state;
    }
  };
  
  export default posReducer;