import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Select from 'react-select';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';

import { RichTextEditor } from '../../utils/RichTextEditor';
import { Input } from '../../utils/Input';
import { Button } from '../../homepage/common/Button';
import { applicationsArr } from '../../utils/productHierarchy';

const Container = styled.div`
`;

const Heading = styled.div`
  margin-bottom: 35px;
  font-size: 22px;
`;

const RichTextWrapper = styled.div`
  width: 400px;
  margin-bottom: 40px;
  position: relative;
`;

const Hierarchy = styled.div`
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
  margin-right: 10px;
  border: 1px solid #F13C1F;
  padding: 2px;
  border-radius: 3px;
`;

const customStylesApplication = index => ({
  container: (provided, state) => ({
      ...provided,
      width: '250px',
      marginBottom: '20px',
      marginRight: '20px',
      zIndex: 1000000000 - index
  })
});

const customStylesCategory = index => ({
  container: (provided, state) => ({
      ...provided,
      width: '250px',
      marginBottom: '20px',
      marginRight: '20px',
      zIndex: 100000000 - index
  })
});

export const AdminNewBrand = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryList, setCategoryList] = useState([]);


  const [hierarchyList, setHierarchyList] = useState([
    { application: applicationsArr[0], category: null }
  ]);

  const applicationOptions = applicationsArr
    .map(curApplication => ({
      label: curApplication, value: curApplication
    }));

  useEffect(() => {
    axios.get('/api/category')
      .then(response => {
        setCategoryList(response.data.payload);
      })
      .catch(function (error) {
        console.log('Error while fetching categories', error);
      })
  }, []);


  const handleOnSave = async () => {
    if (!name) {
      toast.error(`Brand name cannot be empty`, { variant: 'error'});
      return;
    }

    const validHierarchy = hierarchyList.every(curHierarchy => curHierarchy.category !== null);
    if (!validHierarchy) {
      toast.error(`Category cannot be empty`, { variant: 'error'});
      return;
    }
    const headers = { 'Content-Type': 'application/json' };

    try {
      const newBrandResponse = await axios.post('/api/brands/save', { name, description, hierarchyList }, headers);

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

  const deleteHierarchy = index => {
    setHierarchyList(hierarchyList.filter((_, curIndex) => (curIndex !== index)));
  }

  const addNewHierarchy = () => {
    setHierarchyList([
      ...hierarchyList,
      { application: applicationsArr[0], category: null }
    ]);
  }

  const handleApplicationChange = (applicationValue, index) => {
    const updatedHierarchyList = hierarchyList
      .map((curHierarchy, curIndex) => {
        return index === curIndex ?
          { application: applicationValue, category: null } :
          curHierarchy;
      });

    setHierarchyList(updatedHierarchyList);
  }

  const handleCategoryChange = (categoryValue, index) => {
    const updatedHierarchyList = hierarchyList
      .map((curHierarchy, curIndex) => {
        return index === curIndex ?
          { application: curHierarchy.application, category: categoryValue } :
          curHierarchy;
      });

    setHierarchyList(updatedHierarchyList);
  }

  const getCategoryOptions = index => {
    const curApplication = hierarchyList[index].application;

    return categoryList
      .filter(curCategory => curCategory.application === curApplication)
      .map(curCategory => ({
        label: curCategory.name, value: curCategory.name
      }));
  }

  return (
    <Container>
      <Heading>Add a new Brand</Heading>

      <Input styleObj={{ maxWidth: '300px' }} value={name} handleOnChange={e => setName(e.target.value)} label='Brand name*' />

      <RichTextWrapper>
        <RichTextEditor value={description} handleChange={setDescription} placeholder='Description' />
      </RichTextWrapper>

      <div>
        {hierarchyList.map((curHierarchy, index) =>
          <Hierarchy key={index}>
            <Select
              styles={customStylesApplication(index)}
              value={{label: curHierarchy.application, value: curHierarchy.application}}
              options={applicationOptions}
              onChange={e => handleApplicationChange(e.value, index)}
            />

            <Select
              styles={customStylesCategory(index)}
              value={curHierarchy.category ? {label: curHierarchy.category, value: curHierarchy.category} : null}
              options={getCategoryOptions(index)}
              onChange={e => handleCategoryChange(e.value, index)}
              placeholder='Select a category*'
            />

            {(hierarchyList.length > 1 || (hierarchyList.length - 1 !== index)) &&  <DeleteButton onClick={() => deleteHierarchy(index)} />}
            {(hierarchyList.length - 1 === index) &&  <AddButton onClick={addNewHierarchy} />}
          </Hierarchy>
        )}
      </div>

      <Button
        style={{ fontWeight: 'normal', fontSize: '14px', padding: '12px 30px', borderRadius: '3px', marginTop: '20px' }}
        label='Save brand'
        handleOnClick={handleOnSave}
      />
    </Container>
  )
}
