import React from 'react';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';

import { Line } from '../homepage/common/Line';

const Container = styled.form`
`;

const Button = styled.button`
  width: 300px;
  background-color: #7795a3;
  color: #FFF;
  border: none;
  padding: 15px 0;
  font-size: 14px;
  margin-bottom: 30px;
  cursor: pointer;
`;

const Separator = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const OrLabel = styled.div`
  margin: -5px 10px 0 10px;
`;

const SocialMedia = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GoogleIcon = styled(FcGoogle)`
  cursor: pointer;
`;


export const EmailSignUpForm = () => {
  return (
    <Container>
      <div className='group'>
        <input type='text' required />
        <span className='highlight'></span>
        <span className='bar'></span>
        <label>Name</label>
      </div>

      <div className='group'>
        <input type='text' required />
        <span className='highlight'></span>
        <span className='bar'></span>
        <label>Email</label>
      </div>

      <div className='group'>
        <input type='text' required />
        <span className='highlight'></span>
        <span className='bar'></span>
        <label>Phone No</label>
      </div>
        
      <div className='group'>      
        <input type='password' required />
        <span className='highlight'></span>
        <span className='bar'></span>
        <label>Password</label>
      </div>

      <Button>Sign Up</Button>

      <Separator>
        <Line style={{ width: '100px', marginLeft: '0', marginRight: '0' }}/>
        <OrLabel>or sign up with</OrLabel>
        <Line style={{ width: '100px', marginLeft: '0', marginRight: '0' }}/>
      </Separator>

      <SocialMedia>
        <GoogleIcon size='2em' />
      </SocialMedia>
    </Container>
  )
}
