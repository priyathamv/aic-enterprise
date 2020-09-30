import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { EmailLoginForm } from './EmailLoginForm';
import { EmailSignUpForm } from './EmailSignUpForm';
import { ForgotPassword } from './ForgotPassword';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginLabel = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const SignUpFrame = styled.div`
  display: flex;
  margin-bottom: 50px;
`;

const Label = styled.div`
`;

const SignUpLink = styled.div`
  margin-left: 10px;
  color: #232162;
  cursor: pointer;
  text-decoration: underline;
`;


export const Login = ({ closeModal }) => {
  const loginObj = {
    name: 'Log In',
    question: 'New to this site?',
    linkName: 'Sign up',
    googleButtonText: 'Log in with Google',
    emailText: 'Log in with Email'
  }

  const signUpObj = {
    name: 'Sign Up',
    question: 'Already a member?',
    linkName: 'Log In',
    googleButtonText: 'Sign Up with Google',
    emailText: 'Sign Up with Email'
  }

  const forgotPasswordObj = {
    name: 'Reset Password',
    question: 'Please enter your email address'
  }

  const [authObj, setAuthObj] = useState(loginObj);

  const [showLoginForm, setShowLoginForm] = useState(false); 
  const [showSignUpForm, setShowSignUpForm] = useState(false); 
  const [showForgotPassword, setShowForgotPassword] = useState(false); 

  const onClickHandler = () => {
    setShowLoginForm(false);
    setShowSignUpForm(false);
    
    authObj.name === 'Log In' ?
      setAuthObj(signUpObj) :
      setAuthObj(loginObj);
  }

  const showFormHandler = () => {
    hideAllForms();

    if (authObj.emailText === 'Log in with Email')
      setShowLoginForm(true);
    else if (authObj.emailText === 'Sign Up with Email')
      setShowSignUpForm(true);
    else 
      setShowForgotPassword(true);
  }

  const hideAllForms = () => {
    setShowLoginForm(false);
    setShowSignUpForm(false);
    setShowForgotPassword(false);
  }

  const handleShowForgotPassword = () => {
    setAuthObj(forgotPasswordObj);
  }

  useEffect(() => {
    showFormHandler();
 }, [authObj]);

  return (
    <Container>
      <LoginLabel>{authObj.name}</LoginLabel>

      <SignUpFrame>
        <Label>{authObj.question}</Label>
        <SignUpLink onClick={onClickHandler}>{authObj.linkName}</SignUpLink>
      </SignUpFrame>

      {showLoginForm ? <EmailLoginForm handleShowForgotPassword={handleShowForgotPassword} closeModal={closeModal} /> : null}
      {showSignUpForm ? <EmailSignUpForm closeModal={closeModal} /> : null}
      {showForgotPassword ? <ForgotPassword closeModal={closeModal} /> : null}
    </Container>
  )
}
