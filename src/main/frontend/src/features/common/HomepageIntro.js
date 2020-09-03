import React from 'react';
import styled from 'styled-components';
import { Line } from './Line';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 100px 50px;
`;

const Intro = styled.div`
  font-weight: bold;
  color: #000000ab;
  margin-bottom: 15px;
  letter-spacing: 2px;
  text-align: center;
  padding: 0 15vw;
`;

const Title = styled.div`
  color: #232162;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const SubTitle = styled.div`
  font-weight: bold;
  color: #000000ab;
  margin-bottom: 40px;
  letter-spacing: 2px;
`;

const ContentFrame = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 30vw;
  height: 16vw;
  margin-right: 75px;
`;

const Content = styled.div`
  width: 30vw;
  font-size: 14px;
  line-height: 25px;
`;


export const HomepageIntro = () => {
  return (
    <Container>
      <Intro>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
      </Intro>

      <Line style={{ width: '120px', height: '2px', backgroundColor: 'black', marginBottom: '50px' }} />

      <Title>AIC Enterprises</Title>
      
      <SubTitle>
        Wide Product Range | Efficient Customer Service | Wide Accessibility | In - Time Delivery | Qualified Technical Support
      </SubTitle>

      <ContentFrame>
        <Image src='/key_benefits.png' />
        
        <Content>
          We at AIC are devoted to contributing and serving the scientific community across the country by being a one-stop solution for all the laboratory requisites. Good quality products, a diversified product range, customer satisfaction, on-time deliveries and value addition to the stakeholders associated with us, has been our strength for the past six decades and we will continue to build on the same in the years to come. “Serving the Science” is our motto and are proud to be a part of the same
        </Content>
      </ContentFrame>
      
    </Container>
  )
}
