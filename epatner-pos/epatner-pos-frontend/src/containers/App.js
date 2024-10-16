// app.js

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
import UserManagement from './components/UserManagement';
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
