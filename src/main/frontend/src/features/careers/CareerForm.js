import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../homepage/common/Button';

import { device } from '../utils/viewport';
import { Input } from '../utils/Input';
import axios from 'axios';

const Container = styled.div`
  flex: 3;
  padding: 30px;
`;

const Label = styled.div`
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Message = styled.div`
  color: #ff0000c7;
`;


export const CareerForm = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [currentDesignation, setCurrentDesignation] = useState('');
  const [applyingFor, setApplyingFor] = useState('');
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState(null);

  const handleOnClick = async () => {
    console.log('damn', firstName, lastName, email, mobileNumber, workExperience, currentDesignation, applyingFor);
    if (!firstName || !lastName || !email || !mobileNumber || !workExperience || !currentDesignation || !applyingFor || !resume) {
      setMessage('Please enter all mandatory fields');
      setTimeout(() => setMessage(null), 5000);
    } else {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('mobileNumber', mobileNumber);
      formData.append('workExperience', workExperience);
      formData.append('currentDesignation', currentDesignation);
      formData.append('applyingFor', applyingFor);
      formData.append('resume', resume);

      axios({
        method: 'post',
        url: '/api/common/careers',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(function (response) {
        console.log('success', response);
        setMessage('Thanks for submitting your details.');
        setTimeout(() => setMessage(null), 5000);
        resetFormDetails();
      })
      .catch(function (response) {
        console.log('Error while uploading the career form', response);
        setMessage('Failed to submit details, please try again later.');
        setTimeout(() => setMessage(null), 5000);
      });
    }
  }

  const resetFormDetails = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setMobileNumber('');
    setWorkExperience('');
    setCurrentDesignation('');
    setApplyingFor('');
    setResume(null);
    document.getElementById('file_id').value = '';
  }


  return (
    <Container>
      <Input value={firstName} handleOnChange={e => setFirstName(e.target.value)} label='First Name*' />

      <Input value={lastName} handleOnChange={e => setLastName(e.target.value)} label='Last Name*' />

      <Input value={email} handleOnChange={e => setEmail(e.target.value)} label='Email*' />

      <Input value={mobileNumber} handleOnChange={e => setMobileNumber(e.target.value)} label='Mobile Number*' />

      <Input value={workExperience} handleOnChange={e => setWorkExperience(e.target.value)} label='Work Experience*' />

      <Input value={currentDesignation} handleOnChange={e => setCurrentDesignation(e.target.value)} label='Current Designation*' />

      <Input value={applyingFor} handleOnChange={e => setApplyingFor(e.target.value)} label='Applying for*' />

      <Label>Attach Your Resume / Portfolio</Label>
      
      <input id='file_id' type='file' name='file' onChange={e => setResume(e.target.files[0])}/>

      <ButtonWrapper>
        <Button style={{ fontSize: '14px', marginBottom: '10px' }} label='SUBMIT' handleOnClick={handleOnClick} />

        <Message style={ message === 'Thanks for submitting your details.' ? { color: '#232162' } : {} }>{message}</Message>
      </ButtonWrapper>
    </Container>
  )
}
