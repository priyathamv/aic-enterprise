import React from 'react';
import styled from 'styled-components';

import { ReactComponent as WideRange } from './box.svg';
import { ReactComponent as CustomerService } from './customer-service.svg';
import { ReactComponent as ExpressDelivery } from './express-delivery.svg';
import { ReactComponent as FingerPrint } from './finger-print.svg';
import { ReactComponent as TechnicalSupport } from './technical-support.svg';
import { device } from '../../utils/viewport';

const Container = styled.div`
  background-color: #D99107;
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  text-align: center;
  padding-top: 50px;

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 150px;
    padding: 100px;
  }
`;

const Wrapper = styled.div`
`;

const Label = styled.label`
  margin-top: 30px;
  display: block;
  color: #FFF;
  font-size: 24px;
  margin-bottom: 50px;

  @media ${device.laptop} {
    margin-bottom: 0;
  }
`;

export const Traits = () => {
  return (
    <Container>
      <Wrapper>
        <WideRange/>
        <Label>Wide Product Range</Label>
      </Wrapper>

      <Wrapper>
        <CustomerService />
        <Label>Efficient Customer Service</Label>
      </Wrapper>

      <Wrapper>
        <FingerPrint />
        <Label>Wide accessibility through branches</Label>
      </Wrapper>

      <Wrapper>
        <ExpressDelivery />
        <Label>In - Time Delivery</Label>
      </Wrapper>

      <Wrapper>
        <TechnicalSupport />
        <Label>Qualified Technical Support</Label>
      </Wrapper>
    </Container>
  )
}