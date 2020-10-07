import React from 'react';
import styled from 'styled-components';

import { Line } from '../common/Line';
import { device } from '../../utils/viewport';

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Blank = styled.div`
  flex: 1;
`;

const Data = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Number = styled.div`
  padding: 7px 12px;
  background-color: #232162;
  border-radius: 20px;
  font-weight: bold;
  color: #FFF;
`;

const Process = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #0000000a;
  border-bottom: 2px solid #232162;

  @media ${device.laptop} { 
    padding: 20px;
  }
`;

const Header = styled.div`
  color: #232162;
  margin-bottom: 10px;
  font-size: 16px;

  @media ${device.laptop} { 
    font-size: 18px;
  }
`;

const Content = styled.div`
  font-size: 14px;

  @media ${device.laptop} { 
    font-size: 14px;
  }
`;

export const ProcessStep = ({ dataStyle, number, heading, content, isLeftAlign }) => {
  const ProcessComponent = <Process>
    <Header>{heading}</Header>
    <Content>{content}</Content>
  </Process>;

  return (
    <Container>
      {isLeftAlign ? null : <Blank />}
      
      <Data style={dataStyle}>
        {isLeftAlign ? ProcessComponent : <Number>{number}</Number>}
      
        <Line style={{ width: '100px' }} />
      
        {isLeftAlign ? <Number>{number}</Number> : ProcessComponent}
      </Data>

      {isLeftAlign ? <Blank /> : null}
    </Container>
  )
}