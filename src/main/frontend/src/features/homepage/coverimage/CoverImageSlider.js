import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';

import { device } from '../../utils/viewport';

const Container = styled.div`
  background-color: #FFF;
`;

const Image0 = styled.div`
  background-image: url(/images/hans-reniers.jpg);
  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;
  width: 60vw;
  height: 100%;
`;

const Image1 = styled.div`
  background-image: url(/images/hans-reniers.jpg);
  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;
  width: 60vw;
  height: 100%;
`;

const Image2 = styled.div`
  background-image: url(/images/hans-reniers.jpg);
  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;
  width: 60vw;
  height: 100%;
`;

const Button = styled(Link)`
  text-decoration: underline;
  color: #D99107;
  border: none;
  font-size: 14px;
  font-weight: bold;
  margin-left: 30px;

  @media ${device.tablet} {
    font-size: 16px;
    margin-left: 100px;
  }

  @media ${device.laptop} {
    font-size: 24px;
    margin-left: 300px;
  }
`;

const Content = styled.div`
  width: 40vw;
  top: 30px;
  z-index: 10000;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 18px;

  @media ${device.tablet} {
    font-size: 28px;
    margin-bottom: 30px;
  }

  @media ${device.laptop} {
    font-size: 36px;
    margin-bottom: 40px;
  }
`;

const Description = styled.div`
  width: 40vw;
  letter-spacing: 1px;
  margin-bottom: 10px;
  margin-left: 30px;
  font-size: 24px;
  color: #010867;

  @media ${device.tablet} {
    margin-bottom: 20px;
    margin-left: 100px;
    font-size: 34px;
  }

  @media ${device.laptop} {
    margin: -50px 0 40px 300px;
    font-size: 55px;
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
        // interval={500000}
        bullets={false}
        style={ viewportWidth < 1024 ? { height: '378px' } : { height: '700px' }}
      >
        <div className='cover-image'>
          <Content>
            {/* <Title>Efficient Customer Service</Title> */}
            <Description>Your one-stop-destination for all the scienfic requisites.</Description>
            <Button to='/about-us' >EXPLORE &#62;</Button>
          </Content>

          <Image0 />
        </div>

        {/* <div className='cover-image'>
          <Content>
            <Title>On time delivery</Title>
            <Description>"Our strong and robust supply chain network supports us in ensuring that deliveries are on time and as per the needs of our customers."</Description>
            <Button to='/contact-us' >EXPLORE</Button>
          </Content>

          <Image1 />
        </div>

        <div className='cover-image'>
          <Content>
            <Title>Wide range of products</Title>
            <Description>"AIC: Your one-stop-destination for all the scientific requisites. We are one of the prominent distributors of all scientific needs across the verticals of chemicals, life science, instruments and much more!"</Description>
            <Button to='/products' >EXPLORE</Button>
          </Content>

          <Image2 />
        </div> */}
      </AutoplaySlider>
    </Container>
  )
}
