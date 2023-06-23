import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { GetCurrentLocation } from "./ShareApi";


// Slice to manage Location section
const sharedSlice = createSlice({
    name: "sharedSection",
    initialState: {
      getCurrentLocation: "",
      isLoading: false
    },
    reducers: {
      setIsLoading: (state, action) => {
        state.isLoading = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(GetCurrentLocation.fulfilled, (state, action) => {
        state.getCurrentLocation = action.payload || "";
      });
    },
  });
  
  export const { setIsLoading } = sharedSlice.actions;
  
  export default sharedSlice.reducer;