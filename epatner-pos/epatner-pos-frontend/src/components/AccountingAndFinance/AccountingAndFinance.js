import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Input, Select, message, Tabs } from 'antd';
import {
  fetchGeneralLedger,
  postJournalEntry,
  fetchAccountsReceivable,
  recordPaymentReceived,
  fetchAccountsPayable,
  recordPaymentMade,
  generateIncomeStatement,
  generateBalanceSheet,
  generateCashFlowStatement,
  fetchBudget,
  createBudget,
  calculateTaxLiability,
  submitTaxReturn
} from '../actions/accountingAndFinanceActions';

const { TabPane } = Tabs;
const { Option } = Select;

const AccountingAndFinance = () => {
  const dispatch = useDispatch();
  const {
    generalLedger,
    accountsReceivable,
    accountsPayable,
    incomeStatement,
    balanceSheet,
    cashFlowStatement,
    budget,
    taxLiability
  } = useSelector(state => state.accountingAndFinance);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchGeneralLedger());
    dispatch(fetchAccountsReceivable());
    dispatch(fetchAccountsPayable());
    dispatch(fetchBudget());
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
      case 'journalEntry':
        dispatch(postJournalEntry(values));
        break;
      case 'paymentReceived':
        dispatch(recordPaymentReceived(values));
        break;
      case 'paymentMade':
        dispatch(recordPaymentMade(values));
        break;
      case 'createBudget':
        dispatch(createBudget(values));
        break;
      default:
        message.error('Invalid operation');
    }
    setIsModalVisible(false);
  };

  const generalLedgerColumns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Account', dataIndex: 'account', key: 'account' },
    { title: 'Debit', dataIndex: 'debit', key: 'debit' },
    { title: 'Credit', dataIndex: 'credit', key: 'credit' },
  ];

  const accountsReceivableColumns = [
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Invoice Number', dataIndex: 'invoiceNumber', key: 'invoiceNumber' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
  ];

  const accountsPayableColumns = [
    { title: 'Vendor', dataIndex: 'vendor', key: 'vendor' },
    { title: 'Invoice Number', dataIndex: 'invoiceNumber', key: 'invoiceNumber' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
  ];

  return (
    <div>
       <Tabs defaultActiveKey="1">
         <TabPane tab="General Ledger" key="1">
           <Button type="primary" onClick={() => showModal('journalEntry')}>Record Journal Entry</Button>
           <Table columns={generalLedgerColumns} dataSource={generalLedger} />
         </TabPane>
         <TabPane tab="Accounts Receivable" key="2">
           <Button type="primary" onClick={() => showModal('paymentReceived')}>Record Payment Received</Button>
           <Table columns={accountsReceivableColumns} dataSource={accountsReceivable} />
         </TabPane>
         <TabPane tab="Accounts Payable" key="3">
           <Button type="primary" onClick={() => showModal('paymentMade')}>Record Payment Made</Button>
           <Table columns={accountsPayableColumns} dataSource={accountsPayable} />
         </TabPane>
         <TabPane tab="Financial Statements" key="4">
           <Button type="primary" onClick={() => dispatch(generateIncomeStatement())}>Generate Income Statement</Button>
           <Button type="primary" onClick={() => dispatch(generateBalanceSheet())}>Generate Balance Sheet</Button>
           <Button type="primary" onClick={() => dispatch(generateCashFlowStatement())}>Generate Cash Flow Statement</Button>
           <Table columns={incomeStatement.columns} dataSource={incomeStatement.data} />
           <Table columns={balanceSheet.columns} dataSource={balanceSheet.data} />
           <Table columns={cashFlowStatement.columns} dataSource={cashFlowStatement.data} />
         </TabPane>
         <TabPane tab="Budgeting" key="5">
           <Button type="primary" onClick={() => showModal('createBudget')}>Create Budget</Button>
           <Table columns={budget.columns} dataSource={budget.data} />
         </TabPane>
         <TabPane tab="Taxation" key="6">
           <Button type="primary" onClick={() => dispatch(calculateTaxLiability())}>Calculate Tax Liability</Button>
           <Button type="primary" onClick={() => dispatch(submitTaxReturn())}>Submit Tax Return</Button>
           <Table columns={taxLiability.columns} dataSource={taxLiability.data} />
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
         <Form
           form={form}
           layout="vertical"
           name="form_in_modal"
           initialValues={{
             modifier: 'public',
           }}
         >
           {modalType === 'journalEntry' && (
             <Form.Item name="date" label="Date">
               <Input type="date" />
             </Form.Item>
           )}
           {modalType === 'journalEntry' && (
             <Form.Item name="account" label="Account">
               <Select>
                 <Option value="asset">Asset</Option>
                 <Option value="liability">Liability</Option>
                 <Option value="equity">Equity</Option>
                 <Option value="revenue">Revenue</Option>
                 <Option value="expense">Expense</Option>
               </Select>
             </Form.Item>
           )}
           {modalType === 'journalEntry' && (
             <Form.Item name="debit" label="Debit">
               <Input type="number" />
             </Form.Item>
           )}
           {modalType === 'journalEntry' && (
             <Form.Item name="credit" label="Credit">
               <Input type="number" />
             </Form.Item>
           )}
           {modalType === 'paymentReceived' && (
             <Form.Item name="customer" label="Customer">
               <Select>
                 <Option value="customer1">Customer 1</Option>
                 <Option value="customer2">Customer 2</Option>
                 <Option value="customer3">Customer 3</Option>
               </Select>
             </Form.Item>
           )}
           {modalType === 'paymentReceived' && (
             <Form.Item name="amount" label="Amount">
               <Input type="number" />
             </Form.Item>
           )}
           {modalType === 'paymentMade' && (
             <Form.Item name="vendor" label="Vendor">
               <Select>
                 <Option value="vendor1">Vendor 1</Option>
                 <Option value="vendor2">Vendor 2</Option>
                 <Option value="vendor3">Vendor 3</Option>
               </Select>
             </Form.Item>
           )}
           {modalType === 'paymentMade' && (
             <Form.Item name="amount" label="Amount">
               <Input type=" number" />
             </Form.Item>
           )}
           {modalType === 'createBudget' && (
             <Form.Item name="category" label="Category">
               <Select>
                 <Option value="salary">Salary</Option>
                 <Option value="rent">Rent</Option>
                 <Option value="utilities">Utilities</Option>
                 <Option value="food">Food</Option>
                 <Option value="entertainment">Entertainment</Option>
               </Select>
             </Form.Item>
           )}
           {modalType === 'createBudget' && (
             <Form.Item name="amount" label="Amount">
               <Input type="number" />
             </Form.Item>
           )}
         </Form>
       </Modal>
    </div>
  );
};

export default AccountingAndFinance;