import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Select from 'react-select';

import { Line } from '../homepage/common/Line';
import { Input } from '../utils/Input';
import { countries } from '../utils/countries';
import { selectUserDetails } from '../auth/authSlice';
import { Spinner } from '../utils/Spinner';


const Container = styled.div`

`;

const Header = styled.div`
`;

const Heading = styled.div`
  margin-bottom: 10px;
  font-size: 22px;
`;
  
const SubHeading = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
`;

const AccountForm = styled.div`
  margin-top: 50px;
`;

const FormFrame = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 47%;
  background-color: #232162;
  color: #FFF;
  border: none;
  padding: 15px 0;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  min-height: 46px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const Message = styled.div`
  width: 47%;
  color: red;
  text-align: center;
  margin-bottom: 20px;
`;


export const MyDetailsForm = ({ imageUrl, handleUpdateInfo, isLoading, updateMsg }) => {
  
  const { firstName, lastName, email, phoneNumber, addressList } = useSelector(selectUserDetails);
  
  
  const [firstNameLocal, setFirstNameLocal] = useState('');
  const [lastNameLocal, setLastNameLocal] = useState('');
  const [phoneNumberLocal, setPhoneNumberLocal] = useState('');
  const [streetLocal, setStreetLocal] = useState('');
  const [cityLocal, setCityLocal] = useState('');
  const [zipLocal, setZipLocal] = useState('');
  const [countryLocal, setCountryLocal] = useState('');
  
  useEffect(() => {
    setFirstNameLocal(firstName);
    setLastNameLocal(lastName);
    setPhoneNumberLocal(phoneNumber ? phoneNumber : '');
    if (addressList.length) {
      setStreetLocal(addressList[0].street);
      setCityLocal(addressList[0].city);
      setZipLocal(addressList[0].zip);
      setCountryLocal(addressList[0].country ? addressList[0].country : 'India');
    }
  }, [firstName, lastName, email, phoneNumber, addressList]);

  console.log({'label': countryLocal, 'value': countryLocal})
  return (
    <Container>
      <Header>
        <Heading>My Account</Heading>
        <SubHeading>View and edit your personal info below.</SubHeading>
      </Header>

      <Line style={{ marginBottom: '20px', backgroundColor: '#6969692e' }} />

      <AccountForm>
        <FormFrame>
          <Input 
            styleObj={{ flex: 1, marginRight: '50px' }}
            value={firstNameLocal} 
            handleOnChange={e => setFirstNameLocal(e.target.value)} 
            isRequired={false} 
            label='First Name' 
          />

          <Input 
            styleObj={{ flex: 1 }}
            value={lastNameLocal} 
            handleOnChange={e => setLastNameLocal(e.target.value)} 
            isRequired={false} 
            label='Last Name' 
          />
        </FormFrame>

        <FormFrame>
          <Input 
            styleObj={{ flex: 1, marginRight: '50px' }}
            value={email} 
            handleOnChange={() => {}}
            isRequired={false} 
            disabled={true}
            label='Email' 
          />

          <Input 
            styleObj={{ flex: 1 }}
            value={phoneNumberLocal} 
            handleOnChange={e => setPhoneNumberLocal(e.target.value)} 
            isRequired={false} 
            label='Phone' 
          />
        </FormFrame>

        <Input 
          value={streetLocal} 
          handleOnChange={e => setStreetLocal(e.target.value)} 
          isRequired={false} 
          label='Address' 
        />

        <FormFrame>
          <Input 
            styleObj={{ flex: 1, marginRight: '50px' }}
            value={cityLocal} 
            handleOnChange={e => setCityLocal(e.target.value)} 
            isRequired={false} 
            label='City' 
          />

          <Input 
            styleObj={{ flex: 1 }}
            value={zipLocal} 
            handleOnChange={e => setZipLocal(e.target.value)} 
            isRequired={false} 
            label='Zip' 
          />
        </FormFrame>

        <Select
          className='dropdown-wrapper'
          value={countryLocal ? {'label': countryLocal, 'value': countryLocal} : null}
          isSearchable={true}
          placeholder='Country'
          options={countries.map(curCountry => ({label: curCountry, value: curCountry}))} 
          onChange={e => setCountryLocal(e.value)} 
        />

        <Button 
          onClick={() => handleUpdateInfo({
            email,
            firstName: firstNameLocal,
            lastName: lastNameLocal,
            imageUrl,
            phoneNumber: phoneNumberLocal,
            addressList: [{ street: streetLocal, city: cityLocal, zip: zipLocal, country: countryLocal }]
          })}
          disabled={isLoading}
        >
          {!isLoading && 'Update Info'}
          {isLoading ? 
          <Spinner 
            containerStyle={{ top: 0, width: '100%' }} 
            loaderStyle={{ fontSize: '15px', color: '#FFF' }} 
          /> : 
          null}
        </Button>

        {updateMsg && 
          <Message style={updateMsg === 'Account details updated successfully' ? {color: 'green'} : null}>
            {updateMsg}
          </Message>}
      </AccountForm>
    </Container>
  )
}
