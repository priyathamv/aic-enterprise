import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import 'reactjs-popup/dist/index.css';
import { ImPhone } from 'react-icons/im';
import { IoIosMail } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineWhatsApp } from 'react-icons/ai';

import { UserCart } from './UserCart';
import { device } from '../utils/viewport';
import { selectGoogleAuth, logoutUserAction } from '../auth/authSlice';
import { GLogout } from '../auth/GLogout';


const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  color: #232162;
  text-align: center;
  background-color: #F1F1F1;
  z-index: 100000;
  width: 100%;
`;

const BrandFrame = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  padding: 20px;

  @media ${device.tablet} {
    flex: 2;
  }

  @media ${device.laptop} {
    flex: 3;
  }
`;


const ContantInfo = styled.div`
  flex: 3;
  justify-content: flex-end;
  display: grid;
  justify-items: start;
  grid-template-columns: 30px 150px;
  grid-row: auto auto;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  align-items: center;
  color: #262626;

  @media ${device.tablet} {
    flex: 1;
  }

  @media ${device.laptop} {
    grid-template-columns: 20px 140px 20px 140px;
    flex: 3;
  }
`;

const MailIcon = styled(IoIosMail)`
  margin-top: 1px;
`;

const MailText = styled.a`
  text-decoration: none;
  color: #262626;
`;

const PhoneNumberWrapper = styled.div`
  background-color: #23D366;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  min-width: 100px;
  justify-content: space-around;
  cursor: pointer;
  align-items: center;
`;

const PhoneNumber = styled.a`
  text-decoration: none;
  color: #FFF;
`;

const AiOutlineWhatsAppIcon = styled(AiOutlineWhatsApp)`
  color: #FFF;
`;

const PhoneIcon = styled(ImPhone)`
  margin-left: 5px;
  margin-top: 3px;
`;

const SubText = styled.div`
  font-size: 14px;
`;

const LogoutWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #F1F1F1;
  height: 100%;
`;

const GLogoutWrapper = styled.div`
  background-color: #232162;
  color: #FFF;
  border-radius: 3px;
  padding: 10px 20px;
  font-size: 14px;
  margin-right: 20px;
`;

const Logout = styled.button`
  border: none;
  font-size: 16px;
  background-color: #232162;
  color: #FFF;
  cursor: pointer;
  border-radius: 3px;
  padding: 10px 20px;
  font-size: 14px;
  height: 35px;
  margin-right: 20px;
`;

const Logo = styled.img`
  width: 50px;
  border-radius: 40px;
  margin-right: 15px;
  cursor: pointer;

  @media ${device.tablet} {
    width: 70px;
  }

  @media ${device.laptop} {
    margin-left: 50px;
    width: 80px;
  }
`;

const BrandWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const BrandName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-right: 20px;

  @media ${device.tablet} {
    font-size: 16px;
  }

  @media ${device.laptop} {
    font-size: 30px;
  }
`;

const Brand = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-right: 20px;

  @media ${device.tablet} {
    font-size: 28px;
  }

  @media ${device.laptop} {
    font-size: 42px;
  }
`;


export const NavbarMain = ({ isAdmin }) => {
  const dispatch = useDispatch();

  const viewportWidth = window.outerWidth;
  const isMobile = viewportWidth < 768;
  const isLaptop = viewportWidth >= 1024;

  const googleAuth = useSelector(selectGoogleAuth);
  const isUserGoogleLoggedIn = googleAuth.email;

  const logoutUser = () => {
    const cookies = new Cookies();
    cookies.remove('auth_token');

    dispatch(logoutUserAction());
    setTimeout(() => window.location.href = '/', 0);
  }

  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => window.addEventListener('scroll', scrollCallback), []);

  const scrollCallback = () => {
    setShowLogo(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100);
  }

  return (
    <Container id='navbar_menu_id'>
      {isAdmin ?
        <BrandFrame style={ isAdmin ? { justifyContent: 'flex-start' } : null}>
            <>
              <Logo
                style={ isAdmin ? { marginLeft: '20px' } : null }
                src='/images/aic_logo.png'
                alt='AIC Logo'
                onClick={() => window.location.href='/'}
              />

              <Brand>AIC Group</Brand>
            </>
        </BrandFrame> :
      null}

      {(!isAdmin && showLogo) ?
        <>
          <Logo
            src='/images/aic_logo.png'
            alt='AIC Logo'
            onClick={() => window.location.href='/'}
          />

          <BrandWrapper>
            <BrandName>AIC</BrandName>
            <BrandName>GROUP</BrandName>
          </BrandWrapper>
        </> : null }


      {(!isMobile && !isAdmin) &&
        <ContantInfo>
          <MailIcon size='1.3em'></MailIcon>
          <div>
            <MailText href='mailto:sales@aicgroup.in?subject=Website Query'>sales@aicgroup.in</MailText>
          </div>

          {/* <PhoneIcon size='1em'></PhoneIcon> */}
          <PhoneNumberWrapper>
            <AiOutlineWhatsAppIcon />

            <PhoneNumber style={{ fontSize: '15px' }} href='https://wa.me/message/NVQDDM4T4NFWH1' target="_blank">Talk to us</PhoneNumber>
          </PhoneNumberWrapper>
        </ContantInfo>}

      {!isAdmin ?
        <UserCart /> :
        <LogoutWrapper>
          {isUserGoogleLoggedIn ?
            <GLogoutWrapper>
              <GLogout logoutStyle={{ padding: '0' }}/>
            </GLogoutWrapper> :
            <Logout onClick={logoutUser}>Log Out</Logout>
          }
        </LogoutWrapper>
      }
    </Container>
  )
}
