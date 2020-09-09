import React, { useState } from 'react'
import styled from 'styled-components';

import { CategoryFrame } from './CategoryFrame';


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F2F2F2;
  color: #232162;
  border-radius: 40px;
  padding: 20px 40px;
  cursor: pointer;
`;


const Data = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
`;


const Image = styled.img`
  max-width: 150px;
  max-height: 150px;
`;


export const Category = ({ categoryDetails }) => {
  const bgStyle = {
    color: '#232162',
    backgroundColor: '#F2F2F2'
  }
  const bgStyleAlt = {
    color: '#F2F2F2',
    backgroundColor: '#232162'
  }


  const [imageUrl, setImageUrl] = useState(categoryDetails.imageUrl);
  const [catStyle, setCatStyle] = useState(bgStyle);

  const handleOnMouseEnter = () => {
    setCatStyle(bgStyleAlt);
    setImageUrl(categoryDetails.imageUrlAlt)
  }

  const handleOnMouseLeave = () => {
    setCatStyle(bgStyle);
    setImageUrl(categoryDetails.imageUrl)
  }

  return (
    <Container style={catStyle} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} >
      <Data>
        <Name>{categoryDetails.name}</Name>
        {categoryDetails.brands.map((curBrand, index) => <CategoryFrame key={index} name={curBrand.name} desc={curBrand.description} />)}
      </Data>

      <Image src={imageUrl} />
    </Container>
  )
}
