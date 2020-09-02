import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import styled from 'styled-components';

import { updateGoogleAuthDetails } from './authSlice';


const LogoutButton = styled.div`
  background: #FFFFFF;
  color: black;
  font-size: 12px;
  border: 1px solid #00000057;
  border-radius: 3px;
  height: 37px;
  width: 125px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const GLogout = () => {

  const dispatch = useDispatch();


  const logoutGoogle = (response) => {
    console.log('logoutGoogle', response);
    dispatch(updateGoogleAuthDetails({
      name: null,
      email: null,
      imageUrl: null,
      token: null
    }));
  }

  const handleLogout = () => {
    console.log('handleLogout')
  }

  return (
    <GoogleLogout
      clientId='986336171098-rg0moedjfn2d36edpggc8o80lt1fsecb.apps.googleusercontent.com'
      buttonText='Logout'
      onLogoutSuccess={logoutGoogle}
      render={renderProps => (
        <div onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <LogoutButton 
            onClick={handleLogout}
          >
            <span>SIGN OUT</span>
          </LogoutButton>
        </div>
      )}
    />
  )
}
