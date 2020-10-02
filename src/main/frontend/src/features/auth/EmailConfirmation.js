import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Message = styled.div`
  font-size: 18px;
`;

export const EmailConfirmation = () => {
  const email = new URLSearchParams(window.location.search).get("email");
  const token = new URLSearchParams(window.location.search).get("token");
  const history = useHistory();

  const [message, setMessage] = useState(null);

  const handleConfirmEmail = async () => {
    const headers = { 'Content-Type': 'application/json' };

    try {
      const confirmResponse = await axios.post('/api/users/confirm-email', { email, token }, { headers })
      console.log('confirmResponse', confirmResponse)
      if (confirmResponse.data.payload) {
        setMessage('Your email is confirmed, redirecting back to homepage...'); 
        setTimeout(() => history.push('/'), 5000);
        return;
      } 
    } catch (err) {
      console.log('Error while confirming user email', err.message);
    }
    setMessage('Confirmation link expired');
    setTimeout(() => history.push('/'), 5000);
  }

  useEffect(() => {
    if (email && token) 
      handleConfirmEmail();
  }, [email, token]);

  return (
    <Container>
      {message && <Message>{message}</Message>}
    </Container>
  )
}
