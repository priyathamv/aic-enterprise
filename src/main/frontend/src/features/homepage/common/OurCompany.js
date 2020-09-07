import React from 'react';
import styled from 'styled-components';

import { Button } from './Button';

const Container = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 60vw;
`;

const AboutUs = styled.div`
  position: relative;
  top: 50px;
  right: 150px;
  margin-right: -100px;
  background-color: white;
  padding: 40px 30px;
`;

const Title = styled.div`
  color: #232162;
  font-size: 26px;
  margin-bottom: 40px;
`;

const Content = styled.div`
  font-size: 14px;
  line-height: 25px;
  margin-bottom: 40px;
`;


export const OurCompany = () => {
  const handleOnClick = () => {}

  return (
    <Container>
      <Image src='/images/why_choose_us.jpg' />

      <AboutUs>
        <Title>Our Company</Title>
        <Content>Established in the year 1964, Associated Instruments and Chemicals is a pioneer in the pharma- ceutical equipment industry. Founded by Shri B.N Kapila with a vision to service all kinds of scien- tific equipment needs, AIC has grown as a reckoning and trusted force with branches spreading across Chennai, Bengaluru, Pondicherry, and Vellore.<br /><br />
        The success of AIC lies in a variety of factors that none other in the industry can offer. A phenom- enally broad product range, with the ability to cater to each customer individually, is a combina- tion that very few can offer. Our efforts in keeping up to the customers’ expectations and servic- ing them, we have integrated ERP solutions and experienced technical support personnel who are keenest to help always.<br /><br />
        With a broad base, varied product range and an unbroken commitment for more than 50 years, AIC is the most loved name in the industry.</Content>
        <Button label='KNOW MORE' handleOnClick={handleOnClick} ></Button>
      </AboutUs>
      
    </Container>
  )
}
