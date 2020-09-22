import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Popup from 'reactjs-popup';

import { Input } from '../utils/Input';
import { Spinner } from '../utils/Spinner';

const Header = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const SubHeader = styled.div`
  margin-bottom: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 300px;
  background-color: #7795a3;
  color: #FFF;
  border: none;
  padding: 15px 0;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  margin-bottom: 10px;
`;

const Message = styled.div`
  color: #ff0000c7;
  font-size: 14px;
`;

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetPasswordToken = new URLSearchParams(window.location.search).get("token");

  const handlePasswordChange = async () => {
    if (password.length < 8)
      setMessage('Password is too short (minimum is 8 characters)');
    else if (password !== confirmPassword)
      setMessage('The Passwords you entered do not match');
    else {
      setIsLoading(true);
      const headers = { 'Content-Type': 'application/json' };
      const resetPasswordResponse = await axios.post('/api/users/reset-password', { password, resetPasswordToken }, { headers });

      if (resetPasswordResponse.data.status === 200) {
        setMessage('Your password has been reset');
        setTimeout(() => window.location.href = '/', 5000);
      } else {
        setMessage('It appears that this link has expired');
      }
      setIsLoading(false);
    }
  }

  return (
    <Popup
      modal
      lockScroll={true}
      overlayStyle={{ overflow: 'scroll', zIndex: 100000 }}
      contentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15vh 15vw', width: '100vw', height: '100%' }}
      defaultOpen={true}
    >
      {close => (
        <>
          <Header>Reset Password</Header>
          <SubHeader>Enter your new password below</SubHeader>

          <Input type='password' styleObj={{ display: 'flex', width: '300px' }} value={password} handleOnChange={e => setPassword(e.target.value)} isRequired={true} label='Password' />

          <Input type='password' styleObj={{ display: 'flex', width: '300px' }} value={confirmPassword} handleOnChange={e => setConfirmPassword(e.target.value)} isRequired={true} label='Confirm Password' />
          <ButtonWrapper>
            <Button onClick={handlePasswordChange}>
              Reset Password
              {isLoading && 
              <Spinner 
                containerStyle={{ top: 0, justifyContent: 'flex-end', right: '15px' }} 
                loaderStyle={{ fontSize: '15px', color: '#FFF' }} 
              />}
            </Button>
    
            <Message style={message === 'Your password has been reset' ? { color: 'green'} : null}>{message}</Message>
          </ButtonWrapper>
        </>
      )}
    </Popup>
  )
}
