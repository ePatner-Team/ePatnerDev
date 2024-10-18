import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const auditAPI = {
  // Fetch audit logs
  fetchAuditLogs: async (startDate, endDate, userRole) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/audit/logs`, {
        params: { startDate, endDate, userRole },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Fetch ledger entries for auditing
  fetchLedgerEntries: async (startDate, endDate, userRole) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/audit/ledger`, {
        params: { startDate, endDate, userRole },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Submit audit findings
  submitAuditFindings: async (findings) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/audit/findings`, findings, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Fetch audit reports
  fetchAuditReports: async (userRole) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/audit/reports`, {
        params: { userRole },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Initiate a new audit
  initiateAudit: async (auditData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/audit/initiate`, auditData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Close an audit
  closeAudit: async (auditId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/audit/${auditId}/close`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default auditAPI;