
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPropertyDetails = createAsyncThunk(
  'property/getPropertyDetails',
  async (id) => {
    // const slug = -425 
    const token = sessionStorage.getItem('token')
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/property/get-property-details/${id}`,{
              headers: { Authorization: `token ${token}` },
            });
            console.log(' response.data', response.data);
    return response.data;
    
  }
); 