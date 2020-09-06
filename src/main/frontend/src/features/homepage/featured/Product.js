import React from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 30px;
`;

const Modal = styled.div`
  padding: 30px;
`;

const Close = styled.a`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  line-height: 20px;
  font-size: 32px;
`;

const ProductFrame = styled.div`
  display: flex;
`;

const ProductImages = styled.div`

`;

const ProductDetails = styled.div`

`;

const ProductName = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 30px;
`;

const QuantityLabel = styled.div`
  margin-bottom: 10px;
`;

const QuantityInput = styled.input`
  display: block;
  font-size: 16px;
  width: 50px;
  height: 25px;
  margin-bottom: 10px;
  text-align: right;
`;

const AddToCart = styled.button`
  background-color: #232162;
  color: #FFF;
  padding: 10px 30px;
  font-weight: bold;
  margin-bottom: 30px;
  border-radius: 5px;
`;

const DescriptionLabel = styled.div`
  text-decoration: underline;
  margin-bottom: 10px;
`;

const Description = styled.div`
  font-size: 14px;
`;


export const Product = ({ productId }) => {
  const products = {
    '1': '/item1.png',
    '2': '/item2.png',
    '3': '/item3.png'
  }
  
  const handleOnClick = () => {}

  return (
    <Container>
      <Image src={products[productId]} />

      <Popup
        trigger={<button className='button-style' onClick={handleOnClick}>BUY NOW</button>}
        modal
      >
        {close => (
          <Modal>
            <Close className="close" onClick={close}>
              &times;
            </Close>
            <ProductFrame>
              <ProductImages>
                <Image src='/item1.png' />
              </ProductImages>

              <ProductDetails>
                <ProductName>1300 SERIES A2 BIOLOGICAL SAFETY CABINET PACKAGES</ProductName>
                <QuantityLabel>Quantity</QuantityLabel>
                <QuantityInput></QuantityInput>
                <AddToCart>ADD TO CART</AddToCart>
                <DescriptionLabel>Description</DescriptionLabel>
                <Description>Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod. Lorem ipsum dolor sit amet, con- tetuer adipiscing elit, sed diam nonummy nibh euismod</Description>
              </ProductDetails>
            </ProductFrame>
          </Modal>
        )}
      </Popup>
    </Container>
  )
}
