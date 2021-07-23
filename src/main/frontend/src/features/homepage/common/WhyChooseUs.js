import React from 'react';
import styled from 'styled-components';

import { device } from '../../utils/viewport';

const Container = styled.div`



  @media ${device.laptop} {
  }
`;

const Heading = styled.div`
  text-align: center;
  font-weight: bold;
  color: #010867;
  font-size: 24px;
  margin-bottom: 30px;

  @media ${device.tablet} {
    font-size: 32px;
  }

  @media ${device.laptop} {
    font-size: 36px;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #010A67;
  text-align: center;
  padding: 10px 15px;
  margin: 0 30px;

  @media ${device.tablet} {
    padding: 20px 30px;
    margin: 0 50px;
  }

  @media ${device.laptop} {
    padding: 75px 100px;
    margin: 0 300px;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;

  @media ${device.laptop} {
    margin: 0;
  }
`;

const Title = styled.div`
  color: #D99107;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 16px;

  @media ${device.laptop} {
    font-size: 24px;
  }

  @media ${device.laptop} {
    font-size: 50px;
  }
`;

const Text = styled.div`
  color: #FFF;
  font-size: 11px;

  @media ${device.tablet} {
    font-size: 16px;
  }

  @media ${device.laptop} {
    font-size: 16px;
  }
`;

const Background = styled.div`
  background: url('/images/BG2.png');
  height: 280px;
  margin-top: -50px;
  z-index: -999999;
  position: relative;

  @media ${device.tablet} {
    height: 300px;
  }

  @media ${device.laptop} {
    margin-top: -125px;
    height: 500px;
  }
`;

const SubHeading = styled.div`
  padding-top: 70px;
  color: #FFF;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 30px;
  font-size: 12px;

  @media ${device.tablet} {
    font-size: 28px;
  }

  @media ${device.laptop} {
    padding-top: 250px;
    font-size: 36px;
  }
`;

const Description = styled.div`
  color: #FFF;
  text-align: center;
  margin-bottom: 50px;
  font-size: 16px;
  line-height: 26px;
  padding: 0 20px;

  @media ${device.tablet} {
    padding: 0 100px;
    font-size: 16px;
  }

  @media ${device.laptop} {
    padding: 0 500px;
    font-size: 16px;
  }
`;



export const WhyChooseUs = () => {
  return (
    <Container>
      <Heading>WHY CHOOSE US?</Heading>

      <Box>
        <Item>
          <Title>50+</Title>
          <Text>YEARS OF EXPERIENCE</Text>
        </Item>

        <Item>
          <Title>1000+</Title>
          <Text>CLIENTS</Text>
        </Item>

        <Item>
          <Title>10+</Title>
          <Text>AWARDS</Text>
        </Item>

        <Item>
          <Title>15+</Title>
          <Text>PARTNERS</Text>
        </Item>
      </Box>

      <Background>
        <SubHeading>WHAT OUR CLIENTS SAY</SubHeading>

        <Description>
          We have had many satisfied customers throughout the years who have used our products and have been happy with the results. Our products have helped clients with their respective scientific material needs.
          <br></br><br></br>
          Take a look at the wealth of testimonials before ordering and be sure to subscribe to our newsletter to never lose out on our latest updates.
        </Description>
      </Background>


    </Container>
  )
}
