import {
    CONNECT_BANK_ACCOUNT_SUCCESS,
    CONNECT_BANK_ACCOUNT_FAILURE,
    FETCH_CONNECTED_ACCOUNTS_SUCCESS,
    FETCH_CONNECTED_ACCOUNTS_FAILURE,
    FETCH_ACCOUNT_BALANCE_SUCCESS,
    FETCH_ACCOUNT_BALANCE_FAILURE,
    FETCH_ALL_ACCOUNT_BALANCES_SUCCESS,
    FETCH_ALL_ACCOUNT_BALANCES_FAILURE,
    GENERATE_PAYMENT_SLIP_SUCCESS,
    GENERATE_PAYMENT_SLIP_FAILURE,
    GENERATE_DEPOSIT_SLIP_SUCCESS,
    GENERATE_DEPOSIT_SLIP_FAILURE,
    DISCONNECT_BANK_ACCOUNT_SUCCESS,
    DISCONNECT_BANK_ACCOUNT_FAILURE,
    FETCH_TRANSACTION_HISTORY_SUCCESS,
    FETCH_TRANSACTION_HISTORY_FAILURE
  } from '../actions/types';
  
  const initialState = {
    connectedAccounts: [],
    accountBalances: {},
    transactionHistory: {},
    paymentSlip: null,
    depositSlip: null,
    loading: false,
    error: null
  };
  
  const bankAccountReducer = (state = initialState, action) => {
    switch (action.type) {
      case CONNECT_BANK_ACCOUNT_SUCCESS:
        return {
          ...state,
          connectedAccounts: [...state.connectedAccounts, action.payload],
          loading: false,
          error: null
        };
  
      case FETCH_CONNECTED_ACCOUNTS_SUCCESS:
        return {
          ...state,
          connectedAccounts: action.payload,
          loading: false,
          error: null
        };
  
      case FETCH_ACCOUNT_BALANCE_SUCCESS:
        return {
          ...state,
          accountBalances: {
            ...state.accountBalances,
            [action.payload.accountId]: action.payload.balance
          },
          loading: false,
          error: null
        };
  
      case FETCH_ALL_ACCOUNT_BALANCES_SUCCESS:
        return {
          ...state,
          accountBalances: action.payload,
          loading: false,
          error: null
        };
  
      case GENERATE_PAYMENT_SLIP_SUCCESS:
        return {
          ...state,
          paymentSlip: action.payload,
          loading: false,
          error: null
        };
  
      case GENERATE_DEPOSIT_SLIP_SUCCESS:
        return {
          ...state,
          depositSlip: action.payload,
          loading: false,
          error: null
        };
  
      case DISCONNECT_BANK_ACCOUNT_SUCCESS:
        return {
          ...state,
          connectedAccounts: state.connectedAccounts.filter(
            account => account.id !== action.payload.id
          ),
          loading: false,
          error: null
        };
  
      case FETCH_TRANSACTION_HISTORY_SUCCESS:
        return {
          ...state,
          transactionHistory: {
            ...state.transactionHistory,
            [action.payload.accountId]: action.payload.transactions
          },
          loading: false,
          error: null
        };
  
      case CONNECT_BANK_ACCOUNT_FAILURE:
      case FETCH_CONNECTED_ACCOUNTS_FAILURE:
      case FETCH_ACCOUNT_BALANCE_FAILURE:
      case FETCH_ALL_ACCOUNT_BALANCES_FAILURE:
      case GENERATE_PAYMENT_SLIP_FAILURE:
      case GENERATE_DEPOSIT_SLIP_FAILURE:
      case DISCONNECT_BANK_ACCOUNT_FAILURE:
      case FETCH_TRANSACTION_HISTORY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default bankAccountReducer;