import React from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { QuantityBox } from '../../cart/QuantityBox';
import { device } from '../../utils/viewport';


const PopupImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;

  @media ${device.tablet} { 
    width: 300px;
    height: 300px;
    margin-right: 20px;
  }

  @media ${device.laptop} { 
    // width: 300px;
    // height: 300px;
    // margin-right: 20px;
    margin-bottom: 20px;
  }
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
  flex-direction: column;

  @media ${device.tablet} { 
    flex-direction: row;
  }
`;

const ProductImages = styled.div`

`;

const ProductDetails = styled.div`

`;

const ProductName = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
  
  @media ${device.tablet} { 
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const QuantityLabel = styled.div`
  margin-bottom: 10px;
`;

const AddToCart = styled.button`
  background-color: #232162;
  color: #FFF;
  padding: 12px 30px;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
`;

const DescriptionLabel = styled.div`
  text-decoration: underline;
  margin-bottom: 10px;
`;

const Description = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
`;

export const ProductPopup = ({ label, productDetails, quantity, setQuantity, handleAddToCart }) => {
  return (
    <Popup
      className='my-popup'
      nested={true}
      trigger={<button className='button-style' >{label}</button>}
      onClose={() => setQuantity(1)}
      modal
    >
      {close =>
        <Modal>
          <Close className="close" onClick={close}>&times;</Close>

          <ProductFrame>
            <ProductImages>
              <PopupImage src={productDetails.imageUrl} />
            </ProductImages>

            <ProductDetails>
              <ProductName>{productDetails.name}</ProductName>

              <DescriptionLabel>Description</DescriptionLabel>
              
              <Description>{productDetails.description}</Description>

              <QuantityLabel>Quantity</QuantityLabel>
              
              <QuantityBox 
                quantity={quantity} 
                setQuantity={setQuantity}
              />
              
              <AddToCart onClick={() => {handleAddToCart(); close(); }} >ADD TO CART</AddToCart>
            </ProductDetails>
          </ProductFrame>
        </Modal> 
        // <ProductPopup 
        //   close={close} 
        //   productDetails={productDetails} 
        //   quantity={quantity} 
        //   setQuantity={setQuantity} 
        //   handleAddToCart={handleAddToCart}
        // />
      }
    </Popup>
  )
}
