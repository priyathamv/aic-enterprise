import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { CovidProduct } from '../covid/CovidProduct';
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


export const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const fetchFeaturedProducts = async () => {
    try {
      const featuredProductsResponse = await axios.get('/api/featured-products/all');
      console.log('featuredProductsResponse.data.payload', featuredProductsResponse.data.payload);
      setFeaturedProducts(featuredProductsResponse.data.payload);

    } catch (err) {
      console.log('Error while fetching Featured products', err.message);
    }
  }

  useEffect(() => {
    fetchFeaturedProducts();
  }, [])

  return (
    <Container id='featured_id'>
      <ProductIntro brand='Featured Products' description='Featured products' />
      
      <ProductsGrid>
        {featuredProducts.map((curProduct, index) => <CovidProduct key={index} productDetails={curProduct} />)}
      </ProductsGrid>
    </Container>
  )
}
