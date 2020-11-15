import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const adminProductListSlice = createSlice({
  name: 'admin_product_list',
  initialState: {
    adminProductList: [],
    searchValue: '',
    hasMore: true
  },
  reducers: {
    changeAdminProductList: (state, action) => {
      state.adminProductList = [...action.payload];
    },
    updateAdminProductList: (state, action) => {
      state.adminProductList = [...state.adminProductList, ...action.payload];
    },
    updateHasMore: (state, action) => {
      state.hasMore = action.payload
    },
    updateSearch: (state, action) => {
      state.searchValue = action.payload
    }
  }
});

export const { changeAdminProductList, updateAdminProductList, updateHasMore, updateSearch } = adminProductListSlice.actions;

export const getNextPageAsync = ({ searchValue, pageNo }) => async dispatch => {
  try {
    const queryParams = { pageNo, searchValue: (searchValue === '' ? null : searchValue), limit: 20 };
    const adminProductListResponse = await axios.get('/api/products', { params: queryParams });
    
    const newAdminProductList = adminProductListResponse.data.payload;

    if (newAdminProductList.length > 0) {
      if (pageNo === 0)
        dispatch(changeAdminProductList(newAdminProductList));
      else
        dispatch(updateAdminProductList(newAdminProductList));
    } else
      dispatch(updateHasMore(false));
    
  } catch (err) {
    console.log('Exception while fetching admin product list: ', err.message);
    dispatch(updateAdminProductList([]));
  }
}

export const selectAdminProducts = state => state.adminProducts.adminProductList;

export const selectAdminHasMore = state => state.adminProducts.hasMore;

export const selectAdminSearchValue = state => state.adminProducts.searchValue;

export default adminProductListSlice.reducer;