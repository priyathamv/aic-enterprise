import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

// import { GLogin } from './features/auth/GLogin';
import { Products } from './features/products/Products';
import { AboutUs } from './features/aboutus/AboutUs';
import { ContactUs } from './features/contactus/ContactUs';
import { Navbar } from './features/navbar/Navbar';
import { Homepage } from './features/homepage/Homepage';
import { Footer } from './features/homepage/common/Footer';
import { updateEmailAuthDetails } from './features/auth/authSlice';
import { GLogin } from './features/auth/GLogin';
import { CartSideBar } from './features/cart/CartSideBar';
import { selectGoogleAuth, selectEmailAuth } from './features/auth/authSlice';
import { fetchUserCart, fetchUserCartFromLocalStorage } from './features/cart/cartSlice';
import { ProductList } from './features/products/ProductList';
import { ResetPassword } from './features/auth/ResetPassword';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserDetails = async (token) => {
      const headers = {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      }
      try {
        const userDetailsResponse = await axios.get('/auth/user-details', { headers });
        if (userDetailsResponse)
          dispatch(updateEmailAuthDetails(userDetailsResponse.data.payload));
    
      } catch (err) {
        console.log('Error while fetching User details', err.message);
      }
    }

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
    <Router>
      <Navbar />
      <CartSideBar />
      <Switch>
        <Route path='/products' component={Products} />
        <Route path='/product-list' component={ProductList} />
        <Route path='/about-us' component={AboutUs} />
        <Route path='/contact-us' component={ContactUs} />
        <Route path='/reset-password' component={ResetPassword} />
        <Route path='/' component={Homepage} />
      </Switch>
      <GLogin style={{ visibility: 'hidden', position: 'absolute'}} />
      <Footer />
    </Router>
  );
}

export default App;
