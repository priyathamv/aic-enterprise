import React from 'react';
import { useSelector } from 'react-redux';

import { GLogin } from '../auth/GLogin';
import { GLogout } from '../auth/GLogout';
import { selectGoogleAuth } from '../auth/authSlice';

export const Homepage = () => {
  const googleAuth = useSelector(selectGoogleAuth);

  return (
    <div>
      <div>
        This is homepage!!!!
      </div>

      {googleAuth.token ? <GLogout /> : <GLogin />}
    </div>
  )
}
