import React from 'react';
import styled from 'styled-components';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';

import { device } from '../../utils/viewport';

const Container = styled.div`
  background-color: #FFF;
  margin-bottom: 20px;

  @media ${device.laptop} { 
    margin-bottom: 50px;
  }
`;

const Image = styled.img`
  width: 100vw;
`;

const Button = styled.a`
  text-decoration: none;
  color: black;
  border: 1px solid black;
  padding: 10px;
  font-size: 16px;
  
  @media ${device.laptop} { 
    padding: 15px 30px;
    font-size: 16px;
  }
`;

const Content = styled.div`
  position: absolute;
  left: 50vw;
  top: 30px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 36px;
  margin-bottom: 40px;
`;

const Description = styled.div`
  width: 40vw;
  letter-spacing: 1px;
  margin-bottom: 40px;
  font-size: 20px;
  
  @media ${device.laptop} { 
    margin-bottom: 80px;
    font-size: 16px;
    font-weight: bold;
  }
`;

const AutoplaySlider = withAutoplay(AwesomeSlider);

export const CoverImageSlider = () => {

  const viewportWidth = window.outerWidth;

  return (
    <Container id='cover_image_slider_id'>
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={5000}
        bullets={false}
        style={ viewportWidth < 1024 ? { height: '378px' } : { height: '450px' }}
      >
        <div className='cover-image'>
          <Image src="/images/cover_image1.png" />

          <Content>
            <Title>Efficient Customer Service</Title>
            <Description>"With our qualified team, prompt responses to enquiries and a personalised touch added to our services, we are widely known for our quality of services provided over the past few decades."</Description>
            <Button href='/about-us' >EXPLORE</Button>
          </Content>
        </div>
        
        <div className='cover-image'>
          <Image src="/images/cover_image2.png" />
          
          <Content>
            <Title>On time delivery</Title>
            <Description>"Our strong and robust supply chain network supports us in ensuring that deliveries are on time and as per the needs of our customers."</Description>
            <Button href='/contact-us' >EXPLORE</Button>
          </Content>
        </div>

        <div className='cover-image'>
          <Image src="/images/cover_image0.png" />
          <Content>
            <Title>Wide range of products</Title>
            <Description>"AIC: Your one-stop-destination for all the scientific requisites. We are one of the prominent distributors of all scientific needs across the verticals of chemicals, life science, instruments and much more!"</Description>
            <Button href='/products' >EXPLORE</Button>
          </Content>
        </div>
      </AutoplaySlider>
    </Container>
  )
}
