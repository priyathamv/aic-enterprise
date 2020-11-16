import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import axios from 'axios';
import Select from 'react-select';
import { Collapse } from 'react-collapse';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { device } from '../../utils/viewport';
import { getDateString } from '../../utils/Utils';
import { Line } from '../../homepage/common/Line';
import { Spinner } from '../../utils/Spinner';

const Container = styled.div`
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  @media ${device.laptop} { 
    width: auto;
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const StatusDropdown = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  height: 38px;
  margin-bottom: 20px;

  @media ${device.laptop} { 
    width: 225px;
    margin-bottom: 10px;
  }
`;

const ProductListWrapper = styled.div`
  width: 100%;
  overflow: scroll;
  white-space: nowrap;
`;

const Header = styled.div`
  display: flex;
  background-color: #232162;
  color: #FFF;
  padding: 15px 20px;
  border-radius: 3px;
  font-weight: bold;
  min-width: 700px;
`;

const SmallColumn = styled.div`
  flex: 1;
  white-space: normal;
`;

const MediumColumn = styled.div`
  flex: 2;
  white-space: normal;
`;

const BigColumn = styled.div`
  flex: 3;
  white-space: normal;
`;

const OrderRow = styled.div`
  display: flex;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0 0 5px 1px rgba(188,188,188,0.3);
  padding: 10px 20px;
  margin: 5px 0;
  min-width: 700px;
`;

const HasMore = styled.button`
  border: none;
  background-color: #FFF;
  text-decoration: underline;
  margin: 20px auto;
  width: 100px;
  cursor: pointer;
`;

const OrderFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #FAFAFA;
  border: 1px #ddd solid;
  border-radius: 4px 4px 0 0;
  color: #565959;
  padding: 0 20px;
  margin-top: 20px;

  @media ${device.tablet} {
    flex-direction: row;
  }
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

const ActionButton = styled.button`
  background-color: #232162;
  border: none;
  border-radius: 3px;
  padding: 8px 15px;
  color: #FFF;
  cursor: pointer;
  font-size: 12px;
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

const Label = styled.div`
  font-size: 14px;
  margin: 0 10px;
  flex: 2;
`;

const customStyles = {
  container: (provided, state) => ({
    width: '100%',
  })
};

const orderStatusOptions = [
  {label: 'NEW', value: 'NEW'},
  {label: 'ACCEPTED', value: 'ACCEPTED'},
  {label: 'DISPATCHED', value: 'DISPATCHED'},
  {label: 'FULFILLED', value: 'FULFILLED'},
];

export const AdminOrdersHome = () => {
  const [orderList, setOrderList] = useState([]);
  const [orderStatus, setOrderStatus] = useState('NEW');
  const [pageNo, setPageNo] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [actionLabel, setActionLabel] = useState('ACCEPT');
  const [toggleArr, setToggleArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 20;

  

  const handleOrderStatusChange = e => {
    const newOrderStatus = e.value;
    
    setActionLabel(
      newOrderStatus === 'NEW' ? 'ACCEPT' :
      newOrderStatus === 'ACCEPTED' ? 'DISPATCH' :
      newOrderStatus === 'DISPATCHED' ? 'FULFILL' : 'NEW'
    );
    setOrderList([]);
    setHasMore(true);
    setOrderStatus(newOrderStatus);
    setPageNo(0);
  }

  const fetchOrders = async (isForce) => {
    console.log('YESSSSSS', hasMore);
    try {
      if (hasMore || isForce) {
        setIsLoading(true);
        const queryParams = { orderStatus, pageNo, limit };
        const orderListResponse = await axios.get('/api/orders/all', { params: queryParams });
        const newOrderList = orderListResponse.data.payload;
        
        let updatedOrderList;
        if (pageNo === 0)
          updatedOrderList = newOrderList;
        else 
          updatedOrderList = [...orderList, ...newOrderList];
        
        setOrderList(updatedOrderList);
        
        if (newOrderList.length === 0 || newOrderList.length < limit) {
          setHasMore(false);
        }
        setToggleArr(updatedOrderList.map(curOrder => false));
      }
    } catch (err) {
      console.log('Error while fetching orders: ', err.message);
      setOrderList([]);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, [pageNo, orderStatus]);

  const handleLoadMore = () => {
    setPageNo(page => page + 1);
  }

  const toggleDetails = updateIndex => {
    setToggleArr(toggleArr.map((curToggleItem, index) => index === updateIndex ? !curToggleItem : curToggleItem));
  }

  const handleAction = async id => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      const requestBody = {
        id,
        orderStatus: (
          orderStatus === 'NEW' ? 'ACCEPTED' : 
          orderStatus === 'ACCEPTED' ? 'DISPATCHED' : 
          orderStatus === 'DISPATCHED' ? 'FULFILLED' : 
          'NEW')
      }
      const orderActionResponse = await axios.post('/api/orders/update-status', requestBody, { headers });
      if (orderActionResponse.data.payload) {
        setPageNo(0);
        setHasMore(true);
        fetchOrders(true);
        toast.success(`Updated order status`, { variant: 'success'});
      }
      else
        toast.error(`Order status updation failed`, { variant: 'error'});
    } catch(err) {
      console.log('Error while taking action on an order', err.message);
      toast.error(`Order status updation failed`, { variant: 'error'});
    }
  }

  return (
    <Container>
      <FilterWrapper>
        <StatusDropdown>
          <Select
            styles={customStyles}
            value={orderStatus ? {label: orderStatus, value: orderStatus} : null}
            options={orderStatusOptions} 
            onChange={handleOrderStatusChange} 
          />
        </StatusDropdown>
      </FilterWrapper>

      {orderList.length === 0 && !isLoading && <div style={{ marginTop: '20px' }}>No {orderStatus} orders</div>}
      {isLoading && <Spinner containerStyle={{ position: 'initial' }} />}
      <ProductListWrapper>
        {orderList.map((curOrder, index) => 
          <div key={index}>
            <OrderFrame>
              <LabelBox>
                <Text>ORDER PLACED</Text>
                <SubText>{getDateString(curOrder.createTs)}</SubText>
              </LabelBox>

              <LabelBox>
                <Text>PLACED BY</Text>
                <SubText>{curOrder.name}</SubText>
              </LabelBox>

              <LabelBox>
                <Text>ORDER STATUS</Text>
                <SubText>{curOrder.orderStatus}</SubText>
              </LabelBox>

              <LabelBox>
                <Text>ORDER #</Text>
                <SubText>{curOrder.id}</SubText>
              </LabelBox>

              {orderStatus !== 'FULFILLED' && 
                <LabelBox style={{ textAlign: 'center' }}>
                  <Text style={{ marginBottom: '5px' }}>ACTION</Text>
                  <ActionButton onClick={() => handleAction(curOrder.id)}>{actionLabel}</ActionButton>
                </LabelBox>}

              {toggleArr[index] ? 
                <CollapseIcon size='5em' onClick={() => toggleDetails(index)} /> : 
                <ExpandIcon size='5em' onClick={() => toggleDetails(index)} />
              }
            </OrderFrame>

            <Collapse isOpened={toggleArr[index]}>
              <OrderDetails>
                {curOrder.productList.map((curProduct, innerIndex) => 
                  <div key={innerIndex}>
                    <ProductFrame key={innerIndex}>
                      <Label>{curProduct.code}</Label>
                      <Label style={{ flex: 6 }}>{curProduct.name}</Label>
                      <Label>{curProduct.brand}</Label>
                      <Label style={{ flex: 1 }}>Qty: {curProduct.quantity}</Label>
                    </ProductFrame>
                    {innerIndex < (curOrder.productList.length - 1) && <Line style={{ width: '95%' }}/>}
                  </div>)
                }
              </OrderDetails>        
            </Collapse>
          </div>)
        }
        {hasMore && !isLoading && 
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <HasMore onClick={handleLoadMore}>Load more</HasMore>
          </div>}
      </ProductListWrapper>

      
    </Container>
  )
}
