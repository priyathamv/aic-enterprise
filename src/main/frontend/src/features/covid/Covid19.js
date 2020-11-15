import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
    grid-row-gap: 100px;
  }
  
  @media ${device.laptop} { 
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 100px;
  }
`;


export const Covid19 = () => {
  const [covid19Products, setCovid19Products] = useState([]);

  const fetchCovid19Products = async () => {
    try {
      const covid19ProductsResponse = await axios.get('/api/featured-products/covid19');
      console.log('covid19ProductsResponse.data.payload', covid19ProductsResponse.data.payload);
      setCovid19Products(covid19ProductsResponse.data.payload);

    } catch (err) {
      console.log('Error while fetching Covid19 products', err.message);
    }
  }

  useEffect(() => {
    fetchCovid19Products();
  }, [])

  return (
    <Container id='covid19_id'>
      <ProductIntro brand='COVID-19' description='Covid19 products' />
      
      <ProductsGrid>
        {covid19Products.map((curProduct, index) => <CovidProduct key={index} productDetails={curProduct} />)}
      </ProductsGrid>
    </Container>
  )
}
