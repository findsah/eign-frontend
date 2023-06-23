import React, { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Geocode from "react-geocode";
import { useSelector } from "react-redux";

const AoutoPlaces = ({ address, handleChangeAddress, handleSelect }) => {
  const { getCurrentLocation } = useSelector((state) => state?.shareSlice);
  const [addresses, setAddresses] = useState([])
  const lat = localStorage.getItem('lat')
  const lng = localStorage.getItem('lng')
  const fetchAddresses = async () => {
    try {
      const response = await Geocode.fromLatLng(lat, lng);
      const addresses = response.results.map((result) => result.formatted_address);
      setAddresses(addresses)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAddresses()
}, []);
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleChangeAddress}
        onSelect={handleSelect}
        suggestions={addresses.filter((addressVal) =>
            addressVal.toLowerCase().includes(address.toLowerCase())
        )}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: `${getCurrentLocation.city}`,
                className: "search-field",
                id: "search",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
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
  );
};

export default AoutoPlaces;
