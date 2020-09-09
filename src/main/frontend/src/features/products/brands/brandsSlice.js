import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const brandsSlice = createSlice({
  name: 'brands',
  initialState: {
    brandList: [],
    isLoading: false
  },
  reducers: {
    updateBrandsList: (state, action) => {
      state.brandList = action.payload;
      state.isLoading = false;
    },
    updateLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { updateBrandsList, updateLoading } = brandsSlice.actions;

export const fetchBrandsAsync = () => async dispatch => {
  try {
    dispatch(updateLoading(true));
    const brandsResponse = await axios.get('/api/products/brands');
    dispatch(updateBrandsList(brandsResponse.data.payload));
  } catch (err) {
    console.log('Exception while fetching brands: ', err.message);
    dispatch(updateBrandsList([]));
  }
}

export const selectBrands = state => state.brands;

export default brandsSlice.reducer;