import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

import { Line } from '../homepage/common/Line';
import { Spinner } from '../utils/Spinner';
import { GLogin } from './GLogin';

const Container = styled.form`
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

const Message = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
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


export const EmailSignUpForm = ({ closeModal }) => {
  const googleLoginRef = React.createRef();
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSignUp = async (e) => {
    e.preventDefault();

    if (!(name && email && phoneNumber && password && confirmPassword)) {
      setMessage('All fields are mandatory');
    } else if (password !== confirmPassword) {
      setMessage('The Passwords you entered do not match');
    } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setMessage('Invalid E-mail address');
    } else if (password.length < 8) {
      setMessage('Password is too short (minimum is 8 characters)');
    } else {
      setMessage(null);
      const headers = { 
        'Content-Type': 'application/json'
      }

      // Splitting name into firstName and lastName
      var [firstName, lastName = ''] = name.split(/ (.+)/);

      const userDetails = { firstName, lastName, email, phoneNumber, password };
      try {
        setIsLoading(true);
        const signUpResponse = await axios.post('/api/users/sign-up', userDetails, { headers });
        
        if (signUpResponse.data.status === 409) {
          setMessage('This Email address is already registered');
        } else if (signUpResponse.data.status === 200) {
          setMessage('Email sent, check your inbox to confirm');
          setTimeout(() => history.push('/'), 15000);
        } else {
          setMessage('Something went wrong, try again later');
        }
      } catch (err) {
        console.log('Exception while siging up the user', err.message);
      }
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <div className='group'>
        <input className='material-input' type='text' value={name} autoFocus onChange={e => setName(e.target.value)} required />
        <span className='highlight'></span>
        <span className='bar'></span>
        <label className='material-label'>Name*</label>
      </div>

      <div className='group'>
        <input className='material-input' type='text' value={email} onChange={e => setEmail(e.target.value.toLowerCase())} required />
        <span className='highlight'></span>
        <span className='bar'></span>
        <label className='material-label'>Email*</label>
      </div>

      <div className='group'>
        <input className='material-input' type='text' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
        <span className='highlight'></span>
        <span className='bar'></span>
        <label className='material-label'>Phone No*</label>
      </div>
        
      <div className='group'>      
        <input className='material-input' type='password' value={password} onChange={e => setPassword(e.target.value)} required />
        <span className='highlight'></span>
        <span className='bar'></span>
        <label className='material-label'>Password*</label>
      </div>

      <div className='group'>      
        <input className='material-input' type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        <span className='highlight'></span>
        <span className='bar'></span>
        <label className='material-label'>Confirm Password*</label>
      </div>

      <Button onClick={handleOnSignUp} disabled={isLoading || (message === 'Email sent, check your inbox to confirm')} >
        {!isLoading && 'Sign Up'}
        {isLoading ? 
          <Spinner loaderStyle={{ fontSize: '15px', color: '#FFF' }} /> : 
          null}
      </Button>

      <Message style={ message === 'Email sent, check your inbox to confirm' ? { color: 'green'} : null }>
        {message}
      </Message>

      <Separator>
        <Line style={{ width: '100px', marginLeft: '0', marginRight: '0' }}/>
        <OrLabel>or sign up with</OrLabel>
        <Line style={{ width: '100px', marginLeft: '0', marginRight: '0' }}/>
      </Separator>

      <SocialMedia>
        <GoogleIcon size='2em' onClick={() => googleLoginRef.current.click()} />
        <GLogin ref={googleLoginRef} style={{ visibility: 'hidden' }} closeModal={closeModal} />
      </SocialMedia>
    </Container>
  )
}
