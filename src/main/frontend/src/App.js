import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

import ScrollToTop from './features/utils/ScrollToTop';
import { Products } from './features/products/Products';
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
import { ResetPassword } from './features/auth/ResetPassword';
import { MyAccount } from './features/myaccount/MyAccount';
import { ProtectedRoute } from './ProtectedRoute';
import { EmailConfirmation } from './features/auth/EmailConfirmation';

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
        <Body>
          <Navbar />
          <CartSideBar />
          <ScrollToTop />

          <Switch>
            <Route path='/login' component={LoginPage} />
            <Route path='/products' component={Products} />
            <Route path='/product-list' component={ProductList} />
            <Route path='/about-us' component={AboutUs} />
            <Route path='/contact-us' component={ContactUs} />
            <Route path='/reset-password' component={ResetPassword} />
            <Route path='/confirm-email' component={EmailConfirmation} />
            <ProtectedRoute path='/account' email={email} component={MyAccount} />
            <Route path='/' component={Homepage} />
          </Switch>
          <GLogin style={{ visibility: 'hidden', position: 'absolute'}} />
        </Body>

        <Footer />
      </Router>
    </>
  );
}

export default App;
