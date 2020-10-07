import React from 'react';
import styled from 'styled-components';

import { device } from '../../utils/viewport';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 40px;

  @media ${device.laptop} { 
    padding: 100px 50px;
  }
`;

const Title = styled.div`
  color: #232162;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  
  @media ${device.laptop} { 
    font-size: 32px;
    margin-bottom: 40px;
  }
`;

const SubTitle = styled.div`
  font-weight: bold;
  color: #000000ab;
  margin-bottom: 20px;
  font-size: 14px;
  letter-spacing: 1px;

  @media ${device.tablet} { 
    font-size: 16px;
    margin-bottom: 40px;
  }
`;

const ContentFrame = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  
  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const Image = styled.img`
  width: 100%;
  margin: 0 0 20px 0;

  @media ${device.laptop} {
    width: 30vw;
    margin: 0 75px 0 0;
  }
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 24px;

  @media ${device.laptop} {
    width: 30vw;
    font-size: 18px;
  }
`;


export const HomepageIntro = () => {
  return (
    <Container>
      <Title>AIC Group</Title>
      
      <SubTitle>
        Wide Product Range | Efficient Customer Service | Wide accessibility through branches | In - Time Delivery | Qualified Technical Support
      </SubTitle>

      <ContentFrame>
        <Image src='/images/intro.jpg' alt='AIC Intro'/>
        
        <Content>
          We at AIC are devoted to contributing and serving the scientific community across the country by being a one-stop solution for all the laboratory requisites. Good quality products, a diversified product range, customer satisfaction, on-time deliveries and value addition to the stakeholders associated with us, has been our strength for the past six decades and we continue to build on the same in the years to come. "Serving the Science" is our motto and are proud to be a part of the same.
        </Content>
      </ContentFrame>
      
    </Container>
  )
}
