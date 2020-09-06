import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  background-color: #FFF;
  height: 200px;
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  width: 30vw;
  color: #232162;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
`;

const Image = styled.img`
  width: 15vw;
`;


export const TrustedBy = () => {
  return (
    <Container>
      <Label>Trusted by</Label>

      <div className='slideshow'>
        <div className='brands-frame'>
          <Image src="/images/trusted_by1.png" />
          <Image src="/images/trusted_by2.png" />
          <Image src="/images/trusted_by3.png" />
          <Image src="/images/trusted_by4.png" />
          <Image src="/images/trusted_by5.png" />
          <Image src="/images/trusted_by1.png" />
          <Image src="/images/trusted_by2.png" />
          <Image src="/images/trusted_by3.png" />
          <Image src="/images/trusted_by4.png" />
          <Image src="/images/trusted_by5.png" />
          <Image src="/images/trusted_by1.png" />
          <Image src="/images/trusted_by2.png" />
          <Image src="/images/trusted_by3.png" />
          <Image src="/images/trusted_by4.png" />
          <Image src="/images/trusted_by5.png" />
        </div>
      </div>
    </Container>
  )
}
