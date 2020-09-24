import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTelegramPlane } from 'react-icons/fa';

import { isValidEmail, signUpForNews } from '../../utils/Utils';
import { device } from '../../utils/viewport';

const Container = styled.div`
  background-color: #232162;
  height: 250px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.div`
  margin-bottom: 10px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 120px;
  font-size: 12px;
  background-color: #FFF;

  @media ${device.laptop} { 
    width: 22vw;
    font-size: 18px;
  }
`;

const PlaneIcon = styled(FaTelegramPlane)`
  background-color: #232162;
  border-radius: 4px;
  color: #FFF;
  padding: 2px 4px;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 5px;
`;

const Message = styled.div`
  font-size: 14px;
  color: #0b880b
`;

const Or = styled.div`
  position: absolute;
  border: 1px solid #0000001c;
  border-radius: 25px;
  background-color: #FFF;
  padding: 10px;
  font-size: 12px;

  @media ${device.laptop} { 
    padding: 15px;
  }
`;
const OrBorder = styled.div`
  position: absolute;
  border: 1px solid black;
  border-radius: 25px;
  background-color: #FFF;
  padding: 6px;
  font-size: 12px;

  @media ${device.laptop} { 
    padding: 10px;
  }
`;

const EmailInput = styled.input`
  font-size: 12px;
  padding: 4px 4px;
  width: 30vw;

  @media ${device.laptop} { 
    padding: 7px 12px;
    width: 15vw;
  }
`;




export const NewsLetter = () => {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpMessage, setSignUpMessage] = useState(null);

  const handleOnSignUp = () => {
    if (isValidEmail(signUpEmail)) {
      signUpForNews(signUpEmail);
      setSignUpEmail('');
      setSignUpMessage('Thanks for signing up!');
    } else {
      setSignUpMessage('Invalid Email, please check');
    }
    setTimeout(() => setSignUpMessage(null), 5000);
  }

  return (
    <Container>
      <ContentBox style={{ marginRight: '20px' }}>
        <Label>Best Services</Label>
        <div>123-456-7890</div>
      </ContentBox>

      <ContentBox>
        <Label>Sign up for Newsletter</Label>
        
        <InputContainer>
          <EmailInput 
            type='text' 
            placeholder='Your Email Address'
            value={signUpEmail} 
            onChange={e => setSignUpEmail(e.target.value)} 
          />
          <PlaneIcon onClick={handleOnSignUp} />
        </InputContainer>

        <Message style={signUpMessage === 'Invalid Email, please check' ? {color: 'red'} : null}>{signUpMessage}</Message>
      </ContentBox>

      <Or>OR</Or>
      
      <OrBorder>OR</OrBorder>
    </Container>
  )
}
