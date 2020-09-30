import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import Cookies from 'universal-cookie';

import { FaUserCircle } from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { GLogout } from '../auth/GLogout';
import { LoginModal } from '../auth/LoginModal';
import { selectGoogleAuth, selectEmailAuth, selectUserImage, logoutUserAction } from '../auth/authSlice';
import { selectShowCartPage, selectCartItems, displayCartPage } from '../cart/cartSlice';

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const LoggedinFrame = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const LoginFrame = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 10px;
  text-decoration: none;
  color: #232162;
`;

const LoginInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  cursor: pointer;
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

const UserOptionAnchor = styled(Link)`
  color: #232162;
  padding: 15px 20px;
  text-decoration: none;
  display: flex;
  &:hover {
    background-color: #017acd0a
  }
`;

const UserOption = styled.div`
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  &:hover {
    background-color: #017acd0a
  }
`;
  
const CartFrame = styled.div`
  position: relative;
  cursor: pointer;
`;

const CartIcon = styled(GiShoppingCart)`
  margin-right: 20px;
`;

const NoOfItems = styled.div`
  position: absolute;
  background-color: #FF0000;
  color: #FFF;
  top: -5px;
  font-size: 12px;
  border-radius: 17px;
  padding: 2px 6px;
  left: 15px;
`;

export const UserCart = ({ style }) => {
  const viewportWidth = window.outerWidth;
  const isMobile = viewportWidth < 1024;

  const dispatch = useDispatch();
  const userIconRef = useRef(null);
  const userOptionsRef = useRef(null);
  const [showUserOptions, setShowUserOptions] = useState(false);

  const googleAuth = useSelector(selectGoogleAuth);
  const emailAuth = useSelector(selectEmailAuth);
  const userImageUrl = useSelector(selectUserImage);

  const isUserLoggedIn = googleAuth.email || emailAuth.email;
  const isUserGoogleLoggedIn = googleAuth.email;

  const showCartPage = useSelector(selectShowCartPage);
  const noOfcartItems = useSelector(selectCartItems).length;

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

  const logoutUser = () => {
    setShowUserOptions(false);

    const cookies = new Cookies();
    cookies.remove('auth_token');
    
    dispatch(logoutUserAction());
    window.location.href = '/';
  }

  return (
    <Container style={style}>
      <LoginInfo>
        {isUserLoggedIn ? 
          <LoggedinFrame ref={userIconRef} onClick={() => setShowUserOptions(!showUserOptions)} >
            {userImageUrl ? <UserImage src={userImageUrl} /> : <UserIcon size='2em'/>}
            <DownArrowIcon size='1.7em' />
          </LoggedinFrame> :
          <Popup
            modal
            lockScroll={false}
            overlayStyle={{ overflow: 'scroll', zIndex: 100000 }}
            contentStyle={{ padding: 0, width: '100vw', height: '100%' }}
            trigger={
              <LoginFrame to='/login'>
                <UserIcon size='2em' />
                {!isMobile && <LoginButton>Log In</LoginButton>}
              </LoginFrame>
            }
          >
            {close => (
              <LoginModal closeModal={close}/>
            )}
          </Popup>}
        
        <CartFrame onClick={() => dispatch(displayCartPage(!showCartPage))}>
          <CartIcon size='2em' />
          {noOfcartItems ? <NoOfItems>{noOfcartItems}</NoOfItems> : null}
        </CartFrame>
      </LoginInfo>

      {showUserOptions ? 
        <UserOptions ref={userOptionsRef}>
          <UserOptionAnchor to='/account' onClick={() => setShowUserOptions(false)}>My Account</UserOptionAnchor>

          {isUserGoogleLoggedIn ? 
            <div onClick={() => setShowUserOptions(false)}><GLogout /></div> : 
            <UserOption onClick={() => logoutUser()}>Log Out</UserOption>
          }
        </UserOptions> : null }
    </Container>
  )
}
