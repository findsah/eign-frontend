import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import authReducer from '../components/modals/service/authSlice'
import SubmitpropertyReducer from '../pages/submitproperty/service/SubmitpropertySlice'
import SubmitOfferReducer from '../pages/submitoffer/service/SubmitOfferSlice'
import fetchProeryReducer from '../pages/feature/service/GetPropertySlice'
import getAllProertiesReducer from '../pages/search/service/GetAllPropertiesSlice'
// import AuthSlice from "./shared/shredSlice";
// import createEventSlice from '../pages/front-end/create-event/service/CreateEventSlice'
// import blogSlice from "../pages/front-end/blog/service/BlogSlice";
import shareSlice from '../services/ShareSlice'
// import googleSlice from "./GoogleSlice";

const reducers = combineReducers({
  authReducer,
  SubmitpropertyReducer,
  SubmitOfferReducer,
  fetchProeryReducer,
  getAllProertiesReducer,
  // AuthSlice,
  // createEventSlice,
  // blogSlice,
  shareSlice,
  // googleSlice

});

const persistConfig = {
  key: "root",
  storage,
  //   whitelist: ["AuthSlice"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
