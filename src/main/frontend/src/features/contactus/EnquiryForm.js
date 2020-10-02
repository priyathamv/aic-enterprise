import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../homepage/common/Button';

import { Input } from '../utils/Input';

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


export const EnquiryForm = ({ styles }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [cas, setCas] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  const [message, setMessage] = useState(null);

  const handleOnClick = () => {
    if (name && phone && email && company && cas && productDesc && address && pincode) {

    } else {
      setMessage('Please enter all the mandatory fields');
      setTimeout(() => setMessage(null), 5000);
    }

  }


  return (
    <Container style={styles}>
      <Label>Send us a message</Label>
      
      <Input value={name} handleOnChange={e => setName(e.target.value)} isRequired={true} label='Name*' />
      
      <EmailsFrame>
        <Input styleObj={{flex: 1, marginRight: '50px'}} value={phone} handleOnChange={e => setPhone(e.target.value)} isRequired={true} label='Phone Number' />
        <Input styleObj={{flex: 1}} value={email} handleOnChange={e => setEmail(e.target.value.toLowerCase())} isRequired={true} label='Email*' />
      </EmailsFrame>
      
      <EmailsFrame>
      <Input styleObj={{flex: 1, marginRight: '50px'}} value={company} handleOnChange={e => setCompany(e.target.value)} isRequired={true} label='Company Name*' />
      <Input styleObj={{flex: 1}} value={cas} handleOnChange={e => setCas(e.target.value)} isRequired={true} label='CAS Number of product*' />
      </EmailsFrame>
      
      <Input value={productDesc} handleOnChange={e => setProductDesc(e.target.value)} isRequired={true} label='Product Description*' />
      
      <Input value={address} handleOnChange={e => setAddress(e.target.value)} isRequired={true} label='Address*' />
      
      <Input value={pincode} handleOnChange={e => setPincode(e.target.value)} isRequired={true} label='Pincode*' />

      <ButtonWrapper>
        <Button style={{ width: '27%', fontSize: '14px', marginBottom: '10px' }} label='SUBMIT' handleOnClick={handleOnClick} />

        <Message>{message}</Message>
      </ButtonWrapper>
    </Container>
  )
}
