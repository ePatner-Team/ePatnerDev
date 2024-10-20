import { message } from 'antd';
import accountingAndFinanceAPI from '../api/accountingAndFinanceAPI';

// Action Types
export const FETCH_GENERAL_LEDGER_SUCCESS = 'FETCH_GENERAL_LEDGER_SUCCESS';
export const POST_JOURNAL_ENTRY_SUCCESS = 'POST_JOURNAL_ENTRY_SUCCESS';
export const FETCH_ACCOUNTS_RECEIVABLE_SUCCESS = 'FETCH_ACCOUNTS_RECEIVABLE_SUCCESS';
export const RECORD_PAYMENT_RECEIVED_SUCCESS = 'RECORD_PAYMENT_RECEIVED_SUCCESS';
export const FETCH_ACCOUNTS_PAYABLE_SUCCESS = 'FETCH_ACCOUNTS_PAYABLE_SUCCESS';
export const RECORD_PAYMENT_MADE_SUCCESS = 'RECORD_PAYMENT_MADE_SUCCESS';
export const GENERATE_INCOME_STATEMENT_SUCCESS = 'GENERATE_INCOME_STATEMENT_SUCCESS';
export const GENERATE_BALANCE_SHEET_SUCCESS = 'GENERATE_BALANCE_SHEET_SUCCESS';
export const GENERATE_CASH_FLOW_STATEMENT_SUCCESS = 'GENERATE_CASH_FLOW_STATEMENT_SUCCESS';
export const FETCH_BUDGET_SUCCESS = 'FETCH_BUDGET_SUCCESS';
export const CREATE_BUDGET_SUCCESS = 'CREATE_BUDGET_SUCCESS';
export const CALCULATE_TAX_LIABILITY_SUCCESS = 'CALCULATE_TAX_LIABILITY_SUCCESS';
export const SUBMIT_TAX_RETURN_SUCCESS = 'SUBMIT_TAX_RETURN_SUCCESS';

// Action Creators

// General Ledger
export const fetchGeneralLedger = (startDate, endDate) => async (dispatch) => {
  try {
    const generalLedger = await accountingAndFinanceAPI.fetchGeneralLedger(startDate, endDate);
    dispatch({ type: FETCH_GENERAL_LEDGER_SUCCESS, payload: generalLedger });
  } catch (error) {
    message.error('Failed to fetch general ledger');
  }
};

export const postJournalEntry = (entryData) => async (dispatch) => {
  try {
    const journalEntry = await accountingAndFinanceAPI.postJournalEntry(entryData);
    dispatch({ type: POST_JOURNAL_ENTRY_SUCCESS, payload: journalEntry });
    message.success('Journal entry posted successfully');
  } catch (error) {
    message.error('Failed to post journal entry');
  }
};

// Accounts Receivable
export const fetchAccountsReceivable = () => async (dispatch) => {
  try {
    const accountsReceivable = await accountingAndFinanceAPI.fetchAccountsReceivable();
    dispatch({ type: FETCH_ACCOUNTS_RECEIVABLE_SUCCESS, payload: accountsReceivable });
  } catch (error) {
    message.error('Failed to fetch accounts receivable');
  }
};

export const recordPaymentReceived = (paymentData) => async (dispatch) => {
  try {
    const payment = await accountingAndFinanceAPI.recordPaymentReceived(paymentData);
    dispatch({ type: RECORD_PAYMENT_RECEIVED_SUCCESS, payload: payment });
    message.success('Payment received recorded successfully');
  } catch (error) {
    message.error('Failed to record payment received');
  }
};

// Accounts Payable
export const fetchAccountsPayable = () => async (dispatch) => {
  try {
    const accountsPayable = await accountingAndFinanceAPI.fetchAccountsPayable();
    dispatch({ type: FETCH_ACCOUNTS_PAYABLE_SUCCESS, payload: accountsPayable });
  } catch (error) {
    message.error('Failed to fetch accounts payable');
  }
};

export const recordPaymentMade = (paymentData) => async (dispatch) => {
  try {
    const payment = await accountingAndFinanceAPI.recordPaymentMade(paymentData);
    dispatch({ type: RECORD_PAYMENT_MADE_SUCCESS, payload: payment });
    message .success('Payment made recorded successfully');
  } catch (error) {
    message.error('Failed to record payment made');
  }
};

// Financial Statements
export const generateIncomeStatement = (startDate, endDate) => async (dispatch) => {
  try {
    const incomeStatement = await accountingAndFinanceAPI.generateIncomeStatement(startDate, endDate);
    dispatch({ type: GENERATE_INCOME_STATEMENT_SUCCESS, payload: incomeStatement });
  } catch (error) {
    message.error('Failed to generate income statement');
  }
};

export const generateBalanceSheet = (date) => async (dispatch) => {
  try {
    const balanceSheet = await accountingAndFinanceAPI.generateBalanceSheet(date);
    dispatch({ type: GENERATE_BALANCE_SHEET_SUCCESS, payload: balanceSheet });
  } catch (error) {
    message.error('Failed to generate balance sheet');
  }
};

export const generateCashFlowStatement = (startDate, endDate) => async (dispatch) => {
  try {
    const cashFlowStatement = await accountingAndFinanceAPI.generateCashFlowStatement(startDate, endDate);
    dispatch({ type: GENERATE_CASH_FLOW_STATEMENT_SUCCESS, payload: cashFlowStatement });
  } catch (error) {
    message.error('Failed to generate cash flow statement');
  }
};

// Budgeting
export const fetchBudget = (year) => async (dispatch) => {
  try {
    const budget = await accountingAndFinanceAPI.fetchBudget(year);
    dispatch({ type: FETCH_BUDGET_SUCCESS, payload: budget });
  } catch (error) {
    message.error('Failed to fetch budget');
  }
};

export const createBudget = (budgetData) => async (dispatch) => {
  try {
    const budget = await accountingAndFinanceAPI.createBudget(budgetData);
    dispatch({ type: CREATE_BUDGET_SUCCESS, payload: budget });
    message.success('Budget created successfully');
  } catch (error) {
    message.error('Failed to create budget');
  }
};

// Tax Management
export const calculateTaxLiability = (year) => async (dispatch) => {
  try {
    const taxLiability = await accountingAndFinanceAPI.calculateTaxLiability(year);
    dispatch({ type: CALCULATE_TAX_LIABILITY_SUCCESS, payload: taxLiability });
  } catch (error) {
    message.error('Failed to calculate tax liability');
  }
};

export const submitTaxReturn = (taxReturnData) => async (dispatch) => {
  try {
    const taxReturn = await accountingAndFinanceAPI.submitTaxReturn(taxReturnData);
    dispatch({ type: SUBMIT_TAX_RETURN_SUCCESS, payload: taxReturn });
    message.success('Tax return submitted successfully');
  } catch (error) {
    message.error('Failed to submit tax return');
  }
};