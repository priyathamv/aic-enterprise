import React from 'react';
import styled from 'styled-components';

import { Author } from './Author'

const Container = styled.div`
  margin: 100px 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IntroFrame = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Title = styled.div`
  flex: 1;
  font-size: 24px;
  font-weight: bold;
  color: #232162;
  letter-spacing: 1px;
`;

const Description = styled.div`
  flex: 4;
  color: #6E6E6E;
  font-size: 18px;
`;

const StrengthFrame = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 75px;
`;

const StrengthImage = styled.img`
  width: 35vw;
  margin-right: 5vw;
`;

const Strength = styled.div`
  color: #6E6E6E;
  font-size: 18px;
`;

const StrengthDesc = styled.div`

`;

const Li = styled.li`
  margin-bottom: 5px;
`;

const AuthorFrame = styled.div`
  display: flex;
  width: 80vw;
  margin-bottom: 50px;
`;

const Blank = styled.div`
  flex: 2;
`;

export const AboutUs = () => {
  return (
    <Container>
      <IntroFrame>
        <Title>About Us</Title>

        <Description>
          Associated Instruments and Chemicals popularly known as AIC, is a five decade old company that was founded in the year 1964 by Shri B.N. Kapila. We are pioneers who are dedicated in serving the scientific community by being a one stop solution for all the scientific needs.<br/><br/>
          Aptly supported by a talented and dedicated staff, this selfless service has taken AIC to great heights in terms of market share and customer satisfaction. Our customers have been with us since our inception and is a symbol of our unmatched and high quality of services. Having offices at Chennai, Pondicherry, and Bangalore the group caters to customers with a personalized touch.
        </Description>
      </IntroFrame>

      <StrengthFrame>
        <StrengthImage src='/images/strength.png'></StrengthImage>

        <Strength>
          <Title style={{ textAlign: 'center' }}>AIC's strength lies in</Title>

          <StrengthDesc>
            <ul>
              <Li>Broadest product range</Li>
              <Li>Individual consultation and on-time delivery</Li>
              <Li>Dedicated marketing and sales network to fulfill customers every requirement</Li>
              <Li>Technical support by qualified and experienced personnel</Li>
              <Li>Integrated ERP Solutions for efficient customer services</Li>
              <Li>Wide accessibility through branches</Li>
              <Li>Well connected dealer network</Li>
            </ul>
          </StrengthDesc>
        </Strength>
      </StrengthFrame>

      <Title style={{ marginBottom: '50px' }}>Meet the Team</Title>

      <AuthorFrame>
        <Author 
          style={{ flex: 3}}
          name='Shashan Kapila'
          designation='Wholetime Director'
          aboutMe='A director is a person from a group of managers who leads or supervises a particular area of a company. Companies that use this term often have many directors spread throughout different business functions or roles (e.g. director of human resources). (S & P India) in 2005. He is a Strategic Investor in Maven Corp and Karvy Consultants & a Founding Investor of CBay Systems.'
        />
        <Blank />
      </AuthorFrame>

      <AuthorFrame>
        <Blank />
        <Author 
          style={{ flex: 3}}
          name='Dhruv Kapila'
          designation='Wholetime Director'
          aboutMe='A director is a person from a group of managers who leads or supervises a particular area of a company. Companies that use this term often have many directors spread throughout different business functions or roles (e.g. director of human resources). & development and project management along with all other key executive functions at PVP Ventures Ltd. SaiPadma holds an MBA and has done the Advanced Management Program from IESE Business School, Barcelona,Spain.'
        />
      </AuthorFrame>
      
    </Container>
  )
}
