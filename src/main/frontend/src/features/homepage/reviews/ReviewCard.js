import React from 'react';
import styled from 'styled-components';

import { Line } from '../common/Line';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { ImQuotesLeft } from 'react-icons/im';
import { device } from '../../utils/viewport';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100%;
  padding: 30px;
  background-color: #FFF;
  position: relative;
  overflow: hidden;
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

const Text = styled.div`
  line-height: 27px;
  margin-bottom: 10px;
  color: #000000a3;
  font-size: 24px;
  
  @media ${device.laptop} { 
    font-size: 14px;
  }
`;

const UserFrame = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const UserName = styled.div`
  font-style: italic;
`;

const Rating = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const FillStarIcon = styled(AiFillStar)`
  color: #ff8100;
`;

const OutlineStarIcon = styled(AiOutlineStar)`
  color: #ff8100;
`;

export const ReviewCard = ({ style, text, name, rating }) => {
  return (
    <Container style={style}>
      <Triangle />
      <QuotesIcon />
      <Text>{text}</Text>

      <Rating>
        {Array(rating).fill().map((_, i) => <FillStarIcon key={i} />)}
        {Array(5 - rating).fill().map((_, i) => <OutlineStarIcon key={i} />)}
      </Rating>

      <Line />

      <UserFrame>
        {/* <UserImage src='/images/aic_logo.png' /> */}
        <UserName>{name}</UserName>
      </UserFrame>
    </Container>
  )
}
