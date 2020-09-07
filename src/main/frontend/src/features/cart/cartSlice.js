import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showCartPage: false,
    items: [1, 1, 1]
  },
  reducers: {
    displayCartPage: (state, action) => {
      state.showCartPage = action.payload;
    }
  }
});

export const { displayCartPage } = cartSlice.actions;

export const selectShowCartPage = state => state.cart.showCartPage;
export const selectCartItems = state => state.cart.items;

export default cartSlice.reducer;