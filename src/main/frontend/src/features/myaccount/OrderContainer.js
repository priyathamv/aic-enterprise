import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { Collapse } from 'react-collapse';

import { getDateString } from '../utils/Utils';
import { device } from '../utils/viewport';
import { Line } from '../homepage/common/Line';


const Container = styled.div`
`;

const OrderFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #FAFAFA;
  border: 1px #ddd solid;
  border-radius: 4px 4px 0 0;
  color: #565959;
  padding: 20px;
  margin-top: 20px;

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const OrderIdBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.tablet} {
    flex-direction: row;
    align-items: center;
  }
`;

const LabelBox = styled.div`
  margin-right: 0;
  display: flex;
  align-items: baseline;
  width: 100%;
  justify-content: space-between;

  @media ${device.tablet} {
    margin-right: 20px;
    display: block;
  }
`;

const Text = styled.div`
  font-size: 12px;
  margin-bottom: 10px;
`;

const SubText = styled.div`
  font-size: 12px;

  @media ${device.tablet} {
    font-size: 14px;
  }
`;

const ExpandIcon = styled(IoIosArrowDown)`
  color: #565959;
  cursor: pointer;
`;

const CollapseIcon = styled(IoIosArrowUp)`
  color: #565959;
  cursor: pointer;
`;

const OrderDetails = styled.div`
  border: 1px solid #CCC;
  border-top: none;
  font-size: 14px;
  border-radius: 0 0 4px 4px;
`;

const ProductFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding: 20px;

  @media ${device.tablet} {
    grid-template-columns: 2fr 6fr 2fr 1fr;
  }
`;

const Label = styled.div`
  font-size: 14px;
  margin: 0 10px;
  flex: 2;
`;



export const OrderContainer = ({ orderDetails }) => {
  const [isExpand, setIsExpand] = useState(false);

  const toggleDetails = () => setIsExpand(!isExpand);

  return (
    <Container>
      <OrderFrame>
        <LabelBox>
          <Text>ORDER PLACED</Text>
          <SubText>{getDateString(orderDetails.createTs)}</SubText>
        </LabelBox>

        <OrderIdBox>
          <LabelBox>
            <Text>ORDER # </Text>
            <SubText>{orderDetails.id}</SubText>
          </LabelBox>

          {isExpand ? 
            <CollapseIcon size='1.5em' onClick={toggleDetails} /> : 
            <ExpandIcon size='1.5em' onClick={toggleDetails} />
          }
        </OrderIdBox>
      </OrderFrame>

      <Collapse isOpened={isExpand}>
        <OrderDetails>
          {orderDetails.productList.map((curProduct, index) => 
            <div key={index}>
              <ProductFrame key={index}>
                <Label>{curProduct.code}</Label>
                <Label style={{ flex: 6 }}>{curProduct.name}</Label>
                <Label>{curProduct.brand}</Label>
                <Label style={{ flex: 1 }}>Qty: {curProduct.quantity}</Label>
              </ProductFrame>
              {index < (orderDetails.productList.length - 1) && <Line style={{ width: '95%' }}/>}
            </div>)
          }
        </OrderDetails>        
      </Collapse>
    </Container>
  )
}
