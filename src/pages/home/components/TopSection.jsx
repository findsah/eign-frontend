import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import location from "../../../assets/icons/location.png";
import homeimg from "../../../assets/images/homeimg.png";
import AoutoPlaces from '../../../components/autoPlaces/AoutoPlaces';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Geocode from "react-geocode";
import { useHistory, useNavigate } from 'react-router-dom';

import { GoogleApiWrapper } from 'google-maps-react';
import { getAllProperties } from '../../search/service/GetAllPropertiesApi';
function TopSection() {
 const  dispatch = useDispatch()
 const  navigate = useNavigate()
  const { getCurrentLocation } = useSelector((state) => state?.shareSlice)
  const [searchAddress, setSearchAddress] = useState('')
  const [addresses, setAddressess] = useState([])
  const lat = localStorage.getItem('lat')
  const lng = localStorage.getItem('lng')
  useEffect(() => {
    dispatch(getAllProperties())
}, [dispatch]);
  const fetchAddresses = async () => {
    try {
      const response = await Geocode.fromLatLng(lat, lng);
      const addresses = response.results.map((result) => result.formatted_address);
      setAddressess(addresses)
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeAddress = (address) => {
    setSearchAddress(address);
};
const handleSelect = async (address) => {
  try {
    const results = await geocodeByAddress(address);
    const selectedPlace = results[0];
    const { lat, lng } = await getLatLng(selectedPlace); 
    setSearchAddress(address)
    navigate('search', {
      state: {
        lat,
        lng
      }
    });
  } catch (error) {
    console.error('Error retrieving place details:', error);
  }

};
   useEffect(() => {
      fetchAddresses()
  }, []);
  return (
         <div className="row ">
        <div className="to-gain" >
          <div className="m-0 row">
            <div className="col-lg-1 col-md-1 col-sm-1 col-12"></div>
            <div className="col-lg-5 col-md-5 col-sm-5 col-12">
              <div className="propertytalks">
                <div>
                  <h2>Eign to gain your property deal</h2>
                  <div className="searc-field">
                    <div>
                      {/* <img src={location} alt="location" /> */}
                      {/* <input type="text" placeholder={getCurrentLocation.city} /> */}
                      <PlacesAutocomplete
            value={searchAddress}
            onChange={handleChangeAddress}
            onSelect={handleSelect}
            suggestions={addresses.filter((address) =>
              address.toLowerCase().includes(searchAddress.toLowerCase())
            )}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Where do you want to live?',
                    className: 'location-search-input search-field',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                      key={suggestion.placeId}
                      {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                    >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
                    </div>
                    {/* <button>Search</button> */}
                  </div>
                  <p>
                    Be in charge of your real estate transaction with access to
                    a comprehensive marketplace of houses.
                  </p>
                </div>
              </div>
              <div className="backimg" style={{ display: "none"}}>
                <img src={homeimg} alt="home" />
              </div>
            </div>
            <div className="p-0 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="mainbg">
                <img src={homeimg} alt="home" />
              </div>
            </div>
          </div>
        </div>
        <div className="centertext">
          <h3> Eign is The Ultimate Platform for Online Real Estate</h3>
          <p>Find out how EIGN can help you</p>
        </div>
      </div>

  )
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBarK2r8HSxO1uiWJL53BEosVTHaW-U5vY'
})(TopSection);
