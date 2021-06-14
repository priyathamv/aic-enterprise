import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { device } from '../../utils/viewport';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;

  @media ${device.laptop} {
    flex-direction: row;
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

const ContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: flex-start;

  @media ${device.laptop} {
    padding-left: 100px;
    width: 50vw;
  }
`;

const Image = styled.img`
  width: 100%;

  @media ${device.laptop} {
    width: 60vw;
  }
`;

const KnowMore = styled(Link)`
  color: #D99107;
  font-size: 20px;
`;

const Content = styled.div`
  line-height: 28px;
  margin-bottom: 40px;

  @media ${device.laptop} {
    width: 30vw;
    font-size: 22px;
  }
`;


export const HomepageIntro = () => {
  return (
    <Container>
      <Image src='/images/why_choose_us.jpg' alt='About us' />

      <ContentFrame>
        <Title>ABOUT US</Title>

        <Content>
          We at AIC are devoted to contributing and serving the scientific community across the country by being a one-stop solution for all the laboratory requisites. Good quality products, a diversified product range, customer satisfaction, on-time deliveries and value addition to the stakeholders associated with us, has been our strength for the past six decades and we continue to build on the same in the years to come. "Serving the Science" is our motto and are proud to be a part of the same.
        </Content>

        <KnowMore to='/about-us'>KNOW MORE &#62;</KnowMore>
      </ContentFrame>

    </Container>
  )
}
