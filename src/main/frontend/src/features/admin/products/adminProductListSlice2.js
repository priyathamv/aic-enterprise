import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const adminProductListSlice2 = createSlice({
  name: 'admin_product_list2',
  initialState: {
    adminProductList: [],
    searchValue: '',
    hasMore: true
  },
  reducers: {
    changeAdminProductList: (state, action) => {
      state.adminProductList = [...action.payload];
      state.hasMore = (action.payload && action.payload.length) > 0 ? true : false;
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

export const { changeAdminProductList, updateAdminProductList, updateHasMore, updateSearch } = adminProductListSlice2.actions;

export const getNextPageAsync = ({ category, brand, searchValue, pageNo }) => async dispatch => {
  try {
    const queryParams = { pageNo, brand, searchValue: (searchValue === '' ? null : searchValue), limit: 20 };
    
    const url = (category === 'Analytical') ? '/api/analytical-products' : '/api/featured-products';
    const adminProductListResponse = await axios.get(url, { params: queryParams });
    
    const newAdminProductList = adminProductListResponse.data.payload;

    if (newAdminProductList.length === 0) {
      if (pageNo === 0)
        dispatch(changeAdminProductList([]));
      else
        dispatch(updateHasMore(false));  
    } else if (newAdminProductList.length > 0) {
      if (pageNo === 0)
        dispatch(changeAdminProductList(newAdminProductList));
      else
        dispatch(updateAdminProductList(newAdminProductList));
    }
    
  } catch (err) {
    console.log('Exception while fetching admin product list: ', err.message);
    dispatch(updateAdminProductList([]));
  }
}

export const selectAdminProducts = state => state.adminProducts2.adminProductList;

export const selectAdminHasMore = state => state.adminProducts2.hasMore;

export const selectAdminSearchValue = state => state.adminProducts2.searchValue;

export default adminProductListSlice2.reducer;