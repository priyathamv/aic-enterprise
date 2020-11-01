import React from 'react';
import styled from 'styled-components';

import 'reactjs-popup/dist/index.css';
import { ImPhone } from 'react-icons/im';
import { IoIosMail } from 'react-icons/io';
import { UserCart } from './UserCart';
import { device } from '../utils/viewport';


const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  color: #232162;
  text-align: center;
`;

const BrandFrame = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #F8F8FF;
  height: 100%;


  @media ${device.tablet} { 
    flex: 2;
  }
  
  @media ${device.laptop} { 
    flex: 3;
  }
`;

const Logo = styled.img`
  width: 50px;
  border-radius: 40px;
  margin-right: 15px;
  cursor: pointer;

  @media ${device.tablet} { 
    width: 70px;
  }
  
  @media ${device.laptop} { 
    width: 80px;
  }
`;

const Brand = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-right: 20px;

  @media ${device.tablet} { 
    font-size: 28px;
  }
  
  @media ${device.laptop} { 
    font-size: 42px;
  }
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
  // align-items: center;
  align-items: flex-start;

  @media ${device.tablet} { 
    flex: 1;
  }

  @media ${device.laptop} { 
    grid-template-columns: 20px 140px 20px 140px;
    flex: 3;
  }
`;

const MailIcon = styled(IoIosMail)`
  margin-top: 1px;
`;

const MailText = styled.a`
  text-decoration: none;
  color: #232162;
`;

const PhoneIcon = styled(ImPhone)`
  margin-left: 5px;
  margin-top: 3px;
`;

const SubText = styled.div`
  font-size: 14px;
`;


export const NavbarMain = () => {
  const viewportWidth = window.outerWidth;
  const isMobile = viewportWidth < 768;
  const isLaptop = viewportWidth >= 1024;

  return (
    <Container>
      <BrandFrame>
        <Logo src='/images/aic_logo.png' alt='AIC Logo' onClick={() => window.location.href='/'}></Logo>

        <Brand>AIC Group</Brand>
      </BrandFrame>

      {!isMobile && 
        <ContantInfo>
          <MailIcon size='1.3em'></MailIcon>
          <div>
            <MailText href='mailto:sales@aicgroup.in?subject=Website Query'>sales@aicgroup.in</MailText>
            {isLaptop && <SubText>Get an estimate</SubText>}
          </div>

          <PhoneIcon size='1em'></PhoneIcon>
          <div>
            <MailText style={{ fontSize: '15px' }} href='tel:+918028364174'>080-28364174</MailText>
            {isLaptop && <SubText>Contact us</SubText>}
          </div>
        </ContantInfo>}

      <UserCart />
    </Container>
  )
}
