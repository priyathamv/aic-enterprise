import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ImageUploader from 'react-images-upload';
import axios from 'axios';

import { AiOutlineCamera } from 'react-icons/ai';
import { selectUserDetails, selectUserName, updateUserImage, selectGoogleAuth, selectEmailAuth, updateEmailAuthDetails, updateGoogleAuthDetails } from '../auth/authSlice';
import { MyDetailsForm } from './MyDetailsForm';
import { getUserShortName } from '../utils/Utils';


const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-column-gap: 50px;
  grid-row-gap: 50px;

  margin: 50px 15vw;
`;

const LeftPanel = styled.div`
`;

const ImageFrame = styled.div`
  padding: 20px;
  border: 1px solid #CCC;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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


export const MyAccount = () => {
  const dispatch = useDispatch();
  const imageUploadRef = useRef(null);
  
  const { email, imageUrl } = useSelector(selectUserDetails);
  const userName = useSelector(selectUserName);
  const [imageUrlLocal, setImageUrlLocal] = useState('');
  const [message, setMessage] = useState(null);
  const [updateMsg, setUpdateMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const isGoogleLogin = useSelector(selectGoogleAuth).email;
  const isNormalLogin = useSelector(selectEmailAuth).email;

  useEffect(() => setImageUrlLocal(imageUrl), [imageUrl]);

  const onDrop = async images => {
    console.log('=> ', images)
    if (images.length === 0){
      setMessage('Make sure image is of jpg/png type and size < 1 MB');
      // setTimeout(() => setMessage(null), 5000);
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
  
  return (
    <Container id='my_account_id'>
      <LeftPanel>
        <ImageFrame>
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
        </ImageFrame>
      </LeftPanel>

      <MyDetailsForm imageUrl={imageUrlLocal} handleUpdateInfo={handleUpdateInfo} isLoading={isLoading} updateMsg={updateMsg} />
    </Container>
  )
}
