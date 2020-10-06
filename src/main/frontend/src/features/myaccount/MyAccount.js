import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { MyDetailsForm } from './MyDetailsForm';
import { MyOrders } from './MyOrders';
import { MyImage } from './MyImage';
import { device } from '../utils/viewport';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 50px;
  margin: 50px 20px;
  
  @media ${device.tablet} {
    grid-template-columns: 1fr 4fr;
    margin: 50px 10vw;
  }
  @media ${device.laptop} {
    grid-template-columns: 1fr 4fr;
    margin: 50px 15vw;
  }
`;

const LeftPanel = styled.div`
`;

const AccountMenu = styled.div`
  padding: 20px;
  border: 1px solid #CCC;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const MenuItem = styled.div`
  font-size: 14px;
  color: #585858;
  cursor: pointer;
`;

const MY_ACCOUNT = 'MY_ACCOUNT';
const MY_ORDERS = 'MY_ORDERS';


export const MyAccount = () => {
  const [curMenu, setCurMenu] = useState(MY_ORDERS);
  const history = useHistory();

  useEffect(() => {
    const curMenuFromUrl = window.location.pathname.includes('/my-orders') ? MY_ORDERS : MY_ACCOUNT;
    setCurMenu(curMenuFromUrl);
  }, [window.location.pathname]);

  return (
    <Container id='my_account_id'>
      <LeftPanel>
        <MyImage />

        <AccountMenu>
          <MenuItem 
            style={(curMenu === MY_ACCOUNT) ? {fontWeight: 'bold', marginBottom: '10px'} : { marginBottom: '10px' }} 
            onClick={() => history.push('/account/my-account')}>
            My Account
          </MenuItem>

          <MenuItem 
            style={curMenu === MY_ORDERS ? {fontWeight: 'bold'} : null} 
            onClick={() => history.push('/account/my-orders')}>
            My Orders
          </MenuItem>
        </AccountMenu>
      </LeftPanel>

      {curMenu === MY_ACCOUNT && <MyDetailsForm/>}
      {curMenu === MY_ORDERS && <MyOrders/>}
    </Container>
  )
}
