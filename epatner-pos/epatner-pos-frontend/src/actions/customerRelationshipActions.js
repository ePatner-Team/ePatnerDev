import { message } from 'antd';
import customerRelationshipAPI from '../api/customerRelationshipAPI';

// Action Types
export const FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS';
export const FETCH_CUSTOMER_SUCCESS = 'FETCH_CUSTOMER_SUCCESS';
export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS';
export const UPDATE_CUSTOMER_SUCCESS = 'UPDATE_CUSTOMER_SUCCESS';
export const DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS';
export const FETCH_PURCHASE_HISTORY_SUCCESS = 'FETCH_PURCHASE_HISTORY_SUCCESS';
export const FETCH_CUSTOMER_LEDGER_SUCCESS = 'FETCH_CUSTOMER_LEDGER_SUCCESS';
export const FETCH_LOYALTY_PROGRAMS_SUCCESS = 'FETCH_LOYALTY_PROGRAMS_SUCCESS';
export const CREATE_LOYALTY_PROGRAM_SUCCESS = 'CREATE_LOYALTY_PROGRAM_SUCCESS';
export const UPDATE_LOYALTY_PROGRAM_SUCCESS = 'UPDATE_LOYALTY_PROGRAM_SUCCESS';
export const DELETE_LOYALTY_PROGRAM_SUCCESS = 'DELETE_LOYALTY_PROGRAM_SUCCESS';
export const FETCH_DISCOUNTS_SUCCESS = 'FETCH_DISCOUNTS_SUCCESS';
export const CREATE_DISCOUNT_SUCCESS = 'CREATE_DISCOUNT_SUCCESS';
export const UPDATE_DISCOUNT_SUCCESS = 'UPDATE_DISCOUNT_SUCCESS';
export const DELETE_DISCOUNT_SUCCESS = 'DELETE_DISCOUNT_SUCCESS';
export const FETCH_REWARDS_SUCCESS = 'FETCH_REWARDS_SUCCESS';
export const CREATE_REWARD_SUCCESS = 'CREATE_REWARD_SUCCESS';
export const UPDATE_REWARD_SUCCESS = 'UPDATE_REWARD_SUCCESS';
export const DELETE_REWARD_SUCCESS = 'DELETE_REWARD_SUCCESS';

// Action Creators

// Customer Profiles
export const fetchCustomers = () => async (dispatch) => {
  try {
    const customers = await customerRelationshipAPI.fetchCustomers();
    dispatch({ type: FETCH_CUSTOMERS_SUCCESS, payload: customers });
  } catch (error) {
    message.error('Failed to fetch customers');
  }
};

export const fetchCustomerById = (customerId) => async (dispatch) => {
  try {
    const customer = await customerRelationshipAPI.getCustomerById(customerId);
    dispatch({ type: FETCH_CUSTOMER_SUCCESS, payload: customer });
  } catch (error) {
    message.error('Failed to fetch customer details');
  }
};

export const createCustomer = (customerData) => async (dispatch) => {
  try {
    const newCustomer = await customerRelationshipAPI.createCustomer(customerData);
    dispatch({ type: CREATE_CUSTOMER_SUCCESS, payload: newCustomer });
    message.success('Customer created successfully');
  } catch (error) {
    message.error('Failed to create customer');
  }
};

export const updateCustomer = (customerId, customerData) => async (dispatch) => {
  try {
    const updatedCustomer = await customerRelationshipAPI.updateCustomer(customerId, customerData);
    dispatch({ type: UPDATE_CUSTOMER_SUCCESS, payload: updatedCustomer });
    message.success('Customer updated successfully');
  } catch (error) {
    message.error('Failed to update customer');
  }
};

export const deleteCustomer = (customerId) => async (dispatch) => {
  try {
    await customerRelationshipAPI.deleteCustomer(customerId);
    dispatch({ type: DELETE_CUSTOMER_SUCCESS, payload: customerId });
    message.success('Customer deleted successfully');
  } catch (error) {
    message.error('Failed to delete customer');
  }
};

export const fetchPurchaseHistory = (customerId) => async (dispatch) => {
  try {
    const history = await customerRelationshipAPI.fetchCustomerPurchaseHistory(customerId);
    dispatch({ type: FETCH_PURCHASE_HISTORY_SUCCESS, payload: { customerId, history } });
  } catch (error ) {
    message.error('Failed to fetch purchase history');
  }
};

export const fetchCustomerLedger = (customerId) => async (dispatch) => {
  try {
    const ledger = await customerRelationshipAPI.fetchCustomerLedger(customerId);
    dispatch({ type: FETCH_CUSTOMER_LEDGER_SUCCESS, payload: { customerId, ledger } });
  } catch (error) {
    message.error('Failed to fetch customer ledger');
  }
};

// Loyalty Programs
export const fetchLoyaltyPrograms = () => async (dispatch) => {
  try {
    const programs = await customerRelationshipAPI.fetchLoyaltyPrograms();
    dispatch({ type: FETCH_LOYALTY_PROGRAMS_SUCCESS, payload: programs });
  } catch (error) {
    message.error('Failed to fetch loyalty programs');
  }
};

export const createLoyaltyProgram = (programData) => async (dispatch) => {
  try {
    const newProgram = await customerRelationshipAPI.createLoyaltyProgram(programData);
    dispatch({ type: CREATE_LOYALTY_PROGRAM_SUCCESS, payload: newProgram });
    message.success('Loyalty program created successfully');
  } catch (error) {
    message.error('Failed to create loyalty program');
  }
};

export const updateLoyaltyProgram = (programId, programData) => async (dispatch) => {
  try {
    const updatedProgram = await customerRelationshipAPI.updateLoyaltyProgram(programId, programData);
    dispatch({ type: UPDATE_LOYALTY_PROGRAM_SUCCESS, payload: updatedProgram });
    message.success('Loyalty program updated successfully');
  } catch (error) {
    message.error('Failed to update loyalty program');
  }
};

export const deleteLoyaltyProgram = (programId) => async (dispatch) => {
  try {
    await customerRelationshipAPI.deleteLoyaltyProgram(programId);
    dispatch({ type: DELETE_LOYALTY_PROGRAM_SUCCESS, payload: programId });
    message.success('Loyalty program deleted successfully');
  } catch (error) {
    message.error('Failed to delete loyalty program');
  }
};

// Discounts
export const fetchDiscounts = () => async (dispatch) => {
  try {
    const discounts = await customerRelationshipAPI.fetchDiscounts();
    dispatch({ type: FETCH_DISCOUNTS_SUCCESS, payload: discounts });
  } catch (error) {
    message.error('Failed to fetch discounts');
  }
};

export const createDiscount = (discountData) => async (dispatch) => {
  try {
    const newDiscount = await customerRelationshipAPI.createDiscount(discountData);
    dispatch({ type: CREATE_DISCOUNT_SUCCESS, payload: newDiscount });
    message.success('Discount created successfully');
  } catch (error) {
    message.error('Failed to create discount');
  }
};

export const updateDiscount = (discountId, discountData) => async (dispatch) => {
  try {
    const updatedDiscount = await customerRelationshipAPI.updateDiscount(discountId, discountData);
    dispatch({ type: UPDATE_DISCOUNT_SUCCESS, payload: updatedDiscount });
    message.success('Discount updated successfully');
  } catch (error) {
    message.error('Failed to update discount');
  }
};

export const deleteDiscount = (discountId) => async (dispatch) => {
  try {
    await customerRelationshipAPI.deleteDiscount(discountId);
    dispatch({ type: DELETE_DISCOUNT_SUCCESS, payload: discountId });
    message.success('Discount deleted successfully');
  } catch (error) {
    message.error('Failed to delete discount');
  }
};

// Rewards
export const fetchRewards = () => async (dispatch) => {
  try {
    const rewards = await customerRelationshipAPI.fetchRewards();
    dispatch({ type: FETCH_REWARDS_SUCCESS, payload: rewards });
  } catch (error) {
    message.error('Failed to fetch rewards');
  }
};

export const createReward = (rewardData) => async (dispatch) => {
  try {
    const newReward = await customerRelationshipAPI.createReward(rewardData);
    dispatch({ type: CREATE_REWARD_SUCCESS, payload: newReward });
    message.success('Reward created successfully');
  } catch (error) {
    message.error('Failed to create reward');
  }
};

export const updateReward = (rewardId, rewardData) => async (dispatch) => {
  try {
    const updatedReward = await customerRelationshipAPI.updateReward(rewardId, rewardData);
    dispatch({ type: UPDATE_REWARD_SUCCESS, payload: updatedReward });
    message.success('Reward updated successfully');
  } catch (error) {
    message.error('Failed to update reward');
  }
};

export const deleteReward = (rewardId) => async (dispatch) => {
  try {
    await customerRelationshipAPI.deleteReward(rewardId);
    dispatch({ type: DELETE_REWARD_SUCCESS, payload: rewardId });
    message.success('Reward deleted successfully');
  } catch (error) {
    message.error('Failed to delete reward');
  }
};