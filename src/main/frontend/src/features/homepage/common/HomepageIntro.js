import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 100px 50px;
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
  height: 40vh;
  margin-right: 75px;
  object-fit: cover;
`;

const Content = styled.div`
  width: 30vw;
  font-size: 14px;
  line-height: 25px;
`;


export const HomepageIntro = () => {
  return (
    <Container>
      <Title>AIC Enterprises</Title>
      
      <SubTitle>
        Wide Product Range | Efficient Customer Service | Wide Accessibility | In - Time Delivery | Qualified Technical Support
      </SubTitle>

      <ContentFrame>
        <Image src='/images/intro.jpg' />
        
        <Content>
          We at AIC are devoted to contributing and serving the scientific community across the country by being a one-stop solution for all the laboratory requisites. Good quality products, a diversified product range, customer satisfaction, on-time deliveries and value addition to the stakeholders associated with us, has been our strength for the past six decades and we will continue to build on the same in the years to come. “Serving the Science” is our motto and are proud to be a part of the same
        </Content>
      </ContentFrame>
      
    </Container>
  )
}
