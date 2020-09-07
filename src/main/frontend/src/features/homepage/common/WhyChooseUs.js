import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  background-color: black;
  color: #FFF;
`;

const Image = styled.img`
  width: 55vw;
  object-fit: cover;
`;

const Content = styled.div`
  width: 45vw;
  padding: 50px;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 3px;
`;

const Box = styled.div`
  width: 10vw;
  height: 400px;
  display: grid;
  grid-template-columns: 10vw 200px;
  grid-row: auto auto;
  grid-column-gap: 100px;
  grid-row-gap: 20px;
`;

const Item = styled.div`

`;

const SubHeader = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
`;

const Text = styled.div`
  font-size: 14px;
`;

const ItemComponent = ({ title, subHeader, text }) => (
  <Item>
    <Title>{title}</Title>
    <SubHeader>{subHeader}</SubHeader>
    <Text>{text}</Text>
  </Item>
)

export const WhyChooseUs = () => {
  return (
    <Container>
      <Image src='/images/why_choose_us.jpg' />

      <Content>
        <Title style={{ marginBottom: '50px' }}>WHY CHOOSE US?</Title>
        
        <Box>
          <ItemComponent title='50+' subHeader='Years of Experiance' text='Lorem ipsum dolor sit amet, consec-' />

          <ItemComponent title='1K+' subHeader='Happy Clients' text='Lorem ipsum dolor sit amet, consec-' />

          <ItemComponent title='50+' subHeader='Years of Experiance' text='Lorem ipsum dolor sit amet, consec-' />

          <ItemComponent title='1K+' subHeader='Happy Clients' text='Lorem ipsum dolor sit amet, consec-' />
        </Box>
      </Content>
    </Container>
  )
}
