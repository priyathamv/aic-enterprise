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
    'text': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever',
    'rating': 5
  }
  // ,
  // {
  //   'name': 'IISC',
  //   'text': 'Thanks for your support. With AIC, I like their professionalism. The quotations and products are delivered quickly. The representatives are very helpful and reasonable.',
  //   'rating': 5
  // },
  // {
  //   'name': 'ICAR',
  //   'text': 'It\'s been a  wonderful experience with AIC Enterprises as a distributor of so many molecular biology reagents, chemicals and other diagnostic kits for animal diseases. You have been serving our ICAR-NIVEDI as and when required. Some of the products that you have supplied for our routine service projects are commendable. Keep serving our scientific community for the betterment of both animal and human health.',
  //   'rating': 5
  // }
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
