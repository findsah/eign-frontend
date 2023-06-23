import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData,{dispatch}) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/registration/`, userData);
      const { email , otp } = response.data;
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('otp', otp);
      dispatch(isSignup(email));
       return response.data
    } catch (error) {
      return error.response.data
    }

  }
 
  
);

export const login = createAsyncThunk(
  'login/login',
  async (userData, { dispatch }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login/`, userData);
      const { token, user_id ,name } = response.data;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user_id', user_id);
      sessionStorage.setItem('userName', name);
      
      // Call callback function after token is stored in sessionStorage
      dispatch(tokenStored(token));
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const verify = createAsyncThunk(
  'auth/verify',
  async ({ email, otp }) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('otp', otp);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/verify-email/`, formData);
      console.log('responseisOtp',response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
// Define callback function to be called after token is stored in sessionStorage
export const isSignup = (email) => (dispatch) => {
  dispatch(setEamil(email));
}

// Define action to set token in state
export const setEamil = (email) => ({
  type: 'SET_EMAIL',
  payload: email,
});
export const tokenStored = (token) => (dispatch) => {
  // Do any additional logic here if needed
  console.log('tokenStored',token);
  dispatch(setToken(token));
  console.log('setToken',token);
}

// Define action to set token in state
export const setToken = (token) => ({
  type: 'SET_TOKEN',
  payload: token,
});

