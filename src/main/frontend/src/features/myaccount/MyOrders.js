import React, { useEffect } from 'react';
import styled from 'styled-components';

import { selectUserEmail } from '../auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrdersAsync, selectOrderHistory } from './orderSlice';
import { Spinner } from '../utils/Spinner';
import { OrderContainer } from './OrderContainer';


const Container = styled.div`
`;

const Header = styled.div`
  font-size: 22px;
  margin-bottom: 20px;
`;

const SpinnerWrapper = styled.div`
  position: relative;
`;

const Message = styled.div`
  
`;


export const MyOrders = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUserEmail);
  const orderHistory = useSelector(selectOrderHistory).orderHistory;
  const isLoading = useSelector(selectOrderHistory).isLoading;

  useEffect(() => {
    dispatch(fetchUserOrdersAsync(email));
  }, [email]);

  return (
    <>
      {isLoading ? 
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper> :
        <Container>
          <Header>My Orders</Header>

          {orderHistory.length === 0 && <Message>You haven't placed any orders yet.</Message>}
          {orderHistory.map((curOrder, index) => <OrderContainer key={index} orderDetails={curOrder} />)}
        </Container>
      }
    </>
  )
}
