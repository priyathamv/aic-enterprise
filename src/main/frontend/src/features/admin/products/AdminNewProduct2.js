import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import ReactDragListView from 'react-drag-listview/lib/index.js';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';

import { Input } from '../../utils/Input';
import { Button } from '../../homepage/common/Button';
import { device } from '../../utils/viewport';
import { AdminProductImage } from './AdminProductImage';
import { AuxilaryImage } from './AuxilaryImage';

const { DragColumn } = ReactDragListView;


const Container = styled.div`
`;

const Form = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 50px;
  margin-bottom: 50px;
  
  @media ${device.tablet} { 
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Heading = styled.div`
  margin-bottom: 35px;
  font-size: 22px;
`;

const SelectWrapper = styled.div`
  width: 250px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin-right: 20px;
  margin-bottom: 10px;
`;

const ResetButton = styled.div`
  cursor: pointer;
  color: #232162;
  font-size: 14px;
  margin-bottom: 10px;
  display: table;

  &:hover {
    text-decoration: underline;
  }
`;

const Label = styled.div`
  color: #232162;
  margin-bottom: 10px;
`;

const CapacityWrapper = styled.div`
  
`;

const CapacityPack = styled.div`
  display: flex;

`;

const AddButton = styled(AiOutlinePlus)`
  cursor: pointer;
  font-size: 25px;
  color: #40B3A2;
  margin-top: 5px;
  border: 1px solid #40B3A2;
  padding: 2px;
  border-radius: 3px;
`;

const DeleteButton = styled(AiOutlineClose)`
  cursor: pointer;
  font-size: 25px;
  color: #F13C1F;
  margin-top: 5px;
  border: 1px solid #F13C1F;
  padding: 2px;
  border-radius: 3px;
`;

const categoryOptions = [
  {label: 'Analytical', value: 'Analytical'}
]

export const AdminNewProduct2 = () => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [division, setDivision] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const [od, setOD] = useState('');
  const [height, setHeight] = useState('');
  const [capacityPackList, setCapacityPackList] = useState([{ capacity: '', pack: '' }]);
  const [price, setPrice] = useState(0);
  const [model, setModel] = useState('');
  const [volume, setVolume] = useState('');
  const [gauge, setGauge] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [application, setApplication] = useState('');
  const [auxilaryImageUrl, setAuxilaryImageUrl] = useState('');
  const [owner, setOwner] = useState('');

  const [category, setCategory] = useState('Analytical');
  const [brandList, setBrandList] = useState([]);

  const history = useHistory();

  const handleOnSave = async () => {
    if (!code || !name || !brand) {
      toast.error(`Please fill the mandatory fields`, { variant: 'error'});
      return;
    }
    const headers = { 'Content-Type': 'application/json' };

    const capacityPackListFinal = capacityPackList
      .filter(curCapacityPack => curCapacityPack.capacity !== '' && curCapacityPack.pack !== '');

    const requestBody = { 
      productList: [
        { code, name, brand, division, description, imageUrls, od, height, capacityPackList: capacityPackListFinal, price, model, volume, gauge, hsnCode, category, productCategory, application, auxilaryImageUrl }
      ] 
    };

    try {
      const url = (category === 'Analytical') ? '/api/analytical-products/save' : '/api/featured-products/save';

      const newProductResponse = await axios.post(url, requestBody, headers);
      
      if (newProductResponse.data.payload) {
        toast.success(`${name} product created successfully`, { variant: 'success'});
        setTimeout(() => history.push('/admin/products2'), 5000);
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

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const data = [...imageUrls];
      const item = data.splice(fromIndex, 1)[0];
      data.splice(toIndex, 0, item);
      setImageUrls(data);
    },
    nodeSelector: 'img',
    handleSelector: 'img'
  };

  const handleCapacityPackChange = (type, index, value) => {
    const updatedCapacityPackList = capacityPackList
      .map((curCapacityPack, curIndex) => {
        if (curIndex !== index)
          return curCapacityPack;
        else
          return (type === 'CAPACITY') ? 
            ({ capacity: value, pack: curCapacityPack.pack }) :
            ({ capacity: curCapacityPack.capacity, pack: value });
      });
    setCapacityPackList(updatedCapacityPackList);
  }

  const deleteCapacityPack = index => {
    setCapacityPackList(capacityPackList.filter((_, curIndex) => (curIndex !== index)));
  }
  
  const addNewCapacityPack = () => {
    setCapacityPackList([...capacityPackList, { capacity: '', pack: '' }]);
  }

  return (
    <Container>
      <Heading>Add a new Product</Heading>

      <Form>
        <SelectWrapper>
          <Select
            placeholder='Category*'
            value={{ label: category, value: category }}
            options={categoryOptions} 
            onChange={e => setCategory(e.value)} 
          />
        </SelectWrapper>
        
        <SelectWrapper>
          <Select
            isSearchable={true}
            placeholder='Select a Brand*'
            value={brand ? {label: brand, value: brand} : null}
            options={brandList.map(curBrand => ({label: curBrand, value: curBrand}))} 
            onChange={e => setBrand(e.value)} 
          />
        </SelectWrapper>

        <Input styleObj={{ maxWidth: '250px', marginBottom: '0' }} value={code} handleOnChange={e => setCode(e.target.value)} label='Code*' />

        <Input styleObj={{ maxWidth: '250px', marginBottom: '0' }} value={name} handleOnChange={e => setName(e.target.value)} label='Name*' />
        
        <Input styleObj={{ maxWidth: '250px', marginBottom: '0' }} value={division} handleOnChange={e => setDivision(e.target.value)} label='Division' />

        <Input styleObj={{ maxWidth: '250px', marginBottom: '0' }} value={description} handleOnChange={e => setDescription(e.target.value)} label='Description' />

        <Input styleObj={{ maxWidth: '250px', marginBottom: '0' }} value={od} handleOnChange={e => setOD(e.target.value)} label='OD' />
        
        <Input styleObj={{ maxWidth: '250px', marginBottom: '0' }} value={height} handleOnChange={e => setHeight(e.target.value)} label='Height' />

        <Input styleObj={{ maxWidth: '250px', marginBottom: '0' }} value={price} handleOnChange={e => setPrice(e.target.value)} label='Price' />

        <Input styleObj={{ maxWidth: '250px', marginBottom: '0' }} value={model} handleOnChange={e => setModel(e.target.value)} label='Model' />

        <Input styleObj={{ maxWidth: '250px', marginBottom: '0' }} value={volume} handleOnChange={e => setVolume(e.target.value)} label='Volume' />

        <Input styleObj={{ maxWidth: '250px', marginBottom: '0' }} value={gauge} handleOnChange={e => setGauge(e.target.value)} label='Gauge' />
        
        <Input styleObj={{ maxWidth: '250px', marginBottom: '0' }} value={hsnCode} handleOnChange={e => setHsnCode(e.target.value)} label='HSN Code' />

        <Input styleObj={{ maxWidth: '250px', marginBottom: '0' }} value={productCategory} handleOnChange={e => setProductCategory(e.target.value)} label='Product Category' />

        <Input styleObj={{ maxWidth: '250px', marginBottom: '0' }} value={application} handleOnChange={e => setApplication(e.target.value)} label='Application' />
      </Form>

      <CapacityWrapper>
        {capacityPackList.map((curCapacityPack, index) => 
          <CapacityPack key={index}>
            <Input 
              styleObj={{ marginBottom: '50px', marginRight: '20px', width: '100px' }}
              value={curCapacityPack.capacity} 
              handleOnChange={e => handleCapacityPackChange('CAPACITY', index, e.target.value)} 
              label={`Capacity ${index + 1}`} 
            />

            <Input 
              styleObj={{ marginBottom: '50px', marginRight: '20px', width: '100px' }}
              value={curCapacityPack.pack} 
              handleOnChange={e => handleCapacityPackChange('PACK', index, e.target.value)} 
              label={`Pack ${index + 1}`} 
            />

            {(capacityPackList.length - 1 !== index) &&  <DeleteButton onClick={() => deleteCapacityPack(index)} />}
            {(capacityPackList.length - 1 === index) &&  <AddButton onClick={addNewCapacityPack} />}
          </CapacityPack>)}
      </CapacityWrapper>

      <Label>Product Images</Label>
      <DragColumn {...dragProps}>
        {imageUrls.length > 0 && imageUrls.map((curImageUrl, index) => <Image key={index} src={curImageUrl} alt={`image_${index}`}/>)}
      </DragColumn>
      
      
      {/* {imageUrls.map((curImageUrl, index) => <Image key={index} src={curImageUrl} alt={`image_${index}`}/>)} */}
      <AdminProductImage imageUrls={imageUrls} setImageUrls={setImageUrls}/>
      {imageUrls.length > 0 && <ResetButton onClick={() => setImageUrls([])}>Reset Image(s)</ResetButton>}

      <Label style={{ marginTop: '50px' }}>Auxilary Image</Label>
      {auxilaryImageUrl && <Image src={auxilaryImageUrl} alt={`auxilary_image`}/>}
      <AuxilaryImage imageUrl={auxilaryImageUrl} setImageUrl={setAuxilaryImageUrl}/>
      {auxilaryImageUrl && <ResetButton onClick={() => setAuxilaryImageUrl('')}>Reset Image</ResetButton>}

      <Button 
        style={{ marginTop: '20px', fontWeight: 'normal', fontSize: '14px', padding: '12px 30px', borderRadius: '3px' }} 
        label='Save product' 
        handleOnClick={handleOnSave}
      />
    </Container>
  )
}
