import { createSlice } from '@reduxjs/toolkit';
import { saveOffer } from './SubmitOfferApi';

// Define the initial state of the store
const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

// Define a slice
const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers: {
    // Handle the result of the async action
    [saveOffer.fulfilled]: (state, action) => {
      state.data = action.payload.data;
      state.status = 'succeeded';
    },
    [saveOffer.pending]: (state) => {
      state.status = 'loading';
    },
    [saveOffer.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});



// Export the slice's reducer and actions
export const { } = offerSlice.actions;
export default offerSlice.reducer;
