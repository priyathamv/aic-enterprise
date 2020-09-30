import React from 'react';
import Popup from 'reactjs-popup';

import { LoginModal } from './LoginModal';

export const LoginPage = () => {
  return (
    <>
      <Popup
        modal
        open={true}
        lockScroll={false}
        overlayStyle={{ overflow: 'scroll', zIndex: 100000 }}
        contentStyle={{ padding: 0, width: '100vw', height: '100%' }}
      >
        {close => (
          <LoginModal closeModal={close}/>
        )}
      </Popup>
    </>
  )
}
