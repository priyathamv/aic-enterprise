import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ImLocation } from 'react-icons/im';
import { ImPhone } from 'react-icons/im';
import { IoIosMail } from 'react-icons/io';
import { FaFacebookF } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaBlogger } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { FaKiwiBird } from 'react-icons/fa';

import { isValidEmail, signUpForNews } from '../../utils/Utils';

const Container = styled.div`
  background-color: #F2F2F2;
  color: #262626;
  padding: 50px 0 0 0;
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
  width: 300px;
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
  font-size: 22px;
  margin-bottom: 30px;
  font-weight: bold;
  color: #707070;
`;

const ContentText = styled.div`
  display: flex;
  margin-bottom: 30px;
  font-size: 20px;
  line-height: 26px;
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
  color: #262626;
  text-decoration: none;
`;

const MailIcon = styled(IoIosMail)`
  margin-right: 10px;
  font-size: large;
`;

const QuickLink = styled(Link)`
  color: #262626;
  text-decoration: none;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 18px;
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
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;

const FacebookIcon = styled(FaFacebookF)`
  cursor: pointer;
  color: #FFF;
  background-color: #B2B2B2;
  border-radius: 100%;
  padding: 12px;
  margin-right: 10px;
`;

const InstagramIcon = styled(AiFillInstagram)`
  cursor: pointer;
  color: #FFF;
  background-color: #B2B2B2;
  border-radius: 100%;
  padding: 12px;
  margin-right: 10px;
`;

const TwitterIcon = styled(AiOutlineTwitter)`
  cursor: pointer;
  color: #FFF;
  background-color: #B2B2B2;
  border-radius: 100%;
  padding: 12px;
  margin-right: 10px;
`;

const LinkedinIcon = styled(FaLinkedinIn)`
  cursor: pointer;
  color: #FFF;
  background-color: #B2B2B2;
  border-radius: 100%;
  padding: 12px;
  margin-right: 10px;
`;

const BloggerIcon = styled(FaBlogger)`
  cursor: pointer;
  color: #FFF;
  background-color: #B2B2B2;
  border-radius: 100%;
  padding: 12px;
  margin-right: 10px;
`;

const TelegramIcon = styled(FaTelegramPlane)`
  cursor: pointer;
  color: #FFF;
  background-color: #B2B2B2;
  border-radius: 100%;
  padding: 12px;
  margin-right: 10px;
`;

const WhatsappIcon = styled(FaWhatsapp)`
  cursor: pointer;
  color: #FFF;
  background-color: #B2B2B2;
  border-radius: 100%;
  padding: 12px;
  margin-right: 10px;
`;

const KiwiBirdIcon = styled(FaKiwiBird)`
  cursor: pointer;
  color: #FFF;
  background-color: #B2B2B2;
  border-radius: 100%;
  padding: 12px;
  margin-right: 10px;
`;

const Copyright = styled.div`
  text-align: center;
  background-color: #010867;
  color: #FFF;
  padding: 30px;
`;

const PaymentIcon = styled.img`
  width: 50px;
  margin-right: 20px;
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
        {/* <Brand>
          <BrandFrame>
            <BrandDescription>
              <BrandName>AIC Group</BrandName>
              <BrandCaption>AIC Group is the leading company with the known name and rich history in the Scientific industry. We have presence in 4 locations across India with over 1Lakh+ products line.</BrandCaption>
            </BrandDescription>
          </BrandFrame>
        </Brand> */}

        <ContentContainer>
          <ContentLabel>About us</ContentLabel>

          <ContentFrame>
            <ContentText>AIC Group is the leading company with the known name and rich history in the Scientific industry</ContentText>
          </ContentFrame>

          <ContentLabel style={{ marginBottom: '15px' }}>Follow us</ContentLabel>

          <SocialMedia>
            <FacebookIcon size='1.7em' onClick={() => openInNewTab('https://www.facebook.com/AIC-Enterprises-Pvt-Ltd-108724891416130')}/>
            <InstagramIcon size='1.7em' onClick={() => openInNewTab('https://instagram.com/aicenterprisespvt')}/>
            <LinkedinIcon size='1.7em' onClick={() => openInNewTab('http://www.linkedin.com/in/aicenterprisespvtltd')}/>
            <TwitterIcon size='1.8em' onClick={() => openInNewTab('http://www.twitter.com/PvtAic')}/>
          </SocialMedia>

          <SocialMedia>
            <BloggerIcon size='1.7em' onClick={() => openInNewTab('https://aic2021.blogspot.com/')}/>
            <TelegramIcon size='1.7em' onClick={() => openInNewTab('https://t.me/AICBangalore')}/>
            <WhatsappIcon size='1.7em' onClick={() => openInNewTab('https://wa.me/message/NVQDDM4T4NFWH1')}/>
            <KiwiBirdIcon size='1.7em' onClick={() => openInNewTab('https://www.kooapp.com/profile/aicbangalore')}/>
          </SocialMedia>
        </ContentContainer>

        <ContentContainer>
          <ContentLabel>Information</ContentLabel>
          <ContentFrame>
            <QuickLink to='/'>Profile</QuickLink>
            <QuickLink to='/about-us'>About Us</QuickLink>
            <QuickLink to='/contact-us'>Contact</QuickLink>
            <QuickLink to='/'>Address</QuickLink>
            <QuickLink to='/'>Return policy</QuickLink>
          </ContentFrame>
        </ContentContainer>

        <ContactContainer>
          <ContentLabel>Products</ContentLabel>
          <ContentFrame>
            <QuickLink to='/'>FAQs</QuickLink>
            <QuickLink to='/'>Guides</QuickLink>
            <QuickLink to='/contact-us'>Contact us</QuickLink>
            <QuickLink to='/'>Sell with Us</QuickLink>
            <QuickLink to='/'>Sitemap</QuickLink>
          </ContentFrame>
        </ContactContainer>

        <ContactContainer>
          <ContentLabel>Address</ContentLabel>

          <ContentFrame>
            <ContentText>V79A & V79B, 1st A Main, 2nd Stage, Peenya, Bengaluru, Karnataka, 560058</ContentText>
          </ContentFrame>

          <SocialMedia>
            <PaymentIcon src='/images/footer/visa.png' />
            <PaymentIcon src='/images/footer/mastercard.png' />
            <PaymentIcon src='/images/footer/ebay.png' />
          </SocialMedia>

        </ContactContainer>
      </FootContainer>

      <Copyright>Copyright © 2021, AIC GROUP</Copyright>
    </Container>
  )
}