import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import { Product } from './Product';


export const FeaturedCarousel = () => {
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
