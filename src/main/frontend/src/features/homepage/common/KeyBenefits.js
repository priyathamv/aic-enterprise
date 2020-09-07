import React from 'react'
import styled from 'styled-components';

import { RiArrowRightSLine } from 'react-icons/ri';

const Container = styled.div`
  display: flex;
  background-color: black;
  color: #FFF;
  margin-bottom: 175px;
`;

const Image = styled.img`
  width: 45vw;
  object-fit: cover;
`;

const Content = styled.div`
  width: 55vw;
  padding: 50px 100px;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 3px;
`;

const Box = styled.div`
  width: 20vw;
  height: 300px;
  display: grid;
  grid-template-columns: 20vw 300px;
  grid-row: auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

const ArrowIcon = styled(RiArrowRightSLine)`
  color: #FFF;
  font-size: 40px;
  margin-right: 15px;
`;

const Item = styled.div`
  display: flex;
  letter-spacing: 1px;
  object-fit: cover;
`;

const Text = styled.div`
  font-size: 18px;
`;


export const KeyBenefits = () => {
  return (
    <Container>
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

      <Image src='/images/key_benefits.jpg' />
    </Container>
  )
}
