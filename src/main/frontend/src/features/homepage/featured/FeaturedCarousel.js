import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import { Product } from './Product';
import { selectCartItems } from '../../cart/cartSlice';

const BlankProduct = styled.div`
  width: 300px;
`;

const products = [
  {
    'id': '1',
    'name': '1300 SERIES A2 BIOLOGICAL SAFETY CABINET PACKAGES',
    'description': 'Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod. Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod',
    'imageUrl': '/images/products/ThermoScientific.jpg'
  },
  {
    'id': '2',
    'name': '2300 SERIES A2 BIOLOGICAL SAFETY CABINET PACKAGES',
    'description': 'Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod. Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod',
    'imageUrl': '/images/products/TheKIMTECHPURE.jpg'
  },
  {
    'id': '3',
    'name': '3300 SERIES A2 BIOLOGICAL SAFETY CABINET PACKAGES',
    'description': 'Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod. Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod',
    'imageUrl': '/images/products/1300SeriesA2.jpg'
  },
  {
    'id': '4',
    'name': '4300 SERIES A2 BIOLOGICAL SAFETY CABINET PACKAGES',
    'description': 'Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod. Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod',
    'imageUrl': '/images/products/ReageconBuffer.jpg'
  },
  {
    'id': '5',
    'name': '5300 SERIES A2 BIOLOGICAL SAFETY CABINET PACKAGES',
    'description': 'Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod. Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod',
    'imageUrl': '/images/products/NuncEasYFlask.jpg'
  },
  {
    'id': '6',
    'name': '6300 SERIES A2 BIOLOGICAL SAFETY CABINET PACKAGES',
    'description': 'Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod. Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod',
    'imageUrl': '/images/products/DuranlaboratoryGlassware.jpg'
  },
  {
    'id': '7',
    'name': '7300 SERIES A2 BIOLOGICAL SAFETY CABINET PACKAGES',
    'description': 'Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod. Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod',
    'imageUrl': '/images/products/ThermoScientificTrace.jpg'
  }
];

export const FeaturedCarousel = () => {
  // const cartItems = useSelector(selectCartItems);

  // const productIdToQuantityMap = cartItems.reduce((idToQuantityMap, curItem) => {
  //   idToQuantityMap[curItem.id] = curItem.quantity === null ? 0 : curItem.quantity;
  // }, {})
  
  // const productsWithQuantity = products.map(curProduct => {
  //   return {
  //     ...curProduct,
  //     quantity: productIdToQuantityMap[curProduct.id] >= 0 ? productIdToQuantityMap[curProduct.id] : 0
  //   }
  // });

  return (
    <AwesomeSlider className='featured-slider'>
      {products
        .map((curProduct, index) => index % 3 === 0 ? index : null)
        .filter(index => index !== null)
        .map(indexOf3 => 
          <div key={indexOf3} className='product-frame'>
            {
              Array(3).fill()
                .map((_, i) => {
                  const curIndex = indexOf3 + i;
                  return curIndex < products.length ? <Product key={curIndex} productDetails={products[curIndex]} /> : <BlankProduct key={curIndex} />;
                })
            }
          </div>
        )}
    </AwesomeSlider>
  )
}
