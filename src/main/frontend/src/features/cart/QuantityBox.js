import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const QuantityOperator = styled.button`
  width: 25px;
  text-align: center;
  border-radius: 0;
  border: 1px solid #ccc;
  font-size: 20px;
  background-color: #f3f3f3;
  cursor: pointer;
`;

const Quantity = styled.input`
  width: 25px;
  text-align: center;
  border: 1px solid #ccc;
  padding: 0 5px;
  border-radius: 0;
`;

export const QuantityBox = ({quantity, onQuantityChange, handleChangeQuantity}) => {
  return (
    <Container>
      <QuantityOperator 
        style={{ borderRight: 'none' }} 
        onClick={() => handleChangeQuantity(-1)} 
      >-
      </QuantityOperator>
      
      <Quantity type='text' value={quantity} onChange={e => onQuantityChange(e.target.value)}/>
      
      <QuantityOperator 
        style={{ borderLeft: 'none' }} 
        onClick={() => handleChangeQuantity(1)}
      >+</QuantityOperator>
    </Container>
  )
}
