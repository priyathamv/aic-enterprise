import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';

import { Spinner } from '../../utils/Spinner';

const Container = styled.div`
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
`;

const NewBrandLink = styled(Link)`
  text-decoration: none;
  background-color: #232162;
  color: #FFF;
  padding: 12px 30px;
  border-radius: 3px;
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

const CloseButton = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px 30px;
  cursor: pointer;
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0 0 5px 1px rgba(188,188,188,0.3);
  padding: 10px 50px;
  margin: 5px 0;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  height: 100%;
`;


export const AdminBrandList = () => {
  const [brandList, setBrandList] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchAllBrands = async () => {
    setLoading(true);

    try {
      const brandListResponse = await axios.get('/api/brands');
      setBrandList(brandListResponse.data.payload);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log('Error while fetching brands: ', err.message);
    }
  }

  useEffect(() => {
    fetchAllBrands();
  }, []);

  const handleOnDelete = async name => {
    const headers = { 'Content-Type': 'application/json' };

    try {
      const brandDeleteResponse = await axios.post('/api/brands/delete', { name, description: name }, headers);
      console.log('brandDeleteResponse.data.payload', brandDeleteResponse.data.payload);

      if (brandDeleteResponse.data.payload) {
        toast.success(`${name} brand deleted successfully`, { variant: 'success'});
        setTimeout(() => window.location.reload(), 5000);
      } else {
        toast.error(`${name} brand deletion failed`, { variant: 'error'});
      }
    } catch (err) {
      console.log('Error while deleting brand: ', err.message);
      toast.error(`${name} brand deletion failed`, { variant: 'error'});
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
            <NewBrandLink to='/admin/brands/new' >Add new brand</NewBrandLink>
          </MenuWrapper>

          <Header>
            <Column>Name</Column>
            <Column>Description</Column>
            <Column>Action</Column>
          </Header>

          {brandList.map((curBrand, index) => 
            <BrandRow key={index} >
              <Column>{curBrand.name}</Column>
              
              <Column>{curBrand.description}</Column>
              
              <Column>
                <Popup
                  trigger={<DeleteButton style={{ padding: '8px 24px' }}>Delete</DeleteButton>}
                  modal
                >
                  {close => (
                    <div className="admin-modal">
                      <button className="close" onClick={close}>&times;</button>

                      <div className="content">Are you sure you want to delete the brand {curBrand.name}?</div>

                      <div className="actions">
                        <DeleteButton onClick={() => handleOnDelete(curBrand.name)} >Yes, delete</DeleteButton>
                        
                        <CloseButton autoFocus className="button" onClick={() => close()} >Close</CloseButton>
                      </div>
                    </div>
                  )}
                </Popup>
              </Column>
            </BrandRow>)
          }
        </Container>}
      </>
    )
}
