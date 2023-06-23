
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

  export const getAllProperties = createAsyncThunk(
    'property/getAllProperties',
    async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/property/get-property`)
      return response.data;
    }
  ); 