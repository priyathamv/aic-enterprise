import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ImageUploader from 'react-images-upload';
import { AiOutlineCamera } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { selectUserDetails, selectUserName, updateUserImage } from '../auth/authSlice';
import { getUserShortName } from '../utils/Utils';


const Container = styled.div`
  padding: 20px;
  border: 1px solid #CCC;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ImageBox = styled.div`
  position: relative;
`;

const UserImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  cursor: pointer;
  margin-bottom: 10px;
`;

const CameraIcon = styled(AiOutlineCamera)`
  position: absolute;
  top: 40px;
  left: 20px;
  color: #ccc;
  cursor: pointer;
`;

const UserName = styled.div`
  color: #585858;
  font-size: 14px;
`;

const Message = styled.div`
  color: red;
  text-align: center;
  margin-bottom: 10px;
  font-size: 12px;
`;


const buttonStyles = {
  backgroundColor: '#F8F8FF', 
  borderRadius: '100%', 
  padding: '15px 13px 12px 13px', 
  cursor: 'pointer', 
  border: '1px solid #CCC', 
  color: '#232162', 
  margin: '0 0 10px 0',
  fontSize: '20px',
  minWidth: '55px',
  minHeight: '51px'
}

const fileContainerStyle = { 
  border: 'none',
  boxShadow: 'none',
  padding: 0,
  margin: 0,
}

export const MyImage = () => {
  const dispatch = useDispatch();
  const imageUploadRef = useRef(null);
  const userName = useSelector(selectUserName);
  const { email, imageUrl } = useSelector(selectUserDetails);
  

  const [message, setMessage] = useState(null);
  const [imageUrlLocal, setImageUrlLocal] = useState('');
  
  useEffect(() => setImageUrlLocal(imageUrl), [imageUrl]);


  const onDrop = async images => {
    if (images.length === 0){
      setMessage('Make sure image is of jpg/png type and size < 1 MB');
      setTimeout(() => setMessage(null), 10000);
      return;
    }

    const formData = new FormData();
    formData.append('file', images[0], images[0].filename);
    formData.append('email', email);

    try {
      const imageUploadResponse = await axios.post('/api/users/user-image', formData, {});
      setImageUrlLocal(imageUploadResponse.data.payload);
      dispatch(updateUserImage(imageUploadResponse.data.payload));
    } catch(err) {
      console.log('Error while uploading image', err.message);
    }
  };
  
  
  return (
    <Container>
      {imageUrlLocal && 
        <ImageBox onClick={e => imageUploadRef.current.triggerFileUpload(e)}>
          <UserImage src={imageUrlLocal} />
          <CameraIcon size='1.2em' />
        </ImageBox>
      }
      
      <ImageUploader
        ref={imageUploadRef}
        singleImage={true}
        withIcon={false}
        buttonStyles={buttonStyles}
        fileContainerStyle={imageUrlLocal ? { display: 'none' } : fileContainerStyle}
        buttonText={getUserShortName(userName)}
        withLabel={false}
        fileSizeError={null}
        fileTypeError={null}
        onChange={onDrop}
        imgExtension={['.jpg', '.png']}
        maxFileSize={1048576}
      />
      {message && <Message>{message}</Message>}

      <UserName>{userName}</UserName>
    </Container>
  )
}
