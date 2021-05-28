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

const customStyles = {
    container: (provided, state) => ({
        ...provided,
        marginBottom: '40px',
        zIndex: 1000000000
    })
};

export const AdminNewCategory = () => {
  const [name, setName] = useState('');
  const [application, setApplication] = useState(applicationsArr[0]);
  const [description, setDescription] = useState('');
  const history = useHistory();

  const applicationOptions = applicationsArr
    .map(curApplication => ({
      label: curApplication, value: curApplication
    }));

  const handleApplicationChange = e => {
    setApplication(e.value);
  }

  const handleOnSave = async () => {
    if (!name) {
      toast.error(`Category name cannot be empty`, { variant: 'error'});
      return;
    }
    const headers = { 'Content-Type': 'application/json' };

    try {
      const newCategoryResponse = await axios.post('/api/category/save', { name, description, application }, headers);

      if (newCategoryResponse.data.payload) {
        toast.success(`${name} category created successfully`, { variant: 'success'});
        setTimeout(() => history.push('/admin/category'), 5000);
      } else {
        toast.error(`${name} Category creation failed`, { variant: 'error'});
      }
    } catch (err) {
      console.log('Error while creating new category: ', err.message);
    }
  }

  return (
    <Container>
      <Heading>Add a new Category</Heading>

      <Select
        styles={customStyles}
        value={{label: application, value: application}}
        options={applicationOptions}
        onChange={handleApplicationChange}
      />

      <Input value={name} handleOnChange={e => setName(e.target.value)} label='Name*' />

      <RichTextWrapper>
        <RichTextEditor value={description} handleChange={setDescription} placeholder='Description' />
      </RichTextWrapper>

      <Button
        style={{ fontWeight: 'normal', fontSize: '14px', padding: '12px 30px', borderRadius: '3px' }}
        label='Save Category'
        handleOnClick={handleOnSave}
      />
    </Container>
  )
}
