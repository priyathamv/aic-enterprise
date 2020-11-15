import React from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
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
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media ${device.laptop} { 
    flex-direction: row;
  }
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
  margin-bottom: 20px;

  @media ${device.tablet} { 
    flex-direction: row;
    margin-bottom: 0;
  }
`;

const ProductImages = styled.div`

`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  margin-bottom: 20px;

  @media ${device.tablet} { 
    width: 300px;
    height: 300px;
    margin-bottom: 0;
  }
`;

const ProductDetails = styled.div`
  margin-left: 0;
  
  @media ${device.tablet} { 
    margin-left: 50px;
  }
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
  const viewportWidth = window.outerWidth;
  const isMobile = viewportWidth < 768;
  const isLaptop = viewportWidth >= 1024;

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

          <Carousel 
            width={isLaptop ? '300px' : '250px'} 
            infiniteLoop={true} 
            showStatus={false} 
            showIndicators={false}
            showThumbs={false} 
            dynamicHeight={true}
          >
            {productDetails.imageUrls && productDetails.imageUrls
              .map((curImageUrl, index) => 
              <div key={index}>
                <Image src={curImageUrl} />
              </div>)}
          </Carousel>



            {/* <ProductImages>
              <PopupImage src={productDetails.imageUrl || productDetails.imageUrls[0]} />
            </ProductImages> */}
            {/* <ProductImages>
              <AwesomeSlider className='featured-slider'>
                {productDetails.imageUrls && productDetails.imageUrls
                  .map((curImageUrl, index) => <div style={{ width: '300px', height: '300px' }} key={index} data-src={curImageUrl} /> )}
              </AwesomeSlider>
            </ProductImages> */}
          </ProductFrame>

          {/* <ProductImages>
            <AwesomeSlider className='featured-slider'>
              {productDetails.imageUrls
                .map((curImageUrl, index) => <div style={{ width: '300px', height: '300px' }} key={index} data-src={curImageUrl} /> )}
            </AwesomeSlider>
          </ProductImages> */}

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
