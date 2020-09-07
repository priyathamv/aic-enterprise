import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    counter: counterReducer
  },
});
