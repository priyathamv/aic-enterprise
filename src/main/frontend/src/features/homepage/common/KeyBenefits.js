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
  padding: 40px 20px;

  @media ${device.tablet} { 
    padding: 80px 40px;
  }
  
  @media ${device.laptop} { 
    width: 55vw;
    padding: 100px 50px;
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
`;


const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;

  @media ${device.laptop} { 
    font-size: 40px;  
  }
`;

const Text = styled.div`
  font-size: 16px;

  @media ${device.laptop} { 
    font-size: 18px;
  }
`;


export const KeyBenefits = () => {
  const viewportWidth = window.outerWidth;

  return (
    <Container>
      {viewportWidth < 1024 && <Image src='/images/key_benefits.jpg' alt='Key Benefits'/>}

      <Content>
        <Title style={{ marginBottom: '30px' }}>KEY BENEFITS?</Title>
        <Box>
          <Item>
            <ArrowIcon size='1em' style={{ marginTop: '-7px' }} />
            <Text>Individual consultation and on-time delivery</Text>
          </Item>

          <Item>
            <ArrowIcon size='0.7em' />
            <Text>Well connected dealer network</Text>
          </Item>

          <Item>
            <ArrowIcon size='1.7em' style={{ marginTop: '-22px' }} />
            <Text>Dedicated marketing team and a broad sales network to cater to and fulfil all your requirements</Text>
          </Item>

          <Item>
            <ArrowIcon size='0.9em' style={{ marginTop: '-7px' }} />
            <Text>Broad and diversified products range</Text>
          </Item>
        </Box>
      </Content>

      {viewportWidth >= 1024 && <Image src='/images/key_benefits.jpg' alt='Key Benefits' />}
    </Container>
  )
}
