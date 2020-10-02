import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Input } from '../utils/Input';
import { isValidEmail } from '../utils/Utils';
import { Spinner } from '../utils/Spinner';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 300px;
  background-color: #232162;
  color: #FFF;
  border: none;
  padding: 15px 0;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  margin-bottom: 10px;
  min-height: 46px;
  border-radius: 5px;
`;

const Message = styled.div`
  color: #ff0000c7;
  font-size: 14px;
`;

export const ForgotPassword = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isResetted, setIsResetted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnResetPassword = async () => {
    if (!isValidEmail(email)) {
      setMessage('Double check your Email and try again.');
    } else {
      setIsLoading(true);
      const headers = { 'Content-Type': 'application/json' };
      const forgotPasswordResponse = await axios.post('/api/users/forgot-password', { email }, { headers });

      if (forgotPasswordResponse.data.status === 200 && forgotPasswordResponse.data.payload) {
        setMessage('We\'ve emailed you a link to reset your password.');
        setIsResetted(true);
      } else {
        setMessage(forgotPasswordResponse.data.msg);
      }
    }
    setIsLoading(false);
    setTimeout(() => setMessage(null), 20000);
  }

  return (
    <div>
      {!isResetted && 
        <Input 
          styleObj={{}} 
          value={email} 
          onKeyDown={e => e.keyCode === 13 && handleOnResetPassword()} 
          handleOnChange={e => setEmail(e.target.value.toLowerCase())} 
          isRequired={true} 
          label='Email' 
          autoFocus={true}
        />}

      <ButtonWrapper>
        {isResetted ? 
          <Button onClick={closeModal}>Close</Button> :
          <Button onClick={handleOnResetPassword}>
            {!isLoading && 'Reset Password'}
            {isLoading && 
            <Spinner loaderStyle={{ fontSize: '15px', color: '#FFF' }} />}
          </Button>
        }

        <Message style={message === 'We\'ve emailed you a link to reset your password.' ? { color: 'green'} : null}>{message}</Message>
      </ButtonWrapper>
    </div>
  )
}
