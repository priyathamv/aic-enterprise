import React from 'react';
import styled from 'styled-components';

import { Button } from '../common/Button';

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

const products = {
  '1': '/item1.png',
  '2': '/item2.png',
  '3': '/item3.png'
}

export const Product = ({ productId }) => {
  const handleOnClick = () => {}

  return (
    <Container>
      <Image src={products[productId]} />
      <Button label='BUY NOW' handleOnClick={handleOnClick} />
    </Container>
  )
}
