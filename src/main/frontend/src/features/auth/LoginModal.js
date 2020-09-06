import React from 'react';
import styled from 'styled-components';

import { Login } from './Login';


const Container = styled.div`
  min-height: 100vh;
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Close = styled.a`
  position: fixed;
  right: 50px;
  top: 50px;
  cursor: pointer;
  line-height: 20px;
  font-size: 50px;
`;


export const LoginModal = ({ closeModal }) => {

  return (
    <Container id='login_modal_id' >
      <Close className="close" onClick={closeModal}>
        &times;
      </Close>

      <Login closeModal={closeModal}/>
    </Container>
  )
}
