import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash.debounce';

import { applicationsArr } from '../../utils/productHierarchy';


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

const applicationOptions = applicationsArr
  .map(curApplication => ({
    label: curApplication,
    value: curApplication
  }));

export const AdminProductList2 = () => {
  const dummyRef = useRef(null);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);

  const dispatch = useDispatch();
  const productList = useSelector(selectAdminProducts);

  const hasMore = useSelector(selectAdminHasMore);
  const searchValue = useSelector(selectAdminSearchValue);

  const [application, setApplication] = useState(applicationsArr[0]);
  const [category, setCategory] = useState(null);
  const [division, setDivision] = useState(null);
  const [divisionList, setDivisionList] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [placeholder, setPlaceholder] = useState('Search by Products name');

  const [brand, setBrand] = useState(null);
  const [brandList, setBrandList] = useState([]);

  // Fetching category list from backend on page
  useEffect(() => {
    axios.get('/api/category')
      .then(response => {
        setCategoryList(response.data.payload);
      })
      .catch(function (error) {
        console.log('Error while fetching categories', error);
      })
  }, []);

  // Fetching brand list from backend on page
  useEffect(() => {
    axios.get('/api/brands')
      .then(response => {
        setBrandList(response.data.payload.map(curBrandObj => curBrandObj.name));
      })
      .catch(function (error) {
        console.log('Error while fetching brands', error);
      })
  }, []);

  // Fetching division list from backend on page
  useEffect(() => {
    axios.get('/api/division')
      .then(response => {
        setDivisionList(response.data.payload);
      })
      .catch(function (error) {
        console.log('Error while fetching divisions', error);
      })
  }, []);

  // Updating Category dropdown options on Application change
  useEffect(() => {
    const categoryOptionsUpdated = categoryList
      .filter(curCategory => curCategory.application === application)
      .map(curCategory => ({
        label: curCategory.name, value: curCategory.name
      }));

    updateProductListOnSearchOrFilter();
    setCategoryOptions(categoryOptionsUpdated);
    setCategory(null);
    setDivisionOptions([]);
    setDivision(null);
  }, [application, categoryList]);

  // Updating Divisions dropdown options on Category change
  useEffect(() => {
    if (category) {
      const divisionOptionsUpdated = divisionList
        .filter(curDivision => curDivision.category === category)
        .map(curDivision => ({
          label: curDivision.name,
          value: curDivision.name
        }));

      setDivisionOptions(divisionOptionsUpdated);
      setDivision(null);
    }
  }, [category, divisionList]);

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
        const url = (application === 'Analytical') ? '/api/analytical-products' :
          (application === 'Life Science') ? '/api/life-science-products' :
          (application === 'Instrumentation') ? '/api/instrumentation-products' :
          (application === 'Industrial Safety and Clean room') ? '/api/industrial-products' : null;

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
      const url = (application === 'Analytical') ? '/api/analytical-products/delete' :
        (application === 'Life Science') ? '/api/life-science-products/delete' :
        (application === 'Instrumentation') ? '/api/instrumentation-products/delete' :
        (application === 'Industrial Safety and Clean room') ? '/api/industrial-products/delete' : null;


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


  const handleApplicationChange = e => {
    setApplication(e.value);

    dispatch(updateHasMore(true));
    setBrand(null);
    setPageNo(0);

    let basePath;
    if (history.location.pathname.includes('/admin/products2'))
      basePath = '/admin/products2'
    else
      basePath = '/productlist'
    history.push(`${basePath}?application=${e.value}`)
  }

  const handleCategoryChange = e => {
    setCategory(e.value);

    dispatch(updateHasMore(true));
    setBrand(null);
    setPageNo(0);

    let basePath;
    if (history.location.pathname.includes('/admin/products2'))
      basePath = '/admin/products2'
    else
      basePath = '/productlist'
    history.push(`${basePath}?application=${encodeURIComponent(application)}&category=${encodeURIComponent(e.value)}`)
  }

  const handleDivisionChange = e => {
    setDivision(e.value);

    dispatch(updateHasMore(true));
    setBrand(null);
    setPageNo(0);

    let basePath;
    if (history.location.pathname.includes('/admin/products2'))
      basePath = '/admin/products2'
    else
      basePath = '/productlist'
    history.push(`${basePath}?application=${encodeURIComponent(application)}&category=${encodeURIComponent(category)}&division=${encodeURIComponent(e.value)}`);
  }

  const handleBrandChange = e => {
    dispatch(updateHasMore(true));
    setPageNo(0);
    setBrand(e.value);

    let basePath;
    if (history.location.pathname.includes('/admin/products2'))
      basePath = '/admin/products2'
    else
      basePath = '/productlist'
    history.push(`${basePath}?application=${encodeURIComponent(application)}&category=${encodeURIComponent(category)}&division=${encodeURIComponent(division)}&brand=${encodeURIComponent(e.value)}`);
  }

  const history = useHistory();

  const curPath = history.location.pathname;

  // Setting query params into the component state
  useEffect(() => {
    if (history.location.search) {
      history.location.search
        .replaceAll('?', '')
        .split('&')
        .map(curQueryParam => (curQueryParam.split('=')))
        .forEach(([key, value]) => {
          const decodedValue = decodeURIComponent(value);
          if (key === 'application')
            setApplication(decodedValue);
          else if (key === 'category')
            setCategory(decodedValue);
          else if (key === 'division')
            setDivisionList(decodedValue);
          else if (key === 'brand')
            setBrandList(decodedValue);
        });
    }
  }, [history.location.search, category, division, brand]);

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
