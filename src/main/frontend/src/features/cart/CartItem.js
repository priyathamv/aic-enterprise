import React, { useState } from 'react';
import styled from 'styled-components';

import { Line } from '../homepage/common/Line';
import { BsFillTrashFill } from 'react-icons/bs';
import { QuantityBox } from './QuantityBox';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  background-color: #FFF;
  border-radius: 2px;
  border: 1px solid transparent;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,.1);
  padding: 10px;
`;

const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ItemImage = styled.div`
  width: 200px;
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

const Cost = styled.div`
  font-weight: bold;
`;

export const CartItem = () => {
  const [quantity, setQuantity] = useState(1);
  
  const onQuantityChange = (value) => {
    if (!isNaN(value))
      setQuantity(Number(value))
  }

  const handleChangeQuantity = (value) => {
    if (quantity + value >= 0)
      setQuantity(quantity + value);
  }

  return (
    <Container>
      <ItemDetails>
        <ItemImage src='https://images-static.nykaa.com/media/catalog/product/tr:h-800,w-800,cm-pad_resize/e/8/e8cd60b8906087771821__1_.jpg'></ItemImage>

        <ItemDesc>Mamaearth Argan & Apple Cider Vinegar Shampoo For Dry & Friz</ItemDesc>

        <DeleteIcon size='2em' />
      </ItemDetails>
      
      <Line />

      <ItemFooter>
        <QuantityFrame>
          <Label>Quantity</Label>

          <QuantityBox quantity={quantity} onQuantityChange={onQuantityChange} handleChangeQuantity={handleChangeQuantity} />
        </QuantityFrame>

        <Cost>Rs 4599</Cost>
      </ItemFooter>
    </Container>
  )
}
