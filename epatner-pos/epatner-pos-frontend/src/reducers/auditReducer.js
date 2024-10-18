import {
    FETCH_AUDIT_LOGS_REQUEST,
    FETCH_AUDIT_LOGS_SUCCESS,
    FETCH_AUDIT_LOGS_FAILURE,
    FETCH_LEDGER_ENTRIES_REQUEST,
    FETCH_LEDGER_ENTRIES_SUCCESS,
    FETCH_LEDGER_ENTRIES_FAILURE,
    SUBMIT_AUDIT_FINDINGS_REQUEST,
    SUBMIT_AUDIT_FINDINGS_SUCCESS,
    SUBMIT_AUDIT_FINDINGS_FAILURE,
    FETCH_AUDIT_REPORTS_REQUEST,
    FETCH_AUDIT_REPORTS_SUCCESS,
    FETCH_AUDIT_REPORTS_FAILURE,
    INITIATE_AUDIT_REQUEST,
    INITIATE_AUDIT_SUCCESS,
    INITIATE_AUDIT_FAILURE,
    CLOSE_AUDIT_REQUEST,
    CLOSE_AUDIT_SUCCESS,
    CLOSE_AUDIT_FAILURE,
    FETCH_AUDIT_SUMMARY_REQUEST,
    FETCH_AUDIT_SUMMARY_SUCCESS,
    FETCH_AUDIT_SUMMARY_FAILURE,
    UPDATE_AUDIT_STATUS_REQUEST,
    UPDATE_AUDIT_STATUS_SUCCESS,
    UPDATE_AUDIT_STATUS_FAILURE,
    FETCH_AUDIT_DISCREPANCIES_REQUEST,
    FETCH_AUDIT_DISCREPANCIES_SUCCESS,
    FETCH_AUDIT_DISCREPANCIES_FAILURE,
    RESOLVE_AUDIT_DISCREPANCY_REQUEST,
    RESOLVE_AUDIT_DISCREPANCY_SUCCESS,
    RESOLVE_AUDIT_DISCREPANCY_FAILURE,
    EXPORT_AUDIT_REPORT_REQUEST,
    EXPORT_AUDIT_REPORT_SUCCESS,
    EXPORT_AUDIT_REPORT_FAILURE
  } from '../actions/types';
  
  const initialState = {
    auditLogs: [],
    ledgerEntries: [],
    auditReports: [],
    currentAudit: null,
    auditSummary: null,
    discrepancies: [],
    loading: false,
    error: null,
    success: false
  };
  
  const auditReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_AUDIT_LOGS_REQUEST:
      case FETCH_LEDGER_ENTRIES_REQUEST:
      case SUBMIT_AUDIT_FINDINGS_REQUEST:
      case FETCH_AUDIT_REPORTS_REQUEST:
      case INITIATE_AUDIT_REQUEST:
      case CLOSE_AUDIT_REQUEST:
      case FETCH_AUDIT_SUMMARY_REQUEST:
      case UPDATE_AUDIT_STATUS_REQUEST:
      case FETCH_AUDIT_DISCREPANCIES_REQUEST:
      case RESOLVE_AUDIT_DISCREPANCY_REQUEST:
      case EXPORT_AUDIT_REPORT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          success: false
        };
  
      case FETCH_AUDIT_LOGS_SUCCESS:
        return {
          ...state,
          auditLogs: action.payload,
          loading: false,
          success: true
        };
  
      case FETCH_LEDGER_ENTRIES_SUCCESS:
        return {
          ...state,
          ledgerEntries: action.payload,
          loading: false,
          success: true
        };
  
      case SUBMIT_AUDIT_FINDINGS_SUCCESS:
        return {
          ...state,
          currentAudit: action.payload,
          loading: false,
          success: true
        };
  
      case FETCH_AUDIT_REPORTS_SUCCESS:
        return {
          ...state,
          auditReports: action.payload,
          loading: false,
          success: true
        };
  
      case INITIATE_AUDIT_SUCCESS:
        return {
          ...state,
          currentAudit: action.payload,
          loading: false,
          success: true
        };
  
      case CLOSE_AUDIT_SUCCESS:
        return {
          ...state,
          currentAudit: action.payload, // Update currentAudit with the closed audit
          loading: false,
          success: true
        };
  
      case FETCH_AUDIT_SUMMARY_SUCCESS:
        return {
          ...state,
          auditSummary: action.payload,
          loading: false,
          success: true
        };
  
      case UPDATE_AUDIT_STATUS_SUCCESS:
        return {
          ...state,
          currentAudit: action.payload, // Update currentAudit with the updated status
          loading: false,
          success: true
        };
  
      case FETCH_AUDIT_DISCREPANCIES_SUCCESS:
        return {
          ...state,
          discrepancies: action.payload,
          loading: false,
          success: true
        };
  
      case RESOLVE_AUDIT_DISCREPANCY_SUCCESS:
        return {
          ...state,
          discrepancies: state.discrepancies.filter((discrepancy) => discrepancy.id !== action.payload.id),
          loading: false,
          success: true
        };
  
      case EXPORT_AUDIT_REPORT_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true
        };
  
      case FETCH_AUDIT_LOGS_FAILURE:
      case FETCH_LEDGER_ENTRIES_FAILURE:
      case SUBMIT_AUDIT_FINDINGS_FAILURE:
      case FETCH_AUDIT_REPORTS_FAILURE:
      case INITIATE_AUDIT_FAILURE:
      case CLOSE_AUDIT_FAILURE:
      case FETCH_AUDIT_SUMMARY_FAILURE:
      case UPDATE_AUDIT_STATUS_FAILURE:
      case FETCH_AUDIT_DISCREPANCIES_FAILURE:
      case RESOLVE_AUDIT_DISCREPANCY_FAILURE:
      case EXPORT_AUDIT_REPORT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          success: false
        };
  
      default:
        return state;
    }
  };
  
  export default auditReducer;