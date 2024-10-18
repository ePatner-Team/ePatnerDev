import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Input, Select, message, Tabs } from 'antd';
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  fetchLoyaltyPrograms,
  createLoyaltyProgram,
  updateLoyaltyProgram,
  deleteLoyaltyProgram,
  fetchDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  fetchRewards,
  createReward,
  updateReward,
  deleteReward
} from '../../actions/customerRelationshipActions';

const { TabPane } = Tabs;
const { Option } = Select;

const CRM = () => {
  const dispatch = useDispatch();
  const {
    customers,
    loyaltyPrograms,
    discounts,
    rewards
  } = useSelector(state => state.customerRelationship);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchLoyaltyPrograms());
    dispatch(fetchDiscounts());
    dispatch(fetchRewards());
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
      case 'createLoyaltyProgram':
        dispatch(createLoyaltyProgram(values));
        break;
      case 'createDiscount':
        dispatch(createDiscount(values));
        break;
      case 'createReward':
        dispatch(createReward(values));
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
        <span>
          <Button onClick={() => handleUpdateCustomer(record)}>Update</Button>
          <Button onClick={() => handleDeleteCustomer(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];

  const handleUpdateCustomer = (customer) => {
    form.setFieldsValue(customer);
    showModal('updateCustomer');
  };

  const handleDeleteCustomer = (customerId) => {
    dispatch(deleteCustomer(customerId));
  };

  const loyaltyProgramColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Points', dataIndex: 'points', key: 'points' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleUpdateLoyaltyProgram(record)}>Update</Button>
          <Button onClick={() => handleDeleteLoyaltyProgram(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];

  const handleUpdateLoyaltyProgram = (program) => {
    form.setFieldsValue(program);
    showModal('updateLoyaltyProgram');
  };

  const handleDeleteLoyaltyProgram = (programId) => {
    dispatch(deleteLoyaltyProgram(programId));
  };

  const discountColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
    { title: 'Expiry Date', dataIndex: 'expiryDate', key: 'expiryDate' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleUpdateDiscount(record)}>Update</Button>
          <Button onClick={() => handleDeleteDiscount(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];

  const handleUpdateDiscount = (discount) => {
    form.setFieldsValue(discount);
    showModal('updateDiscount');
  };

  const handleDeleteDiscount = (discountId) => {
    dispatch(deleteDiscount(discountId));
  };

  const rewardColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Points Required', dataIndex: 'pointsRequired', key: 'pointsRequired' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleUpdateReward(record)}>Update</Button>
          <Button onClick={() => handleDeleteReward(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];

  const handleUpdateReward = (reward) => {
    form.setFieldsValue(reward);
    showModal('updateReward');
  };

  const handleDeleteReward = (rewardId) => {
    dispatch(deleteReward(rewardId));
  };

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Customers" key="1">
          <Button type="primary" onClick={() => showModal('createCustomer')}>
            Create Customer
          </Button>
          <Table columns={customerColumns} dataSource={customers} />
        </TabPane>
        <TabPane tab="Loyalty Programs" key="2">
          <Button type="primary" onClick={() => showModal('createLoyaltyProgram')}>
            Create Loyalty Program
          </Button>
          <Table columns={loyaltyProgramColumns} dataSource={loyaltyPrograms} />
        </TabPane>
        <TabPane tab="Discounts" key="3">
          <Button type="primary" onClick={() => showModal('createDiscount')}>
            Create Discount
          </Button>
          <Table columns={discountColumns} dataSource={discounts} />
        </TabPane>
        <TabPane tab="Rewards" key="4">
          <Button type="primary" onClick={() => showModal('createReward')}>
            Create Reward
          </Button>
          <Table columns={rewardColumns} dataSource={rewards} />
        </TabPane>
      </Tabs>

      <Modal
        title={modalType.charAt(0).toUpperCase() + modalType.slice(1)}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {(modalType === 'createCustomer' || modalType === 'updateCustomer') && (
            <>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </>
          )}

          {(modalType === 'createLoyaltyProgram' || modalType === 'updateLoyaltyProgram') && (
            <>
              <Form.Item name="name" label="Program Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item name="points" label="Points" rules={[{ required: true, type: 'number' }]}>
                <Input type="number" />
              </Form.Item>
            </>
          )}

          {(modalType === 'createDiscount' || modalType === 'updateDiscount') && (
            <>
              <Form.Item name="name" label="Discount Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="type" label="Discount Type" rules={[{ required: true }]}>
                <Select>
                  <Option value="percentage">Percentage</Option>
                  <Option value="fixed">Fixed Amount</Option>
                </Select>
              </Form.Item>
              <Form.Item name="value" label="Discount Value" rules={[{ required: true, type: 'number' }]}>
                <Input type="number" />
              </Form.Item>
              <Form.Item name="expiryDate" label="Expiry Date" rules={[{ required: true }]}>
                <Input type="date" />
              </Form.Item>
            </>
          )}

          {(modalType === 'createReward' || modalType === 'updateReward') && (
            <>
              <Form.Item name="name" label="Reward Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item name="pointsRequired" label="Points Required" rules={[{ required: true, type: 'number' }]}>
                <Input type="number" />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default CRM;