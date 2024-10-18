import auditAPI from '../api/auditAPI';
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
  CLOSE_AUDIT_FAILURE
} from './types';

// Fetch Audit Logs
export const fetchAuditLogs = (startDate, endDate, userRole) => async (dispatch) => {
  dispatch({ type: FETCH_AUDIT_LOGS_REQUEST });
  try {
    const logs = await auditAPI.fetchAuditLogs(startDate, endDate, userRole);
    dispatch({ type: FETCH_AUDIT_LOGS_SUCCESS, payload: logs });
  } catch (error) {
    dispatch({ type: FETCH_AUDIT_LOGS_FAILURE, payload: error.message });
  }
};

// Fetch Ledger Entries
export const fetchLedgerEntries = (startDate, endDate, userRole) => async (dispatch) => {
  dispatch({ type: FETCH_LEDGER_ENTRIES_REQUEST });
  try {
    const entries = await auditAPI.fetchLedgerEntries(startDate, endDate, userRole);
    dispatch({ type: FETCH_LEDGER_ENTRIES_SUCCESS, payload: entries });
  } catch (error) {
    dispatch({ type: FETCH_LEDGER_ENTRIES_FAILURE, payload: error.message });
  }
};

// Submit Audit Findings
export const submitAuditFindings = (findings) => async (dispatch) => {
  dispatch({ type: SUBMIT_AUDIT_FINDINGS_REQUEST });
  try {
    const response = await auditAPI.submitAuditFindings(findings);
    dispatch({ type: SUBMIT_AUDIT_FINDINGS_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: SUBMIT_AUDIT_FINDINGS_FAILURE, payload: error.message });
  }
};

// Fetch Audit Reports
export const fetchAuditReports = (userRole) => async (dispatch) => {
  dispatch({ type: FETCH_AUDIT_REPORTS_REQUEST });
  try {
    const reports = await auditAPI.fetchAuditReports(userRole);
    dispatch({ type: FETCH_AUDIT_REPORTS_SUCCESS, payload: reports });
  } catch (error) {
    dispatch({ type: FETCH_AUDIT_REPORTS_FAILURE, payload: error.message });
  }
};

// Initiate Audit
export const initiateAudit = (auditData) => async (dispatch) => {
  dispatch({ type: INITIATE_AUDIT_REQUEST });
  try {
    const response = await auditAPI.initiateAudit(auditData);
    dispatch({ type: INITIATE_AUDIT_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: INITIATE_AUDIT_FAILURE, payload: error.message });
  }
};

// Close Audit
export const closeAudit = (auditId) => async (dispatch) => {
    dispatch({ type: CLOSE_AUDIT_REQUEST });
    try {
      const response = await auditAPI.closeAudit(auditId);
      dispatch({ type: CLOSE_AUDIT_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: CLOSE_AUDIT_FAILURE, payload: error.message });
    }
  };
  
  // Helper function to handle errors
  const handleError = (error) => {
    console.error('Audit action error:', error);
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  };
  
  // Fetch Audit Summary
  export const fetchAuditSummary = (auditId) => async (dispatch) => {
    dispatch({ type: FETCH_AUDIT_SUMMARY_REQUEST });
    try {
      const summary = await auditAPI.fetchAuditSummary(auditId);
      dispatch({ type: FETCH_AUDIT_SUMMARY_SUCCESS, payload: summary });
    } catch (error) {
      dispatch({ type: FETCH_AUDIT_SUMMARY_FAILURE, payload: handleError(error) });
    }
  };
  
  // Update Audit Status
  export const updateAuditStatus = (auditId, status) => async (dispatch) => {
    dispatch({ type: UPDATE_AUDIT_STATUS_REQUEST });
    try {
      const response = await auditAPI.updateAuditStatus(auditId, status);
      dispatch({ type: UPDATE_AUDIT_STATUS_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: UPDATE_AUDIT_STATUS_FAILURE, payload: handleError(error) });
    }
  };
  
  // Fetch Audit Discrepancies
  export const fetchAuditDiscrepancies = (auditId) => async (dispatch) => {
    dispatch({ type: FETCH_AUDIT_DISCREPANCIES_REQUEST });
    try {
      const discrepancies = await auditAPI.fetchAuditDiscrepancies(auditId);
      dispatch({ type: FETCH_AUDIT_DISCREPANCIES_SUCCESS, payload: discrepancies });
    } catch (error) {
      dispatch({ type: FETCH_AUDIT_DISCREPANCIES_FAILURE, payload: handleError(error) });
    }
  };
  
  // Resolve Audit Discrepancy
  export const resolveAuditDiscrepancy = (discrepancyId, resolution) => async (dispatch) => {
    dispatch({ type: RESOLVE_AUDIT_DISCREPANCY_REQUEST });
    try {
      const response = await auditAPI.resolveAuditDiscrepancy(discrepancyId, resolution);
      dispatch({ type: RESOLVE_AUDIT_DISCREPANCY_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: RESOLVE_AUDIT_DISCREPANCY_FAILURE, payload: handleError(error) });
    }
  };
  
  // Export Audit Report
  export const exportAuditReport = (auditId, format) => async (dispatch) => {
    dispatch({ type: EXPORT_AUDIT_REPORT_REQUEST });
    try {
      const report = await auditAPI.exportAuditReport(auditId, format);
      dispatch({ type: EXPORT_AUDIT_REPORT_SUCCESS, payload: report });
    } catch (error) {
      dispatch({ type: EXPORT_AUDIT_REPORT_FAILURE, payload: handleError(error) });
    }
  };