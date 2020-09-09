import React from 'react';
import styled from 'styled-components';

import { Line } from '../homepage/common/Line';
import { ImLocation } from 'react-icons/im';


const Container = styled.div`
  display: flex;
  margin-bottom: 250px;
`;

const LocationPanel = styled.div`
  width: 50vw;
  background-color: #232162;
  color: #FFF;
  padding: 50px;
`;

const EnquiryForm = styled.div`
  width: 50vw;
`;

const Heading = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 50px;
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
      <LocationPanel>
        <Heading>Contact Us</Heading>

        <Location>
          <Name><LocationIcon size='1em' />AIC Enterprises</Name>
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
          <Description>No.11, 1st Cross, Kamban - Nagar,Redisarpalayam, Pondicherry - 605010</Description>
        </Location>
      </LocationPanel>

      <EnquiryForm>

      </EnquiryForm>
    </Container>
  )
}
