import React from 'react';
import styled from 'styled-components';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import { Product } from './Product';

const Container = styled.div`

`;

const ProductFrame = styled.div`
  display: flex;
  background-color: #FFF;
`;

const Image = styled.img`
  width: 300px;
  height: 400px;
`;


export const FeaturedCarousel = () => {
  const products = {
    '1': '/item1.png',
    '2': '/item2.png',
    '3': '/item3.png'
  }

  return (
    <AwesomeSlider className='featured-slider'>
      <div className='product-frame'>
        <Product productId='1' />
        <Product productId='2' />
        <Product productId='3' />
      </div>

      <div className='product-frame'>
        <Product productId='2' />
        <Product productId='3' />
        <Product productId='1' />
      </div>

      <div className='product-frame'>
        <Product productId='1' />
        <Product productId='2' />
        <Product productId='3' />
      </div>

      <div className='product-frame'>
        <Product productId='2' />
        <Product productId='3' />
        <Product productId='1' />
      </div>

      <div className='product-frame'>
        <Product productId='1' />
        <Product productId='2' />
        <Product productId='3' />
      </div>

      <div className='product-frame'>
        <Product productId='2' />
        <Product productId='3' />
        <Product productId='1' />
      </div>
    </AwesomeSlider>
  )
}
