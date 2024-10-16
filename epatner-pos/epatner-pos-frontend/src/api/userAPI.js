// userAPI.js

import axios from 'axios';

// Set base URL for API
const API_URL = '/api/users';

// Fetch all users
export const fetchUsers = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

// Fetch user by ID
export const fetchUserById = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user details');
  }
};

// Create new user
export const createUser = async (userData, token) => {
  try {
    const response = await axios.post(API_URL, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

// Update user
export const updateUser = async (userId, userData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error updating user');
  }
};

// Delete user
export const deleteUser = async (userId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error deleting user');
  }
};

// Google OAuth login
export const googleLogin = async (tokenId) => {
  try {
    const response = await axios.post('/api/google-login', { tokenId });
    return response.data;
  } catch (error) {
    throw new Error('Error during Google login');
  }
};

// Login user
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post('/api/login', loginData);
    return response.data;
  } catch (error) {
    throw new Error('Error logging in');
  }
};

// Register new user (sign up)
export const registerUser = async (registerData) => {
  try {
    const response = await axios.post('/api/signup', registerData);
    return response.data;
  } catch (error) {
    throw new Error('Error signing up');
  }
};
