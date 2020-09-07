import React from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { QuantityBox } from '../../cart/QuantityBox';


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

const AddToCart = styled.button`
  background-color: #232162;
  color: #FFF;
  padding: 10px 30px;
  font-weight: bold;
  margin-bottom: 30px;
  border-radius: 5px;
  margin-top: 30px;
`;

const DescriptionLabel = styled.div`
  text-decoration: underline;
  margin-bottom: 10px;
`;

const Description = styled.div`
  font-size: 14px;
`;


export const Product = ({ productDetails }) => {

  const handleOnClick = () => {}

  return (
    <Container>
      <Image src={productDetails.imageUrl} />

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
                <Image style={{ marginRight: '20px' }} src={productDetails.imageUrl} />
              </ProductImages>

              <ProductDetails>
                <ProductName>{productDetails.name}</ProductName>
                <QuantityLabel>Quantity</QuantityLabel>
                <QuantityBox />
                <AddToCart>ADD TO CART</AddToCart>
                <DescriptionLabel>Description</DescriptionLabel>
                <Description>{productDetails.description}</Description>
              </ProductDetails>
            </ProductFrame>
          </Modal>
        )}
      </Popup>
    </Container>
  )
}
