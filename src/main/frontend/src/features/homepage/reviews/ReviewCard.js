import React from 'react';
import styled from 'styled-components';
import { Line } from '../common/Line';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { ImQuotesLeft } from 'react-icons/im';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 40px;
  background-color: #FFF;
  position: relative;
  overflow: hidden;
  height: 230px;
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
`;

const UserFrame = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const UserImage = styled.img`
  width: 40px;
  margin-right: 20px;
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

export const ReviewCard = ({ style, text, rating }) => {
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
        <UserImage src='/aic_logo.png' />
        <UserName>IISC</UserName>
      </UserFrame>
    </Container>
  )
}
