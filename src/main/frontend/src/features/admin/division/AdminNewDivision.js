import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

import { RichTextEditor } from '../../utils/RichTextEditor';
import { Input } from '../../utils/Input';
import { Button } from '../../homepage/common/Button';
import { applicationsArr } from '../../utils/productHierarchy';

const Container = styled.div`
    max-width: 400px;
`;

const Heading = styled.div`
  margin-bottom: 35px;
  font-size: 22px;
`;

const RichTextWrapper = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const AddButton = styled(AiOutlinePlus)`
  cursor: pointer;
  font-size: 25px;
  color: #40B3A2;
  margin-left: 10px;
  margin-top: 5px;
  border: 1px solid #40B3A2;
  padding: 2px;
  border-radius: 3px;
`;

const DeleteButton = styled(AiOutlineClose)`
  cursor: pointer;
  font-size: 25px;
  color: #F13C1F;
  margin-left: 10px;
  margin-top: 5px;
  border: 1px solid #F13C1F;
  padding: 2px;
  border-radius: 3px;
`;

const DivisionWrapper = styled.div`
  display: flex;
`;

const customStylesApplication = {
    container: (provided, state) => ({
        ...provided,
        marginBottom: '40px',
        zIndex: 1000000000
    })
};

const customStylesCategory = {
  container: (provided, state) => ({
      ...provided,
      marginBottom: '40px',
      zIndex: 100000000
  })
};

const customStylesBrand = {
  container: (provided, state) => ({
      ...provided,
      marginBottom: '40px',
      zIndex: 10000000
  })
};

export const AdminNewDivision = () => {
  const history = useHistory();

  const [divisionNames, setDivisionNames] = useState(['']);
  const [application, setApplication] = useState(applicationsArr[0]);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [description, setDescription] = useState('');

  const [categoryList, setCategoryList] = useState([]);
  const [filteredCategoryList, setFilteredCategoryList] = useState([]);

  const [brandList, setBrandList] = useState([]);
  const [filteredBrandList, setFilteredBrandList] = useState([]);

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
    axios.get('/api/brands')
      .then(response => {
        setBrandList(response.data.payload);
      })
      .catch(function (error) {
        console.log('Error while fetching brands', error);
      })
  }, []);

  useEffect(() => {
    const filteredCategoryListTemp = categoryList
      .filter(curCategory => curCategory.application === application)
      .map(curCategory => ({
        label: curCategory.name, value: curCategory.name
      }));

    setCategory(null);
    setFilteredCategoryList(filteredCategoryListTemp);
  }, [application, categoryList]);

  useEffect(() => {
    const filteredBrandListTemp = brandList
      .filter(curBrand => curBrand.application === application && curBrand.category === category)
      .map(curBrand => ({
        label: curBrand.name, value: curBrand.name
      }));

    setBrand(null);
    setFilteredBrandList(filteredBrandListTemp);
  }, [category, brandList]);


  const applicationOptions = applicationsArr
    .map(curApplication => ({
      label: curApplication, value: curApplication
    }));

  const handleApplicationChange = e => setApplication(e.value);

  const handleCategoryChange = e => setCategory(e.value);

  const handleBrandChange = e => setBrand(e.value);

  const handleOnSave = async () => {
    const validDivisionNames = divisionNames.every(curDivisionName => (curDivisionName !== null && curDivisionName !== ''))
    if (!validDivisionNames) {
      toast.error(`Division name cannot be empty`, { variant: 'error'});
      return;
    }

    if (!category) {
      toast.error(`Category cannot be empty`, { variant: 'error'});
      return;
    }

    const headers = { 'Content-Type': 'application/json' };

    try {
      const newDivisionResponse = await axios.post('/api/division/save', { divisionNames, description, application, category, brand }, headers);

      if (newDivisionResponse.data.payload) {
        toast.success(`Division created successfully`, { variant: 'success'});
        setTimeout(() => history.push('/admin/division'), 5000);
      } else {
        toast.error(`Division creation failed`, { variant: 'error'});
      }
    } catch (err) {
      console.log('Error while creating new division: ', err.message);
    }
  }

  const deletedivisionName = index => {
    setDivisionNames(divisionNames.filter((_, curIndex) => (curIndex !== index)));
  }

  const addNewDivision = () => {
    setDivisionNames([...divisionNames, '']);
  }

  const handleDivisionNameChange = (updatedDivisionName, index) => {
    setDivisionNames(divisionNames.map((curDivisionName, curIndex) => {
      return index === curIndex ?
        updatedDivisionName :
        curDivisionName;
    }))
  }

  return (
    <Container>
      <Heading>Add a new Division</Heading>

      <Select
        styles={customStylesApplication}
        value={{label: application, value: application}}
        options={applicationOptions}
        onChange={handleApplicationChange}
      />

      <Select
        styles={customStylesCategory}
        value={category ? {label: category, value: category} : null}
        options={filteredCategoryList}
        onChange={handleCategoryChange}
        placeholder='Select a category*'
      />

      <Select
        styles={customStylesBrand}
        value={brand ? {label: brand, value: brand} : null}
        options={filteredBrandList}
        onChange={handleBrandChange}
        placeholder='Select a brand'
      />

      {divisionNames.map((curDivisionName, index) =>
        <DivisionWrapper key={index}>
          <Input value={curDivisionName} handleOnChange={e => handleDivisionNameChange(e.target.value, index)} label={`Division name ${index}`} />

          {(divisionNames.length > 1 || (divisionNames.length - 1 !== index)) &&  <DeleteButton onClick={() => deletedivisionName(index)} />}
          {(divisionNames.length - 1 === index) &&  <AddButton onClick={addNewDivision} />}
        </DivisionWrapper>
      )}

      <RichTextWrapper>
        <RichTextEditor value={description} handleChange={setDescription} placeholder='Description' />
      </RichTextWrapper>

      <Button
        style={{ fontWeight: 'normal', fontSize: '14px', padding: '12px 30px', borderRadius: '3px' }}
        label='Save Division'
        handleOnClick={handleOnSave}
      />
    </Container>
  )
}
