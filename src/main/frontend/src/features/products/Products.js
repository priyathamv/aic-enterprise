import React from 'react';
import styled from 'styled-components';

import { Categories } from './categories/Categories';

const Container = styled.div`

`;

const CategoryHeader = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin: 30px 200px 30px 200px;
  margin-bottom: 30px;
`;


export const Products = () => {
  return (
    <Container id='products_id'>
      <CategoryHeader>Divisions</CategoryHeader>
      <Categories />
    </Container>
  )
}
