import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Spinner } from '../utils/Spinner';
import { device } from '../utils/viewport';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  margin-bottom: 50px;
  
  @media ${device.tablet} { 
    grid-template-columns: 1fr 1fr;
  }

  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Content = styled.div`
  align-self: center;
  padding: 20px 0;
  border-radius: 3px;
  border: 1px solid #232162;
  color: #232162;
  text-align: center;
  position: relative;
  min-height: 48px;
`;

const Value = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;

export const AdminOverview = () => {

  const [brandsCount, setBrandsCount] = useState(null);
  const [productsCount, setProductsCount] = useState(null);
  const [dispatched, setDispatched] = useState(null);
  const [accepted, setAccepted] = useState(null);
  const [pending, setPending] = useState(null);
  const [fulfilled, setFulfilled] = useState(null);

  const fetchAdminOverview = async () => {
    try {
      const adminOverviewResponse = await axios.get('/api/orders/summary');
      
      const { acceptedOrders, dispatchedOrders, fulfilledOrders, pendingOrders } = adminOverviewResponse.data.payload;
      setAccepted(acceptedOrders);
      setDispatched(dispatchedOrders);
      setFulfilled(fulfilledOrders);
      setPending(pendingOrders);
    } catch(err) {
      console.log('Error while fetching admin overview', err.message);
    }
  }

  const fetchBrandsCount = async () => {
    try {
      const brandsCountResponse = await axios.get('/api/brands/count');
      const noOfBrands = brandsCountResponse.data.payload;
      
      setBrandsCount(noOfBrands);
    } catch(err) {
      console.log('Error while fetching brands count', err.message);
    }
  }

  const fetchProductsCount = async () => {
    try {
      const productsCountResponse = await axios.get('/api/products/count');
      const noOfProducts = productsCountResponse.data.payload;

      setProductsCount(noOfProducts);
    } catch(err) {
      console.log('Error while fetching products count', err.message);
    }
  }


  useEffect(() => {
    fetchAdminOverview();
    fetchBrandsCount();
    fetchProductsCount();
  }, []);

  const getSpinner = () => <Spinner containerStyle={{ top: '15px' }} loaderStyle={{ fontSize: '15px', color: '#FFF' }} />;

  return (
    <Container>
      <Content>Total no of Brands: { (brandsCount !== null && brandsCount >= 0) ? <Value>{brandsCount}</Value> : getSpinner() }</Content>
      <Content>Total no of Products: { (productsCount !== null && productsCount >= 0) ? <Value>{productsCount.toLocaleString()}</Value> : getSpinner() }</Content>
      <Content>Total no of Dispatched orders: { (dispatched !== null && dispatched >= 0) ? <Value>{dispatched}</Value> : getSpinner() }</Content>
      <Content>Total no of Accepted orders: { (accepted !== null && accepted >= 0) ? <Value>{accepted}</Value> : getSpinner() }</Content>
      <Content>Total no of Pending orders: { (pending !== null && pending >= 0) ? <Value>{pending}</Value> : getSpinner() }</Content>
      <Content>Total no of Fulfilled orders: { (fulfilled !== null && fulfilled >= 0) ? <Value>{fulfilled}</Value> : getSpinner() }</Content>
    </Container>
  )
}
