import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import styled from 'styled-components';

import { resetGoogleAuthDetails } from './authSlice';


const LogoutButton = styled.div`
  cursor: pointer;
  padding: 15px 20px;
  text-align: left;
  &:hover {
    background-color: #017acd0a
  }
`;


export const GLogout = () => {

  const dispatch = useDispatch();


  const logoutGoogle = (response) => {
    dispatch(resetGoogleAuthDetails());
  }

  const handleLogout = () => {
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
            <span>Log Out</span>
          </LogoutButton>
        </div>
      )}
    />
  )
}
