import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash.debounce';

import { appToCategoryMap, categoryToDivisionMap } from '../../utils/productHierarchy';


import { 
  changeAdminProductList, 
  updateAdminProductList, 
  updateHasMore, 
  updateSearch, 
  getNextPageAsync,
  updateIsLoading,
  selectAdminHasMore,
  selectAdminSearchValue,
  selectAdminProducts } from './adminProductListSlice2';
import { AdminProductList2View } from './AdminProductList2View';
import { ProductList2 } from '../../products2/ProductList2';

const Container = styled.div`
`;

const applicationOptions = Object.keys(appToCategoryMap)
  .map(curApplication => ({
    label: curApplication, 
    value: curApplication 
  }));

export const AdminProductList2 = () => {
  const dummyRef = useRef(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);

  const dispatch = useDispatch();
  const productList = useSelector(selectAdminProducts);
  
  const hasMore = useSelector(selectAdminHasMore);
  const searchValue = useSelector(selectAdminSearchValue);

  const [application, setApplication] = useState('Analytical');
  const [category, setCategory] = useState(null);
  const [division, setDivision] = useState(null);
  const [pageNo, setPageNo] = useState(0);
  const [placeholder, setPlaceholder] = useState('Search by Products name');

  const [brand, setBrand] = useState(null);
  const [brandList, setBrandList] = useState([]);

  


  // Updating Category dropdown options on Application change
  useEffect(() => {
    const categoryOptionsUpdated = appToCategoryMap[application]
      .map(curCategory => ({
        label: curCategory,
        value: curCategory
      }));

    setCategoryOptions(categoryOptionsUpdated);
    setCategory(null);
    setDivisionOptions([]);
    setDivision(null);
  }, [application]);

  // Updating Divisions dropdown options on Category change
  useEffect(() => {
    if (category) {
      const divisionOptionsUpdated = categoryToDivisionMap[category]
        .map(curDivision => ({
          label: curDivision,
          value: curDivision
        }));
  
      setDivisionOptions(divisionOptionsUpdated);
      setDivision(null);
    }
  }, [category]);

  useEffect(() => {
    updateProductListOnSearchOrFilter();
  }, [searchValue]);

  
  const handleOnSearch = searchValue => {
    dispatch(updateSearch(searchValue));
  }

  useEffect(() => {
    if (hasMore) {
      dispatch(getNextPageAsync({ application, category, division, brand, searchValue, pageNo })); 
    }
  }, [dispatch, hasMore, application, category, division, brand, pageNo]);


  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) { 
      setPageNo((page) => page + 1)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(debounce(handleObserver, 2000), { threshold: 1.0 });

    (hasMore || pageNo === 0) && dummyRef.current && observer.observe(dummyRef.current);
  }, [hasMore, pageNo]);

  const updateProductListOnSearchOrFilter = async () => {
    try {
      const queryParams = {
        searchValue: ((searchValue === '' || searchValue.length < 3) ? null : searchValue), 
        brand,
        pageNo: 0, 
        limit: 20
      }
      if (searchValue === '' || searchValue.length >= 3) {
        const url = (application === 'Analytical') ? '/api/analytical-products' : '/api/featured-products';
        const adminProductsResponse = await axios.get(url, { params: queryParams });
        dispatch(changeAdminProductList(adminProductsResponse.data.payload));
      }
    } catch (err) {
      console.log('Exception while fetching filtered admin product list: ', err.message);
    }
  }

  
  const handleOnDelete = async productId => {
    const headers = { 'Content-Type': 'application/json' };

    try {
      const url = (application === 'Analytical') ? '/api/analytical-products/delete' : '/api/featured-products/???';
      const productDeleteResponse = await axios.post(url, { productId }, headers);
      
      if (productDeleteResponse.data.payload) {
        toast.success(`Product deleted successfully`, { variant: 'success'});
        setTimeout(() => window.location.reload(), 5000);
      } else {
        toast.error(`Product deletion failed`, { variant: 'error'});
      }
    } catch (err) {
      console.log('Error while deleting product: ', err.message);
      toast.error(`Product deletion failed`, { variant: 'error'});
    }
  }

  const fetchBrandList = async () => {
    try {
      const brandListResponse = await axios.get('/api/brands');
      setBrandList(brandListResponse.data.payload.map(curBrandObj => curBrandObj.name));
    } catch(err) {
      console.log('Error while fetching brands: ', err.message);
      setBrandList([]);
    }
  }

  useEffect(() => {
    fetchBrandList();
  }, []);

  const handleApplicationChange = e => {
    setApplication(e.value);

    dispatch(updateHasMore(true));
    setBrand(null); 
    setPageNo(0);
  }

  const handleCategoryChange = e => {
    setCategory(e.value);

    dispatch(updateHasMore(true));
    setBrand(null); 
    setPageNo(0);
  }

  const handleDivisionChange = e => {
    setDivision(e.value);

    dispatch(updateHasMore(true));
    setBrand(null); 
    setPageNo(0);
  }

  const handleBrandChange = e => {
    dispatch(updateHasMore(true)); 
    setPageNo(0);
    setBrand(e.value); 
  }
  
  const history = useHistory();

  const curPath = history.location.pathname;

  return (
    <Container>
      {curPath.includes('/admin/products2') ?
        <AdminProductList2View 
          dummyRef={dummyRef}
          applicationOptions={applicationOptions}
          divisionOptions={divisionOptions}
          categoryOptions={categoryOptions}
          setCategoryOptions={setCategoryOptions}
          productList={productList}
          hasMore={hasMore}
          searchValue={searchValue}
          application={application}
          setApplication={setApplication}
          category={category}
          setCategory={setCategory}
          division={division}
          setDivision={setDivision}
          pageNo={pageNo}
          setPageNo={setPageNo}
          placeholder={placeholder}
          setPlaceholder={setPlaceholder}
          brand={brand}
          setBrand={setBrand}
          brandList={brandList}
          
          handleOnSearch={handleOnSearch}
          handleObserver={handleObserver}
          fetchBrandList={fetchBrandList}
          handleApplicationChange={handleApplicationChange}
          handleCategoryChange={handleCategoryChange}
          handleDivisionChange={handleDivisionChange}
          handleBrandChange={handleBrandChange}
          handleOnDelete={handleOnDelete}
          updateProductListOnSearchOrFilter={updateProductListOnSearchOrFilter}
        /> : (
        curPath.includes('/productlist') ? 
          <ProductList2 
            dummyRef={dummyRef}
            applicationOptions={applicationOptions}
            divisionOptions={divisionOptions}
            categoryOptions={categoryOptions}
            setCategoryOptions={setCategoryOptions}
            productList={productList}
            hasMore={hasMore}
            searchValue={searchValue}
            application={application}
            setApplication={setApplication}
            category={category}
            setCategory={setCategory}
            division={division}
            setDivision={setDivision}
            pageNo={pageNo}
            setPageNo={setPageNo}
            placeholder={placeholder}
            setPlaceholder={setPlaceholder}
            brand={brand}
            setBrand={setBrand}
            brandList={brandList}
            
            handleOnSearch={handleOnSearch}
            handleObserver={handleObserver}
            fetchBrandList={fetchBrandList}
            handleApplicationChange={handleApplicationChange}
            handleCategoryChange={handleCategoryChange}
            handleDivisionChange={handleDivisionChange}
            handleBrandChange={handleBrandChange}
            handleOnDelete={handleOnDelete}
            updateProductListOnSearchOrFilter={updateProductListOnSearchOrFilter}
          /> : null)
      }
    </Container>
  )
}
