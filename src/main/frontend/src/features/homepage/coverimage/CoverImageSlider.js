import React from 'react';
import styled from 'styled-components';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import { Button } from '../common/Button';

const Container = styled.div`

`;

const Image = styled.img`
  width: 100vw;
`;


const buttonStyle = { 
  position: 'absolute', 
  marginLeft: '200px'
}

const AutoplaySlider = withAutoplay(AwesomeSlider);

export const CoverImageSlider = () => {
  const handleOnClick = () => {}

  return (
    <Container id='cover_image_slider_id'>
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={400000}
        bullets={false}
        style={{ height: '500px' }}
      >
        <div className='cover-image'>
          <Image src="/images/cover_image0.png" />
          <Button style={buttonStyle} label='LEARN MORE' handleOnClick={handleOnClick}/>
        </div>
        <div className='cover-image'>
          <Image src="/images/cover_image1.png" />
          <Button style={buttonStyle} label='LEARN MORE' handleOnClick={handleOnClick}/>
        </div>
        <div className='cover-image'>
          <Image src="/images/cover_image2.png" />
          <Button style={buttonStyle} label='LEARN MORE' handleOnClick={handleOnClick}/>
        </div>
      </AutoplaySlider>
    </Container>
  )
}
