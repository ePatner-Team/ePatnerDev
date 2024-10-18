import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAuditLogs, 
  fetchLedgerEntries, 
  submitAuditFindings, 
  fetchAuditReports, 
  initiateAudit, 
  closeAudit,
  fetchAuditSummary,
  updateAuditStatus,
  fetchAuditDiscrepancies,
  resolveAuditDiscrepancy,
  exportAuditReport
} from '../../actions/auditActions';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  DatePicker, 
  Select, 
  message 
} from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AuditFeature = () => {
  const dispatch = useDispatch();
  const { 
    auditLogs, 
    ledgerEntries, 
    auditReports, 
    currentAudit, 
    auditSummary, 
    discrepancies,
    loading, 
    error 
  } = useSelector(state => state.audit);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchAuditReports());
  }, [dispatch]);

  const showModal = (type) => {
    setModalType(type);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      switch (modalType) {
        case 'initiate':
          dispatch(initiateAudit(values));
          break;
        case 'findings':
          dispatch(submitAuditFindings(values));
          break;
        default:
          break;
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFetchAuditLogs = (dates) => {
    const [startDate, endDate] = dates;
    dispatch(fetchAuditLogs(startDate, endDate));
  };

  const handleFetchLedgerEntries = (dates) => {
    const [startDate, endDate] = dates;
    dispatch(fetchLedgerEntries(startDate, endDate));
  };

  const handleCloseAudit = (auditId) => {
    dispatch(closeAudit(auditId));
  };

  const handleUpdateAuditStatus = (auditId, status) => {
    dispatch(updateAuditStatus(auditId, status));
  };

  const handleResolveDiscrepancy = (discrepancyId, resolution) => {
    dispatch(resolveAuditDiscrepancy(discrepancyId, resolution));
  };

  const handleExportReport = (auditId, format) => {
    dispatch(exportAuditReport(auditId, format));
  };

  const columns = [
    {
      title: 'Audit ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <span>
            <Button onClick={() => dispatch(fetchAuditSummary(record.id))}>
              View Summary
            </Button>
            <Button onClick={() => handleCloseAudit(record.id)}>
              Close Audit
            </Button>
            <Button onClick={() => handleUpdateAuditStatus(record.id, 'IN_PROGRESS')}>
              Update Status
            </Button>
          </span>
        ),
      },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal('initiate')}>
        Initiate Audit
      </Button>
      <Modal
        title={modalType === 'initiate' ? 'Initiate Audit' : 'Submit Findings'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          {modalType === 'initiate' ? (
            <Form.Item label="Start Date" name="startDate">
              <DatePicker />
            </Form.Item>
          ) : (
            <Form.Item label="Findings" name="findings">
              <Input.TextArea />
            </Form.Item>
          )}
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={auditReports}
        loading={loading}
        rowKey="id"
      />
      <Button onClick={() => dispatch(fetchAuditDiscrepancies())}>
        Fetch Discrepancies
      </Button>
      <Table
        columns={[
          {
            title: 'Discrepancy ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
              <span>
                <Button onClick={() => handleResolveDiscrepancy(record.id, 'RESOLVED')}>
                  Resolve
                </Button>
              </span>
            ),
          },
        ]}
        dataSource={discrepancies}
        loading={loading}
        rowKey="id"
      />
      <Button onClick={() => dispatch(exportAuditReport(currentAudit.id, 'PDF'))}>
        Export Report
      </Button>
    </div>
  );
};

export default AuditFeature;