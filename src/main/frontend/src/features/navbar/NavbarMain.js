import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import 'reactjs-popup/dist/index.css';
import { ImPhone } from 'react-icons/im';
import { IoIosMail } from 'react-icons/io';
import { UserCart } from './UserCart';


const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  color: #232162;
  text-align: center;
`;

const BrandFrame = styled.div`
  flex: 3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #23216214;
  height: 100%;
`;

const Logo = styled.img`
  width: 80px;
  border-radius: 40px;
  margin-right: 15px;
  cursor: pointer;
`;

const Brand = styled.div`
  font-size: 42px;
  font-weight: bold;
  letter-spacing: 2px;
  margin-right: 20px;
`;

const ContantInfo = styled.div`
  flex: 3;
  justify-content: flex-end;
  display: grid;
  justify-items: start;
  grid-template-columns: 30px 150px;
  grid-row: auto auto;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  align-items: center;
`;

const MailIcon = styled(IoIosMail)`

`;

const MailText = styled.div`
  cursor: pointer;
`;

const PhoneIcon = styled(ImPhone)`
  margin-left: 2px;
`;

const PhoneText = styled.div`

`;


export const NavbarMain = () => {
  
  const prepareEmail = () => {
    window.location.href = 'mailto:info@aicgroup.co.in';
  }

  return (
    <Container>
      <BrandFrame>
        <Logo src='/images/aic_logo.png' onClick={() => window.location.href='/'}></Logo>

        <Brand>AIC Group</Brand>
      </BrandFrame>

      <ContantInfo>
        <MailIcon size='1.5em'></MailIcon>
        <MailText onClick={prepareEmail}>Info@aicgroup.co.in</MailText>

        <PhoneIcon size='1.3em'></PhoneIcon>
        <PhoneText>+123-456-7890</PhoneText>
      </ContantInfo>

      <UserCart />
    </Container>
  )
}
