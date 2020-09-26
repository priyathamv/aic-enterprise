import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdClear } from 'react-icons/md';
import { Tabs, TabList, Tab } from 'react-tabtab';
import axios from 'axios';

import tabStyles from './tabStyles';
import { selectBrand, selectDivision, selectSearchValue, updateDivision, updateSearch, changeProductList } from './productsSlice';


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TabContainer = styled.div`
  width: 100%;
  max-width: 50vw;
  flex: 3;
`;

const Search = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
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
  top: 13px;
  left: 1.3vw;
`;

const CancelIcon = styled(MdClear)`
  position: absolute;
  color: #848484;
  top: 12px;
  right: 10px;
  cursor: pointer;
`;


export const ProductFilters = ({ divisionList, setPageNo }) => {
  const dispatch = useDispatch();

  const [placeholder, setPlaceholder] = useState('Search products');
  const brand = useSelector(selectBrand);
  const division = useSelector(selectDivision);
  const searchValue = useSelector(selectSearchValue);


  const updateProductListOnSearch = async () => {
    try {
      const queryParams = {
        searchValue: (searchValue === '' ? null : searchValue), 
        brand,
        division,
        pageNo: 0, 
        limit: 20
      }
      if (searchValue === '' || searchValue.length >= 3) {
        const productsResponse = await axios.get('/api/products', { params: queryParams });
        dispatch(changeProductList(productsResponse.data.payload));
      }
    } catch (err) {
      console.log('Exception while fetching filtered product list: ', err.message);
    }
  }

  useEffect(() => {
    updateProductListOnSearch();
  }, [searchValue])

  
  const handleOnSearch = searchValue => {
    dispatch(updateSearch(searchValue));
  }

  const handleTabChange = tabIndex => {
    const curDivision = tabIndex === 0 ? null : divisionList[tabIndex-1];
    setPageNo(0);
    dispatch(updateDivision(curDivision));
  }


  return (
    <Container>
      <TabContainer>
        {divisionList.length ? 
        <Tabs 
          showModalButton={false}
          customStyle={tabStyles} 
          onTabChange={handleTabChange}
        >
          <TabList >
            <Tab>All</Tab>
            {divisionList.map((curDivision, index) => <Tab key={index}>{curDivision}</Tab>)}
          </TabList>
        </Tabs> : null}
      </TabContainer>
      
      <Search>
        <SearchInput 
          value={searchValue}
          onChange={e => handleOnSearch(e.target.value)}
          placeholder={placeholder} 
          onBlur={() => setPlaceholder('Search products')} 
          onFocus={() => setPlaceholder('Type at least 3 characters')} 
        />

        <SearchIcon size='1.2em' />
        <CancelIcon onClick={() => handleOnSearch('')} size='1.2em' />
      </Search>
    </Container>
  )
}
