import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllProperties } from './GetAllPropertiesApi';

const initialState = {
  properties: [],
  status: 'idle',
  error: null,
};
export const getAllPropertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.properties = action.payload;
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default getAllPropertiesSlice.reducer;
