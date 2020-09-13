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

export const QuantityBox = ({ styleObj, quantity, setQuantity}) => {
  const handleQuantityChange = value => {
    if (value === '')
      setQuantity('');
    else if (!isNaN(value) && value >= 0)
      setQuantity(Number(value));
  }

  const handleOnBlur = value => {
    if (value === '')
      setQuantity(0);
  }

  return (
    <Container style={styleObj}>
      <QuantityOperator 
        style={{ borderRight: 'none' }} 
        onClick={() => quantity-1 >=0 && setQuantity(quantity-1)} 
      >-
      </QuantityOperator>
      
      <Quantity 
        type='text' 
        value={quantity} 
        onBlur={e => handleOnBlur(e.target.value)} 
        onChange={e => handleQuantityChange(e.target.value)}
      />
      
      <QuantityOperator 
        style={{ borderLeft: 'none' }} 
        onClick={() => quantity+1 >=0 && setQuantity(quantity+1)}
      >+</QuantityOperator>
    </Container>
  )
}
