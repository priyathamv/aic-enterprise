import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
import InfiniteScroll from 'react-infinite-scroller';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdClear } from 'react-icons/md';
import debounce from 'lodash.debounce';

import { Spinner } from '../../utils/Spinner';
import { device } from '../../utils/viewport';
import { 
  changeAdminProductList, 
  updateAdminProductList, 
  updateHasMore, 
  updateSearch, 
  getNextPageAsync,
  updateIsLoading,
  selectAdminHasMore,
  selectAdminSearchValue,
  selectAdminProducts } from './adminProductListSlice';

const Container = styled.div`
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  align-items: flex-end;
`;

const NewProductLink = styled(Link)`
  text-decoration: none;
  background-color: #232162;
  color: #FFF;
  padding: 12px 30px;
  border-radius: 3px;
  margin-right: 10px;
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

const DeleteButton = styled.button`
  background-color: #ff0000d1;
  border: none;
  border-radius: 3px;
  padding: 10px 30px;
  color: #FFF;
  cursor: pointer;
  margin-right: 20px;
`;

const DeleteButtonPop = styled.button`
  background-color: #ff0000d1;
  border: none;
  border-radius: 3px;
  padding: 10px 30px;
  color: #FFF;
  cursor: pointer;
  margin-right: 0;
  margin-bottom: 20px;

  @media ${device.tablet} { 
    margin-right: 20px;
    margin-bottom: 0;
  }
`;

const CloseButton = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px 30px;
  cursor: pointer;
`;

const ProductRow = styled.div`
  display: flex;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0 0 5px 1px rgba(188,188,188,0.3);
  padding: 10px 20px;
  margin: 5px 0;
  min-width: 700px;

  // @media ${device.tablet} { 
  //   padding: 10px 50px;
  // }
`;

const SpinnerWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const Search = styled.div`
  width: 300px;
  display: flex;
  justify-content: flex-end;
  position: relative;
  height: 38px;
`;

const SearchInput = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 10px 30px 10px 30px;
  border: 1px solid #CCC;
  font-size: 14px;
`;

const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  color: #848484;
  top: 10px;
  left: 10px;
`;

const CancelIcon = styled(MdClear)`
  position: absolute;
  color: #848484;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Dummy = styled.div`
  display: inline-block;
  position: absolute
`;

const ScrollObserver = styled.div`
  padding: 15px 25px;
  text-align: center;
`;


export const AdminProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector(selectAdminProducts);
  const hasMore = useSelector(selectAdminHasMore);
  const searchValue = useSelector(selectAdminSearchValue);

  const [pageNo, setPageNo] = useState(0);
  const [placeholder, setPlaceholder] = useState('Search by Products name');

  const dummyRef = useRef(null);

  const updateProductListOnSearch = async () => {
    try {
      const queryParams = {
        searchValue: (searchValue === '' ? null : searchValue), 
        pageNo: 0, 
        limit: 20
      }
      if (searchValue === '' || searchValue.length >= 3) {
        const adminProductsResponse = await axios.get('/api/products', { params: queryParams });
        dispatch(changeAdminProductList(adminProductsResponse.data.payload));
      }
    } catch (err) {
      console.log('Exception while fetching filtered admin product list: ', err.message);
    }
  }

  useEffect(() => {
    updateProductListOnSearch();
  }, [searchValue])

  
  const handleOnSearch = searchValue => {
    dispatch(updateSearch(searchValue));
  }



  useEffect(() => {
    if (hasMore) {
      dispatch(getNextPageAsync({ searchValue, pageNo })); 
    }
  }, [dispatch, hasMore, pageNo]);


  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) { 
      setPageNo((page) => page + 1)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(debounce(handleObserver, 2000), { threshold: 1.0 });

    (hasMore || pageNo === 0) && dummyRef.current && observer.observe(dummyRef.current);
  }, [hasMore, pageNo]);



  
  const handleOnDelete = async name => {
    const headers = { 'Content-Type': 'application/json' };

    try {
      const productDeleteResponse = await axios.post('/api/products/delete', { name, description: name }, headers);
      console.log('productDeleteResponse.data.payload', productDeleteResponse.data.payload);

      if (productDeleteResponse.data.payload) {
        toast.success(`${name} product deleted successfully`, { variant: 'success'});
        setTimeout(() => window.location.reload(), 5000);
      } else {
        toast.error(`${name} product deletion failed`, { variant: 'error'});
      }
    } catch (err) {
      console.log('Error while deleting product: ', err.message);
      toast.error(`${name} product deletion failed`, { variant: 'error'});
    }
  }

  return (
    <Container>
      <MenuWrapper>
        <NewProductLink to='/admin/products/new' >Add new product</NewProductLink>

        <Search>
          <SearchInput 
            value={searchValue}
            placeholder={placeholder} 
            onChange={e => handleOnSearch(e.target.value)}
            onBlur={() => setPlaceholder('Search by Products name')} 
            onFocus={() => setPlaceholder('Type at least 3 characters')} 
          />

          <SearchIcon size='1.2em'/>
          <CancelIcon onClick={() => handleOnSearch('')} size='1.2em' />
        </Search>
      </MenuWrapper>


      <ProductListWrapper>
        <Header>
          <MediumColumn>Code</MediumColumn>
          <BigColumn>Name</BigColumn>
          <MediumColumn>Brand</MediumColumn>
          <SmallColumn>Action</SmallColumn>
        </Header>

        {productList.map((curProduct, index) => 
          <ProductRow key={index} >
            <MediumColumn>{curProduct.code}</MediumColumn>
            
            <BigColumn>{curProduct.name}</BigColumn>

            <MediumColumn>{curProduct.brand}</MediumColumn>
            
            <SmallColumn>
              <Popup
                trigger={<DeleteButton style={{ padding: '8px 24px' }}>Delete</DeleteButton>}
                modal
              >
                {close => (
                  <div className="admin-modal">
                    <button className="close" onClick={close}>&times;</button>

                    <div className="content">Are you sure you want to delete the product {curProduct.name}?</div>

                    <div className="actions">
                      <DeleteButtonPop onClick={() => handleOnDelete(curProduct.name)} >Yes, delete</DeleteButtonPop>
                      
                      <CloseButton autoFocus className="button" onClick={() => close()} >Close</CloseButton>
                    </div>
                  </div>
                )}
              </Popup>
            </SmallColumn>
          </ProductRow>)
        }
        {hasMore ?
          <div>
            <ScrollObserver colSpan='5'>
              <Dummy ref={dummyRef}>&nbsp;</Dummy>Loading more products...
            </ScrollObserver>
          </div> : null}
      </ProductListWrapper>
    </Container>
  )
}
