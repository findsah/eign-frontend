import React, { useEffect, useState } from 'react';

// import axios from 'axios';

import {Container, Row, Col, Tab, Spinner} from 'react-bootstrap';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import whiteLand from '../../assets/icons/white-land.svg';
import blackLand from '../../assets/icons/black-land.svg';
import whiteHouse from '../../assets/icons/white-house.svg';
import blackHouse from '../../assets/icons/black-house.svg';
import whiteCondo from '../../assets/icons/white-condo.svg';
import blackCondo from '../../assets/icons/black-condo.svg';
import whiteTownHouse from '../../assets/icons/white-town-house.svg';
import blackTownHouse from '../../assets/icons/black-town-house.svg';
import whiteOtherHouse from '../../assets/icons/white-other-house.svg';
import blackOtherHouse from '../../assets/icons/black-other-house.svg';
import whiteMultiFamily from '../../assets/icons/white-multi-family.svg';
import blackMultiFamily from '../../assets/icons/black-multi-family.svg';

import submitadd from '../../assets/icons/s-add.png';
import blogsearch from '../../assets/icons/b-search.png';
import submitaddimg from '../../assets/icons/s-addmore.png';
import checkCircle from '../../assets/icons/checkCircle.png';
import submitellipse from '../../assets/icons/s-ellipse.png';
import submitellipseblue from '../../assets/icons/s-ellipseblue.png';

import submitmap from '../../assets/images/s-map.png';
import submitupload from '../../assets/images/s-upload.png';

// import {NodeFetchHelper} from '../utils/NodeFetchHelper';

import { useDispatch, useSelector } from 'react-redux';
import { createProperty, uploadFiles } from './service/SubmitporpertyApi';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
  import Geocode from "react-geocode";
import { toast } from 'react-toastify';
import { getPropertyDetails } from '../feature/service/GetPropertyApi';
import AWS from 'aws-sdk';  
import { useNavigate } from 'react-router-dom';
function SubmitProperty(props) {

  const [selectedIndex, setSelectedIndex] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { getCurrentLocation } = useSelector((state) => state?.shareSlice)
     const lat = localStorage.getItem('lat')
     const lng = localStorage.getItem('lng')
     const user_id = sessionStorage.getItem('user_id')
     let token = sessionStorage.getItem('token')
     const [state, setState] = useState({
      isLoggedIn: false,
      tax: 0,
      lot: 0,
      HOA: 0,
      map: "",
      area: 0,
      beds: 0,
      baths: 0,
      price: 0,
      payment: 0,
      stories: 0,
      interest: 0,
      mortgage: 0,
      home_address: "",
      addresses: [],
      insurance: 0,
      error: false,
      key: "first",
      community: "",
      loader: false,
      noiseLevel: "",
      uploadedPath: "",
      uploadedPaths: [],
      nearby_schools: "",
      propertyDetail: "",
      propertyType: "House",
      propertySubmitted: "",
      propertyNotSubmitted: "",
      location_lat: '',
      location_long: '',

    });
    const fetchAddresses = async () => {
      try {
        const response = await Geocode.fromLatLng(lat, lng);
        const addresses = response.results.map((result) => result.formatted_address);
        setState({ ...state, addresses : addresses });
      } catch (error) {
        console.log(error);
      }
    };
    const handleChangeAddress = (address) => {
      setState({ ...state, home_address: address });
      console.log('addressaddress',state.home_address);
  };
  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const selectedPlace = results[0];
      const { lat, lng } = await getLatLng(selectedPlace);
      // Update the state with the selected address, lat, and lng
      setState((state) => ({
        ...state,
        home_address: address,
       location_lat: lat,
        location_long: lng
      }));
    } catch (error) {
      console.error('Error retrieving place details:', error);
    }

};
     useEffect(() => {
        fetchAddresses()
    }, []);

     useEffect(() => {
         token = sessionStorage.getItem('token')

    }, [token]);
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
 
   
      const secondPage = () => { 

            setState({...state, key: "second"})
        
      }
      useEffect(() => {
        if (!token) {
            // User ID not found, show error message
            toast.error('Please Login first');
          } 
      }, [token]);
    
    
      const handleChangeNearby = (address) => {
          setState({ ...state, nearby_schools: address });
      };
        const handleSelectNearby = async (address) => {
        const results = await geocodeByAddress(address);
        const latLng = await getLatLng(results[0]);
        console.log('results',results);
        setState({ ...state, nearby_schools: address });
         }; 
        // const handleSelect = async (address) => {
        // const results = await geocodeByAddress(address);
        // const latLng = await getLatLng(results[0]);
        // console.log('results',results);
        // setState({ ...state, home_address: address });
        //  }; 
         // Define the handleSelect function to retrieve the selected place's details
    
         
  const handleChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setSelectedIndex(value)
    if (value.indexOf('$') !== -1) {
      value = value.replace('$', '');
    } else if (value.indexOf(' lot') !== -1) {
      value = value.replace(' lot', '');
    } else if (value.indexOf(' sqf') !== -1) {
      value = value.replace(' sqf', '');
    }

    if (!isNaN(value)) {
      if (value !== "") {
        setState({ ...state, [name]: parseInt(value) })
      } else {
        setState({ ...state, [name]: 0 })
      }
    }
  };
  // const  getProperties  = useSelector((state) => state.fetchProeryReducer)

  // const slug = sessionStorage.getItem('slug') 
  // useEffect(() => {
  //   dispatch(getPropertyDetails(slug));
  // }, [dispatch, slug]);

  const remove = (index) => {
    let { uploadedPaths } = state;
    uploadedPaths.splice(index, 1);
    setState({ ...state, uploadedPaths: uploadedPaths })
  };

//   const addMore = (e) => {
//     var files = []
//     for (var i = 0; i < e.target.files.length; i++) {
//       files.push(e.target.files[i])
//     }
//     console.log('files',files);
//     setState({ ...state, uploadedPaths: files })
//   };
  const addMore = (e) => {
    const files = e.target.files;
    const uploadedPaths = [...state.uploadedPaths];
    uploadedPaths.push(files[0]);
    console.log('files',uploadedPaths);
    setState({ ...state, uploadedPaths });
  };

  const submitProperty = async() => {  
    setState({...state, loader: true})    
    if (state.uploadedPath === "" || state.community === "" || state.home_address === "" || state.propertyDetail === "" || state.nearBySchools === "") {

        if (!state.error) {
            setState({ ...state, 
              error : true,
              loader : false,
             });
        }
        setState({...state, loader: false})  

    } else {
        try {           
            AWS.config.update({
                accessKeyId: 'AKIA4ECDXBW4RGSQEEOR',
                secretAccessKey: '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',
              });
            const s3 = new AWS.S3();
            const file = state.uploadedPath;
            const params = {
              Bucket: 'eignbucket',
              Key: file.name,
              Body: file,
            };
            let promises = [];
            let promise1 = new Promise((resolve, reject) => {
              s3.upload(params, function(err, data) {
                if (err) {
                  console.log(err);
                  reject(err);
                } else {
                  console.log(data.Location);
                  resolve(data.Location);
                }
              });
            });
    
            promises.push(promise1);
  
            for (let i = 0; i < state.uploadedPaths.length; i++) {
                const file = state.uploadedPaths[i];
                const fileParams = {
                  Bucket: 'eignbucket',
                  Key: file.name,
                  Body: file,
                };
            
                let promise = new Promise((resolve, reject) => {
                  s3.upload(fileParams, function (err, data) {
                    if (err) {
                      console.log('Error', err);
                      reject(err);
                    } else {
                      setState({...state, loader: true})  
                      resolve(data.Location);
                    }
                  });
                });
                promises.push(promise);
              }
            
              try {
                const uploadResults = await Promise.all([promise1, ...promises]);
                const uploadedPath = uploadResults[0];
                const uploadedPaths = uploadResults.slice(2);
                // const uploadedPaths = uploadResults;
                const propertyAttachment = uploadedPaths.join(',');
                const formData = new FormData();
               const formFields = {
                title: state.home_address,
                image_or_video: uploadedPath,
                property_attachment: propertyAttachment,
                home_address: state.home_address,
                beds: state.beds,
                baths: state.baths,
                area: state.area,
                lot: state.lot,
                price: state.price,
                est_payment: state.payment,
                community: state.community,
                stories: state.stories,
                property_type: state.propertyType,
                nearby_schools: state.nearby_schools,
                property_detail: state.propertyDetail,
                interest: state.interest,
                tax: state.tax,
                insurance: state.insurance,
                HOA: state.HOA,
                mortgage_insurance: state.mortgage,
                noise_level: state.noiseLevel,
                user: user_id,
                location_lat: state.location_lat,
                location_long: state.location_long
              };
              
              for (const [key, value] of Object.entries(formFields)) {
                formData.append(key, value);
              }
              // const filesData = new FormData();
                  const response = await dispatch(createProperty(formData));
                  if (response.payload.user) {
                    toast.success('property submitted')
                    navigate('/')
                    setState({...state, key: 'first'}) 
                    setState({...state, loader: false}) 
                  }else {
                        toast.error('Please try Again')  
                        setState({...state, loader: false})  
                      }
              } catch (error) {
                setState({...state, loader: false}) 
                toast.error('Please try Again')   
                console.log('Error occurred while uploading files:', error);
              }
         
          } catch (error) {
            console.error('error', error);
            toast.error('Somthing went wrong')  
        }
     }
    
      

  };
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const fileExtension = state.uploadedPath && state.uploadedPath.type ? state.uploadedPath.type.split("/")[1].toLowerCase() : '';
  const mapStyles = [
    // Add your custom styles here
    // Example:
    { featureType: 'water', stylers: [{ color: '#5C7F93' }] },
  ];
  return (
    <div className="submitproperty" >
    <Container className="submit">
        <Tab.Container id="left-tabs-example" activeKey={state.key}>
            <Tab.Content>
                <Tab.Pane eventKey="first">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Submit Property</p>
                                {state.uploadedPath ? (
                               allowedExtensions.includes(fileExtension) ? (
                                    <img
                                        alt="uploadedPath"
                                        className="uploadedimg"
                                        src={URL.createObjectURL(state.uploadedPath)}
                                    />
                                ) : (
                                    <video
                                        alt="uploadedPath"
                                        className="uploadedimg"
                                        src={URL.createObjectURL(state.uploadedPath)}
                                        controls
                                    />
                                )
                            ) : (
                                <label htmlFor="file-input" className="dottedborderbox">
                                    <img
                                        src={submitupload}
                                        alt="submitupload"
                                        className="submitupload"
                                    />
                                    <input
                                        type="file"
                                        id="file-input"
                                        accept="image/*, video/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setState({...state,uploadedPath: file});
                                        }}
                                    />
                                    <p>Upload images, Video</p>
                                </label>
                            )}

                                {
                                    state.error && state.uploadedPath === "" ?
                                        <div className="error">Please upload image or video.</div> : ""
                                }
                            </div>

                            <div className="more-images">
                            {
                            Array.isArray(state.uploadedPaths) && state.uploadedPaths?.map((path, index) => {
                              return (
                                <label
                                  key={index}
                                  htmlFor="uploaded-path"
                                  className="uploaded-path"
                                >
                                  <i
                                    className="fa fa-times"
                                    onClick={() => remove(index)}
                                  />
                                  <br/>
                                  {path.type.includes('mp4') ? (
                                    <video
                                      alt="uploadedPath"
                                      className="uploadedPath"
                                      src={URL.createObjectURL(path)}
                                      controls
                                    />
                                  ) : (
                                    <img
                                      src={URL.createObjectURL(path)}
                                      alt="uploadedPath"
                                      className="uploadedPath"
                                    />
                                  )}
                                  <input
                                    type="file"
                                    id="add-more"
                                    accept="image/*, video/*"
                                    onChange={addMore}
                                  />
                                </label>
                              );
                            })
                            }

                                <label htmlFor="add-more" className="addMore">
                                    <img src={submitaddimg} alt="submitaddimg" className="submitaddimg"/>
                                    <br/>Add more
                                    <input
                                        type="file"
                                        id="add-more"
                                        accept="image/*, video/*"
                                        onChange={addMore}
                                    />
                                </label>
                            </div>

                            <div className="detail">
                            <Row>
             <Col lg={6} md={6} sm={12} xs={12} className="detailleft">
        <label>Your home address</label>
        <br />
        
        <PlacesAutocomplete
            value={state.home_address}
            onChange={handleChangeAddress}
            onSelect={handleSelect}
            suggestions={state.addresses.filter((address) =>
              address.toLowerCase().includes(state.home_address.toLowerCase())
            )}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Enter your address',
                    className: 'location-search-input',
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


        <br /> 
        {state.error && state.home_address === '' && (
          <div className="error">Please fill out this field.</div>
        )}  
        
        <div className="bedbath">
          <label>Bed</label>
          <br />
          <button
            className={state.beds === 1 ? 'active btn1' : 'btn1'}
            onClick={() => setState({ ...state, beds: 1 })}
          >
            1
          </button>
          <button
            className={state.beds === 2 ? 'active' : ''}
            onClick={() => setState({ ...state, beds: 2 })}
          >
            2
          </button>
          <button
            className={state.beds === 3 ? 'active' : ''}
            onClick={() => setState({ ...state, beds: 3 })}
          >
            3
          </button>
          <button
            className={state.beds === 5 ? 'active' : ''}
            onClick={() => setState({ ...state, beds: 5 })}
          >
            5
          </button>
          <button
            className={state.beds === 6 ? 'active btn6' : 'btn6'}
            onClick={() => setState({ ...state, beds: 6 })}
          >
            +6
          </button>
        </div>
        <div className="bedbath">
          <label>Bath</label>
          <br />
          <button
            className={state.baths === 1 ? 'active btn1' : 'btn1'}
            onClick={() => setState({ ...state, baths: 1 })}
          >
            1
          </button>
          <button
            className={state.baths === 2 ? 'active' : ''}
            onClick={() => setState({ ...state, baths: 2 })}
          >
            2
          </button>
          <button
            className={state.baths === 3 ? 'active' : ''}
            onClick={() => setState({ ...state, baths: 3 })}
          >
            3
          </button>
          <button
            className={state.baths === 5 ? 'active' : ''}
            onClick={() => setState({ ...state, baths: 5 })}
          >
            5
          </button>
          <button
            className={state.baths === 6 ? 'active btn6' : 'btn6'}
            onClick={() => setState({ ...state, baths: 6 })}
          >
            +6
          </button>
        </div>
        <div>
                                            <div className="sqf">
                                                <label>sqf</label><br/>
                                                <input
                                                    name="area"
                                                    value={state.area}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="lot">
                                                <label>lot</label><br/>
                                                <input
                                                    name="lot"
                                                    value={state.lot}
                                                    maxLength={5}
                                                    onChange={(e) => setState({...state,lot: e.target.value})}

                                                />
                                            </div>
                                        </div>
                                        <button
                                            className="continue"
                                            onClick={() => secondPage()}
                                            // onClick={() => submitProperty()}
                                            // onClick={() => uploadData()}

                                            // disabled={selectedIndex === null}
                                            >
                                            Continue
                                        </button>
                                    </Col>
                                    <Col lg={6} md={6} sm={12} xs={12} className="detailright"></Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Submit Property</p>
                            </div>
                            <div className="detail">
                                <Row>
                                    <Col lg={8} md={8} sm={12} xs={12} className="detailright">
                                        <Row>
                                            <Col lg={6} md={6} sm={12} xs={12} className="sqf">
                                                <label>Price</label><br/>
                                                <input
                                                    name="price"
                                                    value={ state.price}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col lg={6} md={6} sm={12} xs={12} className="lot">
                                                <label>Est. payment</label><br/>
                                                <input
                                                    name="payment"
                                                    value={ state.payment}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                          {/* <div className="propdetail">
                                          <label>Price</label>
                                          <br />
                                          <input
                                            name="price"
                                            value={ state.price}
                                            onChange={handleChange}
                                          />
                                        </div> */}
                                        <div>
                                            <div className="sqf">
                                                <label>Community</label><br/>
                                                <input name="community"
                                                       value={state.community}
                                                       onChange={(e) => setState({...state,community: e.target.value})}
                                                />
                                                {
                                                    state.error && state.community === "" ?
                                                        <div className="error">
                                                            Please fill out this field.
                                                        </div> : ""
                                                }
                                            </div>
                                            <div className="lot">
                                                <label>Stories</label><br/>
                                                <input
                                                    name="stories"
                                                    value={state.stories}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12} className="detailright">
                                        <div className="box5">
                                            <label>Property Type</label>
                                            <Row>
                                                <Col lg={2} md={3} sm={4} xs={4}>
                                                    <div
                                                        className={state.propertyType === "House" ? "active" : ""}
                                                        onClick={() =>
                                                            setState({...state, propertyType: "House"})
                                                        }
                                                    >
                                                        <img
                                                            src={checkCircle}
                                                            alt="checkCircle"
                                                            className="c"
                                                        />
                                                        <img
                                                            alt="House"
                                                            src={
                                                                state.propertyType === "House" ?
                                                                    whiteHouse : blackHouse
                                                            }
                                                        />
                                                        <p>House</p>
                                                    </div>
                                                </Col>
                                                <Col lg={2} md={3} sm={4} xs={4}>
                                                    <div
                                                        className={state.propertyType === "Condo" ? "active" : ""}
                                                    
                                                        onClick={() =>
                                                            setState({...state, propertyType: "Condo"})
                                                        }
                                                    >
                                                        <img src={checkCircle}
                                                             alt="checkCircle"
                                                             className="c"
                                                        />
                                                        <img
                                                            alt="Condo"
                                                            src={
                                                              state.propertyType === "Condo" ?
                                                                    whiteCondo : blackCondo
                                                            }
                                                        />
                                                        <p>Condo</p>
                                                    </div>
                                                </Col>
                                                <Col lg={2} md={3} sm={4} xs={4}>
                                                    <div
                                                        className={
                                                          state.propertyType === "TownHouse" ? "active" : ""
                                                        }
                                                    
                                                        onClick={() =>
                                                            setState({...state, propertyType: "TownHouse"})
                                                        }
                                                    >
                                                        <img
                                                            src={checkCircle}
                                                            alt="checkCircle"
                                                            className="c"
                                                        />
                                                        <img
                                                            alt="TownHouse"
                                                            src={
                                                              state.propertyType === "TownHouse" ?
                                                                    whiteTownHouse : blackTownHouse
                                                            }
                                                        />
                                                        <p>TownHouse</p>
                                                    </div>
                                                </Col>
                                                <Col lg={2} md={3} sm={4} xs={4}>
                                                    <div
                                                        className={
                                                          state.propertyType === "Multifamily" ? "active" : ""
                                                        }
                                                    
                                                        onClick={() =>
                                                            setState({...state, propertyType: "Multifamily"})
                                                        }
                                                    >
                                                        <img
                                                            src={checkCircle}
                                                            alt="checkCircle"
                                                            className="c"
                                                        />
                                                        <img
                                                            alt="Multifamily"
                                                            src={
                                                              state.propertyType === "Multifamily" ?
                                                                    whiteMultiFamily : blackMultiFamily
                                                            }
                                                        />
                                                        <p>Multifamily</p>
                                                    </div>
                                                </Col>
                                                <Col lg={2} md={3} sm={4} xs={4}>
                                                    <div
                                                        className={state.propertyType === "Land" ? "active" : ""}
                                                    
                                                        onClick={() =>
                                                            setState({...state, propertyType: "Land"})
                                                        }
                                                        
                                                    >
                                                        <img src={checkCircle}
                                                             alt="checkCircle"
                                                             className="c"
                                                        />
                                                        <img
                                                            alt="Land"
                                                            src={
                                                              state.propertyType === "Land" ?
                                                                    whiteLand : blackLand
                                                            }
                                                        />
                                                        <p>Land</p>
                                                    </div>
                                                </Col>
                                                <Col lg={2} md={3} sm={4} xs={4}>
                                                    <div
                                                        className={
                                                          state.propertyType === "Otherhouse" ? "active" : ""
                                                        }
                                                      
                                                        onClick={() =>
                                                            setState({...state, propertyType: "Otherhouse"})
                                                        }
                                                    >
                                                        <img
                                                            src={checkCircle}
                                                            alt="checkCircle"
                                                            className="c"
                                                        />
                                                        <img
                                                            alt="Otherhouse"
                                                            src={
                                                              state.propertyType === "Otherhouse" ?
                                                                    whiteOtherHouse : blackOtherHouse
                                                            }
                                                        />
                                                        <p>Otherhouse</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="nearby">
                                            <label>Nearby Schools</label><br/>
                                            <input
                                                placeholder="Ps 183 Robert L Stevenson"
                                                value={state.nearby_schools}
                                                onChange={(e) => setState({...state,nearby_schools: e.target.value})}


                                            />
                                              {/* <PlacesAutocomplete
                                                    value={state.nearby_schools}
                                                    onChange={handleChangeNearby}
                                                    onSelect={handleSelectNearby}
                                                    suggestions={state.addresses.filter((address) =>
                                                        address.toLowerCase().includes(state.nearby_schools.toLowerCase())
                                                    )}
                                                    >
                                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                        <div>
                                                        <input
                                                            {...getInputProps({
                                                            placeholder: 'Enter your address',
                                                            className: 'location-search-input',
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
                                                    </PlacesAutocomplete> */}
                                               {
                                                state.error && state.nearby_schools === "" ?
                                                    <div className="error">
                                                        Please fill out this field.
                                                    </div> : ""
                                            }
                                            <button>
                                                <img src={submitadd} alt="submitadd"/>
                                                Add more school
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                className="back bak"
                                                onClick={() => setState({...state, key: "first"})}

                                            >
                                                Back
                                            </button>
                                            <button
                                                className="continue con"
                                                onClick={() => setState({...state, key: "third"})}
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Submit Property</p>
                            </div>
                            <div className="propdetail">
                                <label>Property Details</label><br/>
                                <textarea
                                    name="propertyDetail"
                                    value={state.propertyDetail}
                                    onChange={(e) => setState({...state,propertyDetail: e.target.value})}
                                />
                            </div>
                            {
                                state.error && state.propertyDetail === "" ?
                                    <div className="error">Please fill out this field.</div> : ""
                            }
                            <div className="detail">
                                <Row>
                                    <Col lg={8} md={8} sm={12} xs={12} className="detailleft">

                                        <div>
                                            <div className="sqf">
                                                <label>Interest</label><br/>
                                                <input
                                                    name="interest"
                                                    value={ state.interest}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="lot">
                                                <label>Taxes</label><br/>
                                                <input
                                                    name="tax"
                                                    value={ state.tax}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="sqf">
                                                <label>Insurance</label><br/>
                                                <input
                                                    name="insurance"
                                                    value={ state.insurance}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="lot">
                                                <label>HOA</label><br/>
                                                <input
                                                    name="HOA"
                                                    value={ state.HOA}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="mortgage">
                                            <label>Mortgage Insurance</label><br/>
                                            <input
                                                name="mortgage"
                                                value={ state.mortgage}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* <input
                                            id="pac-input"
                                            class="controls"
                                            type="text"
                                            placeholder="Search Box"
                                        />
                                        <div id="map"></div> */}
                         

                                      
                                      
                                        <div className="searchdiv" >
                                        <PlacesAutocomplete
                                            value={state.home_address}
                                            onChange={handleChangeAddress}
                                            onSelect={handleSelect}
                                            suggestions={state.addresses.filter((address) =>
                                              address.toLowerCase().includes(state.home_address.toLowerCase())
                                            )}
                                          >
                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                              <div>
                                                <input
                                                  {...getInputProps({
                                                    placeholder: 'search on map',
                                                    className: 'location-search-input',
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
                                            
                                            {/* <input
                                                type="text"
                                                placeholder="search on map"
                                                value={state.map}
                                                
                                                onChange={(e) => {
                                                    setState({...state, map: e.target.value });
                                                  }}
                                            /> */}

                                        </div>
                                        <div className="searchandimg" >
                                            <Map google={props.google} zoom={12}
                                            // style={{width:'45%',height:'140%'}}
                                              styles={mapStyles}

                                                  center={{ 
                                                    lat: parseFloat(state.location_lat),
                                                      lng: parseFloat(state.location_long),
                                                 }}
                                                 className="submitmapimg" >
                                                <Marker
                                                    draggable={true}
                                                    // onClick={this.onMarkerClick}
                                                    position={{ 
                                                      lat: parseFloat(state.location_lat),
                                                      lng: parseFloat(state.location_long),
                                                     }}
                                                    name={'Current location'}
                                                    // name={state.map}
                                                />

                                                <InfoWindow
                                                //  onClose={onInfoWindowClose}
                                                 >
                                                    <div>
                                                        {/* <h1>{this.state.selectedPlace.name}</h1> */}
                                                    </div>
                                                </InfoWindow>
                                            </Map>
                                            {/* <Map google={props.google} zoom={14}>
 
                                          <Marker onClick={onMarkerClick}
                                                  name={'Current location'} />

                                          {selectedPlace && (
                                                  <InfoWindow onClose={onInfoWindowClose}>
                                                  <div>
                                                      <h1>{selectedPlace.name}</h1>
                                                  </div>
                                                  </InfoWindow>
                                              )}
                                          </Map> */}
                                            
                                        </div>
                                        <div className="noise">
                                            <label>Any noise level on outside</label><br/>
                                            <button
                                                className="btn"
                                                onClick={() => setState({...state, noiseLevel: "yes"})}

                                            >
                                                <img
                                                    alt="submitellipse"
                                                    className="submitellipse"
                                                    src={
                                                      state.noiseLevel === "yes" ?
                                                            submitellipseblue : submitellipse
                                                    }
                                                />
                                                Yes
                                            </button>
                                            <button
                                                className="btn"
                                                onClick={() => setState({...state, noiseLevel: "no"})}

                                            >
                                                <img
                                                    alt="submitellipseblue"
                                                    className="submitellipseblue"
                                                    src={
                                                      state.noiseLevel === "no" ?
                                                            submitellipseblue : submitellipse
                                                    }
                                                />
                                                N/A
                                            </button>
                                        </div>
                                        <br/>

                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col>
                                </Row>
                                {
                                    state.propertySubmitted ?
                                        <div className="submitted-success">{state.propertySubmitted}</div> : ""
                                }
                                {
                                    state.propertyNotSubmitted ?
                                        <div className="submitted-error">{state.propertyNotSubmitted}</div> : ""
                                }
                                {
                                    (state.error && (state.community === "" || state.home_address === "" || state.uploadedPath === "" ||
                                    state.propertyDetail === "" || state.nearby_schools === "")) ? (
                                        <div className="submitted-error">
                                            Please fill out all the fields.
                                        </div>
                                    ) : ""
                                }
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <div>
                                            <button
                                                className="back"
                                                onClick={() => setState({...state, key: "second"})}
                                                >
                                                Back
                                            </button>
                                            <button className="submit" 
                                            // onClick={submitProperty}
                                            onClick={() => submitProperty(state)}

                                            >
                                                {state.loader ? <Spinner animation="grow"/> : "Submit Property"}
                                            </button>
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    </Container>
</div>  
  );
}

// export default SubmitProperty;
export default GoogleApiWrapper({
  apiKey: "AIzaSyBarK2r8HSxO1uiWJL53BEosVTHaW-U5vY",
  libraries: ["places"]
})(SubmitProperty);
