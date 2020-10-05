import React, { useState } from 'react';
import styled from 'styled-components';
import { ImLocation } from 'react-icons/im';
import { ImPhone } from 'react-icons/im';
import { IoIosMail } from 'react-icons/io';
import { FaFacebookF } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';

import { isValidEmail, signUpForNews } from '../../utils/Utils';

const Container = styled.div`
  background-color: #232162;
  color: white;
  padding: 50px 0 10px 0;
  flex-shrink: 0;
`;

const FootContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  font-size: 12px;
`;

const Brand = styled.div`
  width: 350px;
  margin-bottom: 50px;
`;

const BrandFrame = styled.div`
  display: flex;
`;

const BrandName = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const BrandDescription = styled.div`

`;

const BrandCaption = styled.div`

`;

const LogoFrame = styled.div`
  
`;

const Logo = styled.img`
  width: 120px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const ContentContainer = styled.div`
  width: 210px;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

const ContactContainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

const ContentLabel = styled.div`
  font-size: 14px;
  margin-bottom: 30px;
  font-weight: 700;
`;

const ContentText = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const LocationIcon = styled(ImLocation)`
  margin-right: 10px;
  font-size: xx-large;
  margin-top: -7px;
`;

const PhoneIcon = styled(ImPhone)`
  margin-right: 10px;
  font-size: larger;
`;

const Mail = styled.a`
  color: #FFF;
  text-decoration: none;
`;

const MailIcon = styled(IoIosMail)`
  margin-right: 10px;
  font-size: large;
`;

const QuickLink = styled.a`
  color: white;
  text-decoration: none;
  margin-bottom: 15px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ContentFrame = styled.div`
  display: flex;
  flex-direction: column;
`;

const NewsSignUp = styled.div`
  width: 210px;
  margin-bottom: 50px;
`;

const MailInput = styled.input`
  padding: 7px 12px;
  font-size: 12px;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const SignUpButton = styled.button`
  background-color: #FFF;
  color: #232162;
  height: 27px;
  width: 90px;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Message = styled.div`
  color: #FFF;
`;

const SocialMedia = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const FacebookIcon = styled(FaFacebookF)`
  cursor: pointer;
`;

const InstagramIcon = styled(AiFillInstagram)`
  cursor: pointer;
`;

const TwitterIcon = styled(AiOutlineTwitter)`
  cursor: pointer;
`;

const Copyright = styled.div`
  font-size: 12px;
  text-align: center;
`;

export const Footer = () => {
  const openInNewTab = url => {
    var win = window.open(url, '_blank');
    win.focus();
  }

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
      <FootContainer>
        <Brand>
          <BrandFrame>
            <LogoFrame>
              <Logo src='/images/aic_logo.png' alt='logo'/>

              <SocialMedia>
                <FacebookIcon size='1.2em' onClick={() => openInNewTab('https://www.facebook.com')}/>
                <InstagramIcon size='1.2em' onClick={() => openInNewTab('https://www.instagram.com')}/>
                <TwitterIcon size='1.3em' onClick={() => openInNewTab('https://www.twitter.com')}/>
              </SocialMedia>
            </LogoFrame>
            
            <BrandDescription>
              <BrandName>AIC Group</BrandName>
              <BrandCaption>AIC Group - is the leading company with the known name and rich history in the Scientific industry. We have presence in 4 locations across India with over 1Lakh+ products line.</BrandCaption>
            </BrandDescription>
          </BrandFrame>
        </Brand>

        <ContentContainer>
          <ContentLabel>QUICK LINKS</ContentLabel>
          <ContentFrame>
            <QuickLink href='/about-us'>About Us</QuickLink>
            <QuickLink href='/products'>Products</QuickLink>
            <QuickLink href='/contact-us'>Contact us</QuickLink>
            <QuickLink href='/covid-19'>Covid 19</QuickLink>
          </ContentFrame>
        </ContentContainer>

        <ContactContainer>
          <ContentLabel>GET IN TOUCH</ContentLabel>
          <ContentFrame>
            <ContentText>
              <LocationIcon />
              <span>V79A & V79B, 1st A Main, 2nd Stage, Peenya, Bengaluru, Karnataka 560058</span>
            </ContentText>

            <ContentText>
              <PhoneIcon />
              <Mail href='tel:+918028364174'>Bangalore:<br/> 080-28364174/75/76/77</Mail>
            </ContentText>
            
            <ContentText>
              <div style={{ marginRight: '25px' }}/>
              <Mail href='tel:+918028364174'>Chennai:<br/> 044- 28416127/28550686/28515025</Mail>
            </ContentText>

            <ContentText>
              <MailIcon />
              <Mail href='mailto:sales@aicgroup.in?subject=Website Query'>sales@aicgroup.in</Mail>
            </ContentText>
          </ContentFrame>
        </ContactContainer>

        <NewsSignUp>
          <ContentLabel>NEWS LETTER</ContentLabel>
          
          <ContentFrame>
            <MailInput 
              type='text' 
              placeholder='Enter your mail address' 
              value={signUpEmail} 
              onChange={e => setSignUpEmail(e.target.value)}
            />

            <SignUpButton onClick={handleOnSignUp}>Sign Up</SignUpButton>

            <Message>{signUpMessage}</Message>
          </ContentFrame>
        </NewsSignUp>
      </FootContainer>

      <Copyright>© 2020 by AIC Group</Copyright>
    </Container>
  )
}
