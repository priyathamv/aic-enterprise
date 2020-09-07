import React from 'react';
import styled from 'styled-components';
import { Line } from '../homepage/common/Line';

const Container = styled.div`
  background-color: #232162;
  color: #FFF;
  padding: 0 10vw 50px 10vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 250px;
`;

const IntroFrame = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 0 0 0;
  margin-bottom: 50px;
`;

const Intro = styled.div`
  flex: 3;
  padding: 20px 50px;
`;

const Heading = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Body = styled.div`

`;

const SubTitle = styled.div`
  font-size: 24px;
`;

const Li = styled.li`
  margin-bottom: 5px;
`;

const Strength = styled.div`
  flex: 2;
  padding: 20px 50px;
`;

const Director = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #FFF;
  color: black;
  padding: 30px;
  border-radius: 3px;
  margin-top: 30px;
`;

const Image = styled.img`
  min-width: 200px;
  min-height: 200px;
  background-color: #CCC;
  border-radius: 100%;
  margin-right: 30px;
`;

const AboutMeFrame = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Designation = styled.div`
  font-size: 14px;
  font-style: italic;
  margin-bottom: 10px;
`;

const AboutMe = styled.div`
  line-height: 25px;
`;

export const AboutUs = () => {
  return (
    <Container id='about_us_id'>
      <IntroFrame>
        <Intro>
          <Heading>AIC Enterprises</Heading>
          <Body>
          Associated Instruments and Chemicals popularly known as AIC, is a Five Decade-old company that was founded in the year 1964 by Shri B.N. Kapila. Pioneers in dedicated service to the scientific community’s necessities by being a one-stop Shoppe for all laboratory requisites.<br/><br/>
          Aptly supported by a talented and dedicated staff, this selfless service has taken AIC to great heights in terms of market share and customer satisfaction. AIC’s customers have been with them since their inception, which clearly indicates the quality of unmatched service provided by AIC. Having offices at Chennai, Pondicherry, Vellore, and Bangalore the group caters to customers with a personalized touch.
          </Body>
        </Intro>

        <Strength>
          <SubTitle>AIC’s strength lies in:</SubTitle>
          <ul>
            <Li>Broadest product range</Li>
            <Li>Individual consultation and in-time delivery</Li>
            <Li>Dedicated marketing and sales network to fulfill customers every requirement</Li>
            <Li>Technical support by qualified and experienced personnel</Li>
            <Li>Integrated ERP Solutions for efficient customer services</Li>
            <Li>Wide accessibility through Branches</Li>
            <Li>Well connected dealer network</Li>
          </ul>
        </Strength>
      </IntroFrame>

      <Heading>Meet The Team</Heading>

      <Line style={{ backgroundColor: '#FFF', width: '10%', height: '2px' }} />

      <Director>
        <Image src='' alt=''/>

        <AboutMeFrame>
          <Name>Shashan Kapila</Name>

          <Designation>Wholetime Director</Designation>

          <AboutMe>A director is a person from a group of managers who leads or supervises a particular area of a company. Companies that use this term often have many directors spread throughout different business functions or roles (e.g. director of human resources). (S & P India) in 2005. He is a Strategic Investor in Maven Corp and Karvy Consultants & a Founding Investor of CBay Systems.</AboutMe>
        </AboutMeFrame>
      </Director>

      <Director>
        <Image src=''/>

        <AboutMeFrame>
          <Name>Dhruv Kapila</Name>

          <Designation>Wholetime Director</Designation>

          <AboutMe>A director is a person from a group of managers who leads or supervises a particular area of a company. Companies that use this term often have many directors spread throughout different business functions or roles (e.g. director of human resources). & development and project management along with all other key executive functions at PVP Ventures Ltd. SaiPadma holds an MBA and has done the Advanced Management Program from IESE Business School, Barcelona,Spain.</AboutMe>
        </AboutMeFrame>
      </Director>
    </Container>
  )
}
