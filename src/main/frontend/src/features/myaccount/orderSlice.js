import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderHistory: [],
    isLoading: true
  },
  reducers: {
    updateOrderHistory: (state, action) => {
      state.orderHistory = action.payload;
      state.isLoading = false;
    },
    updateIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { updateOrderHistory } = orderSlice.actions;

export const fetchUserOrdersAsync = email => async dispatch => {
  try {
    const queryParams = { email };
    const orderHistoryResponse = await axios.get('/api/orders', { params: queryParams });
    // console.log('orderHistoryResponse', orderHistoryResponse);

    dispatch(updateOrderHistory(orderHistoryResponse.data.payload));
  } catch (err) {
    console.log('Error while fetching order history', err.message);
    dispatch(updateOrderHistory([]));
  }
}

export const selectOrderHistory = state => state.orders;

export default orderSlice.reducer;