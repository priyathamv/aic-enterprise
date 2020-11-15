import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { updateUserCartAsync, selectCartItems } from '../../cart/cartSlice';
import { selectUserEmail } from '../../auth/authSlice';
import { ProductPopup } from './ProductPopup';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 30px;
`;


export const Product = ({ productDetails }) => {
  const dispatch = useDispatch();

  const userEmail = useSelector(selectUserEmail);
  const cartItems = useSelector(selectCartItems);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(updateUserCartAsync('UPDATE_CART_ITEM', userEmail, cartItems, { ...productDetails, quantity }));
  }

  return (
    <Container>
      <Image src={productDetails.imageUrls[0]} />
      
      <ProductPopup 
        label='KNOW MORE'
        productDetails={productDetails} 
        quantity={quantity} 
        setQuantity={setQuantity} 
        handleAddToCart={handleAddToCart}
      />
    </Container>
  )
}
