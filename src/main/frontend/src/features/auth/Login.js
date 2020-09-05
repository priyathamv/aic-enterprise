import React, { useState } from 'react';
import styled from 'styled-components';

import { GLogin } from './GLogin';
import { Line } from '../homepage/common/Line';
import { EmailLoginForm } from './EmailLoginForm';
import { EmailSignUpForm } from './EmailSignUpForm';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginLabel = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const SignUpFrame = styled.div`
  display: flex;
  margin-bottom: 50px;
`;

const Label = styled.div`
`;

const OrLabel = styled.div`
  margin: -5px 10px 0 10px;
`;

const SignUpLink = styled.div`
  margin-left: 10px;
  color: #7795A3;
  cursor: pointer;
`;

const ButtonFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Separator = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const EmailButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #8b8a8a;
  border-radius: 0;
  width: 300px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  height: 50px;
  color: black;
  &:hover {
    border: 1px solid black;
  }
`;

export const Login = () => {
  const loginObj = {
    name: 'Log In',
    question: 'New to this site?',
    linkName: 'Sign up',
    googleButtonText: 'Log in with Google',
    emailText: 'Log in with Email'
  }

  const signUpObj = {
    name: 'Sign Up',
    question: 'Already a member',
    linkName: 'Log In',
    googleButtonText: 'Sign Up with Google',
    emailText: 'Sign Up with Email'
  }

  const [authObj, setAuthObj] = useState(loginObj);

  const [showLoginForm, setShowLoginForm] = useState(false); 
  const [showSignUpForm, setShowSignUpForm] = useState(false); 

  const onClickHandler = () => {
    setShowLoginForm(false);
    setShowSignUpForm(false);
    
    authObj.name === 'Log In' ?
      setAuthObj(signUpObj) :
      setAuthObj(loginObj);
  }

  const showFormHandler = () => {
    if (authObj.emailText === 'Log in with Email') {
      setShowLoginForm(true);
      setShowSignUpForm(false);
    } else {
      setShowLoginForm(false);
      setShowSignUpForm(true);
    }
  }

  return (
    <Container>
      <LoginLabel>{authObj.name}</LoginLabel>

      <SignUpFrame>
        <Label>{authObj.question}</Label>
        <SignUpLink onClick={onClickHandler}>{authObj.linkName}</SignUpLink>
      </SignUpFrame>

      {(showLoginForm || showSignUpForm) ? 
        <>
          {showLoginForm ? <EmailLoginForm /> : null}
          {showSignUpForm ? <EmailSignUpForm /> : null}
        </> :
        <ButtonFrame>
          <GLogin label={authObj.googleButtonText} />

          <Separator>
            <Line style={{ width: '130px' }}/>
            <OrLabel>or</OrLabel>
            <Line style={{ width: '130px' }}/>
          </Separator>

          <EmailButton onClick={showFormHandler}>{authObj.emailText}</EmailButton>
        </ButtonFrame>}
    </Container>
  )
}
