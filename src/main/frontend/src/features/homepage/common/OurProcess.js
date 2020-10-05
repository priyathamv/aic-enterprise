import React from 'react';
import styled from 'styled-components';

import Fade from 'react-reveal/Fade';
import { FaCheckCircle } from 'react-icons/fa';
import { ProcessStep } from './ProcessStep';
import { device } from '../../utils/viewport';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  position: relative;
  margin-bottom: 100px;

  @media ${device.laptop} { 
    padding: 0 20vw;
  }
`;

const Title = styled.div`
  color: #232162;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const VerticalLine = styled.div`
  position: absolute;
  z-index: -1;
  border-left: 1px dashed #232162;

  @media ${device.laptop} { 
    height: 90%;
    top: 50px;
  }
  @media ${device.tablet} { 
    height: 75%;
    top: 75px;
  }
  @media ${device.mobile} { 
    height: 85%;
  }
`;

const CheckCircleIcon = styled(FaCheckCircle)`
  border-radius: 20px;
  font-weight: bold;
  font-size: 33px;
  color: #232162;
  background-color: #FFF;
  margin-top: 30px;
`;


export const OurProcess = () => {
  return (
    <Container>
      <Title>Our Process</Title>

      <VerticalLine />
      
      <Fade right>
        <ProcessStep 
          dataStyle={{ marginLeft: '-33px' }}
          number='1'
          heading='Find Your Product'
          content='Search through our wide range of products. AIC Group poses over One Lakh products.'
          isLeftAlign={false}
        />
      </Fade>

      <Fade left>
        <ProcessStep 
          dataStyle={{ marginRight: '-33px' }}
          number='2'
          heading='Place an Enquiry'
          content='Fill our enquiry form with the details of the products that you wish to place an order for.'
          isLeftAlign={true}
        />
      </Fade>

      <Fade right>
        <ProcessStep 
          dataStyle={{ marginLeft: '-33px' }}
          number='3'
          heading='AIC Support'
          content='On receipt of your enquiry, our back end team will promptly connect with you and respond with the required details.'
          isLeftAlign={false}
        />
      </Fade>
      <Fade top>
        <CheckCircleIcon />
      </Fade>
    </Container>
  );
}