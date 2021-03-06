import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import Cookies from 'universal-cookie';

import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { GLogout } from '../auth/GLogout';
import { LoginModal } from '../auth/LoginModal';
import { selectGoogleAuth, selectEmailAuth, selectUserImage, selectUserRole, logoutUserAction } from '../auth/authSlice';
import { selectShowCartPage, selectCartItems, displayCartPage } from '../cart/cartSlice';
import { device } from '../utils/viewport';

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

const LoginButton = styled(Link)`
  text-decoration: none;
  margin: 0 10px;
  background-color: #010867;
  color: #FFF;
  padding: 10px 45px;
  border-radius: 30px;
  font-size: 14px;
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
  margin-right: 10px;
`;

const DownArrowIcon = styled(BiChevronDown)`
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
  z-index: 10;
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
  display: flex;
  align-items: center;
  background-color: #9F9F9F;
  border-radius: 30px;
  justify-content: space-evenly;
  padding: 6.5px 6px;
  color: #FFF;
  margin-right: 30px;
  position: relative;

  @media ${device.laptop} {
    min-width: 120px;
    margin-right: 50px;
  }
`;

const CartIcon = styled(AiOutlineShoppingCart)`
`;

const NoOfItemsMobile = styled.div`
  position: absolute;
  background-color: #FF0000;
  color: #FFF;
  top: -5px;
  font-size: 12px;
  border-radius: 17px;
  padding: 2px 6px;
  left: 15px;
`;

const NoOfItems = styled.div`
  font-size: 13px;
`;

export const UserCart = ({ style }) => {
  const history = useHistory();

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

  const isAdmin = useSelector(selectUserRole) === 'ADMIN';

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
    setTimeout(() => window.location.href = '/', 0);
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
              isMobile ?
                <UserIcon size='2em' onClick={() => history.push('/push')} /> :
                <LoginButton to='/login'>LOGIN</LoginButton>
            }
          >
            {close => (
              <LoginModal closeModal={close}/>
            )}
          </Popup>}

        <CartFrame onClick={() => dispatch(displayCartPage(!showCartPage))}>
          <CartIcon size='1.5em' color='#FFF' />
          {isMobile ?
            <NoOfItemsMobile>{noOfcartItems}</NoOfItemsMobile> :
            <NoOfItems>{noOfcartItems} item(s)</NoOfItems>
          }
        </CartFrame>
      </LoginInfo>

      {showUserOptions ?
        <UserOptions ref={userOptionsRef}>
          <UserOptionAnchor to='/account/my-account' onClick={() => setShowUserOptions(false)}>My Account</UserOptionAnchor>
          <UserOptionAnchor to='/account/my-orders' onClick={() => setShowUserOptions(false)}>My Orders</UserOptionAnchor>
          {isAdmin &&
            <UserOptionAnchor to='/admin/overview' onClick={() => setShowUserOptions(false)}>Admin Panel</UserOptionAnchor>}

          {isUserGoogleLoggedIn ?
            <div onClick={() => setShowUserOptions(false)}><GLogout /></div> :
            <UserOption onClick={() => logoutUser()}>Log Out</UserOption>
          }
        </UserOptions> : null }
    </Container>
  )
}
