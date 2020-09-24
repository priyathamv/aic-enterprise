import React from 'react'
import styled from 'styled-components';

import { RiArrowRightSLine } from 'react-icons/ri';
import { device } from '../../utils/viewport';

const Container = styled.div`
  display: flex;
  background-color: black;
  color: #FFF;
  margin-bottom: 150px;
  flex-direction: column;

  @media ${device.laptop} { 
    flex-direction: row;
  }
`;

const Image = styled.img`
  width: 100%;

  @media ${device.laptop} { 
    width: 45vw;
  }
`;

const Content = styled.div`
  // width: 100%;
  padding: 20px;

  @media ${device.tablet} { 
    padding: 40px;
  }
  
  @media ${device.laptop} { 
    width: 55vw;
    padding: 50px 100px;
  }
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 50px;
`;

const ArrowIcon = styled(RiArrowRightSLine)`
  color: #FFF;
  font-size: 40px;
  margin-right: 15px;
`;

const Item = styled.div`
  display: flex;
  letter-spacing: 1px;
`;


const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 3px;

  @media ${device.laptop} { 
    font-size: 40px;  
  }
`;

const Text = styled.div`
  font-size: 32px;

  @media ${device.laptop} { 
    font-size: 18px;
  }
`;


export const KeyBenefits = () => {
  const viewportWidth = window.outerWidth;

  return (
    <Container>
      {viewportWidth < 1024 && <Image src='/images/key_benefits.jpg' />}

      <Content>
        <Title style={{ marginBottom: '50px' }}>KEY BENEFITS?</Title>
        <Box>
          <Item>
            <ArrowIcon size='1em' style={{ marginTop: '-7px' }} />
            <Text>Individual consultation and in-time delivery</Text>
          </Item>

          <Item>
            <ArrowIcon size='0.7em' />
            <Text>Well connected dealer network</Text>
          </Item>

          <Item>
            <ArrowIcon size='1.7em' style={{ marginTop: '-22px' }} />
            <Text>Dedicated marketing and sales network to fulfill customers every requirement</Text>
          </Item>

          <Item>
            <ArrowIcon size='0.9em' style={{ marginTop: '-7px' }} />
            <Text>Individual consultation and in-time delivery</Text>
          </Item>
        </Box>
      </Content>

      {viewportWidth >= 1024 && <Image src='/images/key_benefits.jpg' />}
    </Container>
  )
}
