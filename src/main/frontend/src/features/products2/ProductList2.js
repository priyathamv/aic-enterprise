import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdClear } from 'react-icons/md';
import Select from 'react-select';

import { ProductItem2 } from './ProductItem2';
import { device } from '../utils/viewport';
import { Line } from '../homepage/common/Line';

const Container = styled.div`
  margin: 0 20px 50px 20px;

  @media ${device.laptop} {
    margin: 0 10vw 50px 10vw;
  }
`;

const ProductListBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const FiltersFrame = styled.div`
  display: flex;
  margin-right: 30px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const FilterWrapper = styled.div`
  min-width: 250px;
  margin: 20px 20px 20px 0;
`;

const Label = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;

const ProductListFrame = styled.div`
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 25px 0 -15px 0;
`;

const Search = styled.div`
  width: 100%;
  max-width: 250px;
  display: flex;
  justify-content: flex-end;
  position: relative;
  height: 38px;
  margin-bottom: 20px;

  @media ${device.laptop} {
    // width: 350px;
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



const GridProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 50px;

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 100px;
  }

  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 100px;
  }
`;

const ProductListWrapper = styled.div`

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
  handleApplicationChange,
  handleCategoryChange,
  handleDivisionChange,
  handleBrandChange,
  handleOnDelete,
  updateProductListOnSearchOrFilter
}) => {

  return (
    <Container id='product_list_id2'>
      {/* <SearchWrapper>
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
      </SearchWrapper> */}

      {/* <Line style={{ margin: '10px 0' }} /> */}

      <ProductListBody>
        <FiltersFrame>
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
              options={brandList.map(curBrand => ({label: curBrand, value: curBrand}))}
              onChange={handleBrandChange}
            />
          </FilterWrapper>


          <FilterWrapper>
            <Label>&nbsp;</Label>
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
        </FiltersFrame>

        <ProductListFrame>
          {false ?
          <GridProductWrapper>

          </GridProductWrapper> :
          <ProductListWrapper>
            {productList.map((curProduct, index) => <ProductItem2 key={index} productDetails={curProduct} />)}

            {hasMore ?
              <div>
                <ScrollObserver colSpan='5'>
                  <Dummy ref={dummyRef}>&nbsp;</Dummy>Loading more products...
                </ScrollObserver>
              </div> : null}

          </ProductListWrapper>}
        </ProductListFrame>
      </ProductListBody>
    </Container>
  )
}
