import React from 'react';
import styled from 'styled-components';

import { Button } from './Button';

const Container = styled.div`
  background-color: #ccc;
  padding: 40px 200px;
  text-align: center;
`;
  
const Heading = styled.div`
  font-weight: bold;
  color: #232162;
  font-size: 26px;
  margin-bottom: 40px;
`;
  
const Content = styled.div`
  margin-bottom: 40px;
  line-height: 30px;
  font-size: 20px;
`;


export const SeeOurProducts = () => {
  const handleOnClick = () => {}

  return (
    <Container>
      <Heading>See our products</Heading>

      <Content>
        The biggest strength of AIC is the massive range of products that we offer, and the accessibility to it at all times and places. Having been well connected across the country, AIC carries out the role of being responsible associ- ates and authorized distributors to various brands.
      </Content>
      
      <Content>
        With a price range that suits all kinds of requirements, set-ups and working conditions, AIC offers the highest quality of products
      </Content>

      <Button label='KNOW MORE' handleOnClick={handleOnClick} />
    </Container>
  )
}
