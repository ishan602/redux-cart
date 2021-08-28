import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import uiReducers from './ui-slice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducers,
  },
});

export default store;
