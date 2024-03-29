// store.js
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Reducers
import userReducer from './reducers/userReducer';
import contactReducer from './reducers/contactReducer';

const rootReducer = combineReducers({
  user: userReducer,
  contacts: contactReducer,
});

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(rootReducer);
// export const persistor = persistStore(store);
