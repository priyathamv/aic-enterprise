import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Button } from '../homepage/common/Button';
import Select from 'react-select';

import { Input } from '../utils/Input';
import { countries, indianStates } from '../utils/countries';
import { selectUserDetails } from '../auth/authSlice';

const Container = styled.div`
  flex: 3;
  padding: 30px;
`;

const Label = styled.div`
  font-size: 20px;
  margin-bottom: 30px;
`;

const EmailsFrame = styled.div`
  display: flex;
  justify-content: space-between;
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

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: '2px 0',
    cursor: 'pointer'
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer'
  })
}


export const EnquiryForm = ({ styles }) => {
  const userDetails = useSelector(selectUserDetails);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [cas, setCas] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('India');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setName(`${userDetails.firstName} ${userDetails.lastName}`);
    setEmail(userDetails.email);
    setPhoneNumber(userDetails.phoneNumber);
    if (userDetails.addressList && userDetails.addressList.length) {
      setAddress(userDetails.addressList[0].street);
      setCity(userDetails.addressList[0].city);
      setZip(userDetails.addressList[0].zip);
      setState(userDetails.addressList[0].state);
      setCountry(userDetails.addressList[0].country ? userDetails.addressList[0].country : 'India');
    }
  }, [userDetails])

  const handleOnClick = () => {
    if (email) {
      console.log('damn', name, email, phoneNumber, company, cas, productDesc, address, city, zip, state, country);
    } else {
      setMessage('Please enter email');
      setTimeout(() => setMessage(null), 5000);
    }

  }


  return (
    <Container style={styles}>
      <Label>Send us a message</Label>
      
      <Input value={name} handleOnChange={e => setName(e.target.value)} label='Name' />
      
      <EmailsFrame>
        <Input styleObj={{flex: 1, marginRight: '50px'}} value={phoneNumber} handleOnChange={e => setPhoneNumber(e.target.value)} label='Phone Number' />
        <Input styleObj={{flex: 1}} value={email} handleOnChange={e => setEmail(e.target.value.toLowerCase())} isRequired={true} label='Email*' />
      </EmailsFrame>
      
      <EmailsFrame>
        <Input styleObj={{flex: 1, marginRight: '50px'}} value={company} handleOnChange={e => setCompany(e.target.value)} label='Company Name' />
        <Input styleObj={{flex: 1}} value={cas} handleOnChange={e => setCas(e.target.value)} label='CAS Number of product' />
      </EmailsFrame>
      
      <Input value={productDesc} handleOnChange={e => setProductDesc(e.target.value)} label='Product Description' />
      
      <Input value={address} handleOnChange={e => setAddress(e.target.value)} label='Address' />
      
      <EmailsFrame>
        <Input styleObj={{flex: 1, marginRight: '50px'}} value={city} handleOnChange={e => setCity(e.target.value)} label='City' />
        <Input styleObj={{flex: 1}} value={zip} handleOnChange={e => setZip(e.target.value)} label='Zip' />
      </EmailsFrame>

      <EmailsFrame>
        {country === 'India' ? 
        <Select
          styles={customStyles}
          className='dropdown-wrapper margin-right50'
          value={state ? {'label': state, 'value': state} : null}
          isSearchable={true}
          placeholder='State'
          options={indianStates.map(curState => ({label: curState, value: curState}))} 
          onChange={e => setState(e.value)} 
        /> :
        <Input 
          styleObj={{ flex: 1, marginRight: '50px' }}
          value={state} 
          handleOnChange={e => setState(e.target.value)} 
          isRequired={false} 
          label='State' 
        />}

        <Select
          styles={customStyles}
          className='dropdown-wrapper'
          value={country ? {'label': country, 'value': country} : null}
          isSearchable={true}
          placeholder='Country'
          options={countries.map(curCountry => ({label: curCountry, value: curCountry}))} 
          onChange={e => {setState(''); setCountry(e.value)}} 
        />
      </EmailsFrame>

      <ButtonWrapper>
        <Button style={{ width: '27%', fontSize: '14px', marginBottom: '10px' }} label='SUBMIT' handleOnClick={handleOnClick} />

        <Message>{message}</Message>
      </ButtonWrapper>
    </Container>
  )
}
