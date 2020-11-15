import React from 'react';
import styled from 'styled-components';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import { Product } from './Product';

const BlankProduct = styled.div`
  width: 300px;
`;

const products = [
  {
    'code': '1',
    'name': '1300 SERIES A2 BIOLOGICAL SAFETY CABINET PACKAGES',
    'description': 'Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod. Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod',
    'imageUrls': ['/images/products/ThermoScientific.jpg']
  },
  {
    'code': '2',
    'name': '2300 SERIES A2 BIOLOGICAL SAFETY CABINET PACKAGES',
    'description': 'Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod. Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod',
    'imageUrls': ['/images/products/TheKIMTECHPURE.jpg']
  },
  {
    'code': '3',
    'name': '3300 SERIES A2 BIOLOGICAL SAFETY CABINET PACKAGES',
    'description': 'Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod. Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod',
    'imageUrls': ['/images/products/1300SeriesA2.jpg']
  },
  {
    'code': '4',
    'name': '4300 SERIES A2 BIOLOGICAL SAFETY CABINET PACKAGES',
    'description': 'Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod. Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod',
    'imageUrls': ['/images/products/ReageconBuffer.jpg']
  },
  {
    'code': '5',
    'name': '5300 SERIES A2 BIOLOGICAL SAFETY CABINET PACKAGES',
    'description': 'Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod. Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod',
    'imageUrls': ['/images/products/NuncEasYFlask.jpg']
  },
  {
    'code': '6',
    'name': '6300 SERIES A2 BIOLOGICAL SAFETY CABINET PACKAGES',
    'description': 'Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod. Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod',
    'imageUrls': ['/images/products/DuranlaboratoryGlassware.jpg']
  },
  {
    'code': '7',
    'name': '7300 SERIES A2 BIOLOGICAL SAFETY CABINET PACKAGES',
    'description': 'Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod. Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod',
    'imageUrls': ['/images/products/ThermoScientificTrace.jpg']
  }
];

export const FeaturedCarousel = () => {
  // const cartItems = useSelector(selectCartItems);

  // const productIdToQuantityMap = cartItems.reduce((idToQuantityMap, curItem) => {
  //   idToQuantityMap[curItem.code] = curItem.quantity === null ? 0 : curItem.quantity;
  // }, {})
  
  // const productsWithQuantity = products.map(curProduct => {
  //   return {
  //     ...curProduct,
  //     quantity: productIdToQuantityMap[curProduct.code] >= 0 ? productIdToQuantityMap[curProduct.code] : 0
  //   }
  // });

  const viewportWidth = window.outerWidth;
  const noOfItemsPerSlide = viewportWidth >= 1024 ? 3 : (viewportWidth >= 768 ? 2 : 1);


  return (
    <AwesomeSlider className='featured-slider'>
      {products
        .map((curProduct, index) => index % noOfItemsPerSlide === 0 ? index : null)
        .filter(index => index !== null)
        .map(indexOf3 => 
          <div key={indexOf3} className='product-frame'>
            {
              Array(noOfItemsPerSlide).fill()
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
