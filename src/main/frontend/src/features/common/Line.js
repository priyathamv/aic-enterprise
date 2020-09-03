import React from 'react';
import styled from 'styled-components';

const LineStyle = styled.hr`
  width: 100%;
  height: 1px;
  color: #69696970;
  background-color: #69696970;
  border: none;
`;

export const Line = ({style}) => {
  return (
    <LineStyle style={style} />
  )
}
