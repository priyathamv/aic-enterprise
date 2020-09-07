import React from 'react';
import styled from 'styled-components';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import { Product } from './Product';

const BlackProduct = styled.div`
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
                  return curIndex < products.length ? <Product key={curIndex} productDetails={products[curIndex]} /> : <BlackProduct key={curIndex} />;
                })
            }
          </div>
        )}
    </AwesomeSlider>
  )
}
