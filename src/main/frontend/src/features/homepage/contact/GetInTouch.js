import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectUserDetails } from '../../auth/authSlice';
import { device } from '../../utils/viewport';
import { isValidEmail, signUpForNews } from '../../utils/Utils';
import { FiPhoneCall } from 'react-icons/fi';
import { IoIosMail } from 'react-icons/io';

const Background = styled.div`
  background: url('/images/BG2.png');
  height: 500px;
  z-index: -999999;

  @media ${device.tablet} {
    height: 300px;
  }

  @media ${device.laptop} {
    height: 500px;
  }
`;

const Container = styled.div`
  display: flex;
  box-shadow: 0px 24px 64px #02290019;
  border-radius: 0;
  margin: -250px 10px 50px 10px;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
    border-radius: 24px 0 0 24px;
    margin: -250px 50px 50px 50px;
  }

  @media ${device.laptop} {
    flex-direction: row;
    border-radius: 24px 0 0 24px;
    margin: -250px 200px 100px 200px;
  }
`;

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 100px 50px;
  border-radius: 0;
  background-color: #FFF;

  @media ${device.tablet} {
    border-radius: 24px 0 0 24px;
  }

  @media ${device.laptop} {
    border-radius: 24px 0 0 24px;
  }
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ContactUs = styled.div`
  background-color: #E2E2E2;
  color: #333333;
  padding: 50px;
  border-radius: 0;

  @media ${device.tablet} {
    border-radius: 0 24px 0 0;
    padding: 100px 50px 50px 50px;
  }

  @media ${device.laptop} {
    border-radius: 0 24px 0 0;
    padding: 100px 50px 50px 50px;
  }
`;

const CallIcon = styled(FiPhoneCall)`
  margin-right: 30px;
  fill: #FFF;
  background-color: #333333;
  border-radius: 100%;
  padding: 10px;
`;

const MailIcon = styled(IoIosMail)`
  margin-right: 30px;
  fill: #FFF;
  background-color: #333333;
  border-radius: 100%;
  padding: 10px;
`;

const ContactFrame = styled.div`
  display: flex;
  align-items: center;
`;

const Vertical = styled.div`

`;

const Name = styled.div`
  color: #757575F7;
  font-size: 14px;
  margin-bottom: 5px;
`;

const Description = styled.div`
  font-size: 20px;

  @media ${device.tablet} {
    font-size: 24px;
  }

  @media ${device.laptop} {
    font-size: 28px;
  }
`;

const NewsLetter = styled.div`
  background-color: #D99107;
  color: #FFF;
  padding: 50px 50px 100px 50px;
  border-radius: 0;

  @media ${device.tablet} {
    border-radius: 0 0 24px 0;
  }

  @media ${device.laptop} {
    border-radius: 0 0 24px 0;
  }
`;

const Title = styled.div`
  font-size: 28px;
  margin-bottom: 20px;
`;

const Heading = styled.div`
  font-size: 28px;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 3px;
  border: 1px solid #DADADA;
  color: #333333;
  font-size: 16px;
  flex: 2;
`;

const Textarea = styled.textarea`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 3px;
  border: 1px solid #DADADA;
  color: #333333;
`;

const Submit = styled.button`
  color: #D99107;
  border: none;
  background: no-repeat;
  font-size: 18px;
  font-weight: bold;
  text-decoration: underline;
  text-align: left;
  cursor: pointer;
  flex: 1;
  text-align: right;
`;

const Message = styled.div`
  color: #FFF;
`;


export const GetInTouch = () => {

  const userDetails = useSelector(selectUserDetails);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState(null);

  const handleOnSignUp = () => {
    if (isValidEmail(newsletterEmail)) {
      signUpForNews(newsletterEmail);
      setNewsletterEmail('');
      setNewsletterMessage('Thanks for signing up!');
    } else {
      setNewsletterMessage('Invalid Email, please check');
    }
    setTimeout(() => setNewsletterMessage(null), 5000);
  }

  useEffect(() => {
    const curUserName = `${userDetails.firstName} ${userDetails.lastName}`;
    setName(curUserName.trim());
    setEmail(userDetails.email);
  }, [userDetails]);

  const handleOnSubmit = () => {

  }

  return (
    <div id='contact-us'>
      <Background />

      <Container>
        <LeftSide>
          <Heading>Get in Touch</Heading>

          <Input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Your Name'
          />

          <Input
            type='text'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Your Email'
          />

          <Textarea
            rows={5}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder='Message'
          />

          <Submit onClick={handleOnSubmit}>SUBMIT &#62;</Submit>
        </LeftSide>

        <RightSide>
          <ContactUs>
            <ContactFrame style={{ marginBottom: '30px' }}>
              <CallIcon size='1.6em'/>

              <Vertical>
                <Name>Contact Us</Name>
                <Description>080-28364174</Description>
              </Vertical>
            </ContactFrame>

            <ContactFrame>
              <MailIcon size='2em'/>

              <Vertical>
                <Name>Get a quote</Name>
                <Description>sales@aicgroup.in</Description>
              </Vertical>
            </ContactFrame>
          </ContactUs>

          <NewsLetter>
            <Title>Newsletter</Title>

            <InputWrapper>
              <Input
                style={{ marginRight: '20px' }}
                type='text'
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder='Your Email'
              />

              <Submit style={{ color: '#FFF' }} onClick={handleOnSignUp}>SUBSCRIBE &#62;</Submit>

            </InputWrapper>

            {newsletterMessage && <Message>{newsletterMessage}</Message>}
          </NewsLetter>
        </RightSide>
      </Container>
    </div>
  )
}