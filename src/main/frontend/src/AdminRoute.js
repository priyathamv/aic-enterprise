import React from 'react';
import { useSelector } from 'react-redux';

import { NavbarMain } from './features/navbar/NavbarMain';
import { LoginPage } from './features/auth/LoginPage';
import { Spinner } from './features/utils/Spinner';
import { selectIsLoading } from './features/auth/authSlice';

export const AdminRoute = ({ email, component }) => {
  const Component = component;

  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      <NavbarMain isAdmin={true} />
      {email ? <Component /> : isLoading ? <Spinner containerStyle={{ top: '50vh', height: 'auto' }} /> : <LoginPage />}
    </>
  )
}
