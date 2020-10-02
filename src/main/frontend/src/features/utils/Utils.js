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

export const getUserShortName = username => {
  if(!username)
    return ''

  const usernameSplit = username.split(' ');
  return usernameSplit.length >= 2 ?
  (usernameSplit[0][0] + usernameSplit[1][0]).toUpperCase() :
  usernameSplit[0][0].toUpperCase();
}

export const getDateString = timestamp => {
  return new Date(timestamp).toDateString().substring(4);
}