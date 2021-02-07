import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
import Select from 'react-select';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdClear } from 'react-icons/md';

import { device } from '../../utils/viewport';

const Container = styled.div`
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  flex-direction: column;
  align-items: center;
  
  @media ${device.laptop} { 
    align-items: flex-end;
    flex-direction: row;
  }
`;

const NewProductLink = styled(Link)`
  color: #232162;
  margin-right: 10px;
  text-decoration: underline;
  margin-bottom: 20px;
  margin-bottom: 5px;

  @media ${device.laptop} { 
    margin-bottom: 0;
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

const EditLink = styled(Link)`
  border: none;
  border-radius: 3px;
  padding: 8px 14px;
  color: royalblue;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  background: none;  
  font-size: 16px;
  border: none;
  border-radius: 3px;
  padding: 8px 14px;
  color: #ff0000d1;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
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
`;


const Search = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  height: 38px;
  margin-bottom: 20px;

  @media ${device.laptop} { 
    width: 225px;
    margin-bottom: 0;
  }
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

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;

  @media ${device.laptop} { 
    width: auto;
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const BrandFilterWrapper = styled.div`
  width: 100%;
  margin-right: 20px;
  margin-bottom: 20px;

  @media ${device.laptop} { 
    width: 225px;
    margin-bottom: 0;
  }
`;

const ALL_BRANDS = {
  label: 'All Brands',
  value: null
}

export const AdminProductList2View = ({
  dummyRef,
  applicationOptions,
  divisionOptions,
  categoryOptions,
  setCategoryOptions,
  productList,
  hasMore,
  searchValue,
  application,
  setApplication,
  category,
  setCategory,
  division,
  setDivision,
  pageNo,
  setPageNo,
  placeholder,
  setPlaceholder,
  brand,
  setBrand,
  brandList,

  handleOnSearch,
  handleObserver,
  fetchBrandList,
  handleApplicationChange,
  handleCategoryChange,
  handleDivisionChange,
  handleBrandChange,
  handleOnDelete,
  updateProductListOnSearchOrFilter
}) => {
  const dispatch = useDispatch();
  
  return (
    <Container>
      <MenuWrapper>
        <NewProductLink to='/admin/products2/new' >Add a new product</NewProductLink>
      </MenuWrapper>

      <FilterWrapper>
        <BrandFilterWrapper>
          <Select
            value={{label: application, value: application}}
            options={applicationOptions} 
            onChange={handleApplicationChange} 
          />
        </BrandFilterWrapper>

        <BrandFilterWrapper>
          <Select
            placeholder='Category filter'
            value={category ? {label: category, value: category} : null}
            options={categoryOptions} 
            onChange={handleCategoryChange} 
          />
        </BrandFilterWrapper>
        
        <BrandFilterWrapper>
          <Select
            isSearchable={true}
            placeholder='Brand filter'
            value={brand ? {label: brand, value: brand} : null}
            options={[ALL_BRANDS, ...brandList.map(curBrand => ({label: curBrand, value: curBrand}))]} 
            onChange={handleBrandChange} 
          />
        </BrandFilterWrapper>

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
      </FilterWrapper>


      <ProductListWrapper>
        <Header>
          <MediumColumn>Product Id</MediumColumn>
          <BigColumn>Name</BigColumn>
          <MediumColumn>Brand</MediumColumn>
          <MediumColumn>Action</MediumColumn>
        </Header>

        {productList.map((curProduct, index) => 
          <ProductRow key={index} >
            <MediumColumn>{curProduct.productId}</MediumColumn>
            
            <BigColumn>{curProduct.name}</BigColumn>

            <MediumColumn>{curProduct.brand}</MediumColumn>
            
            <MediumColumn style={{ display: 'flex' }}>
              <EditLink to={{ pathname: `/admin/products2/edit/${curProduct.productId}`}}>Edit</EditLink>
              <Popup
                trigger={<DeleteButton style={{ padding: '8px 14px' }}>Delete</DeleteButton>}
                modal
              >
                {close => (
                  <div className="admin-modal">
                    <button className="close" onClick={close}>&times;</button>

                    <div className="content">Are you sure you want to delete the product {curProduct.name}?</div>

                    <div className="actions">
                      <DeleteButtonPop onClick={() => handleOnDelete(curProduct.productId)} >Yes, delete</DeleteButtonPop>
                      
                      <CloseButton autoFocus className="button" onClick={() => close()} >Close</CloseButton>
                    </div>
                  </div>
                )}
              </Popup>
            </MediumColumn>
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
