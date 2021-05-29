import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RichTextEditor } from '../../utils/RichTextEditor';
import { Input } from '../../utils/Input';
import { Button } from '../../homepage/common/Button';

const Container = styled.div`
`;

const Heading = styled.div`
  margin-bottom: 35px;
  font-size: 22px;
`;

const RichTextWrapper = styled.div`
  width: 400px;
  margin-bottom: 20px;
  position: relative;
`;

export const AdminNewBrand = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  const handleOnSave = async () => {
    if (!name) {
      toast.error(`Brand name cannot be empty`, { variant: 'error'});
      return;
    }
    const headers = { 'Content-Type': 'application/json' };

    try {
      const newBrandResponse = await axios.post('/api/brands/save', { name, description }, headers);

      if (newBrandResponse.data.payload) {
        toast.success(`${name} brand created successfully`, { variant: 'success'});
        setTimeout(() => history.push('/admin/brands'), 5000);
      } else {
        toast.error(`${name} brand creation failed`, { variant: 'error'});
      }
    } catch (err) {
      console.log('Error while creating new brands: ', err.message);
    }
  }

  return (
    <Container>
      <Heading>Add a new Brand</Heading>

      <Input styleObj={{ maxWidth: '300px' }} value={name} handleOnChange={e => setName(e.target.value)} label='Brand name*' />

      {/* <Input styleObj={{ maxWidth: '300px' }} value={description} handleOnChange={e => setDescription(e.target.value)} label='Description' /> */}
      <RichTextWrapper>
        <RichTextEditor value={description} handleChange={setDescription} placeholder='Description' />
      </RichTextWrapper>

      <Button
        style={{ fontWeight: 'normal', fontSize: '14px', padding: '12px 30px', borderRadius: '3px' }}
        label='Save brand'
        handleOnClick={handleOnSave}
      />
    </Container>
  )
}
