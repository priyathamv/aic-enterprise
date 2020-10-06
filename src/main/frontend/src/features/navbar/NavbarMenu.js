import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { UserCart } from './UserCart';
import { ProductsMenu } from './ProductsMenu';

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

const MenuItemWrap = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

const MenuItem = styled(Link)`
  flex: 1;
  text-decoration: none;
  border-right: 1px solid #CCC;
  padding-top: 27px;
  color: #232162;
  cursor: pointer;
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
  const viewportWidth = window.outerWidth;
  const isMobile = viewportWidth < 1024;

  const [showLogo, setShowLogo] = useState(false);
  
  const scrollCallback = async () => {
    const navbarMenuDom = document.getElementById('navbar_menu_id');
    const coverImageSliderDom = document.getElementById('cover_image_slider_id');
    const aboutUsDom = document.getElementById('about_us_id');
    const contactUsDom = document.getElementById('contact_us_id');
    const productsDom = document.getElementById('products_id');
    const productListDom = document.getElementById('product_list_id');
    const myAccountDom = document.getElementById('my_account_id');

    if ((document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) && !document.getElementById('login_modal_id')) {
      if (navbarMenuDom) {
        navbarMenuDom.style.position = 'fixed';
        navbarMenuDom.style.top = '0';
        navbarMenuDom.style.borderTop = 'none';
      }
      coverImageSliderDom && (coverImageSliderDom.style.paddingTop = '75px');
      aboutUsDom && (aboutUsDom.style.paddingTop = '75px');
      contactUsDom && (contactUsDom.style.paddingTop = '75px');
      productsDom && (productsDom.style.paddingTop = '75px');
      productListDom && (productListDom.style.paddingTop = '75px');
      myAccountDom && (myAccountDom.style.paddingTop = '75px');
      setShowLogo(true);
    } else {
      setShowLogo(false);
      if (navbarMenuDom) {
        navbarMenuDom.style.position = 'initial';
        navbarMenuDom.style.top = '100px';
        navbarMenuDom.style.borderTop = '1px solid #CCC';
      }
      coverImageSliderDom && (coverImageSliderDom.style.paddingTop = '0');
      aboutUsDom && (aboutUsDom.style.paddingTop = '0');
      contactUsDom && (contactUsDom.style.paddingTop = '0');
      productsDom && (productsDom.style.paddingTop = '0');
      productListDom && (productListDom.style.paddingTop = '0');
      myAccountDom && (myAccountDom.style.paddingTop = '0');
    }
  }

  useEffect(() => window.addEventListener('scroll', scrollCallback), []);

  const curPageStyle = path => {
    const currentPath = window.location.pathname;
    return currentPath.includes(path) ? { marginBottom: '-1px', borderBottom: '5px solid #232162' } : null;
  }

  // To update curPageStyle on every path change
  // useEffect(() => {
  // }, [window.location.pathname])

  return (
    <Container id='navbar_menu_id'>
      <MenuItems>
        {isMobile ? 
          null : 
          <BlankMenuItem style={{ paddingTop: '8px' }}>
            {showLogo ? <Logo id='navmenu_logo_id' src='/images/aic_logo.png' onClick={() => window.location.href='/'}></Logo> : null}
          </BlankMenuItem>  
        }
        <MenuItemWrap
          onMouseEnter={() => document.getElementById('products_menu_id').style.display = 'grid'} 
          onMouseLeave={() => document.getElementById('products_menu_id').style.display = 'none'}
        >
          <MenuItem style={curPageStyle('/products') || curPageStyle('/product-list')} to='/products'>Products</MenuItem>
          <ProductsMenu />
        </MenuItemWrap>
        <MenuItem style={curPageStyle('/about-us')} to='/about-us'>About us</MenuItem>
        <MenuItem style={curPageStyle('/contact-us')} to='/contact-us'>Contact us</MenuItem>
        <MenuItem to="/">Covid 19</MenuItem>
      </MenuItems>

      {isMobile ? null : <Search />}

      {showLogo ? <UserCart /> : (isMobile ? null : <Blank />)}
    </Container>
  )
}
