import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { selectGoogleAuth, selectEmailAuth, updateEmailAuthDetails, updateGoogleAuthDetails } from '../auth/authSlice';
import { Line } from '../homepage/common/Line';
import { Input } from '../utils/Input';
import { countries, indianStates } from '../utils/countries';
import { selectUserDetails } from '../auth/authSlice';
import { Spinner } from '../utils/Spinner';
import { device } from '../utils/viewport';

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
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
  }
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

export const MyDetailsForm = () => {
  const viewportWidth = window.outerWidth;
  const isMobile = viewportWidth < 768;

  const dispatch = useDispatch();
  
  const [updateMsg, setUpdateMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const isGoogleLogin = useSelector(selectGoogleAuth).email;
  const isNormalLogin = useSelector(selectEmailAuth).email;
  
  const { firstName, lastName, email, phoneNumber, addressList } = useSelector(selectUserDetails);
  
  const [firstNameLocal, setFirstNameLocal] = useState('');
  const [lastNameLocal, setLastNameLocal] = useState('');
  const [phoneNumberLocal, setPhoneNumberLocal] = useState('');
  const [streetLocal, setStreetLocal] = useState('');
  const [cityLocal, setCityLocal] = useState('');
  const [zipLocal, setZipLocal] = useState('');
  const [stateLocal, setStateLocal] = useState('');
  const [countryLocal, setCountryLocal] = useState('');
  
  useEffect(() => {
    setFirstNameLocal(firstName);
    setLastNameLocal(lastName);
    setPhoneNumberLocal(phoneNumber ? phoneNumber : '');
    if (addressList.length) {
      setStreetLocal(addressList[0].street);
      setCityLocal(addressList[0].city);
      setStateLocal(addressList[0].state);
      setZipLocal(addressList[0].zip);
      setCountryLocal(addressList[0].country ? addressList[0].country : 'India');
    } else {
      setCountryLocal('India');
    }
  }, [firstName, lastName, email, phoneNumber, addressList]);

  const handleUpdateInfo = async userDetails => {
    const headers = { 'Content-Type': 'application/json' };
    try {
      setIsLoading(true);
      const userUpdateResponse = await axios.post('/api/users/update', userDetails, { headers });
      if (userUpdateResponse.data.payload === true) {
        setUpdateMsg('Account details updated successfully');
        if (isGoogleLogin) {
          dispatch(updateEmailAuthDetails(userDetails));
        } else if (isNormalLogin) {
          dispatch(updateGoogleAuthDetails(userDetails));
        }
      }
    } catch (err) {
      console.log('Error while updating user info', err.message);
      setUpdateMsg('Failed to update Account details');
    }
    setIsLoading(false);
  }

  const mobileInputStyle = { flex: 1, marginRight: '50px' }

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
            styleObj={isMobile ? null : mobileInputStyle}
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
            styleObj={isMobile ? null : mobileInputStyle}
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
            styleObj={isMobile ? null : mobileInputStyle}
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

        <FormFrame>
          {countryLocal === 'India' ? 
          <Select
            styles={customStyles}
            className='dropdown-wrapper margin-right50'
            value={stateLocal ? {'label': stateLocal, 'value': stateLocal} : null}
            isSearchable={true}
            placeholder='State'
            options={indianStates.map(curState => ({label: curState, value: curState}))} 
            onChange={e => setStateLocal(e.value)} 
          /> :
          <Input 
            styleObj={isMobile ? null : mobileInputStyle}
            value={stateLocal} 
            handleOnChange={e => setStateLocal(e.target.value)} 
            isRequired={false} 
            label='State' 
          />}

          <Select
            styles={customStyles}
            className='dropdown-wrapper'
            value={countryLocal ? {'label': countryLocal, 'value': countryLocal} : null}
            isSearchable={true}
            placeholder='Country'
            options={countries.map(curCountry => ({label: curCountry, value: curCountry}))} 
            onChange={e => {setStateLocal(''); setCountryLocal(e.value)}} 
          />
        </FormFrame>

        <Button 
          onClick={() => handleUpdateInfo({
            email,
            firstName: firstNameLocal,
            lastName: lastNameLocal,
            phoneNumber: phoneNumberLocal,
            addressList: [{ street: streetLocal, city: cityLocal, zip: zipLocal, state: stateLocal, country: countryLocal }]
          })}
          disabled={isLoading}
        >
          {!isLoading && 'Update Info'}
          {isLoading ? 
          <Spinner loaderStyle={{ fontSize: '15px', color: '#FFF' }} /> : 
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
