import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

import { UserCart } from './UserCart';
import { ProductsMenu2 } from './products/ProductsMenu2';
import { device } from '../utils/viewport';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: #232162;
  text-align: center;
  background-color: #FFF;
  z-index: 100000;
  padding: 30px 0;
`;

const Logo = styled.img`
  width: 50px;
  border-radius: 40px;
  margin-right: 15px;
  cursor: pointer;

  @media ${device.tablet} {
    width: 70px;
  }

  @media ${device.laptop} {
    margin-left: 50px;
    width: 80px;
  }
`;

const BrandWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Brand = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-right: 20px;

  @media ${device.tablet} {
    font-size: 16px;
  }

  @media ${device.laptop} {
    font-size: 30px;
  }
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

const ProductsWrap = styled.div`
  display: flex;
  min-width: 150px;
  position: relative;
`;

const MenuWrap = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const MenuItem = styled(Link)`
  min-width: 150px;
  align-self: center;
  text-decoration: none;
  color: #707070;
  margin-bottom: 20px;
  display: block;

  @media ${device.laptop} {
    border-right: 1px solid #E0E0E0;
    margin-bottom: 0;
  }

`;

const MenuItemSpecial = styled(Link)`
  min-width: 150px;
  align-self: center;
  text-decoration: none;
  background-color: #D99107;
  color: #FFF;
  padding: 10px 0;
  border-radius: 30px;
  margin-left: 0;

  @media ${device.laptop} {
    margin-left: 20px;
    margin-right: 50px;
  }
`;

// const Logo = styled.img`
//   flex: 1;
//   border-right: 1px solid #CCC;
//   width: 60px;
//   border-radius: 40px;
//   margin-right: 15px;
//   cursor: pointer;
// `;

const Search = styled.div`
  flex: 1;
`;

const Blank = styled.div`
  flex: 1;
`;

const PRODUCTS_PAGE = 'PRODUCTS_PAGE';
const ABOUT_US_PAGE = 'ABOUT_US_PAGE';
const CONTACT_US_PAGE = 'CONTACT_US_PAGE';
const curPageStyle = {
  color: '#232162',
  fontWeight: 'bold'
};

export const NavbarMenu = () => {
  const history = useHistory();

  const viewportWidth = window.outerWidth;
  const isMobile = viewportWidth < 1024;

  const [showLogo, setShowLogo] = useState(false);

  const scrollCallback = async () => {
    const navbarMenuDom = document.getElementById('navbar_menu_id');
    const coverImageSliderDom = document.getElementById('cover_image_slider_id');
    const aboutUsDom = document.getElementById('about_us_id');
    const privacyPolicyDom = document.getElementById('privacy_policy_id');
    const TermsConditionsDom = document.getElementById('terms_conditions_id');
    const disclaimerDom = document.getElementById('disclaimer_idd');
    const contactUsDom = document.getElementById('contact_us_id');
    const productsDom = document.getElementById('products_id');
    const productListDom = document.getElementById('product_list_id');
    const productListDom2 = document.getElementById('product_list_id2');
    const myAccountDom = document.getElementById('my_account_id');
    const covid19Dom = document.getElementById('covid19_id');
    const featuredDom = document.getElementById('featured_id');
    const productCatalogueDom = document.getElementById('product_catalogue_id');

    if (!isMobile) {
      if ((document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) && !document.getElementById('login_modal_id')) {
        if (navbarMenuDom) {
          navbarMenuDom.style.position = 'fixed';
          navbarMenuDom.style.top = '0';
          navbarMenuDom.style.borderTop = 'none';
        }
        coverImageSliderDom && (coverImageSliderDom.style.paddingTop = '100px');
        aboutUsDom && (aboutUsDom.style.paddingTop = '100px');
        privacyPolicyDom && (privacyPolicyDom.style.paddingTop = '100px');
        TermsConditionsDom && (TermsConditionsDom.style.paddingTop = '100px');
        disclaimerDom && (disclaimerDom.style.paddingTop = '100px');
        contactUsDom && (contactUsDom.style.paddingTop = '100px');
        productsDom && (productsDom.style.paddingTop = '100px');
        productListDom && (productListDom.style.paddingTop = '100px');
        productListDom2 && (productListDom2.style.paddingTop = '100px');
        myAccountDom && (myAccountDom.style.paddingTop = '100px');
        covid19Dom && (covid19Dom.style.paddingTop = '100px');
        featuredDom && (featuredDom.style.paddingTop = '100px');
        productCatalogueDom && (productCatalogueDom.style.paddingTop = '100px');
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
        privacyPolicyDom && (privacyPolicyDom.style.paddingTop = '0');
        TermsConditionsDom && (TermsConditionsDom.style.paddingTop = '0');
        disclaimerDom && (disclaimerDom.style.paddingTop = '0');
        contactUsDom && (contactUsDom.style.paddingTop = '0');
        productsDom && (productsDom.style.paddingTop = '0');
        productListDom && (productListDom.style.paddingTop = '0');
        productListDom2 && (productListDom2.style.paddingTop = '0');
        myAccountDom && (myAccountDom.style.paddingTop = '0');
        covid19Dom && (covid19Dom.style.paddingTop = '0');
        featuredDom && (featuredDom.style.paddingTop = '0');
        productCatalogueDom && (productCatalogueDom.style.paddingTop = '0');
      }
    }
  }

  useEffect(() => window.addEventListener('scroll', scrollCallback), []);

  const [curPage, setCurPage] = useState(null);

  const handleCurPageChange = () => {
    const currentPath = history.location.pathname;

    if (currentPath.includes('/products') || currentPath.includes('/product-list'))
      setCurPage(PRODUCTS_PAGE);
    else if (currentPath.includes('/about-us'))
      setCurPage(ABOUT_US_PAGE);
    else if (currentPath.includes('/contact-us'))
      setCurPage(CONTACT_US_PAGE);
    else
      setCurPage(null);
  }

  // To update curPageStyle on every path change
  useEffect(() => {
    handleCurPageChange();
    const historyListener = history.listen(handleCurPageChange);
    return () => historyListener();
  }, [handleCurPageChange, history]);

  const displayProductMenu = showMenu => {
    // document.getElementById('products_menu_id').style.display = showMenu ? 'grid' : 'none';
    document.getElementById('products_menu_id2').style.display = showMenu ? 'block' : 'none';
  }

  return (
    <Container>
      {/* <MenuItems> */}
        {/* {isMobile ?
          null :
          <BlankMenuItem style={{ paddingTop: '8px' }}>
            {showLogo ?
              <Logo id='navmenu_logo_id' src='/images/aic_logo.png' alt='AIC Logo' onClick={() => window.location.href='/'}></Logo> : null}
          </BlankMenuItem>
        } */}

        <Logo
          // style={ isAdmin ? { marginLeft: '20px' } : null }
          src='/images/aic_logo.png'
          alt='AIC Logo'
          onClick={() => window.location.href='/'}
        />

        <BrandWrapper>
          <Brand>AIC</Brand>
          <Brand>GROUP</Brand>
        </BrandWrapper>

        <Blank />
        <Blank />
        <Blank />

        <MenuWrap>
          <ProductsWrap
            // onMouseEnter={() => displayProductMenu(true)}
            // onMouseLeave={() => displayProductMenu(false)}
          >
            <MenuItem
              to='/productlist'
              style={curPage === PRODUCTS_PAGE ? curPageStyle : null}
              onClick={() => displayProductMenu(false)}>
                PRODUCTS
            </MenuItem>
            <ProductsMenu2 />
          </ProductsWrap>

          <MenuItem style={curPage === ABOUT_US_PAGE ? curPageStyle : null} to='/about-us'>ABOUT US</MenuItem>

          <MenuItem style={{ cursor: 'default' }} to='#'>BLOG</MenuItem>

          <MenuItem style={curPage === CONTACT_US_PAGE ? curPageStyle : null} to='/contact-us'>CONTACT</MenuItem>

          <MenuItemSpecial to="/covid19">COVID 19</MenuItemSpecial>

          {isMobile ? null : <Search />}
        </MenuWrap>
      {/* </MenuItems> */}

      {/* {(showLogo && !isMobile) ? <UserCart /> : (isMobile ? null : <Blank />)} */}
    </Container>
  )
}
