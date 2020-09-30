import React, { useState } from 'react';
import styled from 'styled-components';

import { MyDetailsForm } from './MyDetailsForm';
import { MyOrders } from './MyOrders';
import { MyImage } from './MyImage';


const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-column-gap: 50px;
  grid-row-gap: 50px;
  margin: 50px 15vw;
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

  const [curMenu, setCurMenu] = useState(MY_ACCOUNT);

  return (
    <Container id='my_account_id'>
      <LeftPanel>
        <MyImage />

        <AccountMenu>
          <MenuItem 
            style={(curMenu === MY_ACCOUNT) ? {fontWeight: 'bold', marginBottom: '10px'} : { marginBottom: '10px' }} 
            onClick={() => setCurMenu(MY_ACCOUNT)}>
            My Account
          </MenuItem>

          <MenuItem style={curMenu === MY_ORDERS ? {fontWeight: 'bold'} : null} onClick={() => {setCurMenu(MY_ORDERS)}}>My Orders</MenuItem>
        </AccountMenu>
      </LeftPanel>

      {curMenu === MY_ACCOUNT && <MyDetailsForm/>}
      {curMenu === MY_ORDERS && <MyOrders/>}
    </Container>
  )
}
