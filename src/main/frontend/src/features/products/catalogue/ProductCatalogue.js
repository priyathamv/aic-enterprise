import React from 'react';
import styled from 'styled-components';

import { device } from '../../utils/viewport';

const Container = styled.div`
  display: flex;
  margin: 50px 20px 50px 20px;
  
  @media ${device.laptop} { 
    margin: 50px 15vw 50px 15vw;
  }
`;

const LeftFrame = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 50px;
`;

const ImageFrame = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ImageGroup = styled.div`
  
`;

const SmallImage = styled.img`
  width: 75px;
  margin: 0 20px 20px 0;
`;

const Image = styled.img`
  width: 300px;
`;

const SizeFrame = styled.div`

`;

const CapacityFrame = styled.div`

`;

const Size = styled.div`
  color: #232162;
  padding: 10px;
  border: 1px solid #CCC;
  border-radius: 3px;
  display: inline-block;
  margin: 0 15px 15px 0;
  cursor: pointer;

  &:hover {
    background-color: #232162;
    color: #FFFFFF;
  }
`;

const SizeBox = styled.div`

`;

const RightFrame = styled.div`
  flex: 2;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 22px;
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 10px;
`;

const Category = styled.div`
  color: #000000a3;
  margin-bottom: 15px;
`;

const Description = styled.div`

`;

const Li = styled.li`
  margin-bottom: 5px;
`;


export const ProductCatalogue = () => {
  return (
    <Container id='product_catalogue_id'>
      <LeftFrame>
        <ImageFrame>
          <ImageGroup>
            <SmallImage src='/images/products/Sorvall-BIOS-A-Centrifuges.jpg'></SmallImage>  
            <SmallImage src='/images/products/Sorvall-Legend-Micro-17-and-21-Microcentrifuge-Series.jpg'></SmallImage>  
          </ImageGroup>
          <Image src='/images/products/Veriti96-Well-Thermal-Cycler.jpg'></Image>
        </ImageFrame>

        <SizeFrame>
          <CapacityFrame>
            <Header>Capacity</Header>
            <Size>100 RPM</Size>
            <Size>200 RPM</Size>
            <Size>300 RPM</Size>
            <Size>400 RPM</Size>
            <Size>500 RPM</Size>
            
            <Header>Size</Header>

            <Size>5 ml</Size>
            <Size>10 ml</Size>
            <Size>25 ml</Size>
            <Size>50 ml</Size>
            <Size>100 ml</Size>
            <Size>150 ml</Size>
            <Size>250 ml</Size>
            <Size>400 ml</Size>
            <Size>500 ml</Size>
            <Size>600 ml</Size>
            <Size>800 ml</Size>
            <Size>1000 ml</Size>
          </CapacityFrame>

          <SizeBox></SizeBox>
        </SizeFrame>
      </LeftFrame>

      <RightFrame>
        <Name>High Speed Centrifuge</Name>
        <Category>Lab Instruments and Equipment</Category>
        <Description>
          For large capacity and high performance, upto 100,605 x g, in a powerful unit that can perform a wide range of research applications, providing a highly reliable platform for downstream BioProcess.<br/><br/>
          For large capacity and high performance, upto 100,605 x g, in a powerful unit that can perform a wide range of research applications, providing a highly reliable platform for downstream BioProcess.
        </Description>

        <ul>
          <Li>Its mouth is smaller in diameter than its base</Li>
          <Li>The Phillips Beaker is ideal for measuring, containment, mixing and decanting</Li>
          <Li>Conical shape (Phillips pattern) with spout</Li>
          <Li>Excellent thermal performance and chemical resistance</Li>
          <Li><i>Approx O.D. x Height mm:</i> 68 x 110</Li>
          <Li><i>Quantity per case:</i> 40</Li>
          <Li><i>Price per piece:</i> Rs 637.00</Li>
        </ul>
      </RightFrame>
    </Container>
  )
}
