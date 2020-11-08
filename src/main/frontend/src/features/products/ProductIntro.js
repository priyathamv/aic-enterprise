import React from 'react'
import styled from 'styled-components';

import { device } from '../utils/viewport';

const Container = styled.div`
  color: #232162;
  background-color: #F8F8FF;
  padding: 50px 20px;
  margin: 0 -20px 50px -20px;

  @media ${device.laptop} { 
    padding: 50px 15vw;
    margin: 0 -15vw 50px -15vw;
  }
`;

const ProductName = styled.div`
  font-size: 32px;

  @media ${device.laptop} { 
    font-size: 42px;
  }
`;

const ProductDesc = styled.div`
  font-size: 16px;
  margin-top: 30px;
  line-height: 25px;

  @media ${device.laptop} { 
    font-size: 18px;
  }
`;

export const ProductIntro = ({ brand, description }) => {
  return (
    <Container>
      <ProductName>{brand}</ProductName>
      {description && <ProductDesc>{description}</ProductDesc>}
    </Container>
  )
}
