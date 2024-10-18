import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import {
  fetchOrders,
  updateOrderStatus,
  getOrderCountdown,
  getOrderDetails,
  updateDeliveryEstimate,
  addOrderNote,
  getOrderHistory
} from '../../actions/orderTrackingActions';

const { Option } = Select;

const OrderTracking = () => {
  const dispatch = useDispatch();
  const { orders, countdowns, orderDetails, orderHistory } = useSelector(state => state.orderTracking);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const showModal = (type, order) => {
    setSelectedOrder(order);
    setModalType(type);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleSubmit = (values) => {
    switch (modalType) {
      case 'updateStatus':
        dispatch(updateOrderStatus(selectedOrder.id, values.status));
        break;
      case 'updateDelivery':
        dispatch(updateDeliveryEstimate(selectedOrder.id, values.estimatedDeliveryTime));
        break;
      case 'addNote':
        dispatch(addOrderNote(selectedOrder.id, values.note));
        break;
      default:
        message.error('Invalid operation');
    }
    setIsModalVisible(false);
  };

  const columns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { 
      title: 'Countdown', 
      dataIndex: 'id', 
      key: 'countdown',
      render: (id) => countdowns[id] || 'N/A'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showModal('updateStatus', record)}>Update Status</Button>
          <Button onClick={() => showModal('updateDelivery', record)}>Update Delivery</Button>
          <Button onClick={() => showModal('addNote', record)}>Add Note</Button>
          <Button onClick={() => dispatch(getOrderDetails(record.id))}>View Details</Button>
          <Button onClick={() => dispatch(getOrderHistory(record.id))}>View History</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Order Tracking</h1>
      <Table columns={columns} dataSource={orders} rowKey="id" />

      <Modal
        title={modalType === 'updateStatus' ? 'Update Order Status' : 
               modalType === 'updateDelivery' ? 'Update Delivery Estimate' : 'Add Note'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>Submit</Button>,
        ]}
      >
        <Form form={form} onFinish={handleSubmit}>
          {modalType === 'updateStatus' && (
            <Form.Item name="status" label="New Status" rules={[{ required: true }]}>
              <Select>
                <Option value="processing"> Processing</Option>
                <Option value="shipped">Shipped</Option>
                <Option value="delivered">Delivered</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
            </Form.Item>
          )}
          {modalType === 'updateDelivery' && (
            <Form.Item name="estimatedDeliveryTime" label="Estimated Delivery Time" rules={[{ required: true }]}>
              <Input type="datetime-local" />
            </Form.Item>
          )}
          {modalType === 'addNote' && (
            <Form.Item name="note" label="Note" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default OrderTracking;