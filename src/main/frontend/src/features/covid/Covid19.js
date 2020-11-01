import React from 'react';
import styled from 'styled-components';

import { covid19_products } from './covid19_products';
import { CovidProduct } from './CovidProduct';
import { ProductIntro } from '../products/ProductIntro'
import { device } from '../utils/viewport';

const Container = styled.div`
  margin: 0 20px 50px 20px;
    
  @media ${device.laptop} { 
    margin: 0 15vw 50px 15vw;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 50px;

  @media ${device.tablet} { 
    grid-template-columns: 1fr 1fr;
  }
  
  @media ${device.laptop} { 
    grid-template-columns: 1fr 1fr 1fr;
  }
`;


export const Covid19 = () => {

  return (
    <Container id='covid19_id'>
      <ProductIntro brand='COVID-19' description='Some desc' />
      
      <ProductsGrid>
        {covid19_products.map((curProduct, index) => <CovidProduct key={index} productDetails={curProduct} />)}
      </ProductsGrid>
    </Container>
  )
}
