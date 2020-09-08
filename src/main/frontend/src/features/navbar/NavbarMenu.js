import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserCart } from './UserCart';

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

const BlankMenuItem = styled.div`
  flex: 1;
  border-right: 1px solid #CCC;
`;

const MenuItem = styled.a`
  text-decoration: none;
  flex: 1;
  border-right: 1px solid #CCC;
  padding-top: 27px;
  color: #232162;
  &:hover {
    color: #FFF;
    background-color: #232162;
  }
`;

const Logo = styled.img`
  flex: 1;
  border-right: 1px solid #CCC;
  width: 60px;
  border-radius: 40px;
  margin-right: 15px;
  cursor: pointer;
`;

const Search = styled.div`
  flex: 3;
`;

const Blank = styled.div`
  flex: 1;
`;


export const NavbarMenu = () => {

  const [showLogo, setShowLogo] = useState(false);
  
  const scrollCallback = async () => {
    const navbarMenuDom = document.getElementById('navbar_menu_id');
    const coverImageSliderDom = document.getElementById('cover_image_slider_id');
    const aboutUsDom = document.getElementById('about_us_id');
    const contactUsDom = document.getElementById('contact_us_id');

    if ((document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) && !document.getElementById('login_modal_id')) {
      navbarMenuDom.style.position = 'fixed';
      navbarMenuDom.style.top = '0';
      navbarMenuDom.style.borderTop = 'none';
      coverImageSliderDom && (coverImageSliderDom.style.paddingTop = '75px');
      aboutUsDom && (aboutUsDom.style.paddingTop = '75px');
      contactUsDom && (contactUsDom.style.paddingTop = '75px');
      setShowLogo(true);
    } else {
      setShowLogo(false);
      navbarMenuDom.style.position = 'initial';
      navbarMenuDom.style.top = '100px';
      navbarMenuDom.style.borderTop = '1px solid #CCC';
      coverImageSliderDom && (coverImageSliderDom.style.paddingTop = '0');
      aboutUsDom && (aboutUsDom.style.paddingTop = '0');
      contactUsDom && (contactUsDom.style.paddingTop = '0');
    }
  }

  useEffect(() => window.addEventListener('scroll', scrollCallback), []);

  return (
    <Container id='navbar_menu_id'>
      <MenuItems>
        <BlankMenuItem style={{ paddingTop: '8px' }}>
          {showLogo ? <Logo id='navmenu_logo_id' src='/images/aic_logo.png' onClick={() => window.location.href='/'}></Logo> : null}
        </BlankMenuItem>
        <MenuItem href='/products'>Products</MenuItem>
        <MenuItem href='/about-us'>About us</MenuItem>
        <MenuItem href='/contact-us'>Contact us</MenuItem>
        <MenuItem href='/'>Covid 19</MenuItem>
      </MenuItems>

      <Search />

      {showLogo ? <UserCart /> : <Blank />}
    </Container>
  )
}
