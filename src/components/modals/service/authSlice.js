import { createSlice } from '@reduxjs/toolkit';
import {  login, registerUser, verify } from './authApi';
import { toast } from 'react-toastify';
const initialState = {
  accountCreated: '',
  alreadyExists: '',
  error: '',
  token:'',
  user:null,
  email: '',
  otp: '',
  isEmailVerified: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
   .addCase(registerUser.fulfilled, (state, action) => {
        state.accountCreated = 'Account created successfully!';
        state.alreadyExists = '';
        state.error = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.accountCreated = '';
        state.alreadyExists = '';
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('actioks',action.payload);
         state.token = action.payload.token;
          state.user = action.payload.user_id;
          })
      .addCase(login.rejected, (state, action) => {
        state.error = 'please try again';
        console.log('action.payload',state.error);
          })
      .addCase(verify.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.otp = action.payload.otp;
        console.log('state.otp',state.otp);
          })
   
  },
});
console.log('authSlice', authSlice);

export default authSlice.reducer;
