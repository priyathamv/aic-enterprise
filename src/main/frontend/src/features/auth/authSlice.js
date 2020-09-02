import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    googleAuth: {
      name: null,
      email: null,
      imageUrl: null,
      token: null
    },
    isLoading: false
  },
  reducers: {
    updateGoogleAuthDetails: (state, action) => {
      state.googleAuth = action.payload;
      state.isLoading = false;
    },
    
  }
});

export const { updateGoogleAuthDetails } = authSlice.actions;

export const selectGoogleAuth = state => state.auth.googleAuth;

export default authSlice.reducer;