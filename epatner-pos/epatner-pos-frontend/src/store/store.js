// store.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Import your reducers
import userReducer from './reducers/userReducer';

// Combine all reducers (if you have more in the future, add them here)
const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here
});

// Middleware array
const middleware = [thunk];

// Create Redux store with reducers, middleware, and dev tools
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;