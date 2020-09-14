import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import Cookies from 'universal-cookie';

import { FaUserCircle } from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { GLogout } from '../auth/GLogout';
import { LoginModal } from '../auth/LoginModal';
import { selectGoogleAuth, selectEmailAuth, logoutUserAction } from '../auth/authSlice';
import { selectShowCartPage, selectCartItems, displayCartPage } from '../cart/cartSlice';

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginFrame = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const LoginInfo = styled.div`
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
  
const CartFrame = styled.div`
  position: relative;
  cursor: pointer;
`;

const CartIcon = styled(GiShoppingCart)`
`;

const NoOfItems = styled.div`
  position: absolute;
  background-color: #FF0000;
  color: #FFF;
  top: -5px;
  font-size: 12px;
  border-radius: 17px;
  padding: 2px 6px;
  right: -5px;
`;

export const UserCart = ({ style }) => {
  const dispatch = useDispatch();
  const userIconRef = useRef(null);
  const userOptionsRef = useRef(null);
  const [showUserOptions, setShowUserOptions] = useState(false);

  const googleAuth = useSelector(selectGoogleAuth);
  const emailAuth = useSelector(selectEmailAuth);
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
  }

  return (
    <Container style={style}>
      <LoginInfo>
        {isUserLoggedIn ? 
          <LoginFrame ref={userIconRef} onClick={() => setShowUserOptions(!showUserOptions)} >
            <UserIcon size='2em' />
            <DownArrowIcon size='1.7em' />
          </LoginFrame> :
          <Popup
            modal
            lockScroll={true}
            overlayStyle={{ overflow: 'scroll', zIndex: 100000 }}
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
        
        <CartFrame onClick={() => dispatch(displayCartPage(!showCartPage))}>
          <CartIcon size='2em' />
          {noOfcartItems ? <NoOfItems>{noOfcartItems}</NoOfItems> : null}
        </CartFrame>
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
