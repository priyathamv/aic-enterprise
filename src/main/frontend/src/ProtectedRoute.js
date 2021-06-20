import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { LoginPage } from './features/auth/LoginPage';
import { Spinner } from './features/utils/Spinner';
import { selectIsLoading } from './features/auth/authSlice';
import { Navbar } from './features/navbar/Navbar';
import { CartSideBar } from './features/cart/CartSideBar';
import ScrollToTop from './features/utils/ScrollToTop';
import { Footer } from './features/homepage/footer/Footer';

const Body = styled.div`
  flex: 1 0 auto;
`;

export const ProtectedRoute = ({ email, component }) => {
  const Component = component;

  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      <Body>
        <Navbar />
        <CartSideBar />
        <ScrollToTop />
        {email ? <Component /> : isLoading ? <Spinner containerStyle={{ top: '50vh', height: 'auto' }} /> : <LoginPage />}
      </Body>

      <Footer />
    </>
  )
}
