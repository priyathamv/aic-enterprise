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
  background: url(/images/testimonials.png);
  background-repeat: no-repeat;
  background-size: 100vw auto;
  padding: 20px 0;
  height: 300px;
`;

const BlankReview = styled.div`
  width: 300px;
`;

const reviews = [
  {
    'name': 'Zumutor Biologics Private Limited',
    'text': 'AIC has always ensured the quality of products, on-time delivery and a very professional business relationship. I am associated with AIC for the past seven years. They have been very prompt and supportive always. AIC has maintained successful strategic sourcing and cost reduction initiatives consistently. They have always valued our working relationship and their customer service.',
    'rating': 5,
    'imageUrl': '/images/zumutor.jpeg'
  }
  ,
  {
    'name': 'IISC',
    'text': 'Thanks for your support. With AIC, I like their professionalism. The quotations and products are delivered quickly. The representatives are very helpful and reasonable.',
    'rating': 5,
    'imageUrl': '/images/iisc.png'
  },
  {
    'name': 'ICAR',
    'text': 'It\'s been a  wonderful experience with AIC Enterprises as a distributor of so many molecular biology reagents, chemicals and other diagnostic kits for animal diseases. You have been serving our ICAR-NIVEDI as and when required. Some of the products that you have supplied for our routine service projects are commendable. Keep serving our scientific community for the betterment of both animal and human health.',
    'rating': 5,
    'imageUrl': '/images/icar.jpeg'
  }
];

const viewportWidth = window.outerWidth;
// const noOfItemsPerSlide = viewportWidth >= 1024 ? 2 : 1;
const noOfItemsPerSlide = 1;

export const ReviewsComponent = () => {
  return (
    <Container>
      <AwesomeSlider className='reviews-slider' bullets={false}>
        {reviews
          .map((curReview, index) => index % noOfItemsPerSlide === 0 ? index : null)
          .filter(index => index !== null)
          .map(indexOf2 =>
            <div key={indexOf2} className='reviews-frame'>
              {
                Array(noOfItemsPerSlide).fill()
                  .map((_, i) => {
                    const curIndex = indexOf2 + i;
                    return curIndex < reviews.length ?
                    <ReviewCard
                      key={curIndex}
                      // style={curIndex % noOfItemsPerSlide === 0 ? { marginTop: '300px' } : null}
                      rating={reviews[curIndex].rating}
                      name={reviews[curIndex].name}
                      text={reviews[curIndex].text}
                      imageUrl={reviews[curIndex].imageUrl}
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
