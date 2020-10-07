import React from 'react';
import styled from 'styled-components';

import { Category } from './Category';
import { categoryList } from './categoryList';
import { device } from '../../utils/viewport';

const Container = styled.div`
  margin: 20px 20px 50px 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-row: auto auto;
  grid-column-gap: 30px;
  grid-row-gap: 30px;

  @media ${device.tablet} { 
    grid-template-columns: 1fr;
    margin: 20px 100px 50px 100px;
  }

  @media ${device.laptop} { 
    grid-template-columns: 1fr 1fr;
    margin: 50px 15vw 100px 15vw;
  }
`;


export const Categories = () => {
  return (
    <Container>
      {categoryList.map((curCategory, index) => <Category key={index} categoryDetails={curCategory} />)}
    </Container>
  )
}
