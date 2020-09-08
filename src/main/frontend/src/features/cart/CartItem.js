import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Line } from '../homepage/common/Line';
import { BsFillTrashFill } from 'react-icons/bs';
import { QuantityBox } from './QuantityBox';
import { updateItemInCart, deleteItemFromCart } from '../cart/cartSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  background-color: #FFF;
  border-radius: 2px;
  border: 1px solid transparent;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,.1);
  padding: 10px;
  margin-bottom: 10px;
`;

const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ItemImage = styled.img`
  width: 100px;
`;

const ItemDesc = styled.div`
  font-size: 14px;
  margin: 0 10px;
`;

const DeleteIcon = styled(BsFillTrashFill)`
  cursor: pointer;
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
`;

const QuantityFrame = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  margin-right: 10px;
`;

// const Cost = styled.div`
//   font-weight: bold;
// `;

export const CartItem = ({ itemDetails }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = value => {
      dispatch(updateItemInCart({ ...itemDetails, quantity: value }));
  }

  const handleDeleteItem = () => {
    dispatch(deleteItemFromCart(itemDetails.id));
  }

  return (
    <Container>
      <ItemDetails>
        <ItemImage src={itemDetails.imageUrl}></ItemImage>

        <ItemDesc>{itemDetails.name}</ItemDesc>

        <DeleteIcon size='2em' onClick={handleDeleteItem}/>
      </ItemDetails>
      
      <Line />

      <ItemFooter>
        <QuantityFrame>
          <Label>Quantity</Label>

          <QuantityBox quantity={itemDetails.quantity} setQuantity={handleQuantityChange} />
        </QuantityFrame>

        {/* <Cost>Rs 4599</Cost> */}
      </ItemFooter>
    </Container>
  )
}
