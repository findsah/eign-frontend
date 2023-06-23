import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Geocode from "react-geocode";

const apiKey = `${process.env.REACT_APP_MAP_KEY}`; // Replace with your Google Maps API key

export const GetCurrentLocation = createAsyncThunk(
  "sharedSection/GetCurrentLocation",
  async (params) => {
    Geocode.setApiKey(apiKey);
    try {
      const response = await Geocode.fromLatLng(params?.latitude, params?.longitude);
      const results = response.results[0];
      let city, country, state, zip;
      const countryObj = results.address_components.find(obj => obj.types.includes('country'));
      const cityObj = results.address_components.find(obj => obj.types.includes('locality'));
      const stateObj = results.address_components.find(obj => obj.types.includes('administrative_area_level_1'));
      const zipObj = results.address_components.find(obj => obj.types.includes('postal_code'));
      country = countryObj?.long_name || "";
      city = cityObj?.long_name || "";
      state = stateObj?.long_name || "";
      zip = zipObj?.long_name || "";
      return { country, city, state, zip };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch current location.");
    }
  }
);
