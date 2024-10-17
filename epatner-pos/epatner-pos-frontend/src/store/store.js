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

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  inventory: inventoryReducer,
  pos: posReducer,
  sales: salesReducer,
  purchase: purchaseReducer,
  report: reportReducer,
  customerRelationship: customerRelationshipReducer,
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