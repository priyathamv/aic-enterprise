import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { Collapse } from 'react-collapse';

import { getDateString } from '../utils/Utils';

const Container = styled.div`
`;

const OrderFrame = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f6f6f6;
  border: 1px #ddd solid;
  border-radius: 4px 4px 0 0;
  color: #565959;
  padding: 20px;
  margin-top: 20px;
`;

const OrderIdBox = styled.div`
  display: flex;
  align-items: center;
`;

const LabelBox = styled.div`
  margin-right: 20px;
`;

const Text = styled.div`
  font-size: 12px;
  margin-bottom: 10px;
`;

const SubText = styled.div`
  font-size: 14px;
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
  display: flex;
  padding: 20px;
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
            <ProductFrame key={index}>
              <Label>{curProduct.code}</Label>
              <Label style={{ flex: 6 }}>{curProduct.name}</Label>
              <Label>{curProduct.brand}</Label>
              <Label style={{ flex: 1 }}>Qty: {curProduct.quantity}</Label>
            </ProductFrame>)}
        </OrderDetails>        
      </Collapse>
    </Container>
  )
}
