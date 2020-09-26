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
            <Description>Our Team at AIC is dutifully bound to the service-based work culture wherein bestowing the best solutions to customers is the penultimate priority.</Description>
            <Button href='/about-us' >EXPLORE</Button>
          </Content>
        </div>
        
        <div className='cover-image'>
          <Image src="/images/cover_image2.png" />
          
          <Content>
            <Title>On time delivery</Title>
            <Description>"Time is Money" - AIC values the same. Our strong network across the supply chain system leverages our business with prompt deliverables across the country and beyon</Description>
            <Button href='/contact-us' >EXPLORE</Button>
          </Content>
        </div>

        <div className='cover-image'>
          <Image src="/images/cover_image0.png" />
          <Content>
            <Title>Wide Range of Products</Title>
            <Description>"AIC: Your one-stop-destination for all the Bioscience requisites."<br />We are India’s leading distributor of Micro Infrastructural Equipment across the verticals of Chemicals, Pharmaceuticals, Biomedical and Agro & Life Science Laboratory.</Description>
            <Button href='/products' >EXPLORE</Button>
          </Content>
        </div>
      </AutoplaySlider>
    </Container>
  )
}
