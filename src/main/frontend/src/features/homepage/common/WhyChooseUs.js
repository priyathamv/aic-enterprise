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
  padding: 40px 20px;

  @media ${device.tablet} { 
    padding: 80px 40px;
  }
  
  @media ${device.laptop} { 
    width: 45vw;
    padding: 100px 50px;
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
  letter-spacing: 1px;
  font-size: 16px;
  margin-bottom: 10px;

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
          <ItemComponent title='50+' text='Years of Experiance' />

          <ItemComponent title='1K+' text='Happy Clients' />

          <ItemComponent title='10+' text='Awards' />

          <ItemComponent title='15+' text='Partners' />
        </Box>
      </Content>
    </Container>
  )
}
