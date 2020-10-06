import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
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
  // font-size: 14px;
`;

const SendMail = styled.div`
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  text-align: center;
  margin-bottom: 10px;
  color: #232162;
`;

const Message = styled.div`
  font-size: 14px;
  color: green;
  text-align: center;
  margin-bottom: 10px;
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
  const history = useHistory();

  const cookies = new Cookies();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [message, setMessage] = useState(false);

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

        const loginResponse = await axios.get(`/api/users/is-valid-email?email=${email}`);

        if (loginResponse.data.payload === null) {
          setErrorMsg('Email not registered');
        } else if (loginResponse.data.payload === false) {
          setErrorMsg('Email not verified');
        } else {
          const loginResponse = await axios.post('/login', userDetails, { headers });
          if (loginResponse.status === 401) {
            setErrorMsg('Invalid login credentials');
          } else {
            const token = loginResponse.headers.authorization.split(' ')[1];
            cookies.set('auth_token', token);
    
            await getUserDetails(token);
            history.push('/');
          }
        } 
      } catch (err) {
        console.log('err', err)
        setErrorMsg('Invalid login credentials');
        console.log('Exception while authenticating user credentials', err.message);
      }
      setIsLoading(false);
    }
  }

  const handleSendMail = async () => {
    setErrorMsg(null);

    const headers = { 'Content-Type': 'application/json' };
    const mailResponse = await axios.post('/api/users//send-confirm-email', { email }, { headers });
    console.log('mailResponse', mailResponse);

    setMessage(true);
  }

  return (
    <Container>
      <div className='group'>
        <input className='material-input' type='text' autoFocus value={email} onChange={e => setEmail(e.target.value.toLowerCase())} required />
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

      {errorMsg === 'Email not verified' && 
      <SendMail onClick={handleSendMail}>Click here to get verification mail again</SendMail>}

      {message && <Message>Email sent, check your inbox to confirm</Message>}

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
