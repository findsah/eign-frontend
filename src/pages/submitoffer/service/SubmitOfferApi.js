
import {  createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Define the async action

export const saveOffer = createAsyncThunk(
  'offer/saveOffer',
  async (offerData) => {
      const token = sessionStorage.getItem('token')
      console.log('offerData',offerData);
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/property/submit_offer/`, offerData,{
      headers: { Authorization: `token ${token}` },
    })
    return response.data;
  }
);