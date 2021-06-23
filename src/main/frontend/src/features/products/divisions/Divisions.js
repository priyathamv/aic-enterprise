import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { device } from '../../utils/viewport';
import { applicationsArr } from '../../utils/productHierarchy';

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
  height: 300px;
  // width: 20vw;
  color: #FFFFFF;
  text-align: left;
  overflow: scroll;
`;

const Heading = styled.div`
  font-size: 16px;
  padding: 30px 10px 15px 10px;

  @media ${device.tablet} {
    font-size: 20px;
    padding: 30px 20px 15px 20px;
  }

  @media ${device.laptop} {
    font-size: 22px;
    padding: 30px 30px 15px 30px;
  }
`;


const ApplicationItem = styled.div`
  padding: 15px 20px;
  font-size: 14px;
  cursor: pointer;

  @media ${device.tablet} {
    font-size: 16px;
    padding: 15px 40px;
  }

  @media ${device.laptop} {
    font-size: 16px;
    padding: 15px 60px;
  }

  &:hover {
    font-weight: bold;
  }
`;

const CategoriesBox = styled.div`
  flex: 1;
  background-color: #0000001a;
  height: 300px;
  // width: 20vw;
  text-align: left;
  visibility: hidden;
  overflow: scroll;
`;

const BrandsBox = styled.div`
  flex: 1;
  background-color: #FAFAFA;
  height: 300px;
  // width: 20vw;
  text-align: left;
  visibility: hidden;
  overflow: scroll;
`;

const BrandItem = styled.a`
  text-decoration: none;
  color: black;
  padding: 15px 20px;
  display: block;
  font-size: 14px;

  @media ${device.tablet} {
    font-size: 16px;
    padding: 15px 40px;
  }

  @media ${device.laptop} {
    font-size: 16px;
    padding: 15px 60px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const Divisions = () => {
  const [application, setApplication] = useState(null);
  const [category, setCategory] = useState(null);

  const [categoryList, setCategoryList] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [brandList, setBrandList] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);

  // Fetching category list from backend on page
  useEffect(() => {
    axios.get('/api/category')
      .then(response => {
        setCategoryOptions(response.data.payload);
      })
      .catch(function (error) {
        console.log('Error while fetching categories', error);
      })
  }, []);

  // Fetching brand list from backend on page
  useEffect(() => {
    axios.get('/api/brands')
      .then(response => {
        setBrandOptions(response.data.payload);
      })
      .catch(function (error) {
        console.log('Error while fetching brands', error);
      })
  }, []);

  // Updating Category dropdown options on Application change
  useEffect(() => {
    const categoryListUpdated = categoryOptions
      .filter(curCategory => curCategory.application === application)
      .map(curCategory => curCategory.name);

      setCategoryList(categoryListUpdated);
      setCategory(null);
  }, [application, categoryOptions]);

  // Updating Category dropdown options on Application change
  useEffect(() => {
    const brandListUpdated = brandOptions
      .filter(curBrand => (curBrand.application === application) && (curBrand.category === category))
      .map(curBrand => curBrand);

      setBrandList(brandListUpdated);
  }, [category, brandOptions]);


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

          {categoryList &&
            categoryList.map((curCategory, index) =>
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

          {brandList &&
            brandList.map((curBrand, index) =>
              <BrandItem
                key={index}
                href={`/product-list?brand=${curBrand.name}`}
              >
                {curBrand.name}
              </BrandItem>
            )}
        </BrandsBox>
    </Container>
  )
}
