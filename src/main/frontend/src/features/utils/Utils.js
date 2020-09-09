import axios from 'axios';

export const isValidEmail = email => {
  const emailCheck = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return emailCheck.test(email);
}

export const signUpForNews = email => {
  const headers = { 
    'Content-Type': 'application/json'
  }
  try {
    axios.post('/api/subscribers/save', { email }, { headers });
  } catch(err) {
    console.log('Exception while signing up user', err.message);
  }
}