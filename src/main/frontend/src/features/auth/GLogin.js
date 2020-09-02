import React from 'react';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';

import { updateGoogleAuthDetails } from './authSlice';

const GoogleButton = styled.button`
  background: #FFFFFF;
  color: black;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #00000057;
  padding: 5px 12px 5px 8px;
  border-radius: 3px;
  height: 37px;
  width: 125px;
  cursor: pointer;
`;

const GoogleImage = styled.img`
  width: 25px;
  marginRight: 5px;
`;

export const GLogin = () => {

  const dispatch = useDispatch();

  const googleSuccessCallback = (response) => {
    try {
      
      const token = (response.Zi && response.Zi.id_token) ? 
        response.Zi.id_token : 
        (response.tokenId) ? 
        response.tokenId :
        (response.uc && response.uc.id_token) ?
        response.uc.id_token : null;

      dispatch(updateGoogleAuthDetails({
        name: response.profileObj.name,
        email: response.profileObj.email,
        imageUrl: response.profileObj.imageUrl,
        token
      }));
      
      console.log('token', token);
    } catch(err) {
      console.log("Error while authenticating User: ", err);
    }
  }

  const googleFailureCallback = (response) => {
    console.log('Google login failed', response);
    dispatch(updateGoogleAuthDetails({
      name: null,
      email: null,
      imageUrl: null,
      token: null
    }));
  }

  return (
    <GoogleLogin
      clientId='986336171098-rg0moedjfn2d36edpggc8o80lt1fsecb.apps.googleusercontent.com'
      render={renderProps => (
        <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <GoogleImage 
            alt=' '
            src='https://firebasestorage.googleapis.com/v0/b/damn-coder-images.appspot.com/o/images%2Fgoogle_icon.jpg?alt=media&token=4b736c39-a096-47af-aa9f-f300acfbbb2c'/>
          <span>Google login</span>
        </GoogleButton>
      )}
      onSuccess={googleSuccessCallback}
      onFailure={googleFailureCallback}
      isSignedIn={true}
      cookiePolicy={'single_host_origin'}
    />
  )
}
