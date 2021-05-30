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

const NewDivisionLink = styled(Link)`
  color: #232162;
  margin-right: 10px;
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

const DivisionRow = styled.div`
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

const MenuWrapper = styled.div`
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

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;

  @media ${device.laptop} {
    width: auto;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const BrandFilterWrapper = styled.div`
  width: 100%;
  margin-right: 20px;
  margin-bottom: 20px;

  @media ${device.laptop} {
    min-width: 250px;
    margin-bottom: 0;
  }
`;


const applicationOptions = applicationsArr
  .map(curApplication => ({
    label: curApplication,
    value: curApplication
  }));

export const AdminDivisionList = () => {
  const [divisionList, setDivisionList] = useState([]);
  const [filteredDivisionList, setFilteredDivisionList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [filteredCategoryList, setFilteredCategoryList] = useState([]);

  const [application, setApplication] = useState(null);
  const [category, setCategory] = useState(null);

  const fetchAllDivisions = async () => {
    setLoading(true);

    try {
      const divisionListResponse = await axios.get('/api/division');
      setDivisionList(divisionListResponse.data.payload);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log('Error while fetching divisions: ', err.message);
    }
  }

  useEffect(() => {
    fetchAllDivisions();
  }, []);

  // Fetching category list from backend on page
  useEffect(() => {
    axios.get('/api/category')
      .then(response => {
        setCategoryList(response.data.payload);
      })
      .catch(function (error) {
        console.log('Error while fetching categories', error);
      })
  }, []);

  useEffect(() => {
    if (application) {
      setFilteredDivisionList(divisionList.filter(curDivision => curDivision.application === application));
      setFilteredCategoryList(categoryList.filter(curCategory => curCategory.application === application));
    } else {
      setFilteredDivisionList(divisionList);
      setFilteredCategoryList([]);
    }
  }, [application, divisionList]);

  // Updating Category dropdown options on Application change
  useEffect(() => {
    const categoryOptionsUpdated = categoryList
      .filter(curCategory => curCategory.application === application)
      .map(curCategory => ({
        label: curCategory.name, value: curCategory.name
      }));

    setFilteredCategoryList(categoryOptionsUpdated);
    setCategory(null);
  }, [application, categoryList]);

  // Updating Brands when category is changed
  useEffect(() => {
    if (category)
      setFilteredDivisionList(divisionList.filter(curDivision => (curDivision.application === application) && (curDivision.category === category)));
  }, [category]);

  const handleOnDelete = async name => {
    const headers = { 'Content-Type': 'application/json' };

    try {
      const divisionDeleteResponse = await axios.post('/api/division/delete', { name, description: name }, headers);
      console.log('divisionDeleteResponse.data.payload', divisionDeleteResponse.data.payload);

      if (divisionDeleteResponse.data.payload) {
        toast.success(`${name} division deleted successfully`, { variant: 'success'});
        setTimeout(() => window.location.reload(), 5000);
      } else {
        toast.error(`${name} division deletion failed`, { variant: 'error'});
      }
    } catch (err) {
      console.log('Error while deleting division: ', err.message);
      toast.error(`${name} division deletion failed`, { variant: 'error'});
    }
  }

  return (
    <>
      {loading ?
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper> :
        <Container>
          <MenuWrapper>
            <NewDivisionLink to='/admin/division/new' >Add new division</NewDivisionLink>

            <FiltersWrapper>
              <BrandFilterWrapper>
                  <Select
                      placeholder='Application'
                      value={application ? {label: application, value: application} : null}
                      options={[{label: 'All', value: null}, ...applicationOptions]}
                      onChange={e => setApplication(e.value)}
                  />
              </BrandFilterWrapper>

              <BrandFilterWrapper>
                <Select
                  placeholder='Category filter'
                  value={category ? {label: category, value: category} : null}
                  options={filteredCategoryList}
                  onChange={e => setCategory(e.value)}
                />
              </BrandFilterWrapper>
            </FiltersWrapper>
          </MenuWrapper>

          <Header>
            <Column>Name</Column>
            <Column>Application</Column>
            <Column>Category</Column>
            <Column>Action</Column>
          </Header>

          {filteredDivisionList.map((curDivision, index) =>
            <DivisionRow key={index} >
              <Column>{curDivision.name}</Column>

              <Column>{curDivision.application}</Column>

              <Column>{curDivision.category}</Column>

              <Column>
                <Popup
                  trigger={<DeleteButton style={{ padding: '8px 24px' }}>Delete</DeleteButton>}
                  modal
                >
                  {close => (
                    <div className="admin-modal">
                      <button className="close" onClick={close}>&times;</button>

                      <div className="content">Are you sure you want to delete the division {curDivision.name}?</div>

                      <div className="actions">
                        <DeleteButtonPop onClick={() => handleOnDelete(curDivision.name)} >Yes, delete</DeleteButtonPop>

                        <CloseButton autoFocus className="button" onClick={() => close()} >Close</CloseButton>
                      </div>
                    </div>
                  )}
                </Popup>
              </Column>
            </DivisionRow>)
          }
        </Container>}
      </>
    )
}
