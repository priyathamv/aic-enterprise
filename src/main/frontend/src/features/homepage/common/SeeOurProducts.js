import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { device } from '../../utils/viewport';

const Container = styled.div`
  background-color: #ccc;
  text-align: center;
  padding: 20px;
  
  @media ${device.laptop} { 
    padding: 50px 200px;
  }
`;
  
const Heading = styled.div`
  font-weight: bold;
  color: #232162;
  font-size: 28px;
  margin-bottom: 20px;

  @media ${device.laptop} { 
    // font-size: 32px;
    margin-bottom: 20px;
  }
`;
  
const Content = styled.div`
  margin-bottom: 20px;
  // line-height: 30px;
  font-size: 16px;

  @media ${device.laptop} { 
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  background-color: #232162;
  color: #FFF;
  border-radius: 5px;
  font-weight: bold;
  border: none;
  font-size: 12px;
  padding: 15px 30px;
  display: inline-block;
`;


export const SeeOurProducts = () => {

  return (
    <Container>
      <Heading>See our products</Heading>

      <Content>
        We carry with us the legacy of offering the widest range of products in this field owing to being the authorised distributors and channel partners for multiple companies.
      </Content>
      
      <Content>
        With a price range that suits all kinds of requirements, set-ups and working conditions, we are here to meet all your needs. Log on to our products page to see what we have to offer.
      </Content>

      <CustomLink to='/products'>KNOW MORE</CustomLink>
    </Container>
  )
}
