// import React from 'react';
// import styled from 'styled-components';

// import { device } from '../utils/viewport';


// const Container = styled.div`
//   top: 75px;
//   position: absolute;
//   display: none;
//   grid-template-columns: 1fr 1fr;
//   grid-column-gap: 20px;
//   grid-row-gap: 20px;
//   border-radius: 3px;
//   padding: 15px;
//   margin-bottom: 50px;
//   width: 70vw;
//   background-color: #FFF;
//   z-index: 10000;
//   box-shadow: 0 0 10px 1px rgba(188,188,188,0.3);
//   height: 60vh;
//   overflow: scroll;

//   @media ${device.tablet} { 
//     grid-template-columns: 1fr 1fr 1fr;
//     height: auto;
//   }
  
//   @media ${device.laptop} { 
//     grid-template-columns: 1fr 1fr 1fr 1fr;
//     height: auto;
//   }
// `;

// const Brand = styled.a`
//   text-decoration: none;
//   align-self: center;
//   color: #232162;
//   padding: 15px 20px;
//   border-radius: 3px;
//   border: 1px solid #CCC;
//   cursor: pointer;
//   &:hover {
//     color: #FFF;
//     background-color: #232162;
//   }
// `;

// const More = styled.a`
//   text-decoration: none;
//   padding: 15px 20px;
//   cursor: pointer;
//   color: #232162;
//   &:hover {
//     text-decoration: underline;
//   }
// `;


// const brandList = ['Thermo Fisher Scientific', 'SRL', 'AXIVA', 'Merck', 'Qiagen', 'Eutech', 'MagGenome', 'Waters', 'Genaxy', 'Borosil', 'Kimberly-Clark', 'Honeywell', 'Invitrogen', 'RIVIERA'];

// export const ProductsMenu = () => {
//   return (
//     <Container id='products_menu_id'>
//       {brandList.map((curBrand, index) => <Brand href={`/product-list?brand=${curBrand}`} key={index}>{curBrand}</Brand>)}
//       <More href='/products#brands_id'>More...</More>
//     </Container>
//   )
// }
