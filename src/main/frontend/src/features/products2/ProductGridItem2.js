import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../homepage/common/Button';
import { QuantityBox } from '../cart/QuantityBox';
import { selectCartItems, updateUserCartAsync } from '../cart/cartSlice';
import { selectUserEmail } from '../auth/authSlice';
import { device } from '../utils/viewport'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  margin-bottom: 10px;
  height: 250px;
  object-fit: cover;

  @media ${device.laptop} {

  }
`;

const ProductName = styled.div`
  margin-bottom: 10px;
`;

const ButtonFrame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProductGridItem2 = ({ productDetails }) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);

  const [quantity, setQuantity] = useState(0);

  const cartItems = useSelector(selectCartItems);
  const isItemAlreadyInCart = cartItems.find(curCartItem => curCartItem.productId === productDetails.productId);

  useEffect(() => {
    setQuantity(isItemAlreadyInCart ? isItemAlreadyInCart.quantity : 0);
  }, [isItemAlreadyInCart]);


  const handleAddToCart = productDetails => {
    dispatch(updateUserCartAsync('UPDATE_CART_ITEM', userEmail, cartItems, { ...productDetails, quantity: 1 }));
  }

  const handleChangeQuantity = newQuantity => {
    setQuantity(newQuantity);
    if (newQuantity === 0)
      dispatch(updateUserCartAsync('DELETE_CART_ITEM', userEmail, cartItems, productDetails.productId));
    else
      dispatch(updateUserCartAsync('UPDATE_CART_ITEM', userEmail, cartItems, { ...productDetails, quantity: newQuantity }));
  }

  return (
    <Container>
      <Image src={productDetails.imageUrls[0]} />

      <ProductName>{productDetails.name}</ProductName>

      <ButtonFrame>
        {
          quantity === 0 ?
          <Button
            style={{ borderRadius: '3px', fontSize: '12px', padding: '10px 20px'}}
            label='ADD TO CART'
            handleOnClick={() => { setQuantity(1); handleAddToCart(productDetails); }}
          /> :
          <QuantityBox
            styleObj={{ justifyContent: 'center'}}
            quantity={quantity}
            setQuantity={handleChangeQuantity}
          />
        }
      </ButtonFrame>
    </Container>
  )
}
