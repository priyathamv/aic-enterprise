import React from 'react';
import styled from 'styled-components';
import { device } from '../utils/viewport';

import { Line } from '../homepage/common/Line';
import { CareerForm } from './CareerForm';

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
  margin: 50px 10vw 50px 10vw;
  // box-shadow: 0 5px 6px -6px black;

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const LocationPanel = styled.div`
  flex: 3;
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

export const Careers = () => {
  return (
    <Container id='careers_id'>

      <GetInTouchFrame>
        <LocationPanel>
          <Location>
            <Name>AIC Enterprises Private Limited</Name>
            <Description>V79A & V79B, 1st A Main, 2nd Stage, Peenya, Bengaluru, Karnataka 560058</Description>
          </Location>

          <Line style={{ margin: '20px 0' }} />

          <Location>
            <Name>AIC Specialities</Name>
            <Description>125, Langs Garden Road, Pudupet, Chennai - 600 002</Description>
          </Location>

          <Line style={{ margin: '20px 0' }} />

          <Location>
            <Name>AIC International</Name>
            <Description>No.11, 1st Cross, Kamban - Nagar, Rediuarpalem, Pondicherry - 605010</Description>
          </Location>
        </LocationPanel>

        <CareerForm style={{ flex: 3 }} />
      </GetInTouchFrame>

    </Container>
  )
}
