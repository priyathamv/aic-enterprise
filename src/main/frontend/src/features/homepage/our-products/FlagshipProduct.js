import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { device } from '../../utils/viewport';
import { QuantityBox } from '../../cart/QuantityBox';
import { selectCartItems, updateUserCartAsync } from '../../cart/cartSlice';
import { selectUserEmail } from '../../auth/authSlice';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
`;

const ImageWrapper = styled(Link)`
  text-decoration: none;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;

  @media ${device.tablet} {
    width: 400px;
    height: 400px;
  }
`;

const NameFrame = styled.div`
  color: #FFF;
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0 0;
`;

const Name = styled(Link)`
  font-weight: bold;
  color: #FFF;
  text-decoration: none;
`;

const CartIcon = styled(AiOutlineShoppingCart)`
  cursor: pointer;
`;

const Price = styled.div`
  color: #919191;
`;

export const FlagshipProduct = ({ productDetails }) => {
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
        <ImageWrapper to={`/product-detail/${productDetails.application}/${productDetails.productId}`}>
          <Image src={productDetails.imageUrls[0]} alt={productDetails.name} />
        </ImageWrapper>

        <NameFrame>
          <Name to={`/product-detail/${productDetails.application}/${productDetails.productId}`}>{productDetails.name}</Name>
          {quantity === 0 ?
            <CartIcon size='1.5em' onClick={() => { setQuantity(1); handleAddToCart(productDetails); }} /> :
            <QuantityBox
              styleObj={{ justifyContent: 'center'}}
              quantity={quantity}
              setQuantity={handleChangeQuantity}
            />
          }
        </NameFrame>

        <Price>{productDetails.application}</Price>
      </Container>
  )
}