import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
    updateUserCart: (state, action) => {
      state.items = action.payload;
    },
    clearCart: (state, action) => {
      state.items = []
    }
  }
});

export const { displayCartPage, addItemToCart, updateUserCart, clearCart } = cartSlice.actions;

// Single method to update/delete the cart items and persist in the DB
export const updateUserCartAsync = (actionType, userEmail, cartItemsOld, data) => async dispatch => {
  let cartItemsNew;

  if (actionType === 'UPDATE_CART_ITEM') {
    cartItemsNew = [...cartItemsOld];
    const itemIndexToBeUpdated = cartItemsOld.findIndex(curItem => curItem.code === data.code);

    if (itemIndexToBeUpdated >= 0) 
      cartItemsNew[itemIndexToBeUpdated] = data;
    else
      cartItemsNew.push(data);

  } else if (actionType === 'DELETE_CART_ITEM') {
    cartItemsNew = cartItemsOld.filter(curItem => curItem.code !== data);; 
  }

  dispatch(updateUserCart(cartItemsNew));

  if (userEmail) {
    persistUserCart({ email: userEmail, cartItems: cartItemsNew });
  } else {
    saveUserCartInLocalStorage(cartItemsNew);
    // save the user cart in local storage
  }
}

const persistUserCart = async payload => {
  const headers = { 
    'Content-Type': 'application/json'
  }

  try {
    const cartSaveResponse = await axios.post('/api/cart/save', payload, { headers });
    console.log('cartSaveResponse', cartSaveResponse);
  } catch(err) {
    console.log('Error while saving user cart', err.message);
  }
}

const saveUserCartInLocalStorage = cartItems => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


export const fetchUserCart = email => async dispatch => {
  try {
    const queryParams = { email };
    const userCartResponse = await axios.get('/api/cart', { params: queryParams });
    console.log('userCartResponse', userCartResponse);

    const cartItemsDb = userCartResponse.data.payload.cartItems || [];
    
    const cartItemsLsString = localStorage.getItem('cartItems');
    const cartItemsLs = cartItemsLsString ? JSON.parse(cartItemsLsString) : [];
    
    const mergedItems = mergeUserCarts(cartItemsDb, cartItemsLs);
    localStorage.removeItem('cartItems');

    dispatch(updateUserCart(mergedItems));
  } catch (err) {
    console.log('Exception while fetching user cart', err.message);
    dispatch(updateUserCart([]));
  }
}

const mergeUserCarts = (dbCart, lsCart) => {
  let mergedUserCart = [];

  lsCart.forEach(lsItem => {
    const dbItemInLs = dbCart.find(dbItem => dbItem.code === lsItem.code);
    if (dbItemInLs) {
      mergedUserCart.push(Object.assign(lsItem, dbItemInLs));
    } else {
      mergedUserCart.push(lsItem);
    }
  });

  dbCart.forEach(dbItem => {
    const commonItem = lsCart.find(lsItem => lsItem.code === dbItem.code);
    commonItem || mergedUserCart.push(dbItem);
  });

  return mergedUserCart;
}

export const fetchUserCartFromLocalStorage = () => dispatch => {
  const cartItems = localStorage.getItem('cartItems');
  dispatch(updateUserCart(cartItems ? JSON.parse(cartItems) : []));
}

export const placeOrderAsync = async payload => {
  const headers = { 
    'Content-Type': 'application/json'
  }

  try {
    const placeOrderResponse = await axios.post('/api/cart/place-order', payload, { headers });
    console.log('placeOrderResponse', placeOrderResponse);

    const clearUserCartResponse = await persistUserCart({ email: payload.email, name: payload.name, cartItems: [] });
    console.log('clearUserCartResponse', clearUserCartResponse);
  } catch(err) {
    console.log('Error while placing order', err.message);
  }
}

export const selectShowCartPage = state => state.cart.showCartPage;
export const selectCartItems = state => state.cart.items;

export default cartSlice.reducer;