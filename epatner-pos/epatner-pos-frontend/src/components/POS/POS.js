import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Input, Select, Modal, message } from 'antd';
import { BarcodeOutlined, PrinterOutlined, WifiOutlined } from '@ant-design/icons';

// Assume these action creators are defined in your Redux setup
import { 
    fetchProducts, 
    addToCart, 
    removeFromCart, 
    processTransaction,
    generateInvoice,
    syncOfflineTransactions
} from '../../actions/posActions';

// Assume this utility is created for offline storage
import { saveOfflineTransaction, getOfflineTransactions } from '../../utils/offlineStorage';

// Assume these are created for hardware integration
import { printReceipt } from '../../utils/receiptPrinter';
import { initBarcodeScanner } from '../../utils/barcodeScanner';

const { Option } = Select;

const POS = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const { products, cart, loading } = useSelector(state => state.pos);
    const barcodeInputRef = useRef(null);

    useEffect(() => {
        dispatch(fetchProducts());
        initBarcodeScanner(handleBarcodeScan);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [dispatch]);

    const handleOnline = () => {
        setIsOffline(false);
        const offlineTransactions = getOfflineTransactions();
        if (offlineTransactions.length > 0) {
            dispatch(syncOfflineTransactions(offlineTransactions));
        }
    };

    const handleOffline = () => setIsOffline(true);

    const handleBarcodeScan = (barcode) => {
        const product = products.find(p => p.barcode === barcode);
        if (product) {
            dispatch(addToCart(product));
        } else {
            message.error('Product not found');
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price', render: price => `$${price.toFixed(2)}` },
        { 
            title: 'Action', 
            key: 'action',
            render: (text, record) => (
                <Button onClick={() => dispatch(addToCart(record))}>Add to Cart</Button>
            ),
        },
    ];

    const cartColumns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price', render: price => `$${price.toFixed(2)}` },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { 
            title: 'Action', 
            key: 'action',
            render: (text, record) => (
                <Button onClick={() => dispatch(removeFromCart(record.id))}>Remove</Button>
            ),
        },
    ];

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        const transaction = { cart, total, paymentMethod, timestamp: new Date() };
        if (isOffline ) {
            saveOfflineTransaction(transaction);
            message.success('Transaction saved offline');
        } else {
            dispatch(processTransaction(transaction))
                .then(() => {
                    message.success('Transaction completed successfully');
                    dispatch(generateInvoice(transaction));
                    printReceipt(transaction);
                })
                .catch(() => message.error('Transaction failed'));
        }
    };

    return (
        <div>
            <h1>Point of Sale</h1>
            <Input 
                ref={barcodeInputRef}
                placeholder="Scan barcode or search products" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ marginBottom: 16 }}
            />
            <Button onClick={() => barcodeInputRef.current.focus()}><BarcodeOutlined /></Button>
            <Table 
                columns={columns} 
                dataSource={filteredProducts}
                loading={loading}
            />
            <h2>Cart</h2>
            <Table 
                columns={cartColumns} 
                dataSource={cart}
            />
            <h3>Total: ${total.toFixed(2)}</h3>
            <Select value={paymentMethod} onChange={value => setPaymentMethod(value)} style={{ width: 120 }}>
                <Option value="cash">Cash</Option>
                <Option value="credit_card">Credit Card</Option>
                <Option value="digital_wallet">Digital Wallet</Option>
            </Select>
            <Button onClick={handleCheckout} type="primary">Checkout</Button>
            {isOffline ? <WifiOutlined style={{ color: 'red' }} /> : <WifiOutlined style={{ color: 'green' }} />}
            <Modal title="Invoice" visible={!!cart.length} onCancel={() => dispatch(generateInvoice(null))}>
                <h2>Invoice</h2>
                <p>Transaction ID: {cart[0].id}</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>Payment Method: {paymentMethod}</p>
                <Table 
                    columns={cartColumns} 
                    dataSource={cart}
                    pagination={false}
                />
                <h3>Total: ${total.toFixed(2)}</h3>
            </Modal>
        </div>
    );
};

export default POS;