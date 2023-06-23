import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getPropertyDetails } from './GetPropertyApi';

const initialState = {
  property: null,
  status: 'idle',
  error: null,
};
export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPropertyDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPropertyDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.property = action.payload;
      })
      .addCase(getPropertyDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default propertySlice.reducer;
