import { createSlice } from '@reduxjs/toolkit';

const initialGoogleAuth = {
  name: null,
  email: null,
  imageUrl: null,
  phoneNumber: null,
  token: null
};

const initialEmailAuth = {
  name: null,
  email: null,
  phoneNumber: null,
  imageUrl: null
}


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    googleAuth: initialGoogleAuth,
    emailAuth: initialEmailAuth,
    isLoading: false
  },
  reducers: {
    updateGoogleAuthDetails: (state, action) => {
      state.googleAuth = action.payload;

      state.emailAuth = initialEmailAuth;
      state.isLoading = false;
    },
    resetGoogleAuthDetails: (state, action) => {
      state.googleAuth = initialGoogleAuth;
      state.isLoading = false;
    },
    updateEmailAuthDetails: (state, action) => {
      state.emailAuth.email = action.payload.email;
      state.emailAuth.name = action.payload.name;
      state.emailAuth.phoneNumber = action.payload.phoneNumber;

      state.googleAuth = initialGoogleAuth;
      state.isLoading = false;
    },
    logoutUserAction: (state, action) => {
      state.emailAuth = initialEmailAuth;
      state.googleAuth = initialGoogleAuth;
      state.isLoading = false;
    }
  }
});

export const { updateGoogleAuthDetails, resetGoogleAuthDetails, updateEmailAuthDetails, logoutUserAction } = authSlice.actions;

export const selectGoogleAuth = state => state.auth.googleAuth;

export const selectEmailAuth = state => state.auth.emailAuth;

export default authSlice.reducer;