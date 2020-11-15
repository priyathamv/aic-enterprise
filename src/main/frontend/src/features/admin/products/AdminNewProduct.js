import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

import { Input } from '../../utils/Input';
import { Button } from '../../homepage/common/Button';
import { device } from '../../utils/viewport';
import { AdminProductImage } from './AdminProductImage';

const Container = styled.div`
`;

const Form = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 50px;
  margin-bottom: 50px;
  
  @media ${device.tablet} { 
    grid-template-columns: 1fr 1fr;
  }
`;

const Heading = styled.div`
  margin-bottom: 35px;
  font-size: 22px;
`;

const SelectWrapper = styled.div`
  width: 350px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin-right: 20px;
`;

const Label = styled.div`
  cursor: pointer;
  color: #232162;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const isFeaturedOptions = [
  {label: 'Featured Product', value: 'Featured Product'},
  {label: 'Non Featured Product', value: 'Non Featured Product'}
]

export const AdminNewProduct = () => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [capacity, setCapacity] = useState('');
  const [pack, setPack] = useState('');
  const [division, setDivision] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);

  const [brandList, setBrandList] = useState([]);

  const history = useHistory();

  const handleOnSave = async () => {
    if (!code || !name || !brand) {
      toast.error(`Please fill the mandatory fields`, { variant: 'error'});
      return;
    }
    const headers = { 'Content-Type': 'application/json' };

    const requestBody = { 
      productList: [
        { code, name, brand, capacity, pack, division, description, imageUrls: (isFeatured ? imageUrls : null) }
      ] 
    };

    try {
      const url = isFeatured ? '/api/featured-products/save' : '/api/products/save';

      const newProductResponse = await axios.post(url, requestBody, headers);
      
      if (newProductResponse.data.payload) {
        toast.success(`${name} product created successfully`, { variant: 'success'});
        setTimeout(() => history.push('/admin/products'), 5000);
      } else {
        toast.error(`${name} product creation failed`, { variant: 'error'});
      }
    } catch (err) {
      console.log('Error while creating new product: ', err.message);
    }
  }

  const fetchBrandList = async () => {
    try {
      const brandListResponse = await axios.get('/api/brands');
      setBrandList(brandListResponse.data.payload.map(curBrandObj => curBrandObj.name));
    } catch(err) {
      console.log('Error while fetching brands: ', err.message);
      setBrandList([]);
    }
  }

  useEffect(() => {
    fetchBrandList();
  }, []);

  return (
    <Container>
      <Heading>Add a new Product</Heading>

      <Form>
        <SelectWrapper>
          <Select
            isSearchable={true}
            placeholder='Select a Brand*'
            value={brand ? {label: brand, value: brand} : null}
            options={brandList.map(curBrand => ({label: curBrand, value: curBrand}))} 
            onChange={e => setBrand(e.value)} 
          />
        </SelectWrapper>

        <SelectWrapper>
          <Select
            placeholder='Is Featured*'
            value={isFeatured ? isFeaturedOptions[0] : isFeaturedOptions[1]}
            options={isFeaturedOptions} 
            onChange={e => e.value === isFeaturedOptions[0].value ? setIsFeatured(true) : setIsFeatured(false)} 
          />
        </SelectWrapper>

        <Input styleObj={{ maxWidth: '350px', marginBottom: '0' }} value={code} handleOnChange={e => setCode(e.target.value)} label='Code*' />

        <Input styleObj={{ maxWidth: '350px', marginBottom: '0' }} value={name} handleOnChange={e => setName(e.target.value)} label='Name*' />
        
        <Input styleObj={{ maxWidth: '350px', marginBottom: '0' }} value={capacity} handleOnChange={e => setCapacity(e.target.value)} label='Capacity' />
        
        <Input styleObj={{ maxWidth: '350px', marginBottom: '0' }} value={pack} handleOnChange={e => setPack(e.target.value)} label='Pack' />
        
        <Input styleObj={{ maxWidth: '350px', marginBottom: '0' }} value={division} handleOnChange={e => setDivision(e.target.value)} label='Division' />

        <Input styleObj={{ maxWidth: '350px', marginBottom: '0' }} value={description} handleOnChange={e => setDescription(e.target.value)} label='Description' />
      </Form>

      {imageUrls.length > 0 && <Label onClick={() => setImageUrls([])}>Reset Images</Label>}
      {imageUrls.map((curImageUrl, index) => <Image key={index} src={curImageUrl} alt={`image_${index}`}/>)}

      {isFeatured && <AdminProductImage imageUrls={imageUrls} setImageUrls={setImageUrls}/>}
      
      <Button 
        style={{ fontWeight: 'normal', fontSize: '14px', padding: '12px 30px', borderRadius: '3px' }} 
        label='Save product' 
        handleOnClick={handleOnSave}
      />
    </Container>
  )
}
