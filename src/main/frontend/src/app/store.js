import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import brandsReducer from '../features/products/brands/brandsSlice';
import productsReducer from '../features/products/productsSlice';
import orderReducer from '../features/myaccount/orderSlice';
import adminProductListReducer from '../features/admin/products/adminProductListSlice';
import adminProductListReducer2 from '../features/admin/products/adminProductListSlice2';

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    brands: brandsReducer,
    products: productsReducer,
    orders: orderReducer,
    adminProducts: adminProductListReducer,
    adminProducts2: adminProductListReducer2,
    counter: counterReducer
  },
});
