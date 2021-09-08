import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { device } from '../../utils/viewport';


const Container = styled.div`
  background: url('/images/BG2.png');
  // height: 1500px;
  height: 500px;
`;

const Content = styled.div`
  position: absolute;
  color: #FFF;
  padding: 20px;

  @media ${device.tablet} {
    padding: 50px 50px;
  }

  @media ${device.laptop} {
    flex-direction: row;
    padding: 100px 200px;
  }

  @media ${device.laptop15} {
    flex-direction: row;
    padding: 100px 300px;
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
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 100px;
  grid-row-gap: 100px;
  margin-bottom: 50px;

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
`;

const NameFrame = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const Name = styled.div`
  font-weight: bold;
`;

const CartIcon = styled(AiOutlineShoppingCart)`
  cursor: pointer;
`;

const FillStarIcon = styled(AiFillStar)`
  fill: #D99107;
  margin-right: 5px;
`;

const OutlineStarIcon = styled(AiOutlineStar)`
  fill: #D99107;
  margin-right: 5px;
`;

const Rating = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Price = styled.div`
  color: #919191;
`;




const productList = [
  { name: 'Sample Product', imageUrl: '/images/our-products/Photo1.png', rating: 4.0, price: 200.00 },
  { name: 'Sample Product', imageUrl: '/images/our-products/Photo2.png', rating: 4.0, price: 200.00 },
  { name: 'Sample Product', imageUrl: '/images/our-products/Photo3.png', rating: 4.0, price: 200.00 },
  { name: 'Sample Product', imageUrl: '/images/our-products/Photo4.png', rating: 4.0, price: 200.00 },
  { name: 'Sample Product', imageUrl: '/images/our-products/Photo5.png', rating: 4.0, price: 200.00 },
  { name: 'Sample Product', imageUrl: '/images/our-products/Photo6.png', rating: 4.0, price: 200.00 }
]

export const OurProducts = () => {

  const viewportWidth = window.outerWidth;
  const isMobile = viewportWidth < 768;
  const isTablet = !isMobile && viewportWidth < 1024;

  return (
    <Container>
      <Content>
        <Heading>OUR PRODUCTS</Heading>

        <Description>We carry with us the legacy of offering the widest range of products in this field owing to being the authorised distributors and channel partners for mulple companies. <br></br>
        With a price range that suits all kinds of requirements, set-ups and working condions, we are here to meet all your needs. Log on to our products page to see what we have to offer.</Description>

        <ExploreButton to='/productlist'>EXPLORE ALL</ExploreButton>

        {/* <ProductWrapper>
          {(isMobile ? productList.slice(0, 2) : isTablet ? productList.slice(0, 4) : productList).map((curProduct, index) =>
            <Product key={index}>
              <Image src={curProduct.imageUrl} alt={curProduct.name} />

              <NameFrame>
                <Name>{curProduct.name}</Name>
                <CartIcon size='1.5em' />
              </NameFrame>

              <Rating>
                {curProduct.rating < 1 ?
                  <>
                    <OutlineStarIcon />
                    <OutlineStarIcon />
                    <OutlineStarIcon />
                    <OutlineStarIcon />
                    <OutlineStarIcon />
                  </> :
                  curProduct.rating < 2 ?
                    <>
                      <FillStarIcon />
                      <OutlineStarIcon />
                      <OutlineStarIcon />
                      <OutlineStarIcon />
                      <OutlineStarIcon />
                    </> :
                  curProduct.rating < 3 ?
                  <>
                    <FillStarIcon />
                    <FillStarIcon />
                    <OutlineStarIcon />
                    <OutlineStarIcon />
                    <OutlineStarIcon />
                  </> :
                  curProduct.rating < 4 ?
                  <>
                    <FillStarIcon />
                    <FillStarIcon />
                    <FillStarIcon />
                    <OutlineStarIcon />
                    <OutlineStarIcon />
                  </> :
                  curProduct.rating < 5 ?
                  <>
                    <FillStarIcon />
                    <FillStarIcon />
                    <FillStarIcon />
                    <FillStarIcon />
                    <OutlineStarIcon />
                  </> :
                  <>
                    <FillStarIcon />
                    <FillStarIcon />
                    <FillStarIcon />
                    <FillStarIcon />
                    <FillStarIcon />
                  </>
                }

              </Rating>

              <Price>{curProduct.price}</Price>
            </Product>
          )}
        </ProductWrapper> */}

      </Content>
    </Container>
  )
}