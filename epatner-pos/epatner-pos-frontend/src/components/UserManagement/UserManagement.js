import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button, Modal, message, Input, Select, Tabs } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, GoogleOutlined } from '@ant-design/icons';
import { GoogleLogin } from 'react-google-login';

const { TabPane } = Tabs;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [form] = Form.useForm();
  const [roleForm] = Form.useForm();

  const handleGoogleSuccess = async (response) => {
    try {
      const { tokenId } = response;
      const result = await axios.post('/api/google-login', { tokenId });
      message.success('Logged in successfully with Google');
      localStorage.setItem('token', result.data.token);
      fetchUsers();
      fetchRoles();
    } catch (error) {
      message.error('Google login failed');
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign In Error:', error);
    message.error('Google Sign In was unsuccessful');
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUsers();
      fetchRoles();
    }
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
    }
    setLoading(false);
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRoles(response.data);
    } catch (error) {
      message.error('Failed to fetch roles');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (isSignUp) {
        const response = await axios.post('/api/signup', { ...values, role: 'admin' });
        message.success('Business signed up successfully');
        localStorage.setItem('token', response.data.token);
      } else {
        const response = await axios.post('/api/login', values);
        message.success('Logged in successfully');
        localStorage.setItem('token', response.data.token);
      }
      setModalVisible(false);
      form.resetFields();
      fetchUsers();
      fetchRoles();
    } catch (error) {
      message.error('Operation failed');
    }
  };

  const handleGoogleLogin = async () => {
    // Implement Google OAuth login here
    message.info('Google login functionality to be implemented');
  };

  const showModal = (signUp = false) => {
    setIsSignUp(signUp);
    form.resetFields();
    setModalVisible(true);
  };

  const handleRoleSubmit = async (values) => {
    try {
      if (values.id) {
        await axios.put(`/api/roles/${values.id}`, values, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        message.success('Role updated successfully');
      } else {
        await axios.post('/api/roles', values, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        message.success('Role created successfully');
      }
      roleForm.resetFields();
      fetchRoles();
    } catch (error) {
      message.error('Failed to save role');
    }
  };

  const handleRoleDelete = async (roleId) => {
    try {
      await axios.delete(`/api/roles/${roleId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      message.success('Role deleted successfully');
      fetchRoles();
    } catch (error) {
      message.error('Failed to delete role');
    }
  };

  const userColumns = [
    { title: 'Business Name', dataIndex: 'businessName', key: 'businessName' },
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
  ];

  const roleColumns = [
    { title: 'Role Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => roleForm.setFieldsValue(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleRoleDelete(record.id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];


  return (
    <div>
      <h2>User Management</h2>
      {!localStorage.getItem('token') && 
      (
        <>
          <Button onClick={() => showModal(false)} style={{ marginRight: 16 }}>
            Login
          </Button>
          <Button onClick={() => showModal(true)} style={{ marginRight: 16 }}>
            Sign Up
          </Button>
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"
            buttonText="Continue with Google"
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
          />
        </>
      )}

      {localStorage.getItem('token') && (
        <Tabs defaultActiveKey="users">
          <TabPane tab="Users" key="users">
            <Table
              loading={loading}
              columns={userColumns}
              dataSource={users}
              rowKey="id"
            />
          </TabPane>
          <TabPane tab="Roles" key="roles">
            <Button type="primary" onClick={() => roleForm.setFieldsValue({})}>
              Create Role
            </Button>
            <Table
              loading={loading}
              columns={roleColumns}
              dataSource={roles}
              rowKey="id"
            />
            <Modal
              title="Create/Edit Role"
              visible={modalVisible}
              onCancel={() => setModalVisible(false)}
              footer={null}
            >
              <Form form={roleForm} onFinish={handleRoleSubmit} layout="vertical">
                <Form.Item name="name" label="Role Name" rules={[{ required: true }]}>
                  <Input placeholder="Role Name" />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                  <Input.TextArea placeholder="Description" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save Role
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </TabPane>
        </Tabs>
      )}
      <Modal
        title={isSignUp ? "Sign Up" : "Login"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {isSignUp && (
            <>
              <Form.Item name="businessName" label="Business Name" rules={[{ required: true }]}>
                <Input prefix={<User Outlined />} placeholder="Business Name" />
              </Form.Item>
              <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                <Input prefix={<UserOutlined />} placeholder="First Name" />
              </Form.Item>
              <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                <Input prefix={<UserOutlined />} placeholder="Last Name" />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                <Input prefix={<PhoneOutlined />} placeholder="Phone" />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
            </>
          )}
          {!isSignUp && (
            <>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
            <Button type="link" onClick={handleGoogleLogin}>
              Continue with Google
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={isSignUp ? "Sign Up" : "Login"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* ... (existing form items) */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
            <GoogleLogin
              clientId="YOUR_GOOGLE_CLIENT_ID"
              render={renderProps => (
                <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  Continue with Google
                </Button>
              )}
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy={'single_host_origin'}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;