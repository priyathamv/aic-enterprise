import React from 'react';
import styled from 'styled-components';

import { ReviewCard } from './ReviewCard';


const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 15vw 17vw;
  background-color: #69696970;
  background: url(/images/why_choose_us_reverse.jpg);
  background-repeat: repeat;
  background-size: 100vw auto;
  background-position: 30vw 0;
  opacity: 0.7;
`;


export const ReviewsComponent = () => {
  return (
    <Container>
      <ReviewCard 
        style={{ marginTop: '-75px' }} 
        rating={3} 
        text='Thanks for your support. With AIC, I like their professionalism. The quotations and products are delivered quickly. The representatives are very helpful and reasonable.'
      />
      <ReviewCard 
        style={{ marginBottom: '-75px' }} 
        rating={4} 
        text='Thanks for your support. With AIC, I like their professionalism. The quotations and products are delivered quickly. The representatives are very helpful and reasonable.'
      />
    </Container>
  )
}
