import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showCartPage: false,
    items: []
  },
  reducers: {
    displayCartPage: (state, action) => {
      state.showCartPage = action.payload;
    },
    deleteItemFromCart: (state, action) => {
      state.items = state.items.filter(curItem => curItem.id !== action.payload);
    },
    updateItemInCart: (state, action) => {
      const itemIndex = state.items.findIndex(curItem => curItem.id === action.payload.id);

      if (itemIndex >= 0) 
        state.items[itemIndex] = action.payload;
      else
        state.items.push(action.payload);
    }
  }
});

export const { displayCartPage, addItemToCart, deleteItemFromCart, updateItemInCart } = cartSlice.actions;

export const selectShowCartPage = state => state.cart.showCartPage;
export const selectCartItems = state => state.cart.items;

export default cartSlice.reducer;