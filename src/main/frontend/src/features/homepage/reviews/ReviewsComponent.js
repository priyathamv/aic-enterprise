import React from 'react';
import styled from 'styled-components';

import { ReviewCard } from './ReviewCard';
import { device } from '../../utils/viewport';


const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background-color: #69696970;
  background: url(/images/why_choose_us_reverse.jpg);
  background-repeat: repeat;
  background-size: 100vw auto;
  background-position: 30vw 0;
  opacity: 0.7;
  padding: 150px 20px;
  // height: 600px;

  @media ${device.laptop} { 
    padding: 15vw 17vw;
  }
`;


export const ReviewsComponent = () => {
  return (
    <Container>
      <ReviewCard 
        style={{ marginTop: '-75px' }} 
        rating={5} 
        name='ICAR'
        text='It’s been a  wonderful experience with AIC Enterprises as a distributor of so many molecular biology reagents, chemicals and other diagnostic kits for animal diseases. You have been serving our ICAR-NIVEDI as and when required. Some of the products that you have supplied for our routine service projects are commendable. Keep serving our scientific community for betterment of both animal and human health.'
      />
      <ReviewCard 
        style={{ marginBottom: '-75px' }} 
        rating={5} 
        name='Zumutor Biologics Private Limited'
        text='AIC has always ensured the quality of products, on-time delivery and a very professional business relationship. I am associated with AIC for the past seven years. They have been very prompt and supportive always. AIC has maintained successful strategic sourcing and cost reduction initiatives consistently. They have always valued our working relationship and their customer service.'
      />
    </Container>
  )
}
