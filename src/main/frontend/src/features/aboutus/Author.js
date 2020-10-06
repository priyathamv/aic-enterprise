import React from 'react';
import styled from 'styled-components';

import { device } from '../utils/viewport';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 375px;
  
  @media ${device.tablet} {
    height: 375px;
    align-self: center;
    flex: 2;
  }
  
  @media ${device.laptop} {
    flex: 1;
    height: 100%;
  }
`;

const AuthorImg = styled.div`
  background-image: url(/images/bn_kapila.jpeg);
  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;
  width: 100%;
  height: 100%;
`;

const AuthorFrame = styled.div`
  flex: 4;
  padding: 30px;
  background-color: #F2F4F3;
`;

const Name = styled.div`
  color: #424242;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Designation = styled.div`
  color: #232162;
  margin-bottom: 10px;
  font-size: 14px;
`;

const AboutMe = styled.div`
  color: #6E6E6E;
  line-height: 28px;
`;


export const Author = ({ style, name, designation, aboutMe }) => {
  const createMarkup = () => {
    return { __html: aboutMe };
  };

  return (
    <Container style={style}>
      <ImgContainer>
        <AuthorImg />
      </ImgContainer>

      <AuthorFrame>
        <Name>{name}</Name>

        <Designation>{designation}</Designation>

        <AboutMe dangerouslySetInnerHTML={createMarkup()}></AboutMe>
      </AuthorFrame>
    </Container>
  )
}
