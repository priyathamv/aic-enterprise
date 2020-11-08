import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AdminOverview } from './AdminOverview';
import { AdminUserList } from './AdminUserList';
import { selectUserRole } from '../auth/authSlice';

const Container = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 50px 50px 50px 100px;
  position: sticky;
  top: 50px;
`;

const Menu = styled(Link)`
  text-decoration: none;
  text-align: center;
  color: #232162;
  padding: 20px 10px;
  border: 1px solid #232162;
  border-bottom: none;

  &:hover {
    color: #232162;
    background-color: #F8F8FF;
  }
`;

const Content = styled.div`
  flex: 4;
  margin: 50px 100px 50px 50px;
`;

const OVERVIEW_PAGE = 'OVERVIEW_PAGE';
const BRANDS_PAGE = 'BRANDS_PAGE';
const PRODUCTS_PAGE = 'PRODUCTS_PAGE';
const USERS_PAGE = 'USERS_PAGE';
const ORDERS_PAGE = 'ORDERS_PAGE';

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
    else if (currentPath.includes('/admin/brands'))
      setCurPage(BRANDS_PAGE);
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
        <Menu to='/admin/brands' style={curPage === BRANDS_PAGE ? curPageStyle : null} >Brands</Menu>
        <Menu to='/admin/products' style={curPage === PRODUCTS_PAGE ? curPageStyle : null} >Products</Menu>
        <Menu to='/admin/users' style={curPage === USERS_PAGE ? curPageStyle : null} >Users</Menu>
        <Menu to='/admin/orders'  style={curPage === ORDERS_PAGE ? curPageStyle : { border: '1px solid #232162' }} >Orders</Menu>
      </SideBar>

      <Content>
        {curPage === OVERVIEW_PAGE && <AdminOverview />}
        {curPage === USERS_PAGE && <AdminUserList />}
      </Content>
      
    </Container>
  )
}
