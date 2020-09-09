import React from 'react';
import styled from 'styled-components';

import { Category } from './Category';
import { categoryList } from './categoryList';

const Container = styled.div`
  margin: 50px 15vw 100px 15vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: auto auto;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
`;


export const Categories = () => {
  return (
    <Container>
      {categoryList.map((curCategory, index) => <Category key={index} categoryDetails={curCategory} />)}
    </Container>
  )
}
