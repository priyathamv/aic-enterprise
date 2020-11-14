import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import Select from 'react-select';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdClear } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { Spinner } from '../utils/Spinner';

const Container = styled.div`
  // margin-bottom: 100px;
`;

const Header = styled.div`
  display: flex;
  background-color: #232162;
  color: #FFF;
  padding: 15px 20px;
  border-radius: 3px;
  font-weight: bold;
`;

const SmallColumn = styled.div`
  flex: 1;
`;

const BigColumn = styled.div`
  flex: 2;
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0 0 5px 1px rgba(188,188,188,0.3);
  padding: 10px 20px;
  margin: 5px 0;
`;

const UserImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  color: #232162;
`;

const UserIcon = styled(FaUserCircle)`
  
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const Search = styled.div`
  width: 300px;
  display: flex;
  justify-content: flex-end;
  position: relative;
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


const customStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: '2px 0',
    cursor: 'pointer',
    fontSize: '14px',
    height: state.isFocussed ? '36px' : '36px',
    minHeight: state.isFocussed ? '36px' : '36px',
    padding: 0
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer'
  })
}

const roleList = [
  {label: 'DEFAULT', value: 'DEFAULT'},
  {label: 'PREMIUM', value: 'PREMIUM'},
  {label: 'ADMIN', value: 'ADMIN'}
];


export const AdminUserList = () => {
  const [userList, setUserList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState('Search by Users name/email');

  const fetchFilteredUsers = async searchValue => {
    if (!loading) {
      setLoading(true);

      try {
        const userListResponse = await axios.get('/api/users/all', { params: { searchValue, pageNo: 0, limit: 20 } });
        setHasMore(userListResponse.data.payload.length > 0 ? true : false);
        setPageNo(1);
        setUserList(userListResponse.data.payload);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log('Error while fetching filtered users: ', err.message);
      }
    }
  }

  const fetchMoreUsers = async () => {
    if (!loading && hasMore) {
      setLoading(true);

      try {
        const userListResponse = await axios.get('/api/users/all', { params: { searchValue, pageNo, limit: 20 } });
        setHasMore(userListResponse.data.payload.length > 0 ? true : false);
        setPageNo(pageNo + 1);
        setUserList([...userList, ...userListResponse.data.payload]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log('Error while fetching users: ', err.message);
      }
    }
  }

  const updateUserRole = async (email, userRole, index) => {

    const updatedUserList = userList.map((curUser, curIndex) => {
      if (curIndex === index) {
        return ({...curUser, userRole});
      } else {
        return curUser;
      }
    });
    setUserList(updatedUserList);

    try {
      const headers = { 'Content-Type': 'application/json' };
      const updateRoleResponse = await axios.post('/api/users/update-role', { email, userRole }, { headers });
      if (updateRoleResponse.data.payload) {
        toast.success('User role updated successfully', { variant: 'success'});
      } else {
        toast.error('User role updation failed', { variant: 'error'});
      }
    } catch(err) {
      console.log('Error while updating User role', err.message);
      toast.error('User role updation failed', { variant: 'error'});
    }
  }

  const handleOnSearch = searchValue => {
    console.log('searchValue', searchValue)
    setSearchValue(searchValue);
    if (searchValue.length === 0 || searchValue.length > 2)
      fetchFilteredUsers(searchValue);
  }

  return (
    <Container>
      <SearchWrapper>
        <Search>
          <SearchInput 
            value={searchValue}
            placeholder={placeholder} 
            onChange={e => handleOnSearch(e.target.value)}
            onBlur={() => setPlaceholder('Search by Users name/email')} 
            onFocus={() => setPlaceholder('Type at least 3 characters')} 
          />

          <SearchIcon size='1.2em'/>
          <CancelIcon onClick={() => handleOnSearch('')} size='1.2em' />
        </Search>
      </SearchWrapper>

      <Header>
        <SmallColumn>Image</SmallColumn>
        <BigColumn>Name</BigColumn>
        <BigColumn>Email</BigColumn>
        <SmallColumn>Role</SmallColumn>
      </Header>

      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMoreUsers}
        hasMore={hasMore}
        loader={<Spinner key={0} containerStyle={{ marginTop: '15px', position: 'inherit' }} loaderStyle={{ fontSize: '15px' }} />}
      >
        {userList.map((curUser, index) => 
          <UserRow key={index}>
            <SmallColumn>
              {curUser.imageUrl ? <UserImage src={curUser.imageUrl} /> : <UserIcon size='2.2em'/>}
            </SmallColumn>
            
            <BigColumn>{`${curUser.firstName ? curUser.firstName : ''} ${curUser.lastName ? curUser.lastName : ''}`}</BigColumn>
            
            <BigColumn>{curUser.email}</BigColumn>
            
            <SmallColumn>
              <Select
                styles={customStyles}
                value={curUser.userRole ? {label: curUser.userRole, value: curUser.userRole} : null}
                placeholder='Role'
                options={roleList} 
                onChange={e => updateUserRole(curUser.email, e.value, index)} 
              />
            </SmallColumn>
          </UserRow>)}
      </InfiniteScroll>
    </Container>
  )
}
