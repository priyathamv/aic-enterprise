import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 40vw;
`;

const BlueBg = styled.div`
  flex: 2;
  background-color: #232162;
`;

const AuthorFrame = styled.div`
  flex: 3;
  padding: 75px 40px;
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
  return (
    <Container style={style}>
      <BlueBg>&nbsp;</BlueBg>

      <AuthorFrame>
        <Name>{name}</Name>

        <Designation>{designation}</Designation>

        <AboutMe>{aboutMe}</AboutMe>
      </AuthorFrame>
    </Container>
  )
}
