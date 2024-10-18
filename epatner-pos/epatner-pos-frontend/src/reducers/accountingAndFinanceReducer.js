import {
    FETCH_GENERAL_LEDGER_SUCCESS,
    POST_JOURNAL_ENTRY_SUCCESS,
    FETCH_ACCOUNTS_RECEIVABLE_SUCCESS,
    RECORD_PAYMENT_RECEIVED_SUCCESS,
    FETCH_ACCOUNTS_PAYABLE_SUCCESS,
    RECORD_PAYMENT_MADE_SUCCESS,
    GENERATE_INCOME_STATEMENT_SUCCESS,
    GENERATE_BALANCE_SHEET_SUCCESS,
    GENERATE_CASH_FLOW_STATEMENT_SUCCESS,
    FETCH_BUDGET_SUCCESS,
    CREATE_BUDGET_SUCCESS,
    CALCULATE_TAX_LIABILITY_SUCCESS,
    SUBMIT_TAX_RETURN_SUCCESS
  } from '../actions/accountingAndFinanceActions';
  
  const initialState = {
    generalLedger: [],
    journalEntries: [],
    accountsReceivable: [],
    accountsPayable: [],
    incomeStatement: null,
    balanceSheet: null,
    cashFlowStatement: null,
    budget: null,
    taxLiability: null,
    taxReturn: null
  };
  
  const accountingAndFinanceReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_GENERAL_LEDGER_SUCCESS:
        return {
          ...state,
          generalLedger: action.payload
        };
  
      case POST_JOURNAL_ENTRY_SUCCESS:
        return {
          ...state,
          journalEntries: [...state.journalEntries, action.payload]
        };
  
      case FETCH_ACCOUNTS_RECEIVABLE_SUCCESS:
        return {
          ...state,
          accountsReceivable: action.payload
        };
  
      case RECORD_PAYMENT_RECEIVED_SUCCESS:
        return {
          ...state,
          accountsReceivable: state.accountsReceivable.map(account =>
            account.id === action.payload.accountId
              ? { ...account, balance: account.balance - action.payload.amount }
              : account
          )
        };
  
      case FETCH_ACCOUNTS_PAYABLE_SUCCESS:
        return {
          ...state,
          accountsPayable: action.payload
        };
  
      case RECORD_PAYMENT_MADE_SUCCESS:
        return {
          ...state,
          accountsPayable: state.accountsPayable.map(account =>
            account.id === action.payload.accountId
              ? { ...account, balance: account.balance - action.payload.amount }
              : account
          )
        };
  
      case GENERATE_INCOME_STATEMENT_SUCCESS:
        return {
          ...state,
          incomeStatement: action.payload
        };
  
      case GENERATE_BALANCE_SHEET_SUCCESS:
        return {
          ...state,
          balanceSheet: action.payload
        };
  
      case GENERATE_CASH_FLOW_STATEMENT_SUCCESS:
        return {
          ...state,
          cashFlowStatement: action.payload
        };
  
      case FETCH_BUDGET_SUCCESS:
      case CREATE_BUDGET_SUCCESS:
        return {
          ...state,
          budget: action.payload
        };
  
      case CALCULATE_TAX_LIABILITY_SUCCESS:
        return {
          ...state,
          taxLiability: action.payload
        };
  
      case SUBMIT_TAX_RETURN_SUCCESS:
        return {
          ...state,
          taxReturn: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default accountingAndFinanceReducer;