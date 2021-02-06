import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AdminOverview } from './AdminOverview';
import { AdminUserList } from './AdminUserList';
import { AdminBrandList } from './brands/AdminBrandList';
import { AdminProductList } from './products/AdminProductList';
import { AdminProductList2 } from './products/AdminProductList2';
import { selectUserRole } from '../auth/authSlice';
import { AdminNewBrand } from './brands/AdminNewBrand';
import { device } from '../utils/viewport';
import { AdminNewProduct } from './products/AdminNewProduct';
import { AdminNewProduct2 } from './products/AdminNewProduct2';
import { AdminOrdersHome } from './orders/AdminOrdersHome';


const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  margin: 30px auto;
  position: initial;
  top: 50px;

  @media ${device.tablet} { 
    flex-direction: column;
    margin: 50px;
  }

  @media ${device.laptop} {
    position: sticky;
    margin: 50px 50px 50px 100px;
  }
`;

const Menu = styled(Link)`
  text-decoration: none;
  text-align: center;
  color: #232162;
  padding: 20px 5px;
  min-height: 20px;
  border: 1px solid #232162;
  border-bottom: 1px solid #232162;
  
  &:hover {
    color: #232162;
    background-color: #F8F8FF;
  }

  @media ${device.tablet} {
    padding: 20px 10px;
    border-bottom: none;  
  }
`;

const Content = styled.div`
  flex: 4;
  margin: 20px;

  @media ${device.tablet} { 
    margin: 50px 100px 50px 50px;
  }

  @media ${device.laptop} {
    margin: 50px 100px 50px 50px;
  }
`;

const OVERVIEW_PAGE = 'OVERVIEW_PAGE';
const BRANDS_PAGE = 'BRANDS_PAGE';
const NEW_BRANDS_PAGE = 'NEW_BRANDS_PAGE';
const PRODUCTS_PAGE = 'PRODUCTS_PAGE';
const PRODUCTS_PAGE2 = 'PRODUCTS_PAGE2';
const NEW_PRODUCTS_PAGE = 'NEW_PRODUCTS_PAGE';
const NEW_PRODUCTS_PAGE2 = 'NEW_PRODUCTS_PAGE2';
const USERS_PAGE = 'USERS_PAGE';
const ORDERS_PAGE = 'ORDERS_PAGE';
const EDIT_ANALYTICAL_PRODUCT_PAGE = 'EDIT_ANALYTICAL_PRODUCT_PAGE';

const curPageStyle = { 
  color: '#FFF',
  backgroundColor: '#232162'
};


export const AdminHome = () => {
  const history = useHistory();
  const isAdmin = useSelector(selectUserRole) === 'ADMIN';
  !isAdmin && history.push('/');

  const [curPage, setCurPage] = useState(null);

  const handleCurPageChange = () => {
    const currentPath = history.location.pathname;

    if (currentPath.includes('/admin/overview'))
      setCurPage(OVERVIEW_PAGE);
    else if (currentPath.includes('/admin/brands/new'))
      setCurPage(NEW_BRANDS_PAGE);
    else if (currentPath.includes('/admin/brands'))
      setCurPage(BRANDS_PAGE);
    else if (currentPath.includes('/admin/products2/new'))
      setCurPage(NEW_PRODUCTS_PAGE2);
    else if (currentPath.includes('/admin/products2/edit'))
      setCurPage(EDIT_ANALYTICAL_PRODUCT_PAGE);
    else if (currentPath.includes('/admin/products2'))
      setCurPage(PRODUCTS_PAGE2);
    else if (currentPath.includes('/admin/products/new'))
      setCurPage(NEW_PRODUCTS_PAGE);
    else if (currentPath.includes('/admin/products'))
      setCurPage(PRODUCTS_PAGE);
    else if (currentPath.includes('/admin/users'))
      setCurPage(USERS_PAGE);
    else if (currentPath.includes('/admin/orders'))
      setCurPage(ORDERS_PAGE);
    else
      setCurPage(null);
  }

  // To update curPageStyle on every path change
  useEffect(() => {
    handleCurPageChange();
    const historyListener = history.listen(handleCurPageChange);
    return () => historyListener();
  }, [handleCurPageChange, history]);

  return (
    <Container>
      <SideBar>
        <Menu to='/admin/overview' style={curPage === OVERVIEW_PAGE ? curPageStyle : null} >Overview</Menu>
        <Menu to='/admin/brands' style={(curPage === BRANDS_PAGE || curPage === NEW_BRANDS_PAGE) ? curPageStyle : null} >Brands</Menu>
        {/* <Menu to='/admin/products' style={(curPage === PRODUCTS_PAGE || curPage === NEW_PRODUCTS_PAGE) ? curPageStyle : null} >Products</Menu> */}
        <Menu to='/admin/products2' style={(
          curPage === PRODUCTS_PAGE2 || 
          curPage === NEW_PRODUCTS_PAGE2 || 
          curPage === EDIT_ANALYTICAL_PRODUCT_PAGE) ? curPageStyle : null} >Products</Menu>
        <Menu to='/admin/users' style={curPage === USERS_PAGE ? curPageStyle : null} >Users</Menu>
        <Menu to='/admin/orders'  style={curPage === ORDERS_PAGE ? curPageStyle : { border: '1px solid #232162' }} >Orders</Menu>
      </SideBar>

      <Content>
        {curPage === OVERVIEW_PAGE && <AdminOverview />}
        {curPage === USERS_PAGE && <AdminUserList />}
        {curPage === NEW_BRANDS_PAGE && <AdminNewBrand />}
        {curPage === BRANDS_PAGE && <AdminBrandList />}
        {curPage === NEW_PRODUCTS_PAGE && <AdminNewProduct />}
        {curPage === PRODUCTS_PAGE && <AdminProductList />}
        {(curPage === NEW_PRODUCTS_PAGE2 || curPage === EDIT_ANALYTICAL_PRODUCT_PAGE) && <AdminNewProduct2 />}
        {curPage === PRODUCTS_PAGE2 && <AdminProductList2 />}
        {curPage === ORDERS_PAGE && <AdminOrdersHome />}
      </Content>
      
    </Container>
  )
}
