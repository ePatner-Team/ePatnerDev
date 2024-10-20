import {
    FETCH_CUSTOMERS_SUCCESS,
    FETCH_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_SUCCESS,
    FETCH_PURCHASE_HISTORY_SUCCESS,
    FETCH_CUSTOMER_LEDGER_SUCCESS,
    FETCH_LOYALTY_PROGRAMS_SUCCESS,
    CREATE_LOYALTY_PROGRAM_SUCCESS,
    UPDATE_LOYALTY_PROGRAM_SUCCESS,
    DELETE_LOYALTY_PROGRAM_SUCCESS,
    FETCH_DISCOUNTS_SUCCESS,
    CREATE_DISCOUNT_SUCCESS,
    UPDATE_DISCOUNT_SUCCESS,
    DELETE_DISCOUNT_SUCCESS,
    FETCH_REWARDS_SUCCESS,
    CREATE_REWARD_SUCCESS,
    UPDATE_REWARD_SUCCESS,
    DELETE_REWARD_SUCCESS
  } from '../actions/customerRelationshipActions';
  
  const initialState = {
    customers: [],
    selectedCustomer: null,
    purchaseHistories: {},
    customerLedgers: {},
    loyaltyPrograms: [],
    discounts: [],
    rewards: [],
    loading: false,
    error: null
  };
  
  const customerRelationshipReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CUSTOMERS_SUCCESS:
        return {
          ...state,
          customers: action.payload,
          loading: false
        };
  
      case FETCH_CUSTOMER_SUCCESS:
        return {
          ...state,
          selectedCustomer: action.payload,
          loading: false
        };
  
      case CREATE_CUSTOMER_SUCCESS:
        return {
          ...state,
          customers: [...state.customers, action.payload],
          loading: false
        };
  
      case UPDATE_CUSTOMER_SUCCESS:
        return {
          ...state,
          customers: state.customers.map(customer =>
            customer.id === action.payload.id ? action.payload : customer
          ),
          selectedCustomer: action.payload,
          loading: false
        };
  
      case DELETE_CUSTOMER_SUCCESS:
        return {
          ...state,
          customers: state.customers.filter(customer => customer.id !== action.payload),
          selectedCustomer: null,
          loading: false
        };
  
      case FETCH_PURCHASE_HISTORY_SUCCESS:
        return {
          ...state,
          purchaseHistories: {
            ...state.purchaseHistories,
            [action.payload.customerId]: action.payload.history
          },
          loading: false
        };
  
      case FETCH_CUSTOMER_LEDGER_SUCCESS:
        return {
          ...state,
          customerLedgers: {
            ...state.customerLedgers,
            [action.payload.customerId]: action.payload.ledger
          },
          loading: false
        };
  
      case FETCH_LOYALTY_PROGRAMS_SUCCESS:
        return {
          ...state,
          loyaltyPrograms: action.payload,
          loading: false
        };
  
      case CREATE_LOYALTY_PROGRAM_SUCCESS:
        return {
          ...state,
          loyaltyPrograms: [...state.loyaltyPrograms, action.payload],
          loading: false
        };
  
      case UPDATE_LOYALTY_PROGRAM_SUCCESS:
        return {
          ...state,
          loyaltyPrograms: state.loyaltyPrograms.map(program =>
            program.id === action.payload.id ? action.payload : program
          ),
          loading: false
        };
  
      case DELETE_LOYALTY_PROGRAM_SUCCESS:
        return {
          ...state,
          loyaltyPrograms: state.loyaltyPrograms.filter(program => program.id !== action.payload),
          loading: false
        };
  
      case FETCH_DISCOUNTS_SUCCESS:
        return {
          ...state,
          discounts: action.payload,
          loading: false
        };
  
      case CREATE_DISCOUNT_SUCCESS:
        return {
          ...state,
          discounts: [...state.discounts, action.payload],
          loading: false
        };
  
      case UPDATE_DISCOUNT_SUCCESS:
        return {
          ...state,
          discounts: state.discounts.map(discount =>
            discount.id === action.payload.id ? action.payload : discount
          ),
          loading: false
        };
  
      case DELETE_DISCOUNT_SUCCESS:
        return {
          ...state,
          discounts: state.discounts.filter(discount => discount.id !== action.payload),
          loading: false
        };
  
      case FETCH_REWARDS_SUCCESS:
        return {
          ...state,
          rewards: action.payload,
          loading: false
        };
  
      case CREATE_REWARD_SUCCESS:
        return {
          ...state,
          rewards: [...state.rewards, action.payload],
          loading: false
        };
  
      case UPDATE_REWARD_SUCCESS:
        return {
          ...state,
          rewards: state.rewards.map(reward =>
            reward.id === action.payload.id ? action.payload : reward
          ),
          loading: false
        };
  
      case DELETE_REWARD_SUCCESS:
        return {
          ...state,
          rewards: state.rewards.filter(reward => reward.id !== action.payload),
          loading: false
        };
  
      default:
        return state;
    }
  };
  
  export default customerRelationshipReducer;