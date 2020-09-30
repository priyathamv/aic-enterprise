import { createSlice } from '@reduxjs/toolkit';

const initialGoogleAuth = {
  firstName: '',
  lastName: '',
  email: '',
  imageUrl: '',
  phoneNumber: '',
  token: '',
  addressList: []
};

const initialEmailAuth = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  imageUrl: '',
  addressList: []
}


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    googleAuth: initialGoogleAuth,
    emailAuth: initialEmailAuth,
    isLoading: true
  },
  reducers: {
    updateGoogleAuthDetails: (state, action) => {
      state.googleAuth.email = action.payload.email;
      state.googleAuth.firstName = action.payload.firstName;
      state.googleAuth.lastName = action.payload.lastName ? action.payload.lastName : '';
      state.googleAuth.imageUrl = action.payload.imageUrl;
      state.googleAuth.phoneNumber = action.payload.phoneNumber;
      state.googleAuth.addressList = action.payload.addressList;

      state.emailAuth = initialEmailAuth;
      state.isLoading = false;
    },
    updateEmailAuthDetails: (state, action) => {
      state.emailAuth.email = action.payload.email;
      state.emailAuth.firstName = action.payload.firstName;
      state.emailAuth.lastName = action.payload.lastName ? action.payload.lastName : '';
      state.emailAuth.imageUrl = action.payload.imageUrl;
      state.emailAuth.phoneNumber = action.payload.phoneNumber;
      state.emailAuth.addressList = action.payload.addressList ? action.payload.addressList : [];

      state.googleAuth = initialGoogleAuth;
      state.isLoading = false;
    },
    updateUserImage: (state, action) => {
      if (state.emailAuth.email)
        state.emailAuth.imageUrl = action.payload;
      else if (state.googleAuth.email)
        state.googleAuth.imageUrl = action.payload;
    },
    updateIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    logoutUserAction: (state, action) => {
      localStorage.removeItem('cartItems');
      state.emailAuth = initialEmailAuth;
      state.googleAuth = initialGoogleAuth;
      state.isLoading = false;
    }
  }
});

export const { updateGoogleAuthDetails, updateEmailAuthDetails, updateUserImage, updateIsLoading, logoutUserAction } = authSlice.actions;

export const selectGoogleAuth = state => state.auth.googleAuth;

export const selectEmailAuth = state => state.auth.emailAuth;

export const selectUserEmail = state => state.auth.googleAuth.email || state.auth.emailAuth.email || null;

export const selectUserImage = state => state.auth.googleAuth.imageUrl || state.auth.emailAuth.imageUrl || null;

export const selectUserDetails = state => state.auth.googleAuth.email ? state.auth.googleAuth : state.auth.emailAuth;

export const selectIsLoading = state => state.auth.isLoading;

export const selectUserName = state => {
  if (state.auth.googleAuth.firstName)
    return `${state.auth.googleAuth.firstName} ${state.auth.googleAuth.lastName}`.trim();
  else if (state.auth.emailAuth.firstName)
    return `${state.auth.emailAuth.firstName} ${state.auth.emailAuth.lastName}`.trim();
  return null;
}

export default authSlice.reducer;