import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../homepage/common/Button';
import { QuantityBox } from '../cart/QuantityBox';
import { selectCartItems, updateUserCartAsync } from '../cart/cartSlice';
import { selectUserEmail } from '../auth/authSlice';
import { device } from '../utils/viewport';

const Tr = styled.tr`
  box-shadow: 0 0 10px 1px rgba(188,188,188,0.3);
`;

const Td = styled.td`
  padding: 10px;

  @media ${device.laptop} { 
    padding: 20px 30px;
  }
`;

const CustomTd = styled.td`
  padding: 0 10px;
  text-align: center;

  @media ${device.laptop} { 
    padding: 0 30px;
  }
`;


export const ProductRow = ({ productDetails }) => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);

  const [quantity, setQuantity] = useState(0);

  const cartItems = useSelector(selectCartItems);
  const isItemAlreadyInCart = cartItems.find(curCartItem => curCartItem.code === productDetails.code);

  useEffect(() => {
    setQuantity(isItemAlreadyInCart ? isItemAlreadyInCart.quantity : 0);
  }, [isItemAlreadyInCart]);


  const handleAddToCart = productDetails => {
    dispatch(updateUserCartAsync('UPDATE_CART_ITEM', userEmail, cartItems, { ...productDetails, quantity: 1 }));
  }

  const handleChangeQuantity = newQuantity => {
    setQuantity(newQuantity);
    if (newQuantity === 0)
      dispatch(updateUserCartAsync('DELETE_CART_ITEM', userEmail, cartItems, productDetails.code));
    else
      dispatch(updateUserCartAsync('UPDATE_CART_ITEM', userEmail, cartItems, { ...productDetails, quantity: newQuantity }));
  }

  const viewportWidth = window.outerWidth;
  const isMobile = viewportWidth < 768;
  const buttonStyle = isMobile ? 
    ({padding: '10px', fontSize: '10px', minWidth: '100px'}) : 
    ({padding: '12px 25px', fontSize: '10px', minWidth: '120px'});

  return (
    <Tr>
      <Td>{productDetails.code}</Td>
      <Td>{productDetails.name}</Td>
      <Td>{productDetails.brand}</Td>
      <Td>{productDetails.capacity ? productDetails.capacity : productDetails.pack}</Td>
      <CustomTd>
        {
          quantity === 0 ?
          <Button 
            style={buttonStyle} 
            label='ADD TO CART' 
            handleOnClick={() => { setQuantity(1); handleAddToCart(productDetails); }} 
          /> :
          <QuantityBox 
            styleObj={{ justifyContent: 'center'}} 
            quantity={quantity} 
            setQuantity={handleChangeQuantity} 
          />
        }
      </CustomTd>
    </Tr>
  )
}
