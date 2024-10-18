import { message } from 'antd';
import orderTrackingAPI from '../api/orderTrackingAPI';

// Action Types
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const UPDATE_ORDER_STATUS_SUCCESS = 'UPDATE_ORDER_STATUS_SUCCESS';
export const GET_ORDER_COUNTDOWN_SUCCESS = 'GET_ORDER_COUNTDOWN_SUCCESS';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const UPDATE_DELIVERY_ESTIMATE_SUCCESS = 'UPDATE_DELIVERY_ESTIMATE_SUCCESS';
export const ADD_ORDER_NOTE_SUCCESS = 'ADD_ORDER_NOTE_SUCCESS';
export const GET_ORDER_HISTORY_SUCCESS = 'GET_ORDER_HISTORY_SUCCESS';

// Action Creators
export const fetchOrders = () => async (dispatch) => {
  try {
    const orders = await orderTrackingAPI.fetchOrders();
    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: orders });
  } catch (error) {
    message.error('Failed to fetch orders');
  }
};

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  try {
    const updatedOrder = await orderTrackingAPI.updateOrderStatus(orderId, status);
    dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: updatedOrder });
    message.success('Order status updated successfully');
  } catch (error) {
    message.error('Failed to update order status');
  }
};

export const getOrderCountdown = (orderId) => async (dispatch) => {
  try {
    const countdown = await orderTrackingAPI.getOrderCountdown(orderId);
    dispatch({ type: GET_ORDER_COUNTDOWN_SUCCESS, payload: { orderId, countdown } });
  } catch (error) {
    message.error('Failed to get order countdown');
  }
};

export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    const orderDetails = await orderTrackingAPI.getOrderDetails(orderId);
    dispatch({ type: GET_ORDER_DETAILS_SUCCESS, payload: orderDetails });
  } catch (error) {
    message.error('Failed to get order details');
  }
};

export const updateDeliveryEstimate = (orderId, estimatedDeliveryTime) => async (dispatch) => {
  try {
    const updatedOrder = await orderTrackingAPI.updateDeliveryEstimate(orderId, estimatedDeliveryTime);
    dispatch({ type: UPDATE_DELIVERY_ESTIMATE_SUCCESS, payload: updatedOrder });
    message.success('Delivery estimate updated successfully');
  } catch (error) {
    message.error('Failed to update delivery estimate');
  }
};

export const addOrderNote = (orderId, note) => async (dispatch) => {
  try {
    const updatedOrder = await orderTrackingAPI.addOrderNote(orderId, note);
    dispatch({ type: ADD_ORDER_NOTE_SUCCESS, payload: updatedOrder });
    message.success('Note added to order successfully');
  } catch (error) {
    message.error('Failed to add note to order');
  }
};

export const getOrderHistory = (orderId) => async (dispatch) => {
  try {
    const history = await orderTrackingAPI.getOrderHistory(orderId);
    dispatch({ type: GET_ORDER_HISTORY_SUCCESS, payload: { orderId, history } });
  } catch (error) {
    message.error('Failed to get order history');
  }
};