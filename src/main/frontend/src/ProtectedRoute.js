import React from 'react';
import { useSelector } from 'react-redux';

import { LoginPage } from './features/auth/LoginPage';
import { Spinner } from './features/utils/Spinner';
import { selectIsLoading } from './features/auth/authSlice';

export const ProtectedRoute = ({ email, component }) => {
  const Component = component;

  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      {email ? <Component /> : isLoading ? <Spinner containerStyle={{ top: '50vh', height: 'auto' }} /> : <LoginPage />}
    </>
  )
}
