import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { updateEmailAuthDetails } from '../auth/authSlice';
import { Line } from '../homepage/common/Line';
import { Spinner } from '../utils/Spinner';
import { GLogin } from './GLogin';

const Container = styled.form`
`;

const ForgotPassword = styled.div`
  cursor: pointer;
  text-decoration: underline;
  margin-bottom: 10px;
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
  min-height: 46px;
  border-radius: 5px;
`;

const ErrorMsg = styled.div`
  color: red;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

const Separator = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const OrLabel = styled.div`
  margin: -5px 10px 0 10px;
`;

const SocialMedia = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const GoogleIcon = styled(FcGoogle)`
  cursor: pointer;
`;

export const EmailLoginForm = ({ closeModal, handleShowForgotPassword }) => {
  const dispatch = useDispatch();

  const cookies = new Cookies();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const googleLoginRef = React.createRef();

  const getUserDetails = async (token) => {
    const authHeaders = {
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    }
    try {
      const userDetailsResponse = await axios.get('/auth/user-details', { headers: authHeaders });
      if (userDetailsResponse)
        dispatch(updateEmailAuthDetails(userDetailsResponse.data.payload));
  
    } catch (err) {
      console.log('Error while fetching User details', err.message);
    }
  }
  
  const handleOnLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg('Please enter Email and password');
    } else {
      setErrorMsg(null);
      const headers = { 
        'Content-Type': 'application/json'
      }
      const userDetails = { email, password };
      try {
        setIsLoading(true);
        const loginResponse = await axios.post('/login', userDetails, { headers });
        const token = loginResponse.headers.authorization.split(' ')[1];
        cookies.set('auth_token', token);

        getUserDetails(token);
      } catch (err) {
        setErrorMsg('Invalid login credentials');
        console.log('Exception while authenticating user credentials', err.message);
      }
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <div className='group'>
        <input className='material-input' type='text' autoFocus value={email} onChange={e => setEmail(e.target.value)} required />
        <span className='highlight'></span>
        <span className='bar'></span>
        <label className='material-label'>Email</label>
      </div>
        
      <div className='group'>      
        <input className='material-input' type='password' value={password} onChange={e => setPassword(e.target.value)} required />
        <span className='highlight'></span>
        <span className='bar'></span>
        <label className='material-label'>Password</label>
      </div>

      <ForgotPassword onClick={() => handleShowForgotPassword()}>Forgot password?</ForgotPassword>

      <Button onClick={handleOnLogin} disabled={isLoading}>
        {!isLoading && 'Log In'}
        {isLoading ? 
          <Spinner loaderStyle={{ fontSize: '15px', color: '#FFF' }} /> : 
          null}
        </Button>

      <ErrorMsg>{errorMsg}</ErrorMsg>

      <Separator>
        <Line style={{ width: '100px', marginLeft: '0', marginRight: '0' }}/>
        <OrLabel>or login with</OrLabel>
        <Line style={{ width: '100px', marginLeft: '0', marginRight: '0' }}/>
      </Separator>

      <SocialMedia>
        <GoogleIcon size='2em' onClick={() => googleLoginRef.current.click()} />
        <GLogin ref={googleLoginRef} style={{ visibility: 'hidden' }} closeModal={closeModal} />
      </SocialMedia>
    </Container>
  )
}
