import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu'
import { IoIosArrowBack } from 'react-icons/io';

import { CartItem } from './CartItem';
import { selectShowCartPage, displayCartPage } from '../cart/cartSlice';

const CartHeader = styled.div`
  display: flex !important;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid transparent;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,.1);
  background-color: #FFF;
  margin: -10px -10px 10px -10px;
  padding: 10px;
`;

const BackButton = styled(IoIosArrowBack)`
  color: #232162;
  cursor: pointer;
`;

const Header = styled.div`
  font-weight: bold;
`;

export const CartSideBar = () => {
  const dispatch = useDispatch();
  const showCartPage = useSelector(selectShowCartPage);
  const sideCartRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
        if (sideCartRef.current && !sideCartRef.current.contains(event.target)) {
          dispatch(displayCartPage(false));
        }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sideCartRef]);
  
  return (
    <div
      ref={sideCartRef}
    >
      <Menu 
        width={ '25vw' } 
        // style={cartMenuStyles} 
        customBurgerIcon={ false }
        isOpen={showCartPage} 
        // onStateChange={ state => console.log('state', state.isOpen) }
        onStateChange={ state => dispatch(displayCartPage(state.isOpen)) }
        noOverlay 
        disableAutoFocus
        right
      >
        <CartHeader>
          <BackButton size='1.7em' onClick={() => dispatch(displayCartPage(false))}/>
          <Header>Shopping Cart</Header>
          <div></div>
        </CartHeader>

        <CartItem />
      </Menu>
    </div>
  )
}
