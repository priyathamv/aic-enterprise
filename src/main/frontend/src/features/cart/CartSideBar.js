import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu'
import { IoIosArrowBack } from 'react-icons/io';

import { CartItem } from './CartItem';
import { selectShowCartPage, displayCartPage, selectCartItems, clearCart, placeOrderAsync } from '../cart/cartSlice';
import { selectUserEmail, selectUserName } from '../auth/authSlice';
import { Button } from '../homepage/common/Button';

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

const Label = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 30px;
`;

const Message = styled.div`
  color: red;
  text-align: center;
  margin-bottom: 20px;
`;

export const CartSideBar = () => {
  const dispatch = useDispatch();
  const showCartPage = useSelector(selectShowCartPage);
  const cartItems = useSelector(selectCartItems);
  const sideCartRef = useRef(null);
  const email = useSelector(selectUserEmail);
  const name = useSelector(selectUserName);

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
        if (sideCartRef.current && !sideCartRef.current.contains(event.target)) {
          dispatch(displayCartPage(false));
        }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch, sideCartRef]);

  const handleOnPlaceOrder = async () => {
    if (email === null) {
      setErrorMsg('Please login to place order');
      setTimeout(() => {
        setErrorMsg(null);
        dispatch(displayCartPage(false));
      }, 5000);
    } else {
      await placeOrderAsync({ email, name, cartItems});
      setErrorMsg('Thanks for placing order!');
      setTimeout(() => {
        setErrorMsg(null);
        dispatch(displayCartPage(false));
        dispatch(clearCart());
      }, 3000);
    }
  };
  
  return (
    <div
      ref={sideCartRef}
    >
      <Menu 
        width={ '28vw' } 
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

        {cartItems.map((curCartItem, index) => <CartItem key={index} itemDetails={curCartItem} />)}

        {cartItems.length ? 
          <Button style={{ margin: '20px auto 10px auto' }} handleOnClick={handleOnPlaceOrder} label='PLACE ORDER' /> : 
          <Label>Your cart is empty</Label>
        }
        {errorMsg && <Message style={errorMsg === 'Thanks for placing order!' ? {color: 'green'} : null}>{errorMsg}</Message>}
      </Menu>
    </div>
  )
}
