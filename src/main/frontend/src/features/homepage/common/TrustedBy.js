import React from 'react';
import styled from 'styled-components';

import { device } from '../../utils/viewport';

const Container = styled.div`
  background-color: #FFF;
  height: 200px;
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  width: 30vw;
  color: #232162;
  font-weight: bold;
  text-align: center;
  margin: 0 10px;

  @media ${device.laptop} { 
    font-size: 26px;  
  }
`;

const Image = styled.img`
  width: 30vw;

  @media ${device.laptop} { 
    width: 15vw;
  }
`;


export const TrustedBy = () => {
  return (
    <Container>
      <Label>Trusted by</Label>

      <div className='slideshow'>
        <div className='brands-frame'>
          {Array(20).fill().map((cur, index) => <Image key={index} src={`/images/trusted_by/${index+1}.png`} />)}
        </div>
      </div>
    </Container>
  )
}
