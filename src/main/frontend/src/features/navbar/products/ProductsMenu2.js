import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { applicationsArr } from '../../utils/productHierarchy';

const Container = styled.div`
  top: 75px;
  position: absolute;
  display: none;
  border-radius: 3px;
  margin-bottom: 50px;
  background-color: #FFF;
  z-index: 10000;
  box-shadow: 0 0 10px 1px rgba(188,188,188,0.3);
`;

const ProductMenuWrapper = styled.div`
  display: flex;
`;

const ApplicationBox = styled.div`
  background-color: #232162;
  height: 300px;
  width: 20vw;
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
`;

const CategoriesBox = styled.div`
  background-color: #0000001a;
  height: 300px;
  width: 20vw;
  text-align: left;
  display: none;
  overflow: scroll;
`;

const BrandsBox = styled.div`
  background-color: #FFFFF;
  height: 300px;
  width: 20vw;
  text-align: left;
  display: none;
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


export const ProductsMenu2 = () => {
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

  const displayProductsMenu = displayFlag => {
    document.getElementById('products_menu_id2').style.display = displayFlag ? 'block' : 'none';
  }

  const displayCategories = displayFlag => {
    document.getElementById('categories_menu_id2').style.display = displayFlag ? 'block' : 'none';
  }

  const displayBrands = displayFlag => {
    document.getElementById('brands_menu_id2').style.display = displayFlag ? 'block' : 'none';
  }

  return (
    <Container id='products_menu_id2'>
      <ProductMenuWrapper>
        <ApplicationBox>
          <Heading>Applications</Heading>

          {applicationsArr.map((curApplication, index) =>
            <ApplicationItem
              key={index}
              style={curApplication == application ? {fontWeight: 'bold'} : null}
              onMouseEnter={() => {displayCategories(true); setApplication(curApplication)}}
              onMouseLeave={() => displayCategories(false)}
            >{curApplication}</ApplicationItem>
          )}
        </ApplicationBox>

        <CategoriesBox
          id='categories_menu_id2'
          onMouseEnter={() => displayCategories(true)}
          onMouseLeave={() => displayCategories(false)}
        >
          <Heading>Categories</Heading>

          {categoryList &&
            categoryList.map((curCategory, index) =>
            <ApplicationItem
              key={index}
              style={curCategory == category ? {fontWeight: 'bold', color: 'black'} : {color: 'black'}}
              onMouseEnter={() => {displayBrands(true); setCategory(curCategory)}}
              onMouseLeave={() => displayBrands(false)}
            >{curCategory}</ApplicationItem>)}
        </CategoriesBox>

        <BrandsBox
          id='brands_menu_id2'
          onMouseEnter={() => {displayCategories(true); displayBrands(true)}}
          onMouseLeave={() => {displayCategories(false); displayBrands(false)}}
        >
          <Heading>Brands</Heading>

          {brandList &&
            brandList.map((curBrand, index) =>
              <BrandItem
                key={index}
                href={`/product-list?brand=${curBrand.value}`}
                onClick={() => displayProductsMenu(false)}
              >
                {curBrand.name}
              </BrandItem>
            )}
        </BrandsBox>
      </ProductMenuWrapper>
    </Container>
  )
}
