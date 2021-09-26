import React from 'react';
import styled from 'styled-components';
import { ImLocation } from 'react-icons/im';
import { device } from '../utils/viewport';

import { Line } from '../homepage/common/Line';
import { EnquiryForm } from './EnquiryForm';


const Container = styled.div`
`;

const Background = styled.div`
  background-color: #F8F8FF;
  height: 500px;
`;

const Heading = styled.div`
  color: #232162;
  font-size: 36px;
  font-weight: bold;
  padding: 50px 10vw;
`;

const GetInTouchFrame = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FFF;
  margin: -350px 10vw 50px 10vw;
  box-shadow: 0 5px 6px -6px black;

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const LocationPanel = styled.div`
  flex: 2;
  background-color: #232162;
  color: #FFF;
  padding: 50px;
`;

const Location = styled.div`
  margin-bottom: 10px;
`;

const Name = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
`;

const Description = styled.div`
  margin-left: 22px;
`;

const LocationIcon = styled(ImLocation)`
  margin-right: 5px;
`;

export const ContactUs = () => {
  return (
    <Container id='contact_us_id'>
      <Background>
        <Heading>Get in Touch</Heading>
      </Background>

      <GetInTouchFrame>
        <EnquiryForm style={{ flex: 3 }} />

        <LocationPanel>
          <Location>
            <Name><LocationIcon size='1em' />AIC Enterprises Private Limited</Name>
            <Description>V79A & V79B, 1st A Main, 2nd Stage, Peenya, Bengaluru, Karnataka 560058</Description>
          </Location>

          <Line style={{ margin: '20px 0' }} />

          <Location>
            <Name><LocationIcon size='1em' />AIC Specialities</Name>
            <Description>125, Langs Garden Road, Pudupet, Chennai - 600 002</Description>
          </Location>

          <Line style={{ margin: '20px 0' }} />

          <Location>
            <Name><LocationIcon size='1em' />AIC International</Name>
            <Description>No.11, 1st Cross, Kamban - Nagar, Rediuarpalem, Pondicherry - 605010</Description>
          </Location>
        </LocationPanel>
      </GetInTouchFrame>
    </Container>
  )
}
