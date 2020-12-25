import React, { useState } from 'react';
import styled from 'styled-components';

import { device } from '../../utils/viewport';
import { applicationsArr, appToCategoryMap, categoryToBrandMap } from '../../utils/productHierarchy';

const Container = styled.div`
  margin: 30px 20px 100px 20px;
  display: flex;
  
  @media ${device.tablet} { 
    margin: 30px 100px 100px 100px;
  }
  
  @media ${device.laptop} { 
    margin: 30px 15vw 100px 15vw;
  }
`;

const ApplicationBox = styled.div`
  flex: 1;
  background-color: #232162;
  height: 70vh;
  // width: 20vw;
  color: #FFFFFF;
  text-align: left;
  overflow: scroll;
`;

const Heading = styled.div`
  font-size: 22px;
  padding: 30px 30px 15px 30px;
`;


const ApplicationItem = styled.div`
  padding: 15px 60px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;

const CategoriesBox = styled.div`
  flex: 1;
  background-color: #0000001a;
  height: 70vh;
  // width: 20vw;
  text-align: left;
  visibility: hidden;
  overflow: scroll;
`;

const BrandsBox = styled.div`
  flex: 1;
  background-color: #FAFAFA;
  height: 70vh;
  // width: 20vw;
  text-align: left;
  visibility: hidden;
  overflow: scroll;
`;

const BrandItem = styled.a`
  text-decoration: none;
  color: black;
  padding: 15px 60px;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

export const Divisions = () => {
  const [application, setApplication] = useState(null);
  const [category, setCategory] = useState(null);
  
  const displayCategories = displayFlag => {
    document.getElementById('categories_division_id2').style.visibility = displayFlag ? 'visible' : 'hidden';
  }

  const displayBrands = displayFlag => {
    document.getElementById('brands_division_id2').style.visibility = displayFlag ? 'visible' : 'hidden';
  }

  return (
    <Container>
      <ApplicationBox>
          <Heading>Applications</Heading>

          {applicationsArr.map((curApplication, index) => 
            <ApplicationItem 
              key={index}
              style={curApplication == application ? {fontWeight: 'bold'} : null}
              onClick={() => {displayCategories(true); setApplication(curApplication)}} 
            >{curApplication}</ApplicationItem>  
          )}
        </ApplicationBox>

        <CategoriesBox id='categories_division_id2'>
          <Heading>Categories</Heading>

          {appToCategoryMap[application] && 
            appToCategoryMap[application].map((curCategory, index) => 
            <ApplicationItem
              key={index}
              style={curCategory == category ? {fontWeight: 'bold', color: 'black'} : {color: 'black'}}
              onClick={() => {displayBrands(true); setCategory(curCategory)}} 
            >{curCategory}</ApplicationItem>)}
        </CategoriesBox>

        <BrandsBox 
          id='brands_division_id2'
          onClick={() => {displayCategories(true); displayBrands(true)}} 
        >
          <Heading>Brands</Heading>

          {categoryToBrandMap[category] && 
            categoryToBrandMap[category].map((curBrand, index) => 
              <BrandItem 
                key={index}
                href={`/product-list?brand=${curBrand.value}`} 
              >
                {curBrand.name}
              </BrandItem>
            )}
        </BrandsBox>
    </Container>
  )
}
