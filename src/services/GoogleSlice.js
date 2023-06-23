import { createSlice } from "@reduxjs/toolkit";
const googleSlice = createSlice({
    name: "googleSlice",
    initialState: {
        getPlacesList: [],
        getPlacesDetailbyId: {},
        catogory: "restaurant",


    },
    reducers: {
        GetPlacesList(state, action) {

            state.getPlacesList = action.payload
        },
        GetPlacesDetailbyId(state, action) {


            state.getPlacesDetailbyId = action.payload
        },
        GetCatogories(state, action) {


            state.catogory = action.payload
        }

    },
    extraReducers: {
    }
})

export const { GetPlacesList, GetPlacesDetailbyId, GetCatogories } = googleSlice.actions;

export default googleSlice.reducer;