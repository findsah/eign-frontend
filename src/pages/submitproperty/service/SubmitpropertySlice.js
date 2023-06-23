import { createSlice } from '@reduxjs/toolkit';
import { createProperty, uploadFiles } from './SubmitporpertyApi';
import { toast } from 'react-toastify';

const initialState = {
    homes: [],
    files: [],
    status: 'idle',
    error: null,
  };
const SubmitpropertySlice = createSlice({
    name: 'submitproperty',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createProperty.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createProperty.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.homes.push(action.payload);
        })
        .addCase(createProperty.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(uploadFiles.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(uploadFiles.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.files.push(action.payload);
        })
        .addCase(uploadFiles.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          toast.error('something went wrong')
        });
    },
  });
  
  export default SubmitpropertySlice.reducer;