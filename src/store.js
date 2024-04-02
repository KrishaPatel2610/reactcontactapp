// store.js
import { createStore, combineReducers } from 'redux';

// Reducers
import userReducer from './reducers/userReducer';
import contactReducer from './reducers/contactReducer';

const rootReducer = combineReducers({
  userReducer,
  contactReducer,
});

export const store = createStore(rootReducer);
