import React from 'react';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";

import { FcGoogle } from 'react-icons/fc';
import { updateGoogleAuthDetails, updateIsLoading } from './authSlice';
import { logoutUserAction } from '../auth/authSlice';

const GoogleButton = styled.button`
  background-color: #4285F4;
  border: none;
  border-radius: 0;
  color: #FFF;
  width: 300px;
  font-size: 14px;
  text-align: center;
  padding: 10px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  height: 50px;
  margin-bottom: 30px;
`;

const GoogleIcon = styled(FcGoogle)`
  background-color: white;
  padding: 5px;
  position: absolute;
  left: 10px;
`;

export const GLogin = React.forwardRef(({ label, style, closeModal }, ref) => {
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const saveUserDetails = async (userDetails) => {
    const headers = { 
      'Content-Type': 'application/json'
    }
    try {
      const savedUserResponse = await axios.post('/api/users/save', userDetails, { headers });
      return savedUserResponse.data.payload;
    } catch (err) {
      console.log('Error while saving user', err.message);
    }
    return null;
  }

  const googleSuccessCallback = async response => {
    console.log('Google login success =>', response);
    dispatch(updateIsLoading(true));

    try {
      
      const token = (response.Zi && response.Zi.id_token) ? 
        response.Zi.id_token : 
        (response.tokenId) ? 
        response.tokenId :
        (response.uc && response.uc.id_token) ?
        response.uc.id_token : null;

      const userDetails = {
        firstName: response.profileObj.familyName,
        lastName: response.profileObj.givenName,
        email: response.profileObj.email,
        imageUrl: response.profileObj.imageUrl,
        token
      }

      const savedUser = await saveUserDetails(userDetails);

      // Relacing Users Google image with his custom image
      const userDetailsUpdated = { 
        ...userDetails, 
        imageUrl: (savedUser.imageUrl ? savedUser.imageUrl : userDetails.imageUrl),
        phoneNumber: savedUser.phoneNumber,
        addressList: (savedUser.addressList ? savedUser.addressList : [])
      };

      dispatch(updateGoogleAuthDetails(userDetailsUpdated));
    } catch(err) {
      console.log("Error while authenticating User: ", err);
    }
    dispatch(updateIsLoading(false));
    loginRedirect();
    // closeModal && closeModal();
  }

  const loginRedirect = () => {
    history.push(location.pathname === '/login' ? '/' : location.pathname + location.search);
  }

  const googleFailureCallback = (response) => {
    console.log('Google login failed =>', response);
    if (response.error === 'popup_closed_by_user') {
      console.log('Please enable 3rd party cookies or add an exception for stackblitz.io to resolve.')
    } else {
      dispatch(logoutUserAction());
      // closeModal && closeModal();
    }
    loginRedirect();
  }

  return (
    <GoogleLogin
      clientId='986336171098-rg0moedjfn2d36edpggc8o80lt1fsecb.apps.googleusercontent.com'
      render={renderProps => (
        <GoogleButton ref={ref} style={style} onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <GoogleIcon size='1.3em' />
          <span>{label}</span>
        </GoogleButton>
      )}
      onSuccess={googleSuccessCallback}
      onFailure={googleFailureCallback}
      onAutoLoadFinished={() => dispatch(updateIsLoading(false))}
      isSignedIn={true}
      cookiePolicy={'single_host_origin'}
    />
  )
});
