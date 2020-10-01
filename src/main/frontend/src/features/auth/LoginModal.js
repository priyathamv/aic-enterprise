import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { Login } from './Login';
import { selectUserEmail } from './authSlice';


const Container = styled.div`
  min-height: 100vh;
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Close = styled(Link)`
  position: fixed;
  right: 50px;
  top: 50px;
  cursor: pointer;
  line-height: 20px;
  font-size: 50px;
  color: #232162;
  text-decoration: none;
`;


export const LoginModal = ({ closeModal }) => {
  const history = useHistory();
  const email = useSelector(selectUserEmail);

  useEffect(() => {
    email && history.push('/');
  }, [email])


  return (
    <Container id='login_modal_id' >
      <Close to='/' className="close" >&times;</Close>

      <Login closeModal={closeModal}/>
    </Container>
  )
}
