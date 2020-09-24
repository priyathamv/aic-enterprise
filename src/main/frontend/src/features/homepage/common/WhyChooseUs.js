import React from 'react';
import styled from 'styled-components';

import { device } from '../../utils/viewport';

const Container = styled.div`
  display: flex;
  background-color: black;
  color: #FFF;
  flex-direction: column;

  @media ${device.laptop} { 
    flex-direction: row;
  }
`;

const Image = styled.img`
  width: 100%;

  @media ${device.laptop} { 
    width: 55vw;
  }
`;

const Content = styled.div`
  // width: 100%;
  padding: 20px;

  @media ${device.tablet} { 
    padding: 40px;
  }
  
  @media ${device.laptop} { 
    width: 45vw;
    padding: 50px;
  }
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 50px;
`;

const Item = styled.div`

`;

const Title = styled.div`
  font-weight: bold;
  letter-spacing: 3px;
  font-size: 16px;
  margin-bottom: 40px;

  @media ${device.laptop} { 
    font-size: 40px;  
  }
`;

const SubHeader = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 15px;

  @media ${device.laptop} { 
    font-size: 14px;  
  }
`;

const Text = styled.div`
  font-size: 12px;

  @media ${device.laptop} { 
    font-size: 18px;
  }
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
