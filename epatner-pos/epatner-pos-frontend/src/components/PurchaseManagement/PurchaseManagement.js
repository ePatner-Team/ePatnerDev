import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Input, Select, message, Tabs } from 'antd';
import {
  fetchVendors,
  addVendor,
  updateVendor,
  fetchPurchaseOrders,
  createPurchaseOrder,
  receiveGoods,
  matchInvoice,
  schedulePayment,
  trackPayment,
  fetchPayments
} from '../../actions/purchaseActions';

const { TabPane } = Tabs;
const { Option } = Select;

const PurchaseManagement = () => {
  const dispatch = useDispatch();
  const { vendors, purchaseOrders, payments } = useSelector(state => state.purchase);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchVendors());
    dispatch(fetchPurchaseOrders());
    dispatch(fetchPayments());
  }, [dispatch]);

  const showModal = (type) => {
    setModalType(type);
    setModalVisible(true);
    form.resetFields();
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      switch (modalType) {
        case 'addVendor':
          dispatch(addVendor(values));
          break;
        case 'createPurchaseOrder':
          dispatch(createPurchaseOrder(values));
          break;
        case 'receiveGoods':
          dispatch(receiveGoods(values));
          break;
        case 'matchInvoice':
          dispatch(matchInvoice(values));
          break;
        case 'schedulePayment':
          dispatch(schedulePayment(values));
          break;
        default:
          break;
      }
      setModalVisible(false);
    });
  };

  const vendorColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Contact', dataIndex: 'contact', key: 'contact' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleUpdateVendor(record)}>Update</Button>
      ),
    },
  ];

  const purchaseOrderColumns = [
    { title: 'PO Number', dataIndex: 'poNumber', key: 'poNumber' },
    { title: 'Vendor', dataIndex: 'vendorName', key: 'vendorName' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button onClick={() => handleReceiveGoods(record)}>Receive Goods</Button>
          <Button onClick={() => handleMatchInvoice(record)}>Match Invoice</Button>
        </>
      ),
    },
  ];

  const paymentColumns = [
    { title: 'Payment ID', dataIndex: 'paymentId', key: 'paymentId' },
    { title: 'PO Number', dataIndex: 'poNumber', key: 'poNumber' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
    { title: 'Status', dataIndex: 'status ', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleSchedulePayment(record)}>Schedule Payment</Button>
      ),
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Vendors" key="1">
          <Button type="primary" onClick={() => showModal('addVendor')}>
            Add Vendor
          </Button>
          <Modal
            title="Add Vendor"
            visible={modalVisible && modalType === 'addVendor'}
            onOk={handleModalOk}
            onCancel={() => setModalVisible(false)}
          >
            <Form form={form} layout="vertical">
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Contact" name="contact">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
            </Form>
          </Modal>
          <Table columns={vendorColumns} dataSource={vendors} />
        </TabPane>
        <TabPane tab="Purchase Orders" key="2">
          <Button type="primary" onClick={() => showModal('createPurchaseOrder')}>
            Create Purchase Order
          </Button>
          <Modal
            title="Create Purchase Order"
            visible={modalVisible && modalType === 'createPurchaseOrder'}
            onOk={handleModalOk}
            onCancel={() => setModalVisible(false)}
          >
            <Form form={form} layout="vertical">
              <Form.Item label="PO Number" name="poNumber">
                <Input />
              </Form.Item>
              <Form.Item label="Vendor" name="vendorId">
                <Select>
                  {vendors.map(vendor => (
                    <Option value={vendor.id}>{vendor.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Date" name="date">
                <Input />
              </Form.Item>
              <Form.Item label="Total Amount" name="totalAmount">
                <Input />
              </Form.Item>
            </Form>
          </Modal>
          <Table columns={purchaseOrderColumns} dataSource={purchaseOrders} />
        </TabPane>
        <TabPane tab="Payments" key="3">
          <Table columns={paymentColumns} dataSource={payments} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PurchaseManagement;