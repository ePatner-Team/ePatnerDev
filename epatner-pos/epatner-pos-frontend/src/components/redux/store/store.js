// store.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Import your reducers
import userReducer from './reducers/userReducer';
import inventoryReducer from './reducers/inventoryReducer';
import posReducer from './reducers/posReducer';
import salesReducer from './reducers/salesReducer';
import purchaseReducer from './reducers/purchaseReducer';
import reportReducer from './reducers/reportReducer';
import customerRelationshipReducer from './reducers/customerRelationshipReducer';
import reportsAndAnalyticsReducer from './reducers/reportsAndAnalyticsReducer';
import bankAccountReducer from './reducers/bankAccountReducer';
import auditReducer from './reducers/auditReducer';
import orderTrackingReducer from './reducers/orderTrackingReducer';
import accountingAndFinanceReducer from './reducers/accountingAndFinanceReducer';

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  inventory: inventoryReducer,
  pos: posReducer,
  sales: salesReducer,
  purchase: purchaseReducer,
  report: reportReducer,
  customerRelationship: customerRelationshipReducer,
  reportsAndAnalytics: reportsAndAnalyticsReducer,
  bankAccount: bankAccountReducer,
  audit: auditReducer,
  orderTracking: orderTrackingReducer,
  accountingAndFinance: accountingAndFinanceReducer,
  // Add other reducers here as needed
});

// Middleware array
const middleware = [thunk];

// Create Redux store with reducers, middleware, and dev tools
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;