import React from 'react';
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
  background-color: #F8F8FF;
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

const MailText = styled.a`
  text-decoration: none;
  color: #232162;
`;

const PhoneIcon = styled(ImPhone)`
  margin-left: 2px;
`;


export const NavbarMain = () => {
  const viewportWidth = window.outerWidth;
  const isMobile = viewportWidth < 1024;

  return (
    <Container>
      <BrandFrame>
        <Logo src='/images/aic_logo.png' onClick={() => window.location.href='/'}></Logo>

        <Brand>AIC Group</Brand>
      </BrandFrame>

      {!isMobile && <ContantInfo>
        <MailIcon size='1.5em'></MailIcon>
        <MailText href='mailto:info@aicgroup.co.in?subject=Website Query'>Info@aicgroup.co.in</MailText>

        <PhoneIcon size='1.3em'></PhoneIcon>
        <MailText href='tel:+918028364174'>+91 8028364174</MailText>
      </ContantInfo>}

      <UserCart />
    </Container>
  )
}
