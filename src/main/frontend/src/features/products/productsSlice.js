import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productList: [],
    brand: null,
    division: null,
    searchValue: '',
    hasMore: true,
  },
  reducers: {
    updateProductList: (state, action) => {
      state.productList = [...state.productList, ...action.payload];
    },
    updateHasMore: (state, action) => {
      state.hasMore = action.payload
    },
    changeProductList: (state, action) => {
      state.productList = [...action.payload];
    },
    updateBrand: (state, action) => {
      state.brand = action.payload;
    },
    updateDivision: (state, action) => {
      state.hasMore = true;
      state.division = action.payload;
    },
    updateSearch: (state, action) => {
      state.searchValue = action.payload
    }
  }
});

export const { updateProductList, updateHasMore, changeProductList, updateBrand, updateDivision, updateSearch } = productsSlice.actions;

export const getNextPageAsync = ({ brand, division, searchValue, pageNo }) => async dispatch => {
  try {
    const queryParams = { pageNo, brand, division, searchValue: (searchValue === '' ? null : searchValue), limit: 20 };
    const productsResponse = await axios.get('/api/products', { params: queryParams });
    
    const newProductList = productsResponse.data.payload;

    if (newProductList.length > 0) {
      if (pageNo === 0)
        dispatch(changeProductList(newProductList));
      else
        dispatch(updateProductList(newProductList));
    } else
      dispatch(updateHasMore(false));
    
  } catch (err) {
    console.log('Exception while fetching product list: ', err.message);
    dispatch(updateProductList([]));
  }
}

export const selectProducts = state => state.products.productList;

export const selectBrand = state => state.products.brand;

export const selectDivision = state => state.products.division;

export const selectHasMore = state => state.products.hasMore;

export const selectSearchValue = state => state.products.searchValue;

export default productsSlice.reducer;