import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define async thunk for adding a new home
export const createProperty = createAsyncThunk(
    'homes/createProperty',
    async (newHomeData) => {
        const token = sessionStorage.getItem('token')
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/property/post-property/`, newHomeData,{
        headers: { Authorization: `token ${token}` },
      })
      const { slug } = response.data;
      sessionStorage.setItem('slug',slug)
      return response.data;
    }
  );
  
export const uploadFiles = createAsyncThunk(
    'homes/uploadFiles',
    async (filesData) => {
        const token = sessionStorage.getItem('token')
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/upload/file/`, filesData,{
        headers: { Authorization: `token ${token}` },
      });
      return response.data;
    }
  );