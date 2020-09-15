import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { getNextPageAsync, updateBrand, selectProducts, selectHasMore, selectSearchValue } from './productsSlice';
import { ProductRow } from './ProductRow';
import { ProductFilters } from './ProductFilters';
import { productData } from './productData';


const Container = styled.div`
  margin: 0 15vw 50px 15vw;
`;

const ProductIntro = styled.div`
  color: #232162;
  background-color: #F8F8FF;
  padding: 50px 15vw;
  margin: 0 -15vw 50px -15vw;
`;

const ProductName = styled.div`
  font-size: 42px;
`;

const ProductDesc = styled.div`
  font-size: 18px;
  margin-top: 30px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 5px;
`;

const TableHeader = styled.tr`
  background-color: #232162; 
  color: #FFF;
`;

const Tr = styled.tr`
  box-shadow: 0 0 10px 1px rgba(188,188,188,0.3);
`;

const Th = styled.th`
  padding: 20px 30px;
  text-align: left;
`;

const Dummy = styled.td`
  padding: 15px 25px;
  text-align: center;
`;


export const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector(selectProducts);
  const hasMore = useSelector(selectHasMore);
  const searchValue = useSelector(selectSearchValue);

  const [pageNo, setPageNo] = useState(0);

  const dummyRef = useRef(null);

  const brand = new URLSearchParams(window.location.search).get("brand");
  
  useEffect(() => {
    dispatch(updateBrand(brand));
    if (hasMore) {
      if (brand === 'Thermo Fisher Scientific') // delete later
        dispatch(getNextPageAsync({ pageNo, brand: 'Thermo TPP', searchValue })); // delete later
      else // delete later
        dispatch(getNextPageAsync({ pageNo, brand, searchValue })); 
    }
  }, [dispatch, hasMore, brand, searchValue, pageNo]);

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
      <ProductIntro>
        <ProductName>{brand}</ProductName>
        {productData[brand] && <ProductDesc>{productData[brand]}</ProductDesc>}
      </ProductIntro>

      <ProductFilters/>

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
              <Dummy colSpan='5' ref={dummyRef}>Loading more products...</Dummy>
            </Tr> : null}
        </tbody>
      </Table>
    </Container>
  )
}
