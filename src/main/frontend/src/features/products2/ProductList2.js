import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdClear } from 'react-icons/md';
import Select from 'react-select';
import debounce from 'lodash.debounce';

import { device } from '../utils/viewport';
import { Button } from '../homepage/common/Button';
import { Line } from '../homepage/common/Line';

const Container = styled.div`
  margin: 0 20px 50px 20px;
  
  @media ${device.laptop} { 
    margin: 0 10vw 50px 10vw;
  }
`;

const ProductListBody = styled.div`
  display: flex;
`;

const FiltersFrame = styled.div`
  flex: 1;
  margin-right: 30px;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const FilterWrapper = styled.div`
  margin: 20px 0;
`;

const Label = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;

const ProductListFrame = styled.div`
  flex: 4;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 25px 0 -15px 0;
`;

const Search = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  height: 38px;
  margin-bottom: 20px;

  @media ${device.laptop} { 
    width: 350px;
    margin-bottom: 20px;
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

const ProductListWrapper = styled.div`

`;

const ProductRow = styled.div`
  display: flex;
  margin: 20px 0;
`;

const Image = styled.img`
  flex: 1;
  max-width: 180px;
  cursor: pointer;
`;

const ProductDetails = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
`;

const ProductName = styled.div`
  margin-bottom: 5px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: #232162;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  font-size: 14px;
  color: #565959;
  margin-bottom: 5px;
`;

const Info = styled.div`
  
`;

const Description = styled.div`
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ButtonFrame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const KnowMore = styled(Link)`
  text-decoration: underline;
  color: #232162;
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

const ALL_BRANDS = {
  label: 'All Brands',
  value: null
}

export const ProductList2 = ({
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
  const history = useHistory();

  const handleAddToCart = () => {

  }

  const createMarkup = value => {
    return { __html: value };
  }

  return (
    <Container id='product_list_id2'>
      <SearchWrapper>
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
      </SearchWrapper>

      <Line style={{ margin: '10px 0' }} />

      <ProductListBody>
        <FiltersFrame>
          <Header>Filters</Header>

          <FilterWrapper>
            <Label>Application</Label>
            <Select
              value={{label: application, value: application}}
              options={applicationOptions} 
              onChange={handleApplicationChange} 
            />
          </FilterWrapper>

          <FilterWrapper>
            <Label>Category</Label>
            <Select
              placeholder='Category filter'
              value={category ? {label: category, value: category} : null}
              options={categoryOptions} 
              onChange={handleCategoryChange} 
            />
          </FilterWrapper>

          <FilterWrapper>
            <Label>Division</Label>
            <Select
              placeholder='Division filter'
              value={division ? {label: division, value: division} : null}
              options={divisionOptions} 
              onChange={handleDivisionChange} 
            />
          </FilterWrapper>
          
          <FilterWrapper>
            <Label>Brand</Label>
            <Select
              isSearchable={true}
              placeholder='Brand filter'
              value={brand ? {label: brand, value: brand} : null}
              options={[ALL_BRANDS, ...brandList.map(curBrand => ({label: curBrand, value: curBrand}))]} 
              onChange={handleBrandChange} 
            />
          </FilterWrapper>
        </FiltersFrame>

        <ProductListFrame>
          <ProductListWrapper>
            {productList.map((curProduct, index) => 
              <div key={index}>
                <ProductRow>
                  <Image 
                    src={curProduct.imageUrls[0]} 
                    onClick={() => history.push(`/product-detail/${curProduct.application}/${curProduct.productId}`)} />
                  
                  <ProductDetails>
                    <div>
                      <ProductName
                        onClick={() => history.push(`/product-detail/${curProduct.application}/${curProduct.productId}`)}>
                        {curProduct.name}
                      </ProductName>

                      <ProductInfo>
                        <Info style={{ marginRight: '10px' }}>{curProduct.application}</Info>|
                        <Info style={{ margin: '0 10px' }}>{curProduct.category}</Info>|
                        <Info style={{ marginLeft: '10px' }}>{curProduct.brand}</Info>
                      </ProductInfo>

                      <Description dangerouslySetInnerHTML={createMarkup(curProduct.description)} />
                    </div>

                    <ButtonFrame>
                      <KnowMore to={`/product-detail/${curProduct.application}/${curProduct.productId}`}>Know more</KnowMore>

                      <Button 
                        style={{ borderRadius: '3px', fontSize: '12px', padding: '10px 20px'}} 
                        label='ADD TO CART' 
                        handleOnClick={handleAddToCart} />
                    </ButtonFrame>
                  </ProductDetails>
                </ProductRow>

                <Line style={{ margin: '30px 0' }} />
              </div>)
            }

            {hasMore ?
              <div>
                <ScrollObserver colSpan='5'>
                  <Dummy ref={dummyRef}>&nbsp;</Dummy>Loading more products...
                </ScrollObserver>
              </div> : null}

          </ProductListWrapper>
        </ProductListFrame>
      </ProductListBody>
    </Container>
  )
}
