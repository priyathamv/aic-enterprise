import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { device } from '../../utils/viewport';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  
  @media ${device.laptop} { 
    flex-direction: row;
    margin-bottom: 40px;
  }
`;

const Image = styled.img`
  width: 100%;
  
  @media ${device.laptop} { 
    width: 60vw;
  }
`;

const AboutUs = styled.div`
  padding: 20px;

  @media ${device.laptop} { 
    position: relative;
    top: 50px;
    right: 150px;
    margin-right: -100px;
    background-color: white;
    padding: 40px 30px;
  }
`;

const Title = styled.div`
  color: #232162;
  font-size: 26px;
  margin-bottom: 20px;

  @media ${device.laptop} { 
    margin-bottom: 40px;
  }
`;

const Content = styled.div`
  font-size: 14px;
  line-height: 25px;
  margin-bottom: 20px;

  @media ${device.laptop} { 
    margin-bottom: 40px;
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  background-color: #232162;
  color: #FFF;
  border-radius: 5px;
  font-weight: bold;
  border: none;
  font-size: 12px;
  padding: 15px 30px;
`;


export const OurCompany = () => {
  const handleOnClick = () => {}

  return (
    <Container>
      <Image src='/images/our_company.jpg' />

      <AboutUs>
        <Title>Our Company</Title>
        <Content>Established in the year 1964, Associated Instruments and Chemicals is a pioneer in the scientific equipment industry. Founded by Shri B.N Kapila with a vision to service all kinds of scientific equipment needs, AIC has grown as a reckoning and trusted force with branches spreading across Chennai, Bengaluru and Pondicherry.<br /><br />
        The success of AIC lies in a variety of factors that none other in the industry can offer. A phenomenally broad product range with the ability to cater to each customer individually, is a combination that very few can offer. Our efforts have always been directed to meeting the customers requirement and serving them with unmatched quality.<br /><br />
        With a broad base, varied product range and an unbroken commitment for more than 50 years, AIC is the most loved name in the industry.</Content>
        <CustomLink to='/about-us'>KNOW MORE</CustomLink>
      </AboutUs>
      
    </Container>
  )
}
