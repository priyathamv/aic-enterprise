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
  font-size: 12px;
  padding: 15px 30px;
`;

export const Button = ({ style, label, handleOnClick  }) => {
  return (
    <Container style={style} onClick={handleOnClick}>
      {label}
    </Container>
  )
}
