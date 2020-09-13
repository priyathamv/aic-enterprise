import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { selectProducts, getNextPageAsync, selectHasMore, selectSearchValue } from './productsSlice';
import { ProductRow } from './ProductRow';
import { ProductFilters } from './ProductFilters';


const Container = styled.div`
  margin: 0 15vw 50px 15vw;
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

  useEffect(() => {
    if (hasMore)
      dispatch(getNextPageAsync({ pageNo, searchValue })); 
  }, [dispatch, hasMore, searchValue, pageNo]);

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
    <Container>
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
