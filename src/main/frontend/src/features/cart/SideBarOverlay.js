import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectShowCartPage } from './cartSlice';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0,.5);
  z-index: 3;
`;

export const SideBarOverlay = () => {
  const showCartPage = useSelector(selectShowCartPage);

  return (
    <>
    {showCartPage ? <Container /> : null}
    </>
  )
}
