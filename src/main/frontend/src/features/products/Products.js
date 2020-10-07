import React from 'react';
import styled from 'styled-components';

import { Categories } from './categories/Categories';
import { Brands } from './brands/Brands';
import { device } from '../utils/viewport';

const Container = styled.div`

`;

const Header = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin: 30px 20px;
  margin-bottom: 30px;
  
  @media ${device.tablet} { 
    margin: 30px 100px;
  }

  @media ${device.laptop} { 
    margin: 30px 200px;
  }
`;


export const Products = () => {
  return (
    <Container id='products_id'>
      <Header>Divisions</Header>
      <Categories />
      
      <Header id='brands_id'>Brands</Header>
      <Brands />
    </Container>
  )
}
