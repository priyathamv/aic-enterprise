import React from 'react';
import styled from 'styled-components';

import { Line } from '../common/Line';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { ImQuotesLeft } from 'react-icons/im';
import { device } from '../../utils/viewport';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 100%;
  padding: 50px;
  background-color: #D99107;
  color: #FFF;
  position: relative;
  overflow: hidden;
  margin: 0 20px;
  z-index: 10000;


  @media ${device.laptop} {
    margin-left: 500px;
    margin-top: 100px;
  }
`;

const Triangle = styled.div`
  position: absolute;
  top: -10px;
  left: -25px;
  width: 75px;
  height: 40px;
  transform: rotate(-45deg);
  background: #232162;
`;

const QuotesIcon = styled(ImQuotesLeft)`
  position: absolute;
  top: 8px;
  left: 8px;
  color: #FFF;
  font-size: 13px;
`;

const Quote = styled.div`
  font-size: 32px;
  color: #BE810C;

  @media ${device.laptop} {

  }
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 50px;

  @media ${device.laptop} {
    font-size: 16px;
    line-height: 26px;
    margin-bottom: 30px;
  }
`;

const UserFrame = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const UserName = styled.div`
  font-style: italic;
  font-size: 14px;

  @media ${device.laptop} {
    font-size: 16px;
  }
`;

const Frame = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 50px;
  margin-right: 20px;
  background-color: #FFF;
  border-radius: 100%;
  padding: 5px;
`;

const InnerFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Rating = styled.div`
  display: flex;
`;

const FillStarIcon = styled(AiFillStar)`
  color: #FFF;
`;

const OutlineStarIcon = styled(AiOutlineStar)`
  color: #FFF;
`;

export const ReviewCard = ({ style, text, name, rating, imageUrl }) => {
  return (
    <Container style={style}>
      {/* <Triangle />
      <QuotesIcon /> */}
      <Text>{text}</Text>

      <Frame>
        <Image src={imageUrl}></Image>

        <InnerFrame>
          <Rating>
            {Array(rating).fill().map((_, i) => <FillStarIcon key={i} />)}
            {Array(5 - rating).fill().map((_, i) => <OutlineStarIcon key={i} />)}
          </Rating>

          <UserFrame>
            {/* <UserImage src='/images/aic_logo.png' /> */}
            <UserName>{name}</UserName>
          </UserFrame>
        </InnerFrame>
      </Frame>
    </Container>
  )
}
