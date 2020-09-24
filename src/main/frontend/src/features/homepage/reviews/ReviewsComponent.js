import React from 'react';
import styled from 'styled-components';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import { ReviewCard } from './ReviewCard';


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
  padding: 20px 0;
`;

const BlankReview = styled.div`
  width: 300px;
`;

const reviews = [
  {
    'name': 'ICAR',
    'text': 'It\'s been a  wonderful experience with AIC Enterprises as a distributor of so many molecular biology reagents, chemicals and other diagnostic kits for animal diseases. You have been serving our ICAR-NIVEDI as and when required. Some of the products that you have supplied for our routine service projects are commendable. Keep serving our scientific community for betterment of both animal and human health.',
    'rating': 5
  },
  {
    'name': 'Zumutor Biologics Private Limited',
    'text': 'AIC has always ensured the quality of products, on-time delivery and a very professional business relationship. I am associated with AIC for the past seven years. They have been very prompt and supportive always. AIC has maintained successful strategic sourcing and cost reduction initiatives consistently. They have always valued our working relationship and their customer service.',
    'rating': 5
  },
  {
    'name': 'Zumutor Biologics Private Limited',
    'text': 'AIC has always ensured the quality of products, on-time delivery and a very professional business relationship. I am associated with AIC for the past seven years. They have been very prompt and supportive always. AIC has maintained successful strategic sourcing and cost reduction initiatives consistently. They have always valued our working relationship and their customer service.',
    'rating': 5
  }
]

export const ReviewsComponent = () => {
  return (
    <Container>
      <AwesomeSlider className='reviews-slider'>
        {reviews
          .map((curReview, index) => index % 2 === 0 ? index : null)
          .filter(index => index !== null)
          .map(indexOf2 => 
            <div key={indexOf2} className='reviews-frame'>
              {
                Array(2).fill()
                  .map((_, i) => {
                    const curIndex = indexOf2 + i;
                    return curIndex < reviews.length ? 
                    <ReviewCard 
                      key={curIndex}
                      style={curIndex % 2 === 0 ? { marginTop: '-75px' } : { marginBottom: '-75px' }} 
                      rating={reviews[curIndex].rating} 
                      name={reviews[curIndex].name}
                      text={reviews[curIndex].text}
                    /> : 
                      <BlankReview key={curIndex} />;
                  })
              }
            </div>
          )}
      </AwesomeSlider>
    </Container>
  )
}
