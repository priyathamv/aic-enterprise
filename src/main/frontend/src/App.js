import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import ScrollToTop from './features/utils/ScrollToTop';
import { Products } from './features/products/Products';
import { Covid19 } from './features/covid/Covid19';
import { AboutUs } from './features/aboutus/AboutUs';
import { ContactUs } from './features/contactus/ContactUs';
import { Navbar } from './features/navbar/Navbar';
import { Homepage } from './features/homepage/Homepage';
import { Footer } from './features/homepage/common/Footer';
import { updateEmailAuthDetails } from './features/auth/authSlice';
import { GLogin } from './features/auth/GLogin';
import { LoginPage } from './features/auth/LoginPage';
import { CartSideBar } from './features/cart/CartSideBar';
import { selectGoogleAuth, selectEmailAuth } from './features/auth/authSlice';
import { fetchUserCart, fetchUserCartFromLocalStorage } from './features/cart/cartSlice';
import { ProductList } from './features/products/ProductList';
import { AdminProductList2 } from './features/admin/products/AdminProductList2';
import { ResetPassword } from './features/auth/ResetPassword';
import { MyAccount } from './features/myaccount/MyAccount';
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';
import { EmailConfirmation } from './features/auth/EmailConfirmation';
import { AdminHome } from './features/admin/AdminHome';
import { ProductCatalogue } from './features/products/catalogue/ProductCatalogue';
import { ProductDetail2 } from './features/products2/ProductDetail2';

const Body = styled.div`
  flex: 1 0 auto;
`;

function App() {
  const dispatch = useDispatch();
  
  const getUserDetails = async token => {
    const headers = {
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    }
    try {
      const userDetailsResponse = await axios.get('/auth/user-details', { headers });
      if (userDetailsResponse) {
        // Handle when the token expires
        dispatch(updateEmailAuthDetails(userDetailsResponse.data.payload));
      }
      
    } catch (err) {
      console.log('Error while fetching User details', err.message);
    }
  }

  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get('auth_token');
    
    if (authToken)
      getUserDetails(authToken);
  }, [dispatch]);

  const googleEmail = useSelector(selectGoogleAuth).email;
  const normalEmail = useSelector(selectEmailAuth).email;
  const email = googleEmail || normalEmail;

  useEffect(() => {
    if (email)
      dispatch(fetchUserCart(email));
    else
      dispatch(fetchUserCartFromLocalStorage());
  }, [dispatch, email]);

  return (
    <>
      <Router>
        <Switch>
          <PublicRoute path='/login' component={LoginPage} />
          <PublicRoute path='/products' component={Products} />
          <PublicRoute path='/product-list' component={ProductList} />
          <PublicRoute path='/productlist' component={AdminProductList2} />
          <PublicRoute path='/product-detail/' component={ProductDetail2} />
          <PublicRoute path='/covid19' component={Covid19} />
          <PublicRoute path='/about-us' component={AboutUs} />
          <PublicRoute path='/contact-us' component={ContactUs} />
          <PublicRoute path='/reset-password' component={ResetPassword} />
          <PublicRoute path='/confirm-email' component={EmailConfirmation} />
          <PublicRoute path='/borosil' component={ProductCatalogue} />
          <ProtectedRoute path='/account' email={email} component={MyAccount} />
          <AdminRoute path='/admin/overview' email={email} component={AdminHome} />
          <AdminRoute path='/admin' email={email} component={AdminHome} />
          <PublicRoute path='/' component={Homepage} />
        </Switch>

        <GLogin style={{ visibility: 'hidden', position: 'absolute'}} />
      </Router>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </>
  );
}

export default App;
