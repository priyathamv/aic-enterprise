import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 75px;
  color: #232162;
  text-align: center;
  border: 1px solid #CCC;
  width: 100%;
  background-color: #FFF;
  z-index: 100000;
`;

const MenuItems = styled.div`
  display: flex;
  flex: 3;
  height: 100%;
`;

const MenuItem = styled.div`
  flex: 1;
  border-right: 1px solid #CCC;
  padding-top: 27px;
`;

const Logo = styled.img`
  flex: 1;
  border-right: 1px solid #CCC;
  width: 60px;
  border-radius: 40px;
  margin-right: 15px;
`;

const Search = styled.div`
  flex: 4;
`;


export const NavbarMenu = () => {

  const [showLogo, setShowLogo] = useState(false);

  const scrollCallback = () => {
    const navbarMenuDom = document.getElementById('navbar_menu_id');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      navbarMenuDom.style.position = 'fixed';
      navbarMenuDom.style.top = '0';
      navbarMenuDom.style.borderTop = 'none';
      setShowLogo(true);
    } else {
      setShowLogo(false);
      navbarMenuDom.style.position = 'initial';
      navbarMenuDom.style.top = '100px';
      navbarMenuDom.style.borderTop = '1px solid #CCC';
    }
  }

  useEffect(() => window.addEventListener('scroll', scrollCallback), []);

  return (
    <Container id='navbar_menu_id'>
      <MenuItems>
        <MenuItem style={{ paddingTop: '8px' }}>
          {showLogo ? <Logo id='navmenu_logo_id' src='/aic_logo.png'></Logo> : null}
        </MenuItem>
        <MenuItem>Products</MenuItem>
        <MenuItem>About us</MenuItem>
        <MenuItem>Contact us</MenuItem>
        <MenuItem>Covid 19</MenuItem>
      </MenuItems>

      <Search>

      </Search>
    </Container>
  )
}
