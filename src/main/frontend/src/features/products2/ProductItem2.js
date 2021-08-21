import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../homepage/common/Button';
import { Line } from '../homepage/common/Line';
import { QuantityBox } from '../cart/QuantityBox';
import { selectCartItems, updateUserCartAsync } from '../cart/cartSlice';
import { selectUserEmail } from '../auth/authSlice';

const Container = styled.div`
`;

const ProductRow = styled.div`
  display: flex;
  margin: 20px 0;
`;

const Image = styled.img`
  flex: 1;
  max-width: 180px;
  cursor: pointer;
`;

const ProductDetails = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
`;

const ProductName = styled.div`
  margin-bottom: 5px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: #232162;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  font-size: 14px;
  color: #565959;
  margin-bottom: 5px;
`;

const Info = styled.div`

`;

const Description = styled.div`
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ButtonFrame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const KnowMore = styled(Link)`
  text-decoration: underline;
  color: #232162;
  cursor: pointer;
`;

export const ProductItem2 = ({ productDetails }) => {
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

  const createMarkup = value => {
    return { __html: value };
  }

  return (
    <Container>
      <ProductRow>
        <Image
          src={productDetails.imageUrls[0]}
          onClick={() => history.push(`/product-detail/${productDetails.application}/${productDetails.productId}`)} />

        <ProductDetails>
          <div>
            <ProductName
              onClick={() => history.push(`/product-detail/${productDetails.application}/${productDetails.productId}`)}>
              {productDetails.name}
            </ProductName>

            <ProductInfo>
              <Info style={{ marginRight: '10px' }}>{productDetails.application}</Info>|
              <Info style={{ margin: '0 10px' }}>{productDetails.category}</Info>|
              <Info style={{ marginLeft: '10px' }}>{productDetails.brand}</Info>
            </ProductInfo>

            <Description dangerouslySetInnerHTML={createMarkup(productDetails.description)} />
          </div>

          <ButtonFrame>
            <KnowMore to={`/product-detail/${productDetails.application}/${productDetails.productId}`}>Know more</KnowMore>

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
        </ProductDetails>
      </ProductRow>

      <Line style={{ margin: '30px 0' }} />
    </Container>
  )
}
