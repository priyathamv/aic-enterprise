import React from 'react';
import styled from 'styled-components';

import { device } from '../../utils/viewport';

const Container = styled.div`
  background-color: #FFF;
  height: 200px;
  display: flex;
  align-items: center;
  margin: -100px 10px 30px 10px;

  @media ${device.tablet} {
    margin: -100px 50px 50px 50px;
  }

  @media ${device.laptop} {
    margin: -100px 200px 50px 200px;
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
      <div className='slideshow'>
        <div className='brands-frame'>
          {Array(20).fill().map((cur, index) => <Image key={index} src={`/images/trusted_by/${index+1}.png`} />)}
        </div>
      </div>
    </Container>
  )
}
