import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { device } from '../utils/viewport';
import { Spinner } from '../utils/Spinner';
import { Button } from '../homepage/common/Button';
import { QuantityBox } from '../cart/QuantityBox';
import { selectCartItems, updateUserCartAsync } from '../cart/cartSlice';
import { selectUserEmail } from '../auth/authSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 20px 50px 20px;

  @media ${device.laptop} {
    margin: 50px 15vw 50px 15vw;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const BreadCrumb = styled.div`
  display: flex;
  margin-bottom: 50px;
`;

const Crumb = styled(Link)`
  text-decoration: none;
  color: #232162;
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
  max-height: 400px;
  overflow: scroll;
`;

const SmallImage = styled.img`
  width: 75px;
  margin: 0 20px 20px 0;
  cursor: pointer;
`;

const Image = styled.img`
  width: 300px;
`;

const AuxilaryImage = styled.img`
  max-width: 100%;
`;

const SizeFrame = styled.div`

`;

const CapacityFrame = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Size = styled.div`
  color: #232162;
  padding: 10px;
  border: 1px solid #CCC;
  border-radius: 3px;
  display: inline-block;
  margin: 0 15px 15px 0;
  cursor: pointer;
`;

const SizeBox = styled.div`

`;

const RightFrame = styled.div`
  flex: 2;
`;

const Name = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 22px;
`;

const ProductInfo = styled.div`
  display: flex;
  font-size: 14px;
  color: #565959;
  margin-bottom: 20px;
`;

const Info = styled.div`

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

const Heading = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: -10px;
`;

const Description = styled.div`
  font-size: 18px;
`;

const MetricItem = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Separator = styled.div`
  margin: 0 10px;
`;

const MetricName = styled.div`
  margin-right: 5px;
  font-weight: bold;
`;

const MetricValue = styled.div`
`;

const SpinnerWrapper = styled.div`
  position: relative;
  height: 50vh;
  width: 100%;
`;


export const ProductDetail2 = () => {
  const location = useLocation();

  const [productDetails, setProductDetails] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState(null);
  const [capacityIndex, setCapacityIndex] = useState(0);

  const fetchProductDetails = async (productApplication, productIdValue) => {
    try {
      const queryParams = { productId: productIdValue };

      const url = (productApplication === 'Analytical') ? '/api/analytical-products/details' :
        (productApplication === 'Life Science') ? '/api/life-science-products/details' :
        (productApplication === 'Instrumentation') ? '/api/instrumentation-products/details' :
        (productApplication === 'Industrial Safety and Clean room') ? '/api/industrial-products/details' : null;

      const productDetailsResponse = await axios.get(url, { params: queryParams });

      setProductDetails(productDetailsResponse.data.payload);
      setMainImageUrl(productDetailsResponse.data.payload.imageUrls[0]);
    } catch (error) {
      console.log('Exception while fetching product details', error.message)
    }
  }

  useEffect(() => {
    if (location.pathname.includes('/product-detail/')) {
      const productApplication = location.pathname.split("/")[2];
      const productIdValue = location.pathname.split("/")[3];

      fetchProductDetails(productApplication, productIdValue);
    }
  }, [location]);

  const handleCapacitySelection = index => setCapacityIndex(index);

  const createMarkup = htmlValue => {
    return { __html: htmlValue };
  }


  // Add to cart functionality
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);

  const [quantity, setQuantity] = useState(0);

  const cartItems = useSelector(selectCartItems);
  const isItemAlreadyInCart = productDetails && cartItems.find(curCartItem => curCartItem.productId === productDetails.productId);

  useEffect(() => {
    setQuantity(isItemAlreadyInCart ? isItemAlreadyInCart.quantity : 0);
  }, [isItemAlreadyInCart]);


  const handleAddToCart = productDetails => {
    console.log('UPDATE_CART_ITEM', userEmail, cartItems, { ...productDetails, quantity: 1 });
    dispatch(updateUserCartAsync('UPDATE_CART_ITEM', userEmail, cartItems, { ...productDetails, quantity: 1 }));
  }

  const handleChangeQuantity = newQuantity => {
    setQuantity(newQuantity);
    if (newQuantity === 0)
      dispatch(productDetails && updateUserCartAsync('DELETE_CART_ITEM', userEmail, cartItems, productDetails.productId));
    else
      dispatch(productDetails && updateUserCartAsync('UPDATE_CART_ITEM', userEmail, cartItems, { ...productDetails, quantity: newQuantity }));
  }

  return (
    <>
      {productDetails ?
        <Container id='product_catalogue_id'>
          <BreadCrumb>
            <Crumb
              to={`/productlist?application=${productDetails.application}`}
              style={{ marginRight: '10px' }}
            >{productDetails.application}</Crumb>/

            <Crumb
              to={`/productlist?application=${productDetails.application}&category=${productDetails.category}`}
              style={{ margin: '0 10px' }}
            >{productDetails.category}</Crumb>/

            <Crumb
              to={`/productlist?application=${productDetails.application}&category=${productDetails.category}&brand=${productDetails.brand}`}
              style={{ marginLeft: '10px' }}
            >{productDetails.brand}</Crumb>
          </BreadCrumb>

          <DetailsWrapper>
            <LeftFrame>
              <ImageFrame>
                <ImageGroup>
                  {productDetails.imageUrls.map(
                    (curImageUrl, index) =>
                      <SmallImage
                        key={index}
                        src={curImageUrl}
                        onClick={() => setMainImageUrl(curImageUrl)}
                      />
                    )}
                </ImageGroup>

                <Image src={mainImageUrl} />
              </ImageFrame>
            </LeftFrame>

            <RightFrame>
              <Name>{productDetails.name}</Name>

              <ProductInfo>
                <Info style={{ marginRight: '10px' }}>{productDetails.application}</Info>|
                <Info style={{ margin: '0 10px' }}>{productDetails.category}</Info>|
                <Info style={{ marginLeft: '10px' }}>{productDetails.brand}</Info>
              </ProductInfo>

              {productDetails.metricsList.map((curMetric, index) =>
                <Size
                  style={index === capacityIndex ? {backgroundColor: '#232162', color: '#FFFFFF'} : null}
                  key={index}
                  onClick={() => handleCapacitySelection(index)}>
                  {curMetric.capacity}
                </Size>
              )}

              <Description dangerouslySetInnerHTML={createMarkup(productDetails.description)} />

              {productDetails.specification ?
                <>
                  <Heading>Specifications:</Heading>
                  <Description dangerouslySetInnerHTML={createMarkup(productDetails.specification)} />
                </> : null}

              {productDetails.metricsList.length && productDetails.metricsList[capacityIndex].specification ?
                <>
                  <Heading>Specifications:</Heading>
                  <Description dangerouslySetInnerHTML={createMarkup(productDetails.metricsList[capacityIndex].specification)} />
                </> : null}

              <SizeFrame>
                <CapacityFrame>
                  {productDetails.metricsList[capacityIndex].od &&
                    <>
                      <MetricItem>
                        <MetricName>OD:</MetricName>
                        <MetricValue>{productDetails.metricsList[capacityIndex].od}</MetricValue>
                      </MetricItem>

                      <Separator>|</Separator>
                    </>
                  }

                  {productDetails.metricsList[capacityIndex].height &&
                    <>
                      <MetricItem>
                        <MetricName>Height:</MetricName>
                        <MetricValue>{productDetails.metricsList[capacityIndex].height}</MetricValue>
                      </MetricItem>

                      <Separator>|</Separator>
                    </>
                  }

                  {productDetails.metricsList[capacityIndex].pack &&
                    <MetricItem>
                      <MetricName>Pack:</MetricName>
                      <MetricValue>{productDetails.metricsList[capacityIndex].pack}</MetricValue>
                    </MetricItem>
                  }
                  {/* {productDetails.metricsList[capacityIndex].price &&
                    <MetricItem>
                      <MetricName>Price:</MetricName>
                      <MetricValue>{productDetails.metricsList[capacityIndex].price}</MetricValue>
                    </MetricItem>
                  } */}
                </CapacityFrame>

                <SizeBox></SizeBox>
              </SizeFrame>

              {quantity === 0 ?
                <Button
                  style={{ borderRadius: '3px', fontSize: '12px', padding: '10px 20px', marginTop: '20px', display: 'block', marginBottom: '20px'}}
                  label='ADD TO CART'
                  handleOnClick={() => { setQuantity(1); handleAddToCart(productDetails); }}/> :
                <QuantityBox
                  styleObj={{ margin: '20px 0' }}
                  quantity={quantity}
                  setQuantity={handleChangeQuantity}
                />
              }

              {productDetails.auxilaryImageUrl && <AuxilaryImage src={productDetails.auxilaryImageUrl} />}
            </RightFrame>
          </DetailsWrapper>
        </Container> : <SpinnerWrapper><Spinner/></SpinnerWrapper>
      }
    </>
  )
}
