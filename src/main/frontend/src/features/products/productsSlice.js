import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productList: [],
    brand: null,
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
      state.brand = action.payload
    },
    updateSearch: (state, action) => {
      state.searchValue = action.payload
    }
  }
});

export const { updateProductList, updateHasMore, changeProductList, updateBrand, updateSearch } = productsSlice.actions;

export const getNextPageAsync = ({ pageNo, brand, searchValue }) => async dispatch => {
  try {
    if (searchValue === '' || searchValue.length >= 3) {
      const queryParams = { pageNo, brand, searchValue: searchValue || null, limit: 20 };
      const productsResponse = await axios.get('/api/products', { params: queryParams });
      
      const newProductList = productsResponse.data.payload;
  
      if (newProductList.length > 0) {
        dispatch(updateProductList(newProductList));
      } else
        dispatch(updateHasMore(false));
    }
  } catch (err) {
    console.log('Exception while fetching product list: ', err.message);
    dispatch(updateProductList([]));
  }
}

export const getFilteredProductsAsync = (brand, searchValue) => async dispatch => {
  try {
    dispatch(updateSearch(searchValue));
    
    if (searchValue === '' || searchValue.length >= 3) {
      const queryParams = {
        searchValue: searchValue === '' ? null : searchValue, 
        brand,
        pageNo: 0, 
        limit: 20
      }
      const productsResponse = await axios.get('/api/products', { params: queryParams });
      
      dispatch(changeProductList(productsResponse.data.payload));
    }
  } catch (err) {
    console.log('Exception while fetching filtered product list: ', err.message);
    dispatch(changeProductList([]));
  }
}

export const selectProducts = state => state.products.productList;

export const selectBrand = state => state.products.brand;

export const selectHasMore = state => state.products.hasMore;

export const selectSearchValue = state => state.products.searchValue;

export default productsSlice.reducer;