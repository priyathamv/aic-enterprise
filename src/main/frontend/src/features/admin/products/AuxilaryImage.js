import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ImageUploader from 'react-images-upload';
import { ImUpload2 } from 'react-icons/im';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Spinner } from '../../utils/Spinner';

const Container = styled.div`
  
`;

const ImageBox = styled.div`
  color: #232162;
  margin-bottom: 10px;
  width: 110px;
  // text-align: center;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  cursor: pointer;
  margin-bottom: 10px;
`;

const ImageIcon = styled(ImUpload2)`
  cursor: pointer;
`;

const Label = styled.div`
  cursor: pointer;
  color: #232162;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
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


export const AuxilaryImage = ({ imageUrl, setImageUrl }) => {
  const imageUploadRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploaderKey, setImageUploaderKey] = useState(0);

  const onDrop = async images => {
    setImageUploaderKey(imageUploaderKey => imageUploaderKey + 1);
    if (images.length === 0){
      toast.error('Make sure image is of jpg/png type and size < 1 MB', { variant: 'error' });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    images.forEach(curImage => formData.append('files', curImage));
    
    try {
      const imageUploadResponse = await axios.post('/api/products/upload-images', formData, {});
      setImageUrl(imageUploadResponse.data.payload[0]);
      setIsLoading(false);
    } catch(err) {
      console.log('Error while uploading auxilary image', err.message);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ImageUploader
        key={imageUploaderKey} // 1st time uploaded images are retained in 2nd upload
        ref={imageUploadRef}
        singleImage={true}
        withIcon={false}
        buttonStyles={buttonStyles}
        fileContainerStyle={{ display: 'none' }}
        withLabel={false}
        fileSizeError={null}
        fileTypeError={null}
        onChange={onDrop}
        imgExtension={['.jpeg', '.jpg', '.png']}
        maxFileSize={1048576}
      />
      <ImageBox onClick={e => imageUploadRef.current.triggerFileUpload(e)}>
        {isLoading && <Spinner containerStyle={{ marginTop: '10px', marginBottom: '10px', position: 'initial' }} />}
        {!isLoading && !imageUrl && <ImageIcon size='2em' />}
        <Label>{imageUrl ? 'Update image' : ''}</Label>
      </ImageBox>
    </Container>
  )
}
