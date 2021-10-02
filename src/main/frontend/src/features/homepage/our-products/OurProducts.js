import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';

import { device } from '../../utils/viewport';
import { FlagshipProduct } from './FlagshipProduct';


const Container = styled.div`
  background: url('/images/BG2.png');
  height: 1000px;

  @media ${device.tablet} {
    height: 1500px;
  }
`;

const Content = styled.div`
  // position: absolute;
  color: #FFF;
  padding: 20px;

  @media ${device.tablet} {
    padding: 30px 50px;
  }

  @media ${device.laptop} {
    flex-direction: row;
    padding: 50px 200px;
  }
`;

const Heading = styled.div`
  text-align: center;
  font-weight: bold;
  color: #FFF;
  font-size: 24px;
  margin-bottom: 30px;

  @media ${device.tablet} {
    font-size: 32px;
  }

  @media ${device.laptop} {
    font-size: 36px;
  }
`;

const Description = styled.div`
  text-align: center;
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 26px;
  padding: 0 10px

  @media ${device.tablet} {
    padding: 0 20px;
  }

  @media ${device.laptop} {
    // padding: 0 250px;
  }
`;

const ExploreButton = styled(Link)`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  text-decoration: underline;
  color: #FFF;
  font-size: 20px;
`;

const ProductWrapper = styled.div`
  padding: -20px;

  @media ${device.tablet} {
    padding: -50px;
  }

  @media ${device.laptop} {
    flex-direction: row;
    padding: -100px -200px;
  }

  @media ${device.laptop15} {
    padding: -100px -200px;
  }
`;


const AutoplaySlider = withAutoplay(AwesomeSlider);

export const OurProducts = () => {

  const viewportWidth = window.innerWidth;
  const isMobile = viewportWidth < 768;
  const isTablet = !isMobile && viewportWidth < 1024;
  const isLaptopSmall = !isMobile && viewportWidth < 1366;

  const size = isMobile ? 1 : isTablet ? 2 : isLaptopSmall ? 4 : 6;

  const [productList, setProductList] = useState([]);
  const [productListOfList, setProductListOfList] = useState([]);


  useEffect(() => {
    console.log('dasdasdasds')
    axios.get('/api/featured-products/all?ribbon=Flagship&pageNo=0&limit=30')
      .then(response => {
        setProductList(response.data.payload);
      })
      .catch(function (error) {
        console.log('Error while fetching flagship products', error);
      });
  }, []);

  useEffect(() => {
    const newProductList = [];
    for (let i=0; i<productList.length; i = i+size) {
      let productListTemp = [];
      let tempSize = size;
      while (tempSize-- && productList[i + (size-tempSize-1)]) {
        productListTemp.push(productList[i + (size-tempSize-1)]);
      }
      newProductList.push(productListTemp);
    }
    setProductListOfList(newProductList);
    console.log('newProductList', newProductList)

  }, [productList]);


  return (
    <Container>
      <Content>
        <Heading>OUR PRODUCTS</Heading>

        <Description>We carry with us the legacy of offering the widest range of products in this field owing to being the authorised distributors and channel partners for mulple companies. With a price range that suits all kinds of requirements, set-ups and working condions, we are here to meet all your needs. Log on to our products page to see what we have to offer.</Description>

        <ExploreButton to='/productlist'>EXPLORE ALL</ExploreButton>
      </Content>

      <AutoplaySlider
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={5000}
        bullets={false}
        style={ viewportWidth < 768 ? { height: '578px' } : { height: '1200px' }}
      >
        {productListOfList.map((curProductList, index) => {
          return (
            <ProductWrapper key={index} className='products-grid'>
              {curProductList.map((curProduct, innerIndex) =>
                <FlagshipProduct key={innerIndex} productDetails={curProduct} />
              )}
            </ProductWrapper>
          )
        })}
      </AutoplaySlider>
    </Container>
  )
}