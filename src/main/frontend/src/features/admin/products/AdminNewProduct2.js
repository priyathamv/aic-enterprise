import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { Editor } from '@tinymce/tinymce-react';
import ReactDragListView from 'react-drag-listview/lib/index.js';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';

import { Input } from '../../utils/Input';
import { RichTextEditor } from '../../utils/RichTextEditor';
import { Button } from '../../homepage/common/Button';
import { device } from '../../utils/viewport';
import { Spinner } from '../../utils/Spinner';
import { AdminProductImage } from './AdminProductImage';
import { AuxilaryImage } from './AuxilaryImage';
import { appToCategoryMap, categoryToDivisionMap } from '../../utils/productHierarchy';

const { DragColumn } = ReactDragListView;


const Container = styled.div`
`;

const Form = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 50px;
  margin-bottom: 30px;
  
  @media ${device.tablet} { 
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const Heading = styled.div`
  margin-bottom: 35px;
  font-size: 22px;
`;

const SelectWrapper = styled.div`
  width: 200px;
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

const TextareaBox = styled.div`
  margin-bottom: 50px;
  position: relative;
  min-height: 250px;
  z-index: 0;
`;

const Textarea = styled.textarea`
  margin-bottom: 50px;
  height: 72px;
  border: 1px solid #757575;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  line-height: 25px;
  min-height: 100px;
  resize: vertical;
`;

const MetricsWrapper = styled.div`
  
`;

const Metrics = styled.div`
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

const applicationOptions = Object.keys(appToCategoryMap)
  .map(curApplication => ({
    label: curApplication, 
    value: curApplication 
  }));

const productIdGenerated = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();

export const AdminNewProduct2 = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [brandList, setBrandList] = useState([]);
  
  const [productId, setProductId] = useState(productIdGenerated);
  const [application, setApplication] = useState('Analytical');
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState('');
  const [division, setDivision] = useState(null);
  const [name, setName] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [description, setDescription] = useState('<p></p>');
  const [specification, setSpecification] = useState('<p></p>');

  const [metricsList, setMetricsList] = useState([
    { catalogueCode: '', od: '', height: '', capacity: '', pack: '', price: 0, specification: '' }
  ]);
  const [model, setModel] = useState('');
  const [volume, setVolume] = useState('');
  const [gauge, setGauge] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [auxilaryImageUrl, setAuxilaryImageUrl] = useState('');
  const [owner, setOwner] = useState('');

  const history = useHistory();
  const location = useLocation();

  const fetchProductDetails = async (productApplication, productIdValue) => {
    try {
      const queryParams = { productId: productIdValue };

      const url = (productApplication === 'Analytical') ? '/api/analytical-products/details' : 
        (productApplication === 'Life Science') ? '/api/life-science-products/details' : 
        (productApplication === 'Instrumentation') ? '/api/instrumentation-products/details' : 
        (productApplication === 'Industrial Safety and Clean room') ? '/api/industrial-products/details' : null;

      const productDetailsResponse = await axios.get(url, { params: queryParams });
      const productDetails = productDetailsResponse.data.payload;

      setProductId(productDetails.productId);
      setApplication(productDetails.application);
      setCategory(productDetails.category);
      setBrand(productDetails.brand);
      setDivision(productDetails.division);
      setName(productDetails.name);
      setHsnCode(productDetails.hsnCode);
      setDescription(productDetails.description);
      setSpecification(productDetails.specification);
      setMetricsList(productDetails.metricsList);
      setModel(productDetails.model);
      setVolume(productDetails.volume);
      setGauge(productDetails.gauge);
      setImageUrls(productDetails.imageUrls);
      setAuxilaryImageUrl(productDetails.auxilaryImageUrl);
    } catch (error) {
      console.log('Exception while fetching product details', error.message)
    }
  }

  useEffect(() => {
    if (location.pathname.includes('/admin/products2/edit/')) {
      const productApplication = location.pathname.split("/")[4];

      console.log('productApplication', productApplication);
      const productIdValue = location.pathname.split("/")[5];
      fetchProductDetails(productApplication, productIdValue);
      setIsUpdate(true);
    }
 }, [location]);

  // Updating Category dropdown options on Application change
  useEffect(() => {
    const categoryOptionsUpdated = appToCategoryMap[application]
      .map(curCategory => ({
        label: curCategory,
        value: curCategory
      }));

    setCategoryOptions(categoryOptionsUpdated);
    setCategory(null);
    setDivision(null);
  }, [application]);
  
  // Updating Divisions dropdown options on Category change
  useEffect(() => {
    if (category) {
      const divisionOptionsUpdated = categoryToDivisionMap[category]
        .map(curDivision => ({
          label: curDivision,
          value: curDivision
        }));
  
      setDivisionOptions(divisionOptionsUpdated);
      setDivision(null);
    }
  }, [category]);



  const handleOnSave = async () => {
    if (!application || !category || !brand || !name || !description || !hsnCode) {
      toast.error(`Please fill the mandatory fields`, { variant: 'error'});
      return;
    }
    if (imageUrls && (imageUrls.length < 2)) {
      toast.error(`Upload at least 2 Product images`, { variant: 'error'});
      return;
    }

    const headers = { 'Content-Type': 'application/json' };

    const metricsListFinal = metricsList
      .filter(curMetrics => curMetrics.catalogueCode !== '' && curMetrics.capacity !== '');

    const requestBody = { 
      productList: [
        { application, category, division, brand, productId, name, hsnCode, description, specification, metricsList: metricsListFinal, model, volume, gauge, imageUrls, auxilaryImageUrl }
      ] 
    };

    try {
      const url = (application === 'Analytical') ? '/api/analytical-products/save' : 
        (application === 'Life Science') ? '/api/life-science-products/save' : 
        (application === 'Instrumentation') ? '/api/instrumentation-products/save' : 
        (application === 'Industrial Safety and Clean room') ? '/api/industrial-products/save' : null;

      const newProductResponse = await axios.post(url, requestBody, headers);
      
      if (newProductResponse.data.payload) {
        toast.success(`${name} product ${isUpdate ? 'updated' : 'created'} successfully`, { variant: 'success'});
        setTimeout(() => {
          // history.push('/admin/products2');
          window.location.href = '/admin/products2';
        }, 5000);
      } else {
        toast.error(`${name} product ${isUpdate ? 'updation' : 'creation'} failed`, { variant: 'error'});
      }
    } catch (err) {
      console.log(`Error while ${isUpdate ? 'updating' : 'creating new'} product: `, err.message);
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

  const handleMetricsChange = (type, index, value) => {
    const updatedMetricsList = metricsList
      .map((curMetrics, curIndex) => {
        if (curIndex !== index)
          return curMetrics;
        else {
          if (type === 'CATALOGUE_CODE')
            return Object.assign({}, curMetrics, { catalogueCode: value });
          else if (type === 'OD')
            return Object.assign({}, curMetrics, { od: value });
          else if (type === 'HEIGHT')
            return Object.assign({}, curMetrics, { height: value });
          else if (type === 'CAPACITY')
            return Object.assign({}, curMetrics, { capacity: value });
          else if (type === 'PACK')
            return Object.assign({}, curMetrics, { pack: value });
          else if (type === 'PRICE')
            return Object.assign({}, curMetrics, { price: value });
          else if (type === 'SPECIFICATION')
            return Object.assign({}, curMetrics, { specification: value });
          else
            return curMetrics;
        }
      });
    setMetricsList(updatedMetricsList);
  }

  const deleteMetrics = index => {
    setMetricsList(metricsList.filter((_, curIndex) => (curIndex !== index)));
  }
  
  const addNewMetrics = () => {
    setMetricsList([
      ...metricsList, 
      { catalogueCode: '', od: '', height: '', capacity: '', pack: '', price: 0, specification: '' }
    ]);
  }

  const onDescriptionChange = (content, editor) => {
    setDescription(content);
  }
  
  const onSpecificationChange = (content, editor) => {
    setSpecification(content);
  }

  return (
    <Container>
      <Heading>{`${isUpdate ? 'Edit Product details' : 'Add a new Product'}`}</Heading>

      <Form>
        <SelectWrapper>
          <Select
            placeholder='Select an Application*'
            value={{ label: application, value: application }}
            options={applicationOptions} 
            onChange={e => setApplication(e.value)} 
            isDisabled={isUpdate}
          />
        </SelectWrapper>
        
        <SelectWrapper>
          <Select
            placeholder='Select a Category*'
            value={category ? {label: category, value: category} : null}
            options={categoryOptions} 
            onChange={e => setCategory(e.value)} 
          />
        </SelectWrapper>

        <SelectWrapper>
          <Select
            isSearchable={true}
            placeholder='Select a Division'
            value={division ? {label: division, value: division} : null}
            options={divisionOptions} 
            onChange={e => setDivision(e.value)} 
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

        <Input styleObj={{ maxWidth: '200px', marginBottom: '0' }} value={productId} label='Product Id' disabled={true} />

        <Input styleObj={{ maxWidth: '200px', marginBottom: '0' }} value={name} handleOnChange={e => setName(e.target.value)} label='Name*' />

        <Input styleObj={{ maxWidth: '200px', marginBottom: '0' }} value={hsnCode} handleOnChange={e => setHsnCode(e.target.value)} label='HSN Code' />
      </Form>

      <TextareaBox>
        <Label>Description</Label>
        
        <RichTextEditor 
          value={description}
          handleChange={onDescriptionChange}
        />
      </TextareaBox>

      {application === 'Analytical' ? 
        <TextareaBox>
          <Label>Specification</Label>
          
          <RichTextEditor 
            value={specification}
            handleChange={onSpecificationChange}
          />
        </TextareaBox> : null}

      <MetricsWrapper>
        {metricsList.map((curMetrics, index) => 
          <Metrics key={index}>
            <Input 
              styleObj={{ marginBottom: '50px', marginRight: '20px', width: '150px' }}
              value={curMetrics.catalogueCode} 
              handleOnChange={e => handleMetricsChange('CATALOGUE_CODE', index, e.target.value)} 
              label={`Catalogue Code ${index + 1}*`} 
            />
            
            {application === 'Analytical' && category === 'Laboratory Glassware' ? 
              <Input 
                styleObj={{ marginBottom: '50px', marginRight: '20px', width: '100px' }}
                value={curMetrics.od} 
                handleOnChange={e => handleMetricsChange('OD', index, e.target.value)} 
                label={`OD ${index + 1}`} 
              /> : null}

            {application === 'Analytical' && category === 'Laboratory Glassware' ? 
              <Input 
                styleObj={{ marginBottom: '50px', marginRight: '20px', width: '100px' }}
                value={curMetrics.height} 
                handleOnChange={e => handleMetricsChange('HEIGHT', index, e.target.value)} 
                label={`Height ${index + 1}`} 
              /> : null}
            
            <Input 
              styleObj={{ marginBottom: '50px', marginRight: '20px', width: '100px' }}
              value={curMetrics.capacity} 
              handleOnChange={e => handleMetricsChange('CAPACITY', index, e.target.value)} 
              label={`Capacity ${index + 1}*`} 
            />

            <Input 
              styleObj={{ marginBottom: '50px', marginRight: '20px', width: '100px' }}
              value={curMetrics.pack} 
              handleOnChange={e => handleMetricsChange('PACK', index, e.target.value)} 
              label={`Pack ${index + 1}`} 
            />

            <Input 
              styleObj={{ marginBottom: '50px', marginRight: '20px', width: '100px' }}
              value={curMetrics.price} 
              handleOnChange={e => handleMetricsChange('PRICE', index, e.target.value)} 
              label={`Price ${index + 1}`} 
            />

            {application !== 'Analytical' ? 
            <TextareaBox>
              <RichTextEditor 
                placeholder='Add specification...'
                value={curMetrics.specification}
                handleChange={(content, editor) => handleMetricsChange('SPECIFICATION', index, content)}
              />
            </TextareaBox> : null}

            {(metricsList.length - 1 !== index) &&  <DeleteButton onClick={() => deleteMetrics(index)} />}
            {(metricsList.length - 1 === index) &&  <AddButton onClick={addNewMetrics} />}
          </Metrics>)}
      </MetricsWrapper>

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
        label={`${isUpdate ? 'Update' : 'Save'} product`}
        handleOnClick={handleOnSave}
      />
    </Container>
  )
}
