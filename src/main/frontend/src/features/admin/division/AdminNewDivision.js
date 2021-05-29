import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Select from 'react-select';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export const AdminNewDivision = () => {
  const [name, setName] = useState('');
  const [application, setApplication] = useState(applicationsArr[0]);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState('');

  const [categoryList, setCategoryList] = useState([]);
  const [filteredCategoryList, setFilteredCategoryList] = useState([]);

  const history = useHistory();

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
    const filteredCategoryListTemp = categoryList
      .filter(curCategory => curCategory.application === application)
      .map(curCategory => ({
        label: curCategory.name, value: curCategory.name
      }));

    setCategory(null);
    setFilteredCategoryList(filteredCategoryListTemp);
  }, [application, categoryList]);


  const applicationOptions = applicationsArr
    .map(curApplication => ({
      label: curApplication, value: curApplication
    }));

  const handleApplicationChange = e => setApplication(e.value);

  const handleCategoryChange = e => setCategory(e.value);

  const handleOnSave = async () => {
    if (!name || !category) {
      toast.error(`Division ${name ? 'category' : 'name'} cannot be empty`, { variant: 'error'});
      return;
    }
    const headers = { 'Content-Type': 'application/json' };

    console.log('name, description, application, category', name, description, application, category);
    try {
      const newDivisionResponse = await axios.post('/api/division/save', { name, description, application, category }, headers);

      if (newDivisionResponse.data.payload) {
        toast.success(`${name} division created successfully`, { variant: 'success'});
        setTimeout(() => history.push('/admin/division'), 5000);
      } else {
        toast.error(`${name} Division creation failed`, { variant: 'error'});
      }
    } catch (err) {
      console.log('Error while creating new division: ', err.message);
    }
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

      <Input value={name} handleOnChange={e => setName(e.target.value)} label='Division name*' />

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
