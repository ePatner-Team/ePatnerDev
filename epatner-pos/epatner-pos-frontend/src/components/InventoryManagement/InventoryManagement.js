import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Input, Select, message, Tabs } from 'antd';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  fetchCategories,
  addCategory,
  updateStock,
  fetchPurchaseOrders,
  createPurchaseOrder,
  fetchSuppliers,
  addSupplier,
  fetchLowStockAlerts,
  createBatch,
  fetchBatches,
  updateExpiry,
  fetchWarehouses,
  addWarehouse
} from '../actions/inventoryActions';

const { TabPane } = Tabs;
const { Option } = Select;

const InventoryManagement = () => {
  const dispatch = useDispatch();
  const {
    products,
    categories,
    purchaseOrders,
    suppliers,
    lowStockAlerts,
    batches,
    warehouses
  } = useSelector(state => state.inventory);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchSuppliers());
    dispatch(fetchWarehouses());
    dispatch(fetchLowStockAlerts(10)); // Fetch low stock alerts with a threshold of 10
  }, [dispatch]);

  const showModal = (type) => {
    setModalType(type);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    switch (modalType) {
      case 'addProduct':
        dispatch(addProduct(values));
        break;
      case 'addCategory':
        dispatch(addCategory(values));
        break;
      case 'addSupplier':
        dispatch(addSupplier(values));
        break;
      case 'addWarehouse':
        dispatch(addWarehouse(values));
        break;
      case 'createPurchaseOrder':
        dispatch(createPurchaseOrder(values));
        break;
      case 'createBatch':
        dispatch(createBatch(values));
        break;
      default:
        message.error('Invalid operation');
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const productColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleUpdateStock(record)}>Update Stock</Button>
          <Button onClick={() => handleDeleteProduct(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];

  const handleUpdateStock = (product) => {
    // Implement stock update logic
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const lowStockColumns = [
    { title: 'Product', dataIndex: 'name', key: 'name' },
    { title: 'Current Stock', dataIndex: 'stock', key: 'stock' },
    { title: 'Threshold', dataIndex: 'threshold', key: 'threshold' },
  ];

  const purchaseOrderColumns = [
    { title: 'Order ID', dataIndex: 'id', key: ' id' },
    { title: 'Supplier', dataIndex: 'supplier', key: 'supplier' },
    { title: 'Order Date', dataIndex: 'orderDate', key: 'orderDate' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
  ];

  const batchColumns = [
    { title: 'Batch ID', dataIndex: 'id', key: 'id' },
    { title: 'Product', dataIndex: 'product', key: 'product' },
    { title: 'Expiry Date', dataIndex: 'expiryDate', key: 'expiryDate' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
  ];

  const warehouseColumns = [
    { title: 'Warehouse ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
  ];

  return (
    <div>
      <h1>Inventory Management</h1>
      <Tabs defaultActiveKey="products">
        <TabPane tab="Products" key="products">
          <Button type="primary" onClick={() => showModal('addProduct')}>
            Add Product
          </Button>
          <Table columns={productColumns} dataSource={products} />
        </TabPane>
        <TabPane tab="Categories" key="categories">
          <Button type="primary" onClick={() => showModal('addCategory')}>
            Add Category
          </Button>
          <Table columns={categoryColumns} dataSource={categories} />
        </TabPane>
        <TabPane tab="Purchase Orders" key="purchaseOrders">
          <Button type="primary" onClick={() => showModal('createPurchaseOrder')}>
            Create Purchase Order
          </Button>
          <Table columns={purchaseOrderColumns} dataSource={purchaseOrders} />
        </TabPane>
        <TabPane tab="Suppliers" key="suppliers">
          <Button type="primary" onClick={() => showModal('addSupplier')}>
            Add Supplier
          </Button>
          <Table columns={supplierColumns} dataSource={suppliers} />
        </TabPane>
        <TabPane tab="Low Stock Alerts" key="lowStockAlerts">
          <Table columns={lowStockColumns} dataSource={lowStockAlerts} />
        </TabPane>
        <TabPane tab="Batches" key="batches">
          <Button type="primary" onClick={() => showModal('createBatch')}>
            Create Batch
          </Button>
          <Table columns={batchColumns} dataSource={batches} />
        </TabPane>
        <TabPane tab="Warehouses" key="warehouses">
          <Button type="primary" onClick={() => showModal('addWarehouse')}>
            Add Warehouse
          </Button>
          <Table columns={warehouseColumns} dataSource={warehouses} />
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
          <Button key="submit" type="primary" onClick={() => handleSubmit(form.getFieldsValue())}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          {modalType === 'addProduct' && (
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
          )}
          {modalType === 'addProduct' && (
            <Form.Item label="SKU" name="sku">
              <Input />
            </Form.Item>
          )}
          {modalType === 'addProduct' && (
            <Form.Item label="Category" name="category">
              <Select>
                {categories.map((category) => (
                  <Option value={category.id}>{category.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {modalType === 'addCategory' && (
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
          )}
          {modalType === 'addSupplier' && (
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
          )}
          {modalType === 'addWarehouse' && (
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
          )}
          {modalType === 'createPurchaseOrder' && (
            <Form.Item label="Supplier" name="supplier">
              <Select>
                {suppliers.map((supplier) => (
                  <Option value={supplier.id}>{supplier.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {modalType === 'createBatch' && (
            <Form.Item label="Product" name="product">
              <Select>
                {products.map((product) => (
                  <Option value={product.id}>{product.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryManagement;