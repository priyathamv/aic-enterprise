import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import axios from 'axios';

import { getNextPageAsync, selectProducts, selectHasMore, selectSearchValue, selectDivision } from './productsSlice';
import { ProductRow } from './ProductRow';
import { ProductFilters } from './ProductFilters';
import { productData } from './productData';
import { ProductIntro } from './ProductIntro';
import { device } from '../utils/viewport';

const Container = styled.div`
  margin: 0 20px 50px 20px;
  
  @media ${device.laptop} { 
    margin: 0 15vw 50px 15vw;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow: scroll;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 5px;
  font-size: 12px;

  @media ${device.laptop} { 
    font-size: 16px;
  }
`;

const TableHeader = styled.tr`
  background-color: #232162; 
  color: #FFF;
`;

const Tr = styled.tr`
  box-shadow: 0 0 10px 1px rgba(188,188,188,0.3);
`;

const Th = styled.th`
  padding: 10px;
  text-align: left;
  
  @media ${device.laptop} { 
    padding: 20px 30px;
  }
`;

const Dummy = styled.div`
  display: inline-block;
  position: absolute
`;

const ScrollObserver = styled.td`
  padding: 15px 25px;
  text-align: center;
`;


export const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector(selectProducts);
  const hasMore = useSelector(selectHasMore);
  const searchValue = useSelector(selectSearchValue);

  const [divisionList, setDivisionList] = useState([]);
  const [pageNo, setPageNo] = useState(0);

  const dummyRef = useRef(null);

  const brand = new URLSearchParams(window.location.search).get('brand');
  const division = useSelector(selectDivision);

  const fetchDivisions = async () => {
    try {
      const divisionListResponse = await axios.get(`/api/products/divisions?brand=${brand}`);
      setDivisionList(divisionListResponse.data.payload);
    } catch (err) {
      console.log('Error while fetching divisions for the current brand', err.message);
    }
  }

  useEffect(() => {
    fetchDivisions();
  }, [brand])

  useEffect(() => {
    if (hasMore && brand) {
      dispatch(getNextPageAsync({ brand, division, searchValue, pageNo })); 
    }
  }, [dispatch, hasMore, brand, division, pageNo]);


  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) { 
      setPageNo((page) => page + 1)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(debounce(handleObserver, 1000), { threshold: 1.0 });

    (hasMore || pageNo === 0) && dummyRef.current && observer.observe(dummyRef.current);
  }, [hasMore, pageNo]);


  return (
    <Container id='product_list_id'>
      <ProductIntro brand={brand} description={productData[brand]} />

      <ProductFilters divisionList={divisionList} setPageNo={setPageNo} />

      <TableWrapper>
        <Table>
          <thead>
            <TableHeader>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Brand</Th>
              <Th>Capacity</Th>
              <Th></Th>
            </TableHeader>
          </thead>
          
          <tbody>
          {
            productList.map((curProduct, index) => 
              <ProductRow
                key={index}
                productDetails={curProduct}
              />)
          }
            {hasMore ?
              <Tr>
                <ScrollObserver colSpan='5'>
                  <Dummy ref={dummyRef}>&nbsp;</Dummy>Loading more products...
                </ScrollObserver>
              </Tr> : null}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  )
}
