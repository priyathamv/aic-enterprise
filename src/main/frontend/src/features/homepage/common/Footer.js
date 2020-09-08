import React from 'react';
import styled from 'styled-components';
import { ImLocation } from 'react-icons/im';
import { ImPhone } from 'react-icons/im';
import { IoIosMail } from 'react-icons/io';
import { FaFacebookF } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';


const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background-color: #232162;
  bottom: 0;
  width: 100%;
  color: white;
  padding-top: 50px;
  font-size: 12px;
`;

const Brand = styled.div`
  width: 350px;
  margin-bottom: 100px;
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
  margin-bottom: 100px;
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

const Mail = styled.span`
  cursor: pointer;
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
  margin-bottom: 100px;
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


export const Footer = () => {
  const prepareEmail = () => {
    window.location.href = 'mailto:info@aicgroup.co.in';
  }

  const openInNewTab = url => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  const handleOnSignUp = () => {}

  return (
    <Container>
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
            <BrandName>AIC ENTERPRISES</BrandName>
            <BrandCaption>dustry. Lorem Ipsum has been the indus- try's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a</BrandCaption>
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

      <ContentContainer>
        <ContentLabel>GET IN TOUCH</ContentLabel>
        <ContentFrame>
          <ContentText>
            <LocationIcon />
            <span>Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod</span>
          </ContentText>

          <ContentText>
            <PhoneIcon />
            <span>1234567890</span>
          </ContentText>

          <ContentText>
            <MailIcon />
            <Mail onClick={prepareEmail}>loreumimpusum@gmail.com</Mail>
          </ContentText>
        </ContentFrame>
      </ContentContainer>

      <NewsSignUp>
        <ContentLabel>NEWS LETTER</ContentLabel>
        
        <ContentFrame>
          <MailInput type='text' placeholder='Enter your mail address' />
          <SignUpButton onClick={handleOnSignUp}>Sign Up</SignUpButton>
        </ContentFrame>
      </NewsSignUp>
    </Container>
  )
}
