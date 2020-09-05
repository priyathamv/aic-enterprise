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


export const LoginModal = ({ close }) => {

  return (
    <Container>
      <Close className="close" onClick={close}>
        &times;
      </Close>

      <Login />
    </Container>
  )
}
