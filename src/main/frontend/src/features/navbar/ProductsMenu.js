import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  top: 75px;
  position: absolute;

  display: none;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  
  border-radius: 3px;
  padding: 15px;
  margin-bottom: 50px;
  width: 70vw;
  background-color: #FFF;
  z-index: 10000;
  box-shadow: 0 0 10px 1px rgba(188,188,188,0.3);
`;

const Brand = styled.div`
  padding: 15px 20px;
  border-radius: 3px;
  border: 1px solid #CCC;
  cursor: pointer;
  &:hover {
    color: #FFF;
    background-color: #232162;
  }
`;

const brandList = ['Thermo Fisher Scientific', 'SRL', 'Axiva', 'Merck', 'Qiagen', 'Eutech', 'VAI', 'MagGenome', 'Waters', 'Tarsons', 'Genaxy', 'Borosil', 'Kimberly Clark', 'Honeywell', 'Invitrogen', 'Sterimed Inc', 'Riviera', 'GE', 'HPLC (Thermo Fisher)'];

export const ProductsMenu = () => {
  return (
    <Container id='products_menu_id'>
      {brandList.map((curBrand, index) => <Brand onClick={() => window.location.href=`/products?brand=${curBrand}`} key={index}>{curBrand}</Brand>)}
    </Container>
  )
}
