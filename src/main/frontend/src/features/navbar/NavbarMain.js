import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { ImPhone } from 'react-icons/im';
import { IoIosMail } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import Cookies from 'universal-cookie';

import { GLogout } from '../auth/GLogout';
import { LoginModal } from '../auth/LoginModal';
import { selectGoogleAuth, selectEmailAuth, logoutUserAction } from '../auth/authSlice';


const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  color: #232162;
  text-align: center;
`;

const BrandFrame = styled.div`
  flex: 3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #23216214;
  height: 100%;
`;

const Logo = styled.img`
  width: 80px;
  border-radius: 40px;
  margin-right: 15px;
`;

const Brand = styled.div`
  letter-spacing: 2px;
  margin-right: 20px;
`;

const BrandName = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const BrandCaption = styled.div`

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
`;

const MailIcon = styled(IoIosMail)`

`;

const MailText = styled.div`
  cursor: pointer;
`;

const PhoneIcon = styled(ImPhone)`
  margin-left: 2px;
`;

const PhoneText = styled.div`

`;

const LoginFrame = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const LoginInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserIcon = styled(FaUserCircle)`
  cursor: pointer;
`;

const DownArrowIcon = styled(BiChevronDown)`
  cursor: pointer;
`;
  
const LoginButton = styled.div`
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
`;

const UserOptions = styled.div`
  width: 150px;
  top: 75px;
  right: 75px;
  text-align: center;
  border-radius: 3px;
  background-color: #FFF;
  box-shadow: 0 0 10px 1px rgba(188,188,188,0.3);
  position: absolute;
  display: flex;
  flex-direction: column;
`;

const UserOption = styled.div`
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  &:hover {
    background-color: #017acd0a
  }
`;

const CartIcon = styled(GiShoppingCart)`

`;


export const NavbarMain = () => {
  const dispatch = useDispatch();
  const userIconRef = useRef(null);
  const userOptionsRef = useRef(null);
  const [showUserOptions, setShowUserOptions] = useState(false);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (
        (userIconRef.current && !userIconRef.current.contains(e.target)) && 
        (userOptionsRef.current && !userOptionsRef.current.contains(e.target))
      ) {
        setShowUserOptions(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [userOptionsRef]);

  const prepareEmail = () => {
    window.location.href = 'mailto:info@aicgroup.co.in';
  }

  const logoutUser = () => {
    setShowUserOptions(false);

    const cookies = new Cookies();
    cookies.remove('auth_token');
    
    dispatch(logoutUserAction());
  }

  const googleAuth = useSelector(selectGoogleAuth);
  const emailAuth = useSelector(selectEmailAuth);
  const isUserLoggedIn = googleAuth.email || emailAuth.email;
  const isUserGoogleLoggedIn = googleAuth.email;

  return (
    <Container>
      <BrandFrame>
        <Logo src='/images/aic_logo.png'></Logo>

        <Brand>
          <BrandName>AIC ENTERPRISES</BrandName>
          <BrandCaption>Private Limited</BrandCaption>
        </Brand>
      </BrandFrame>

      <ContantInfo>
        <MailIcon size='1.5em'></MailIcon>
        <MailText onClick={prepareEmail}>Info@aicgroup.co.in</MailText>

        <PhoneIcon size='1.3em'></PhoneIcon>
        <PhoneText>+123-456-7890</PhoneText>
      </ContantInfo>

      <LoginInfo>
        {isUserLoggedIn ? 
          <LoginFrame ref={userIconRef} onClick={() => setShowUserOptions(!showUserOptions)} >
            <UserIcon size='2em' />
            <DownArrowIcon size='1.7em' />
          </LoginFrame> :
          <Popup
            modal
            // lockScroll={true}
            overlayStyle={{ overflow: 'scroll' }}
            contentStyle={{ padding: 0, width: '100vw', height: '100%' }}
            trigger={
              <LoginFrame>
                <UserIcon size='2em'/>
                <LoginButton>Log In</LoginButton>
              </LoginFrame>
            }
          >
            {close => (
              <LoginModal closeModal={close}/>
            )}
          </Popup>}
        
        <CartIcon size='2em' />
      </LoginInfo>

      {showUserOptions ? 
        <UserOptions ref={userOptionsRef}>
          <UserOption>My Account</UserOption>
          {isUserGoogleLoggedIn ? 
            <div onClick={() => setShowUserOptions(false)}><GLogout /></div> : 
            <UserOption onClick={() => logoutUser()}>Log Out</UserOption>
          }
        </UserOptions> : null }
    </Container>
  )
}
