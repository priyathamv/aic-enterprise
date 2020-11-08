import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems, updateUserCartAsync } from '../cart/cartSlice';
import { selectUserEmail } from '../auth/authSlice';
import { ProductPopup } from '../homepage/featured/ProductPopup';
import { device } from '../utils/viewport';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;

  @media ${device.laptop} { 
    
  }
`;

const Code = styled.div`

`;

const Name = styled.div`

`;

const Brand = styled.div`

`;

const Capacity = styled.div`

`;

const Description = styled.div`

`;

const Button = styled.button`
  align-self: center;
  width: 150px;
  background-color: #232162;
  color: #FFF;
  border: none;
  padding: 12px 0;
  font-size: 13px;
  cursor: pointer;
  position: relative;
  border-radius: 5px;
  font-weight: bold;
`;



export const CovidProduct = ({ productDetails }) => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);

  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector(selectCartItems);

  const handleAddToCart = () => {
    dispatch(updateUserCartAsync('UPDATE_CART_ITEM', userEmail, cartItems, { ...productDetails, quantity }));
  }

  return (
    <Container>
      <Image src={productDetails.imageUrl} />

      <ProductPopup 
        label='ORDER NOW'
        productDetails={productDetails} 
        quantity={quantity} 
        setQuantity={setQuantity} 
        handleAddToCart={handleAddToCart}
      />

      {/* <Code>{productDetails.code}</Code>
      <Name>{productDetails.name}</Name>
      <Brand>{productDetails.brand}</Brand>
      <Capacity>{productDetails.capacity ? productDetails.capacity : productDetails.pack}</Capacity>
      <Description>{productDetails.description}</Description>
      {quantity === 0 ? 
        <Button 
          onClick={() => { setQuantity(1); handleAddToCart(productDetails); }} 
        >ADD TO CART</Button> :
        <QuantityBox 
          // styleObj={{ justifyContent: 'center'}} 
          quantity={quantity} 
          setQuantity={handleChangeQuantity} 
        />
      } */}
    </Container>
  )
}
