// userReducer.js

import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
  } from '../actions/types';
  
  const initialState = {
    user: null,   // Contains the logged-in user's information
    token: localStorage.getItem('token'),  // Retrieves the token from localStorage if available
    users: [],    // Stores a list of users (admin view)
    loading: false,  // Manages loading state during API calls
    error: null,  // Stores any error messages
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload.user,  // Sets the logged-in user's info
          token: action.payload.token,  // Stores the token from the backend
          error: null,  // Clears previous errors
          loading: false,
        };
  
      case SIGNUP_SUCCESS:
        return {
          ...state,
          user: action.payload.user,  // Handles user signup and login success
          token: action.payload.token,
          error: null,
          loading: false,
        };
  
      case LOGIN_FAILURE:
      case SIGNUP_FAILURE:
        return {
          ...state,
          user: null,
          token: null,
          error: action.payload,  // Sets the error message on failure
          loading: false,
        };
  
      case LOGOUT:
        return {
          ...state,
          user: null,
          token: null,  // Clears the user and token when logging out
          error: null,
        };
  
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          users: action.payload,  // Stores fetched users in the state
          error: null,
          loading: false,
        };
  
      case FETCH_USERS_FAILURE:
        return {
          ...state,
          users: [],
          error: action.payload,  // Handles failure in fetching users
          loading: false,
        };
  
      default:
        return state;
    }
  }
  