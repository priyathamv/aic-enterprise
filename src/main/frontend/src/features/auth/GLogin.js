import React from 'react';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import axios from 'axios';

import { FcGoogle } from 'react-icons/fc';
import { updateGoogleAuthDetails, resetGoogleAuthDetails } from './authSlice';

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

  const saveUserDetails = (userDetails) => {
    const headers = { 
      'Content-Type': 'application/json'
    }
    axios.post('/api/users/save', userDetails, { headers });
  }

  const googleSuccessCallback = (response) => {
    try {
      
      const token = (response.Zi && response.Zi.id_token) ? 
        response.Zi.id_token : 
        (response.tokenId) ? 
        response.tokenId :
        (response.uc && response.uc.id_token) ?
        response.uc.id_token : null;

      const userDetails = {
        name: response.profileObj.name,
        email: response.profileObj.email,
        imageUrl: response.profileObj.imageUrl,
        token
      }

      saveUserDetails(userDetails);
      dispatch(updateGoogleAuthDetails(userDetails));
    } catch(err) {
      console.log("Error while authenticating User: ", err);
    }
    closeModal();
  }

  const googleFailureCallback = (response) => {
    console.log('Google login failed', response);
    dispatch(resetGoogleAuthDetails());
    closeModal();
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
      isSignedIn={true}
      cookiePolicy={'single_host_origin'}
    />
  )
});
