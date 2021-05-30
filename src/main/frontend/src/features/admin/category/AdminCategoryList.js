import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
import Select from 'react-select';

import { Spinner } from '../../utils/Spinner';
import { device } from '../../utils/viewport';
import { applicationsArr } from '../../utils/productHierarchy';

const Container = styled.div`
`;

const NewCategoryLink = styled(Link)`
  color: #232162;
  margin-right: 20px;
  text-decoration: underline;
`;

const Header = styled.div`
  display: flex;
  background-color: #232162;
  color: #FFF;
  padding: 15px 50px;
  border-radius: 3px;
  font-weight: bold;
`;

const Column = styled.div`
  flex: 1;
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

const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0 0 5px 1px rgba(188,188,188,0.3);
  padding: 10px;
  margin: 5px 0;

  @media ${device.tablet} {
    padding: 10px 50px;
  }
`;

const SpinnerWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;

  @media ${device.laptop} {
    width: auto;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const BrandFilterWrapper = styled.div`
  width: 100%;
  margin-right: 20px;
  margin-bottom: 20px;

  @media ${device.laptop} {
    max-width: 250px;
    margin-bottom: 0;
  }
`;

const applicationOptions = applicationsArr
  .map(curApplication => ({
    label: curApplication,
    value: curApplication
  }));

export const AdminCategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [filteredCategoryList, setFilteredCategoryList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState(null);

  const fetchAllCategories = async () => {
    setLoading(true);

    try {
      const categoryListResponse = await axios.get('/api/category');
      setCategoryList(categoryListResponse.data.payload);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log('Error while fetching categories: ', err.message);
    }
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (application)
        setFilteredCategoryList(categoryList.filter(curCategory => curCategory.application === application));
    else
        setFilteredCategoryList(categoryList);
  }, [application, categoryList]);

  const handleOnDelete = async name => {
    const headers = { 'Content-Type': 'application/json' };

    try {
      const categoryDeleteResponse = await axios.post('/api/category/delete', { name, description: name }, headers);
      console.log('categoryDeleteResponse.data.payload', categoryDeleteResponse.data.payload);

      if (categoryDeleteResponse.data.payload) {
        toast.success(`${name} category deleted successfully`, { variant: 'success'});
        setTimeout(() => window.location.reload(), 5000);
      } else {
        toast.error(`${name} category deletion failed`, { variant: 'error'});
      }
    } catch (err) {
      console.log('Error while deleting category: ', err.message);
      toast.error(`${name} category deletion failed`, { variant: 'error'});
    }
  }

  return (
    <>
      {loading ?
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper> :
        <Container>
          <FilterWrapper>
            <NewCategoryLink to='/admin/category/new' >Add new category</NewCategoryLink>

            <BrandFilterWrapper>
                <Select
                    placeholder='Application'
                    value={application ? {label: application, value: application} : null}
                    options={[{label: 'All', value: null}, ...applicationOptions]}
                    onChange={e => setApplication(e.value)}
                />
            </BrandFilterWrapper>
          </FilterWrapper>

          <Header>
            <Column>Name</Column>
            <Column>Application</Column>
            <Column>Action</Column>
          </Header>

          {filteredCategoryList.map((curCategory, index) =>
            <CategoryRow key={index} >
              <Column>{curCategory.name}</Column>

              <Column>{curCategory.application}</Column>

              <Column>
                <Popup
                  trigger={<DeleteButton style={{ padding: '8px 24px' }}>Delete</DeleteButton>}
                  modal
                >
                  {close => (
                    <div className="admin-modal">
                      <button className="close" onClick={close}>&times;</button>

                      <div className="content">Are you sure you want to delete the category {curCategory.name}?</div>

                      <div className="actions">
                        <DeleteButtonPop onClick={() => handleOnDelete(curCategory.name)} >Yes, delete</DeleteButtonPop>

                        <CloseButton autoFocus className="button" onClick={() => close()} >Close</CloseButton>
                      </div>
                    </div>
                  )}
                </Popup>
              </Column>
            </CategoryRow>)
          }
        </Container>}
      </>
    )
}
