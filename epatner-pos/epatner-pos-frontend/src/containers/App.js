// App.js
import './global.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/userActions';
import store from './store';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import InventoryManagement from './components/InventoryManagement/InventoryManagement';
import POS from './components/POS/POS';
import SalesManagement from './components/SalesManagement/SalesManagement';
import PurchaseManagement from './components/PurchaseManagement/PurchaseManagement';
import OrderTracking from './components/OrderTracking/OrderTracking';
import CRM from './components/CustomerRelationshipManagement/CRM';
import ReportsAndAnalytics from './components/ReportsAndAnalytics/ReportsAndAnalytics';
import AccountingAndFinance from './components/AccountingAndFinance/AccountingAndFinance';
import BankAccountIntegration from './components/BankAccountIntegration/BankAccountIntegration';
import AuditFeature from './components/AuditFeature/AuditFeature';
import UserManagement from './components/UserManagement/UserManagement';
import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/user/Profile';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(loadUser());  // Load user if token exists
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
              <Route path="/inventory" element={<PrivateRoute component={InventoryManagement} />} />
              <Route path="/pos" element={<PrivateRoute component={POS} />} />
              <Route path="/sales" element={<PrivateRoute component={SalesManagement} />} />
              <Route path="/purchases" element={<PrivateRoute component={PurchaseManagement} />} />
              <Route path="/order-tracking" element={<PrivateRoute component={OrderTracking} />} />
              <Route path="/crm" element={<PrivateRoute component={CRM} />} />
              <Route path="/reports" element={<PrivateRoute component={ReportsAndAnalytics} />} />
              <Route path="/finance" element={<PrivateRoute component={AccountingAndFinance} />} />
              <Route path="/bank-integration" element={<PrivateRoute component={BankAccountIntegration} />} />
              <Route path="/audit" element={<PrivateRoute component={AuditFeature} />} />
              <Route path="/user-management" element={<PrivateRoute component={UserManagement} />} />
              <Route path="/profile" element={<PrivateRoute component={Profile} />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
