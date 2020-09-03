import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  background-color: #232162;
  color: #FFF;
  border-radius: 5px;
  padding: 12px 20px;
  font-weight: bold;
  cursor: pointer;
  border: none;
`;

export const Button = ({ label, handleOnClick  }) => {
  return (
    <Container onClick={handleOnClick}>
      {label}
    </Container>
  )
}
