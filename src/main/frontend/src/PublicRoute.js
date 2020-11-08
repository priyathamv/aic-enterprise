import React from 'react';
import styled from 'styled-components';

import { Navbar } from './features/navbar/Navbar';
import { CartSideBar } from './features/cart/CartSideBar';
import ScrollToTop from './features/utils/ScrollToTop';
import { Footer } from './features/homepage/common/Footer';

const Body = styled.div`
  flex: 1 0 auto;
`;

export const PublicRoute = ({ component }) => {
  const Component = component;
  return (
    <>
      <Body>
        <Navbar />
        <CartSideBar />
        <ScrollToTop />

        <Component />
      </Body>

      <Footer />
    </>
  )
}
