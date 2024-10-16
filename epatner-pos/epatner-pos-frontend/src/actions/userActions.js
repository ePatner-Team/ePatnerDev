import axios from 'axios';
import { message } from 'antd';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
export const LOGOUT = 'LOGOUT';

// Action Creators

// Login Action
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('/api/login', { email, password });
    localStorage.setItem('token', response.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
    message.success('Logged in successfully');
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
    message.error('Login failed');
  }
};

// Signup Action
export const signup = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/signup', userData);
    localStorage.setItem('token', response.data.token);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: response.data,
    });
    message.success('Business signed up successfully');
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
    });
    message.error('Signup failed');
  }
};

// Fetch Users Action
export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAIL,
    });
    message.error('Failed to fetch users');
  }
};

// Logout Action
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
  message.success('Logged out successfully');
};
