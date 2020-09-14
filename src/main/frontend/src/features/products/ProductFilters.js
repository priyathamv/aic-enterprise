import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdClear } from 'react-icons/md';

import { selectBrand, selectSearchValue, getFilteredProductsAsync } from './productsSlice';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Search = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 15vw;
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


export const ProductFilters = () => {
  const dispatch = useDispatch();
  const [placeholder, setPlaceholder] = useState('Search products');
  const brand = useSelector(selectBrand);
  const searchValue = useSelector(selectSearchValue);

  const handleOnChange = e => {
    dispatch(getFilteredProductsAsync(brand, e.target.value));
  }

  const handleOnSearchClear = () => {
    dispatch(getFilteredProductsAsync(brand, ''));
  }

  return (
    <Container>
      <div></div>
      <Search>
        <SearchInput 
          value={searchValue}
          onChange={handleOnChange}
          placeholder={placeholder} 
          onBlur={() => setPlaceholder('Search products')} 
          onFocus={() => setPlaceholder('Type at least 3 characters')} 
        />

        <SearchIcon size='1.2em' />
        <CancelIcon onClick={handleOnSearchClear} size='1.2em' />
      </Search>
    </Container>
  )
}
