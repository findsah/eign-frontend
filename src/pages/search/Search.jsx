import React, { useEffect, useMemo, useRef, useState } from 'react'
import $ from "jquery";
import MarkerClusterGroup from 'react-leaflet-cluster'
import {Row, Col, Carousel} from 'react-bootstrap';
import {GoogleApiWrapper} from 'google-maps-react';
// import {Map, InfoWindow, Marker,Polyline, Circle ,GoogleApiWrapper} from 'google-maps-react';
import { MapContainer, TileLayer,useMapEvents , Marker, Popup,ZoomControl, Circle, Tooltip, CircleMarker, Rectangle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import f from '../../assets/images/f.png';
import g from '../../assets/images/g.png';
import h from '../../assets/images/h.png';
import i from '../../assets/images/i.png';
import bed from '../../assets/icons/bed.png';
import bath from '../../assets/icons/bath.png';

import play from '../../assets/icons/play.png';
import voice from '../../assets/icons/voice.png';
import heart from '../../assets/icons/heart.png';

import land from '../../assets/icons/land.png';
import condo from '../../assets/icons/condo.png';
import house1 from '../../assets/icons/house1.png';
import townHouse from '../../assets/icons/townHouse.png';
import otherHouse from '../../assets/icons/otherHouse.png';
import multiFamily from '../../assets/icons/multiFamily.png';
import checkCircle from '../../assets/icons/checkCircle.png';
import L from 'leaflet';
import { Icon, divIcon, point } from "leaflet";

import search from '../../assets/icons/search.png';
import location from '../../assets/icons/location.png';
import crruntloctaion from '../../assets/icons/crruntloctaion.svg';
import arrowDown from '../../assets/icons/arrowdown.png';
import graphIntersect from '../../assets/images/graphIntersect.png';

// import mapLoc from './../../assets/images/mapLoc.png';

import bgPattern from '../../assets/images/bg-pattern.png';
// import axios from "axios";
import {frontend_server, backend_server} from "../../globals";
import {ServerCallings} from "../../config/utils/ServerCallings";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperties } from './service/GetAllPropertiesApi';
import { Link, useLocation } from 'react-router-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Geocode from "react-geocode";
import AoutoPlaces from '../../components/autoPlaces/AoutoPlaces';
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: crruntloctaion,
  iconSize: [38, 38] // size of the icon
});
const customIcon2 = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: location,
  iconSize: [38, 38] // size of the icon
});
// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};
function Search(props) {
    const dispatch = useDispatch();
    const location = useLocation();
    const homeLat = location.state?.lat;
    const homeLng = location.state?.lng;
    const { getCurrentLocation } = useSelector((state) => state?.shareSlice)


    const lat = localStorage.getItem('lat');
    const lng = localStorage.getItem('lng');
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    // const center = [latNum, lngNum];
    const [center, setCenter] = useState({ lat: latNum, lng: lngNum });
    const mapRef = useRef(null);
   const [map, setMap] = useState(null);
const maxZoom = 18;
    const allProperty = useSelector((state) => state.getAllProertiesReducer);
    // console.log('allProperties',allProperties.properties);
    const allProperties = allProperty?.properties;
    // const [properties ,setProperties] = useState([allProperties])
    console.log('allProperties',allProperties);
    useEffect(() => {
      dispatch(getAllProperties())
  }, [dispatch]);

    function TooltipCircle() {
        const [clickedCount, setClickedCount] = useState(0);
        const eventHandlers = useMemo(() => ({
          click() {
            setClickedCount((count) => count + 1);
          },
        }), []);
      
        const clickedText = clickedCount === 0
          ? 'Click this Circle to change the Tooltip text'
          : `Circle click: ${clickedCount}`;
      
        return (
          <Circle
            center={center}
            eventHandlers={eventHandlers}
            pathOptions={{ fillColor: 'blue' }}
            radius={700}
            className="tooltip-circle"
          >
            <Tooltip>{clickedText}</Tooltip>
          </Circle>
        );
      }
  const [state, setState] = useState({
    to: 1000,
    from: 0,
    bed: 0,
    bath: 0,
    home: 0,
    minSq: 0,
    maxSq: 0,
    school: 0,
    commute: 0,
    showBed: false,
    showBath: false,
    showRate: false,
    showMore: false,
    showType: false,
    commuteAddress: "",
    showCommute: false,
    showSquareFeet: false,
    beds: [0, 1, 2, 3, 4],
    baths: [0, 1, 2, 3, 4],
    homes: [1, 2, 3, 4, 5, 6],
    schools: [1, 2, 3, 4, 5, 6],
    commutes: [0, 10, 20, 30, 40, 50, 60],
    name: "Eign",
    properties: allProperties,
    currentPage: 1,
    itemsPerPage: 4,
    property_type: "",
    propertyValue: "",
    addresses:[],
    location_lat: [latNum],
    location_lng: [ lngNum]
  });
  const [zoomLevel, setZoomLevel] = useState(12);

  const fetchAddresses = async () => {
    try {
      const response = await Geocode.fromLatLng(lat, lng);
      const addresses = response.results.map((result) => result.formatted_address);
      setState({ ...state, addresses : addresses });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddresses()
}, []);
  useEffect(() => {
    dispatch(getAllProperties());
    setState(prevState => ({
        ...prevState,
        properties: allProperties.properties,
      }));
  }, [dispatch]);


 
  const handleChangeAddress = (address) => {
    setState({ ...state, propertyValue: address });
};

const handleSelect = async (address,map) => {
  try {
    const results = await geocodeByAddress(address);
    const selectedPlace = results[0];
    const { lat, lng } = await getLatLng(selectedPlace);
    setCenter({ lat, lng });
    setState((state) => ({
      ...state,
      propertyValue: address,
      location_lat: lat,
      location_lng: lng
    }));
    filterProperties(lat, lng)
  } catch (error) {
    console.error('Error retrieving place details:', error);
  }
};

const handleZoomChange = (map) => {
  setZoomLevel(map.getZoom());
};
const handleMapMove = (map) => {
  
  const bounds = map.getBounds();
  const center = map.getCenter();

  const filteredProperties = allProperties?.filter((property) => {
    const propertyLat = parseFloat(property.location_lat);
      const propertyLng = parseFloat(property.location_long);
    return (
      bounds.contains([propertyLat, propertyLng]) ||
      center.distanceTo([propertyLat, propertyLng]) <= 1000
    );
  });

  setState((state) => ({
    ...state,
    properties: filteredProperties,
  }));
};

const MapEvents = () => {
  const map = useMapEvents({
    zoomend: () => handleZoomChange(map),
    moveend: () => handleMapMove(map),
  });

  setMap(map)
  return null;
};


useEffect(()=>{
  if (homeLat && homeLng) {
    filterProperties(homeLat, homeLng);
    
  } else {
    filterProperties(latNum, lngNum);
  }
},[allProperties])
const onMapLoad = (map) => {

  mapRef.current = map;
};



const GoogleMap = () => {
  const map = useMap();

  useEffect(() => {
    onMapLoad(map);
  }, [map]);

  console.log('google map');

  return null;
};
useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView(center, zoomLevel);
    }
    // setZoomLevel(12)
  }, [center]);
const filterProperties = (lat, lng) => {
  const maxDistanceThreshold = 100; 
    const filteredProperties = allProperties?.filter((property) => {
      const propertyLat = parseFloat(property.location_lat);
      const propertyLng = parseFloat(property.location_long);
      const distance = calculateDistance(lat, lng, propertyLat, propertyLng);
      return distance <= maxDistanceThreshold;
      // return distance ;
    });
    setState((state) => ({
      ...state,
      properties: filteredProperties,
    }));
}
function calculateDistance(lat1, lng1, lat2, lng2) {
  const earthRadius = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (getCurrentLocation) {
      setCurrentLocation(getCurrentLocation);
    }
  }, [getCurrentLocation]);

  const onMarkerClick = (props, marker, e) => {
    setCurrentLocation(props);
  }

  const onInfoWindowClose = () => {
    setCurrentLocation(null);
  }
  const updateRange = (data) => {
    // console.log('rang',{to: data.to, from: data.from});
    setState(prevState => ({
      ...prevState,
      to: data.to,
      from: data.from
    }));
   }

  const getProperties = () => {
    let model = {
      search: $('#search').val(),
      price_min: (state.from * 1000).toString(),
      price_max: (state.to * 1000).toString(),
      area_min: state.minSq.toString(),
      area_max: state.maxSq.toString(),
      beds: state.bed.toString(),
      baths: state.bath.toString(),
      property_type: state.property_type,
      commute: state.commuteAddress,
      commute_drive_time: state.commute.toString(),
      // schools: this.state.school
  };


  ServerCallings.getProperties(model, (data) => {
      if (data) {
          setState({properties: data})
      }
  })
  }

  const delta = (data) => {
    setState(prevState => ({
      ...prevState,
      properties: data
    }));
  }
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (value.indexOf(' sq') !== -1) {
      value = value.replace('e', '');
      value = value.replace('E', '');
      value = value.replace('+', '');
      value = value.replace('-', '');
      value = value.replace(' sq', '');

      if (!isNaN(value)) {
        setState(prevState => ({
          ...prevState,
          [name]: value
        }));
        // setState(prevState => ({...prevState, [name]: value}));
      }
    }
  };
  const TitleCase = (txt) => {
    return txt.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1));
  };
  const handlePageChange = (event) => {
    event.preventDefault();
    setState(prevState => ({
        ...prevState,
        currentPage: Number(event.target.innerText)
      }));
  };
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const setPropertyType = (e) => {
    setState(prevState => ({
      ...prevState,
      property_type: TitleCase(e.target.name)
    }));
    $('.box5 div').removeClass('active').addClass('inactive');
    $('#' + TitleCase(e.target.name)).removeClass('inactive').addClass('active');
}
  useEffect(() => {
    getProperties();

    $(".js-range-slider").ionRangeSlider({onChange: updateRange});
  }, []);
 

  return (
    <div className="search bgHeaderPattern">
        <img src={bgPattern} alt="bgPattern" className="bgPattern"/>
                <div className="search-fild">
                        {/* <img className='loction-img' src={location} alt="location"/> */}
                        {/* <PlacesAutocomplete
                        
            value={state.propertyValue}
            onChange={handleChangeAddress}
            onSelect={handleSelect}
            suggestions={state.addresses.filter((address) =>
              address.toLowerCase().includes(state.propertyValue.toLowerCase())
            )}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: `${getCurrentLocation.city}`,
                    className: 'search-field',
                    id:"search"
                  })}
                />
                  <img className='location-img' src={location} alt="location"/>
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
          </PlacesAutocomplete> */}
          <AoutoPlaces address={state.propertyValue} handleChangeAddress={handleChangeAddress} handleSelect={handleSelect} />
                    <div className=''>
                        {/* <input id="search" type="text" placeholder={getCurrentLocation.city}/> */}
                    </div>
                    {/* <button onClick={getProperties}><img src={search} alt="search"/></button> */}
                </div>
                <div className="filters">
                    <div className="select">
                        <div className="dropDown dR">
                            <button 
                             onClick={() =>  setState(prevState => ({
                              ...prevState,
                              showRate: !state.showRate,
                              showBath: false,
                              showBed: false,
                              showCommute: false,
                              showMore: false,
                              showSquareFeet: false,
                              showType: false
                            }))}>
                                ${state.from} - ${state.to}k<img src={arrowDown} alt="arrowDown"/>
                            </button>
                            <div style={{display: state.showRate ? "block" : "none"}} className="content">
                                <div className="box1">
                                    <div className="bg">
                                        <div className="graphIntersect">
                                            <img src={graphIntersect} alt="graphIntersect"/>
                                        </div>
                                        <input
                                            type="text"
                                            data-min="0"
                                            data-to={state.to}
                                            defaultValue=""
                                            name="my_range"
                                            data-prefix="$"
                                            data-max="1000"
                                            data-from={state.from}
                                            data-postfix="k"
                                            data-skin="round"
                                            data-type="double"
                                            data-min-interval="10"
                                            data-hide-min-max="true"
                                            data-values-separator=" - "
                                            className="js-range-slider"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropDown">
                            <button 
                             onClick={() =>  setState(prevState => ({
                              ...prevState,
                              showSquareFeet: !state.showSquareFeet,
                                showRate: false,
                                showBath: false,
                                showBed: false,
                                showCommute: false,
                                showMore: false,
                                showType: false
                            }))}>
                                {/*
                                { maxSq === 0 && minSq === 0 ? "Square Feet" : `${minSq} - ${maxSq} sq` }
                            */}
                                Square Feet<img src={arrowDown} alt="arrowDown"/>
                            </button>
                            <div style={{display: state.showSquareFeet ? "block" : "none"}} className="content">
                                <div className="box1 box2">
                                    <Row>
                                        <Col xs={6}>
                                            <label>
                                                <input
                                                    type="text"
                                                    name="minSq"
                                                    value={state.minSq + ' sq'}
                                                    onChange={handleChange}
                                                />
                                                Min
                                            </label>
                                        </Col>
                                        <Col xs={6}>
                                            <label>
                                                <input
                                                    type="text"
                                                    name="maxSq"
                                                    value={state.maxSq + ' sq'}
                                                    onChange={handleChange}
                                                />
                                                Max
                                            </label>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div className="dropDown dB">
                            <button 
                             onClick={() =>  setState(prevState => ({
                              ...prevState,
                              showBed: !state.showBed,
                              showRate: false,
                              showBath: false,
                              showCommute: false,
                              showMore: false,
                              showSquareFeet: false,
                              showType: false
                            }))}
                            >
                                {/* { bed === -1 ? "Beds" : bed === 0 ? "Any" : bed } */}
                                Bed<img src={arrowDown} alt="arrowDown"/>
                            </button>
                            <div style={{display: state.showBed ? "block" : "none"}} className="content">
                                <div className="box1 box3">
                                    {
                                        state.beds?.map((bed, index) => {
                                            let len = state.beds.length;
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() =>  setState(prevState => ({
                                                      ...prevState,
                                                      bed: bed
                                                    }))}
                                                    className={bed === state.bed ? "active" : ""}
                                                    style={{
                                                        border: index === len - 1 ? "none" : "",
                                                        borderRadius: index === 0 ? "6px 6px 0 0" :
                                                            index === len - 1 ? "0 0 6px 6px" : ""
                                                    }}
                                                >
                                                    {bed === 0 ? "Any" : bed}
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="dropDown dB">
                            <button 
                             onClick={() =>  setState(prevState => ({
                              ...prevState,
                              showBath: !state.showBath,
                              showRate: false,
                              showBed: false,
                              showCommute: false,
                              showMore: false,
                              showSquareFeet: false,
                              showType: false
                            }))}>
                                {/* { baths === -1 ? "Baths" : bath === 0 ? "Any" : bath } */}
                                Bath<img src={arrowDown} alt="arrowDown"/>
                            </button>
                            <div style={{display: state.showBath ? "block" : "none"}} className="content">
                                <div className="box1 box3 box4">
                                    {
                                        state.baths?.map((bath, index) => {
                                            let len = state.baths.length;
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() =>  setState(prevState => ({
                                                      ...prevState,
                                                      bath: bath
                                                    }))}
                                                    className={bath === state.bath ? "active" : ""}
                                                    style={{
                                                        border: index === len - 1 ? "none" : "",
                                                        borderRadius: index === 0 ? "6px 6px 0 0" :
                                                            index === len - 1 ? "0 0 6px 6px" : ""
                                                    }}
                                                >
                                                    {bath === 0 ? "Any" : bath}
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="dropDown">
                            <button 
                              onClick={() =>  setState(prevState => ({
                                ...prevState,
                                showType: !state.showType,
                                showBath: false,
                                showRate: false,
                                showBed: false,
                                showCommute: false,
                                showMore: false,
                                showSquareFeet: false
                              }))}>
                                Property Type<img src={arrowDown} alt="arrowDown"/>
                            </button>
                            <div style={{display: state.showType ? "block" : "none"}} className="content">
                                <div className="box1 box5">
                                    <Row>
                                        <Col xs={4}>
                                            <div id="House" className="active">
                                                <img src={checkCircle} alt="checkCircle" className="c"/>
                                                <img name="house" src={house1} alt="house1"
                                                     onClick={setPropertyType}/>
                                                <p>House</p>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                            <div id="Condo">
                                                <img src={checkCircle} alt="checkCircle" className="c"/>
                                                <img name="condo" src={condo} alt="condo"
                                                     onClick={setPropertyType}/>
                                                <p>Condo</p>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                            <div id="TownHouse">
                                                <img src={checkCircle} alt="checkCircle" className="c"/>
                                                <img name="townHouse" src={townHouse} alt="townHouse"
                                                     onClick={setPropertyType}/>
                                                <p>Townhouse</p>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                            <div id="Multifamily">
                                                <img src={checkCircle} alt="checkCircle" className="c"/>
                                                <img name="multifamily" src={multiFamily} alt="multiFamily"
                                                     onClick={setPropertyType}/>
                                                <p>Multifamily</p>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                            <div id="Land">
                                                <img src={checkCircle} alt="checkCircle" className="c"/>
                                                <img name="land" src={land} alt="land" onClick={setPropertyType}/>
                                                <p>Land</p>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                            <div id="Otherhouse">
                                                <img src={checkCircle} alt="checkCircle" className="c"/>
                                                <img name="otherhouse" src={otherHouse} alt="otherHouse"
                                                     onClick={setPropertyType}/>
                                                <p>Otherhouse</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div className="dropDown">
                            <button 
                              onClick={() =>  setState(prevState => ({
                                ...prevState,
                                showCommute: !state.showCommute,
                                showBath: false,
                                showRate: false,
                                showBed: false,
                                showMore: false,
                                showSquareFeet: false,
                                showType: false
                              }))}
                           >
                                Commute<img src={arrowDown} alt="arrowDown"/>
                            </button>
                            <div style={{display: state.showCommute ? "block" : "none"}} className="content">
                                <div className="box1 box6">
                                    <input
                                        type="text"
                                        // value={state.commuteAddress}
                                        placeholder="Enter your commute address"
                                        onChange={(e) =>  setState(prevState => ({
                                          ...prevState,
                                          commuteAddress: e.target.value
                                        }))}
                                        
                                    />
                                    <h4>Select maximum drive time</h4>
                                    <div>
                                        {
                                            state.commutes.map((commute, index) => {
                                                let len = state.commutes.length;
                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() =>  setState(prevState => ({
                                                             ...prevState,
                                                          commute: commute
                                                        }))}
                                                        className={commute === state.commute ? "active" : ""}
                                                        style={{
                                                            border: index === len - 1 ? "none" : "",
                                                            borderRadius: index === 0 ? "6px 6px 0 0" :
                                                                index === len - 1 ? "0 0 6px 6px" : ""
                                                        }}
                                                    >
                                                        {commute === 0 ? "Any" : `${commute} min`}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropDown">
                            <button 
                              onClick={() =>  setState(prevState => ({
                                ...prevState,
                                showMore: !state.showMore,
                                showBath: false,
                                showRate: false,
                                showBed: false,
                                showCommute: false,
                                showSquareFeet: false,
                                showType: false
                              }))}>
                                More<img src={arrowDown} alt="arrowDown"/>
                            </button>
                            <div style={{display: state.showMore ? "block" : "none"}} className="content">
                                <div className="box1 box7">
                                    <h4>Listing Type</h4>
                                    <div className="Switch">
                                        <p>New Construction</p>
                                        <label className="switch">
                                            <input type="checkbox"/>
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="Switch">
                                        <p>Must Have Garage</p>
                                        <label className="switch">
                                            <input type="checkbox"/>
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="Switch">
                                        <p>Accessible Only</p>
                                        <label className="switch">
                                            <input type="checkbox"/>
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="Switch">
                                        <p>Must Have Pool</p>
                                        <label className="switch">
                                            <input type="checkbox"/>
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="Switch">
                                        <p>Have Basement</p>
                                        <label className="switch">
                                            <input type="checkbox"/>
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <h4>Shows Only</h4>
                                    <div className="Switch">
                                        <p>Open House</p>
                                        <label className="switch">
                                            <input type="checkbox"/>
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="Switch">
                                        <p>Price Reduced</p>
                                        <label className="switch">
                                            <input type="checkbox"/>
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="Switch">
                                        <p>Include Estimates</p>
                                        <label className="switch">
                                            <input type="checkbox"/>
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <select defaultValue={state.school}  
                         onChange={(e) =>  setState(prevState => ({
                              ...prevState,
                              school: e.target.value
                            }))}>
                            <option value={0} disabled hidden>School</option>
                            {
                                state.schools?.map((school, index) => {
                                    return (<option key={index} value={school}>{school}</option>)
                                })
                            }
                        </select>
                        <div className="ml-auto">
                            <span>Sort by:</span>
                            <select
                                defaultValue={state.home}
                                className="mt-auto"
                                  onChange={(e) =>  setState(prevState => ({
                              ...prevState,
                              home: e.target.value
                            }))}
                            >
                                <option value={0} disabled hidden>Newest Home</option>
                                {
                                    state.homes.map((home, index) => {
                                        return (<option key={index} value={home}>{home}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <button onClick={() => {
                            getProperties()
                        }}>Apply
                        </button>
                    </div>
                    <div className="buttons">
                        <button onClick={() => {
                            console.log("!!!")
                        }}>Apply
                        </button>
                        {/* <select
                        defaultValue={state.home}
                        className="mt-auto"
                        onChange={(e) =>  setState(prevState => ({
                          ...prevState,
                          home: e.target.value
                        }))}
                      >
                        <option value={0} disabled hidden>
                          Newest Home
                        </option>
                        {state.homes?.map((home, index) => (
                          <option key={index} value={home}>
                            {state.home}
                          </option>
                        ))}
                      </select> */}
                    </div>
                </div>
                <div className="available">
                <h5>{state.properties?.length} homes available</h5>
                <Row className='d-flex justify-content-between'>
                <Col lg={6}>
                <Row className="similar">
              {state.properties?.length > 0 ? (
                state.properties.slice(startIndex, endIndex).map((property) => (
                  <Col lg={6} md={6} sm={6} xs={12} key={property.slug}>
                    <div className="box">
                      <Carousel className="img3">
                        <Carousel.Item>
                          {property?.image_or_video?.endsWith(".mp4") ? (
                            <>
                              <video controls className="img3">
                                <source src={property.image_or_video} type="video/mp4" />
                              </video>
                              <button className="play">
                                <img src={play} alt="play" />
                              </button>
                              <div className="voice-and-time">
                                <button>
                                  <img src={voice} alt="voice" />
                                </button>
                              </div>
                            </>
                          ) : (
                            <img src={property.image_or_video} alt="Not Avail" />
                          )}
                          <button className="now">Now</button>
                          <div className="heart">
                            <button>
                              <img src={heart} alt="heart" />
                            </button>
                          </div>
                        </Carousel.Item>
                      </Carousel>
                      <Link to={`/feature/${property.slug}`}>
                        <div className="details">
                          <div className="detail">
                            <span className="amount">${property.price}</span>
                            <span className="bed">
                              <img src={bed} alt="bed" width="22.92" height="12.82" />
                              <span>{property.beds} Bed</span>
                            </span>
                            <span className="bath">
                              <img src={bath} alt="bed" width="18.06" height="14.57" />
                              <span>{property.baths} Bath</span>
                            </span>
                          </div>
                          <p className="address">{property.home_address}</p>
                        </div>
                      </Link>
                    </div>
                  </Col>
                ))
              ) : (
                <h2>Not Found</h2>
              )}
               </Row>
                </Col>
                <Col lg={6} style={{ paddingTop: "19px", paddingBottom: "45.49px" }}>
                <div className="mapLoc">
           
                <MapContainer
                 zoom={zoomLevel}
                 center={center}
                 zoomControl={false}
                 scrollWheelZoom={false}
                 attributionControl={false}
                 whenCreated={onMapLoad}
                //  center={center} zoom={10} whenCreated={(map) => (mapRef.current = map)} scrollWheelZoom={false}
                 >
                <GoogleMap />
                <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://openmaptiles.org/">Eign</a> contributors'
              />
                
              <MapEvents />
              <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
              >
           
                {allProperties?.map((marker) => (
                  <Marker position={{lat : marker.location_lat ,lng: marker.location_long}} icon={customIcon2}>
                    <Popup>{marker.home_address}</Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
                <Marker position={{ lat: latNum, lng: lngNum }} icon={customIcon}>
                  <TooltipCircle />
                  <CircleMarker center={[latNum, lngNum]} pathOptions={{ color: 'blue' }} radius={100}>
                    <Tooltip>Tooltip for CircleMarker</Tooltip>
                  </CircleMarker>
                  <Popup>
                    {getCurrentLocation.city}
                  </Popup>
                </Marker>
             
                <ZoomControl position="topright" />
              </MapContainer>

                
                </div>
                </Col>
       
                <Col lg={6} className="paginationCol">
                <div className="pagination">
       
            {Array.from({ length: Math.ceil(state.properties?.length / state.itemsPerPage) }, (_, i) => i + 1).map((pageNumber) => {
        const isCurrentPage = state.currentPage === pageNumber;
        const isStart = pageNumber === 1 || pageNumber === state.currentPage - 1 || pageNumber === state.currentPage;
        const isEnd = pageNumber === Math.ceil(state.properties?.length / state.itemsPerPage) || pageNumber === state.currentPage + 1 || pageNumber === state.currentPage;
        const isEllipsis = !isStart && !isEnd;
        return (
          <React.Fragment key={pageNumber}>
            {isEllipsis && <span>.</span>}
            {(isStart || isEnd || isCurrentPage) && (
              <a href="#" className={isCurrentPage ? "active" : ""} onClick={handlePageChange}>
                {pageNumber}
              </a>
            )}
          </React.Fragment>
        );
      })}

                {/* <a href="/search" className="active">
                1
                </a>
                <a href="/search">2</a>
                <a href="/search">3</a>
                <a href="/search">. . . .</a>
                <a href="/search">15</a>
                <a href="/search"></a> */}
                </div>
                {/* <p className="pagination">1 -8 of 200+ Home</p> */}
                </Col>
                </Row>
                </div>
       </div>
  );
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyBarK2r8HSxO1uiWJL53BEosVTHaW-U5vY"
})(Search);