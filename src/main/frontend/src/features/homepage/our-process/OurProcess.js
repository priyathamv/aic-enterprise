import React from 'react';
import styled from 'styled-components';

import { device } from '../../utils/viewport';
import { ReactComponent as SearchSvg } from './search.svg';
import { ReactComponent as FillSvg } from './fill.svg';
import { ReactComponent as ReceiptSvg } from './receipt.svg';
import { ReactComponent as ArrowSvg } from './arrow.svg';

const Container = styled.div`
  margin: 0 10px 20px 10px;

  @media ${device.tablet} {
    margin: 0 50px 50px 50px;
  }

  @media ${device.laptop} {
    margin: 0 200px 100px 200px;
  }

  @media ${device.laptop15} {
    margin: 0 200px 100px 200px;
  }
`;

const Title = styled.div`
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

const SubTitle = styled.div`
  color: #888888;
  text-align: center;
  margin-bottom: 50px;
  font-size: 18px;
  line-height: 26px;
  padding: 0 10px

  @media ${device.tablet} {
    padding: 0 20px;
  }

  @media ${device.laptop} {
    // padding: 0 250px;
  }
`;

const Frame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  @media ${device.tablet} {
    margin-bottom: 20px;
  }

  @media ${device.laptop} {
    margin-bottom: 50px;
  }
`;

const Text = styled.div`
  flex: 2;
  color: #4D4D4D;
  font-size: 18px;
  line-height: 26px;
`;

const Blank = styled.div`
  flex: 1;
`;

const SearchIcon = styled(SearchSvg)`
  flex: 2;
`;

const FillIcon = styled(FillSvg)`
  flex: 2;
`;

const ReceiptIcon = styled(ReceiptSvg)`
  flex: 2;
`;

const ArrowIcon = styled(ArrowSvg)`
  flex: 1;
`;

export const OurProcess = () => {
  return (
    <Container>
      <Title>Our Process</Title>

      <SubTitle>The success of any project hinges on the process that moves it forward. A consistent process leads to consistent results, quality, and business growth. While every client we work with has its own unique requirement, we follow the same process to ensure the best possible results. A simple 3 step process for all our clients.</SubTitle>

      <Frame>
        <SearchIcon />
        <ArrowIcon />
        <FillIcon />
        <ArrowIcon />
        <ReceiptIcon />
      </Frame>

      <Frame style={{ alignItems: 'flex-start' }}>
        <Text>Search through our wide range of products. AIC Group poses over One Lakh products.</Text>
        <Blank />
        <Text>Fill our enquiry form with the details of the products that you wish to place an order for.</Text>
        <Blank />
        <Text>On receipt of your enquiry, our back end team will promptly connect with you and respond with the required details.</Text>
      </Frame>

    </Container>
  );
}