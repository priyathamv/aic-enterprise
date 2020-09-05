import React from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { ImPhone } from 'react-icons/im';
import { IoIosMail } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';
import { LoginModal } from '../auth/LoginModal';


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
`;

const Brand = styled.div`
  letter-spacing: 2px;
  margin-right: 20px;
`;

const BrandName = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const BrandCaption = styled.div`

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

const LoginFrame = styled.div`
  display: flex;
  align-items: center;
`;

const LoginInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserIcon = styled(FaUserCircle)`
  margin-right: 10px;
  cursor: pointer;
`;
  
const LoginButton = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const CartIcon = styled(GiShoppingCart)`

`;

export const NavbarMain = () => {
  const prepareEmail = () => {
    window.location.href = 'mailto:info@aicgroup.co.in';
  }

  return (
    <Container>
      <BrandFrame>
        <Logo src='/aic_logo.png'></Logo>

        <Brand>
          <BrandName>AIC ENTERPRISES</BrandName>
          <BrandCaption>Private Limited</BrandCaption>
        </Brand>
      </BrandFrame>

      <ContantInfo>
        <MailIcon size='1.5em'></MailIcon>
        <MailText onClick={prepareEmail}>Info@aicgroup.co.in</MailText>

        <PhoneIcon size='1.3em'></PhoneIcon>
        <PhoneText>+123-456-7890</PhoneText>
      </ContantInfo>

      <LoginInfo>
        <Popup
          modal
          lockScroll={true}
          contentStyle={{ padding: 0, width: '100vw' }}
          trigger={
            <LoginFrame>
              <UserIcon size='2em' />
              <LoginButton>Log In</LoginButton>
            </LoginFrame>
          }
        >
          {close => (
            <LoginModal close={close}/>
          )}
        </Popup>
        
        <CartIcon size='2em' />
      </LoginInfo>
    </Container>
  )
}
