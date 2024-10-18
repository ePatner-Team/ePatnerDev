import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Input, Select, message, Tabs } from 'antd';
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  fetchSalesQuotations,
  createSalesQuotation,
  fetchSalesOrders,
  createSalesOrder,
  fetchInvoices,
  createInvoice,
  fetchReturns,
  createReturn,
  updateCreditLimit,
  fetchSalesAnalytics
} from '../actions/salesActions';

const { TabPane } = Tabs;
const { Option } = Select;

const SalesManagement = () => {
  const dispatch = useDispatch();
  const {
    customers,
    salesQuotations,
    salesOrders,
    invoices,
    returns,
    salesAnalytics
  } = useSelector(state => state.sales);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchSalesQuotations());
    dispatch(fetchSalesOrders());
    dispatch(fetchInvoices());
    dispatch(fetchReturns());
    dispatch(fetchSalesAnalytics());
  }, [dispatch]);

  const showModal = (type) => {
    setModalType(type);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    switch (modalType) {
      case 'createCustomer':
        dispatch(createCustomer(values));
        break;
      case 'createSalesQuotation':
        dispatch(createSalesQuotation(values));
        break;
      case 'createSalesOrder':
        dispatch(createSalesOrder(values));
        break;
      case 'createInvoice':
        dispatch(createInvoice(values));
        break;
      case 'createReturn':
        dispatch(createReturn(values));
        break;
      default:
        message.error('Invalid operation');
    }
    setIsModalVisible(false);
  };

  const customerColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleUpdateCustomer(record)}>Update</Button>
      ),
    },
  ];

  const handleUpdateCustomer = (customer) => {
    form.setFieldsValue(customer);
    showModal('updateCustomer');
  };

  const quotationColumns = [
    { title: 'Quotation ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  const orderColumns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  const invoiceColumns = [
    { title: 'Invoice ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  const returnColumns = [
    { title: 'Return ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  const analyticsColumns = [
    { title: 'Metric', dataIndex: 'metric', key: 'metric' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Customers" key="1">
          <Button type="primary" onClick={() => showModal('createCustomer')}>
            Create Customer
          </Button>
          <Table columns={customerColumns} dataSource={customers} />
        </TabPane>
        <TabPane tab="Sales Quotations" key="2">
          <Button type="primary" onClick={() => showModal('createSalesQuotation')}>
            Create Sales Quotation
          </Button>
          <Table columns={quotationColumns} dataSource={salesQuotations} />
        </TabPane>
        <TabPane tab="Sales Orders" key="3">
          <Button type="primary" onClick={() => showModal('createSalesOrder')}>
            Create Sales Order
          </Button>
          <Table columns={orderColumns} dataSource={salesOrders} />
        </TabPane>
        <TabPane tab="Invoices" key="4">
          <Button type="primary" onClick={() => showModal('createInvoice')}>
            Create Invoice
          </Button>
          <Table columns={invoiceColumns} dataSource={invoices} />
        </TabPane>
        <TabPane tab="Returns" key="5">
          <Button type="primary" onClick={() => showModal('createReturn')}>
            Create Return
          </Button>
          <Table columns={returnColumns} dataSource={returns} />
        </TabPane>
        <TabPane tab="Sales Analytics" key="6">
          <Table columns={analyticsColumns} dataSource={salesAnalytics} />
        </TabPane>
      </Tabs>

      <Modal
        title={modalType}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => handleSubmit(form.getFieldsValue())}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          {modalType === 'createCustomer' && (
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
          )}
          {modalType === 'createCustomer' && (
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          )}
          {modalType === 'createCustomer' && (
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
          )}
          {modalType === 'createSalesQuotation' && (
            <Form.Item label="Customer" name="customer">
              <Select>
                {customers.map((customer) => (
                  <Option value={customer.id}>{customer.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {modalType === 'createSalesQuotation' && (
            <Form.Item label="Total Amount" name="totalAmount">
              <Input />
            </Form.Item>
          )}
          {modalType === 'createSalesOrder' && (
            <Form.Item label="Customer" name="customer">
              <Select>
                {customers.map((customer) => (
                  <Option value={customer.id}>{customer.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {modalType === 'createSalesOrder' && (
            <Form.Item label="Total Amount" name="totalAmount">
              <Input />
            </Form.Item>
          )}
          {modalType === 'createInvoice' && (
            <Form.Item label="Customer" name="customer">
              <Select>
                {customers.map((customer) => (
                  <Option value={customer.id}>{customer.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {modalType === 'createInvoice' && (
            <Form.Item label="Total Amount" name="totalAmount">
 <Input />
            </Form.Item>
          )}
          {modalType === 'createReturn' && (
            <Form.Item label="Customer" name="customer">
              <Select>
                {customers.map((customer) => (
                  <Option value={customer.id}>{customer.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {modalType === 'createReturn' && (
            <Form.Item label="Total Amount" name="totalAmount">
              <Input />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default SalesManagement;