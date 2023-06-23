import React, { useEffect, useState } from 'react';

// import axios from 'axios';

import {Container, Row, Col, Tab, Spinner} from 'react-bootstrap';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import whiteHouse from '../../assets/icons/white-house.svg';
import blackHouse from '../../assets/icons/black-house.svg';
import whiteCondo from '../../assets/icons/white-condo.svg';
import blackCondo from '../../assets/icons/black-condo.svg';
import checkCircle from '../../assets/icons/checkCircle.png';
import submitellipse from '../../assets/icons/s-ellipse.png';
import submitellipseblue from '../../assets/icons/s-ellipseblue.png';

import { useDispatch, useSelector } from 'react-redux';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
  import Geocode from "react-geocode";
import { toast } from 'react-toastify';
import { saveOffer } from './service/SubmitOfferApi';
import { useNavigate, useParams } from 'react-router-dom';
    
function SubmitOffer(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { getCurrentLocation } = useSelector((state) => state?.shareSlice)
     const lat = localStorage.getItem('lat')
     const lng = localStorage.getItem('lng')
     const user_id = sessionStorage.getItem('user_id')
     const token = sessionStorage.getItem('token')
     const userName = sessionStorage.getItem('userName')
     useEffect(() => {
        fetchAddresses()
    }, []);   
    const [state, setState] = useState({
        isLoggedIn: false,
        property_address: "",
        property_location: "",
        legal_land_description: 1,
        property_legal_land_description: '',
        is_chattels_fixtures_improvements_included: 'no',
        included_chattels_fixtures_improvements: '',
        are_there_any_rental_contract: 1,
        rental_contract_item: "",
        buyer_type: "Corporation",
        buyerName: "",
        buyerAddress: "",
        buyerPhone: "",
        buyerEmail: "",
        offer_made_date: "",
        offer_amount: 0,
        initial_deposit_amount: 0,
        deposit_paid_mode: '',
        deposit_due_date: '',
        who_will_hold_the_deposit: "Corporation",
        holder_name: userName,
        when_seller_provide_possession: "",
        closing_date: "",
        offer_subject_conditions: 1,
        conditions_completed_date: '',
        offer_deadline_date: '',
        house_or_unit: "House",
        any_additional_information: 1,
        is_property_address_provided: "no",
        additionalClause : "",
        property_id : id,
        addresses: [],
        insurance: 0,
        error: false,
        key: "first",
        loader: false,
      });


      const fetchAddresses = async () => {
        try {
          const response = await Geocode.fromLatLng(lat, lng);
          const addresses = response.results.map((result) => result.formatted_address);
          setState({ ...state, addresses : addresses });
          console.log('Addresses:', addresses);
        } catch (error) {
          console.log(error);
        }
      };
      const handleChangeAddress = (address) => {
          setState({ ...state, property_address: address });
      };

        const handleSelect = async (address) => {
        const results = await geocodeByAddress(address);
        const latLng = await getLatLng(results[0]);
        console.log('results',results);
        setState({ ...state, property_address: address });
         }; 

  const submitProperty = async() => {  

    if (state.holder_name === "" ) {

        // setState({ ...state, key : 'eleven' });
        if (!state.error) {
            setState({ ...state, error : true });
        }

    } else {
       
        try { 
            const formData = new FormData();
            const formFields = {
              property_address: state.property_address,
              property: state.property_id,
              property_location: state.is_property_address_provided === "yes" ? state.property_address : '',
              legal_land_description: state.legal_land_description,
              property_legal_land_description: state.property_legal_land_description,
              is_chattels_fixtures_improvements_included: state.is_chattels_fixtures_improvements_included === "yes" ? 1 : 2,
              included_chattels_fixtures_improvements: state.included_chattels_fixtures_improvements,
              is_property_address_provided: state.is_property_address_provided === "yes" ? 1 : 2,
              are_there_any_rental_contract: state.are_there_any_rental_contract,
              rental_contract_item: state.rental_contract_item ,
              house_or_unit: state.house_or_unit === "House" ? 1 : 2,
              buyer_type: state.buyer_type,
              name: state.buyerName,
              address: state.buyerAddress,
              phone: state.buyerPhone,
              email: state.buyerEmail,
              offer_made_date: state.offer_made_date,
              offer_amount: state.offer_amount,
              initial_deposit_amount: state.initial_deposit_amount,
              deposit_paid_mode: state.deposit_paid_mode,
              deposit_due_date: state.deposit_due_date,
              who_will_hold_the_deposit: state.who_will_hold_the_deposit,
              holder_name: state.holder_name,
              when_seller_provide_possession: state.when_seller_provide_possession,
              closing_date: state.closing_date,
              offer_subject_conditions: state.offer_subject_conditions,
              conditions_completed_date: state.conditions_completed_date,
              offer_deadline_date: state.offer_deadline_date,
              any_additional_information: state.any_additional_information,
              additionalClause: state.additionalClause,
    
            };
            console.log('formFields',formFields);

            for (const [key, value] of Object.entries(formFields)) {
              formData.append(key, value);
            }
               setState({...state, loader: true}) 
               if (!token) {
                // User ID not found, show error message
                toast.error('Please Login first');
                setState({...state, loader: false})
              }  
                const response = await dispatch(saveOffer(formData));
              console.log('response1', response);
              setState({...state, loader: true})

            if (response.payload.msg) {
                setState({...state, loader: false})
              toast.success('Offer submitted')
               navigate("/");

    
            } else {
              toast.error('Please try Again')  
            }
          } catch (error) {
            console.error('error', error);
            toast.error(error);
          }
     }
    
      

  };

  return (
    <div className="submitoffer">
    <Container className="submit">
        
        <Tab.Container id="left-tabs-example" activeKey={state.key}>
            <Tab.Content>
          
                <Tab.Pane eventKey="first">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Are you offering to buy or sell a property?</p>
                            </div>
                            <div className="detail">
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12} className="detailright">
                                        <div className="box5">
                                            <Row>
                                                <Col lg={2} md={3} sm={4} xs={4}>
                                                    <div
                                                        className={state.offeringType === "Buy" ? "active" : ""}
                                                        onClick={() =>
                                                            setState({...state, offeringType: "Buy"})
                                                        }
                                                    >
                                                        <img
                                                            src={checkCircle}
                                                            alt="checkCircle"
                                                            className="c"
                                                        />
                                                        <img
                                                            alt="Buy"
                                                            src={
                                                                state.offeringType === "Buy" ?
                                                                    whiteHouse : blackHouse
                                                            }
                                                        />
                                                        <p>I'm buying</p>
                                                    </div>
                                                </Col>
                                                {/* <Col lg={2} md={3} sm={4} xs={4}>
                                                    <div
                                                        className={state.offeringType === "Sell" ? "active" : ""}
                                                    
                                                        onClick={() =>
                                                            setState({...state, offeringType: "Sell"})
                                                        }
                                                    >
                                                        <img src={checkCircle}
                                                             alt="checkCircle"
                                                             className="c"
                                                        />
                                                        <img
                                                            alt="Sell"
                                                            src={
                                                              state.offeringType === "Sell" ?
                                                                    whiteCondo : blackCondo
                                                            }
                                                        />
                                                        <p>I'm selling</p>
                                                    </div>
                                                </Col> */}
                                               
                                            </Row>
                                        </div>
                              
                                        <div>
                                         
                                            <button
                                                className="continue"
                                                onClick={() => setState({...state, key: "second"})}
                                                // onClick={() => setState({
                                                //     ...state,
                                                //     offeringType: "Sell",
                                                //     key: state.offeringType === "Sell" ? "second" : "third"
                                                // })}
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
                {/* <Tab.Pane eventKey="second">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Where is the property you're selling?</p>
                            </div>
                            <div className="detail">
                            <Row>
                              <Col lg={6} md={6} sm={12} xs={12} className="detailleft">
                                <label>Property Address</label>
                                <br />
                                <PlacesAutocomplete
                                value={state.property_address}
                                onChange={handleChangeAddress}
                                onSelect={handleSelect}
                                suggestions={state.addresses.filter((address) =>
                                    address.toLowerCase().includes(state.property_address.toLowerCase())
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
                                {state.error && state.property_address === '' && (
                                <div className="error">Please fill out this field.</div>
                                )}  
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
                                    <Col lg={6} md={6} sm={12} xs={12} className="detailright"></Col>
                                </Row>
                                
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane> */}
             
                {/* <Tab.Pane eventKey="third">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Would you like to provide the property address?</p>
                            </div>
                            <div className="detail">
                                <Row>
                                <Col lg={8} md={8} sm={12} xs={12} className="detailleft">

                                    <div className="noise" style={{marginTop:'0px'}}>
                                        <button
                                            className="btn"
                                            onClick={() => setState({...state, is_property_address_provided: "yes"})}

                                        >
                                            <img
                                                alt="submitellipse"
                                                className="submitellipse"
                                                src={
                                                state.is_property_address_provided === "yes" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            Yes
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={() => setState({...state, is_property_address_provided: "no"})}

                                        >
                                            <img
                                                alt="submitellipseblue"
                                                className="submitellipseblue"
                                                src={
                                                state.is_property_address_provided === "no" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            NO
                                        </button>
                                    </div>
                                    <br/>
                                   
                                    {state.is_property_address_provided === "yes" &&
                                        <PlacesAutocomplete
                                            value={state.property_address}
                                            onChange={handleChangeAddress}
                                            onSelect={handleSelect}
                                            suggestions={state.addresses.filter((address) =>
                                                address.toLowerCase().includes(state.property_address.toLowerCase())
                                            )}
                                        >
                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                <div>
                                                    <input
                                                        {...getInputProps({
                                                            placeholder: 'Enter property  address',
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
                                      }
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12} className="detailright">
                                        <div className="box5">
                                            <label>Is the property a house or a unit? </label> <br />
                                            <Row>
                                            <Col lg={2} md={3} sm={4} xs={4}>
                                                    <div
                                                        className={state.house_or_unit === "House" ? "active" : ""}
                                                        onClick={() =>
                                                            setState({...state, house_or_unit: "House"})
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
                                                                state.house_or_unit === "House" ?
                                                                    whiteHouse : blackHouse
                                                            }
                                                        />
                                                        <p>House</p>
                                                    </div>
                                                </Col>
                                                <Col lg={2} md={3} sm={4} xs={4}>
                                                    <div
                                                        className={state.house_or_unit === "Unit" ? "active" : ""}
                                                    
                                                        onClick={() =>
                                                            setState({...state, house_or_unit: "Unit"})
                                                        }
                                                    >
                                                        <img src={checkCircle}
                                                             alt="checkCircle"
                                                             className="c"
                                                        />
                                                        <img
                                                            alt="Unit"
                                                            src={
                                                              state.house_or_unit === "Unit" ?
                                                                    whiteCondo : blackCondo
                                                            }
                                                        />
                                                        <p>Unit</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                 
                                        <div>
                                            <button
                                                className="back bak"
                                                onClick={() => setState({...state, key: "second"})}

                                            >
                                                Back
                                            </button>
                                            <button
                                                className="continue con"
                                                onClick={() => setState({...state, key: "four"})}

                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane> */}
                {/* <Tab.Pane eventKey="four">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Legal Land Description</p>
                            </div>
                            <div className="detail">
                              
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12} className="detailright">
                                        <div className="box5">
                                            <label>Would you like to attach the property's legal land description separately, or specify it here?</label> <br />
                                            <Row>
                                            <Col lg={2} md={3} sm={4} xs={4}>
                                                    <div
                                                        className={state.legal_land_description === 1 ? "active" : ""}
                                                        onClick={() =>
                                                            setState({...state, legal_land_description: 1})
                                                        }
                                                    >
                                                        <img
                                                            src={checkCircle}
                                                            alt="checkCircle"
                                                            className="c"
                                                        />
                                                   
                                                        <p>Separately</p>
                                                    </div>
                                                </Col>
                                                <Col lg={2} md={3} sm={4} xs={4}>
                                                    <div
                                                        className={state.legal_land_description === 2 ? "active" : ""}
                                                    
                                                        onClick={() =>
                                                            setState({...state, legal_land_description: 2})
                                                        }
                                                    >
                                                        <img src={checkCircle}
                                                             alt="checkCircle"
                                                             className="c"
                                                        />
                                                     
                                                        <p>Specify </p>
                                                    </div>
                                                </Col>
                                          
                                               {state.legal_land_description === 2 && 
                                                <div className="propdetail">
                                                    <label>What chattels, fixtures, and improvements are included in the sale?</label><br/>
                                                    <textarea
                                                    name="propertyDetail"
                                                    value={state.property_legal_land_description}
                                                    onChange={(e) => setState({...state,property_legal_land_description: e.target.value})}
                                                    />
                                                </div>
                                                }
                                                {state.legal_land_description === 1 && 
                                                <div className="propdetail">
                                                    {state.property_legal_land_description !== '' &&
                                                    setState({...state,property_legal_land_description: ''})
                                                    }
                                                </div>
                                                }
                                            </Row>
                                        </div>
                                        <Row>
                                 <Col lg={8} md={8} sm={12} xs={12} className="detailleft">

                                   
                                         <div className="noise" style={{marginTop:'0px'}}>
                                        <label>Are there any chattels, fixtures, or improvements included in the sale?</label><br/>
                                        <button
                                            className="btn"
                                            onClick={() => setState({...state, is_chattels_fixtures_improvements_included: "yes"})}

                                        >
                                            <img
                                                alt="submitellipse"
                                                className="submitellipse"
                                                src={
                                                state.is_chattels_fixtures_improvements_included === "yes" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            Yes
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={() => setState({...state, is_chattels_fixtures_improvements_included: "no"})}

                                        >
                                            <img
                                                alt="submitellipseblue"
                                                className="submitellipseblue"
                                                src={
                                                state.is_chattels_fixtures_improvements_included === "no" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            NO
                                        </button>
                                    </div>
                                    <br/>
                                    </Col>
                                    {state.is_chattels_fixtures_improvements_included === "yes" && 
                                    <div className="propdetail">
                                        <label>What chattels, fixtures, and improvements are included in the sale?</label><br/>
                                        <textarea
                                        name="propertyDetail"
                                        value={state.included_chattels_fixtures_improvements}
                                        onChange={(e) => setState({...state,included_chattels_fixtures_improvements: e.target.value})}
                                        />
                                    </div>
                                    }
                                    {state.is_chattels_fixtures_improvements_included === "no" && 
                                    <div className="propdetail">
                                        {state.included_chattels_fixtures_improvements !== '' &&
                                        setState({...state,included_chattels_fixtures_improvements: ''})
                                        }
                                    </div>
                                    }

                                    <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col>
                                </Row>
                                        <div>
                                            <button
                                                className="back bak"
                                                onClick={() => setState({...state, key: "third"})}

                                            >
                                                Back
                                            </button>
                                            <button
                                                className="continue con"
                                                onClick={() => setState({...state, key: "five"})}
                                                

                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane> */}
                {/* <Tab.Pane eventKey="five">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Rental Items</p>
                            </div>
                            <div className="detail">
                              
                                <Row>
                                    
                                 
                                <Col lg={8} md={8} sm={12} xs={12} className="detailleft">

                               
                                        <div className="noise" style={{marginTop:'0px'}}>
                                        <button
                                            className="btn"
                                            onClick={() => setState({...state, are_there_any_rental_contract: 1})}

                                        >
                                            <img
                                                alt="submitellipse"
                                                className="submitellipse"
                                                src={
                                                state.are_there_any_rental_contract === 1 ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            Yes
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={() => setState({...state, are_there_any_rental_contract: 2})}

                                        >
                                            <img
                                                alt="submitellipseblue"
                                                className="submitellipseblue"
                                                src={
                                                state.are_there_any_rental_contract === 2 ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            NO
                                        </button>
                                    </div>
                                    <br/>
                                    {state.are_there_any_rental_contract === 1 && 
                                    <div >
                                    <div className="propdetail">
                                        <label>What chattels, fixtures, and improvements are included in the sale?</label><br/>
                                        <textarea
                                    placeholder='Rentel Item...'
                                    value={state.rental_contract_item}
                                    onChange={(e) => setState({...state,rental_contract_item: e.target.value})}
                                   />
                                    </div>
                              
                                    
                                     </div>
                                    }
                                
                                     {state.are_there_any_rental_contract === 2 && 
                                    <div className="propdetail">
                                        {state.rental_contract_item !== '' &&
                                        setState({...state,rental_contract_item: ''})
                                        }
                                    </div>
                                    }
                                    
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col>
                                        <div>
                                            <button
                                                className="back bak"
                                                onClick={() => setState({...state, key: "four"})}

                                            >
                                                Back
                                            </button>
                                            <button
                                                className="continue con"
                                                onClick={() => setState({...state, key: "six"})}
                                            >
                                                Continue
                                            </button>
                                        </div>

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane> */}
                {/* <Tab.Pane eventKey="six">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Buyer Details</p>
                            </div>
                            <div className="detail">
                              
                                <Row>
                                    
                                 
                                <Col lg={8} md={8} sm={12} xs={12} className="detailleft">

                                    <div className="noise" style={{marginTop:'0px',}}>
                                        <label>Who is the buyer?</label><br/>
                                        <label>buyer Type?</label><br/>
                                        <button
                                        style={{width:'240px'}}
                                            className="btn" 
                                            onClick={() => setState({...state, buyer_type: "Individual"})}

                                        >
                                            <img
                                                alt="submitellipse"
                                                className="submitellipse"
                                                src={
                                                state.buyer_type === "Individual" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            Individual
                                        </button>
                                     
                                        <button
                                        style={{width:'240px'}}
                                            className="btn"
                                            onClick={() => setState({...state, buyer_type: "Corporation"})}

                                        >
                                            <img
                                                alt="submitellipseblue"
                                                className="submitellipseblue"
                                                src={
                                                state.buyer_type === "Corporation" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            Corporation/Orgnization
                                        </button>
                                    </div>
                                    <br/>
                                    <Col lg={6} md={6} sm={12} xs={12} className="detailleft">
                                 <div>
                                 {state.buyer_type === 'Corporation' && 
                                      <div>
                                      <label>Name</label><br/>
                                      <input name="name"
                                      placeholder='Name'
                                      value={state.buyerName}
                                      onChange={(e) => setState({...state,buyerName: e.target.value})}
                                      />  
                                      <label>Address</label><br/>
                                      <input name="address"
                                      placeholder='Address'
                                      value={state.buyerAddress}
                                      onChange={(e) => setState({...state,buyerAddress: e.target.value})}
                                      />  
                                      <label>Phone</label><br/>
                                      <input name="phone"
                                      placeholder='Phone'
                                      type='number'
                                      value={state.buyerPhone}
                                      onChange={(e) => setState({...state,buyerPhone: e.target.value})}
                                      />  
                                      <label>Email</label><br/>
                                      <input name="email"
                                      placeholder='Email'
                                      type='email'
                                      value={state.buyerEmail}
                                      onChange={(e) => setState({...state,buyerEmail: e.target.value})}
                                      />  
                                      </div>
                                    }
                                
                                     {state.buyer_type === "Individual" && 
                                     
                                    <div>
                                    <label> Full Name</label><br/>
                                        <input name="name"
                                        placeholder='Name'
                                        value={state.buyerName}
                                        onChange={(e) => setState({...state,
                                            buyerName: e.target.value,
                                        })}
                                        />
                                         <label>Address</label><br/>
                                      <input name="address"
                                      placeholder='Address'
                                      value={state.buyerAddress}
                                      onChange={(e) => setState({...state,buyerAddress: e.target.value})}
                                      />  
                                       <label>Phone</label><br/>
                                      <input name="phone"
                                      placeholder='Phone'
                                      type='number'
                                      value={state.buyerPhone}
                                      onChange={(e) => setState({...state,buyerPhone: e.target.value})}
                                      />  
                                      <label>Email</label><br/>
                                      <input name="email"
                                      placeholder='Email'
                                      type='email'
                                      value={state.buyerEmail}
                                      onChange={(e) => setState({...state,buyerEmail: e.target.value})}
                                      />                                           
                                    </div>
                                    }
                           
                                 
                                </div>
                                    </Col>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col>
                                        <div>
                                            <button
                                                className="back bak"
                                                onClick={() => setState({...state, key: "five"})}

                                            >
                                                Back
                                            </button>
                                            <button
                                                className="continue con"
                                                onClick={() => setState({...state, key: "seven"})}

                                            >
                                                Continue
                                            </button>
                                        </div>

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane> */}
                {/* <Tab.Pane eventKey="seven">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Seller Details</p>
                            </div>
                            <div className="detail">
                              
                                <Row>
                                    
                                 
                                <Col lg={8} md={8} sm={12} xs={12} className="detailleft">

                                    <div className="noise" style={{marginTop:'0px',}}>
                                        <label>What is your name?</label><br/>
                                        <label>Seller Type?</label><br/>
                                        <button
                                        style={{width:'240px'}}
                                            className="btn" 
                                            onClick={() => setState({...state, buyer_type: "Individual"})}

                                        >
                                            <img
                                                alt="submitellipse"
                                                className="submitellipse"
                                                src={
                                                state.buyer_type === "Individual" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            Individual
                                        </button>
                                     
                                        <button
                                        style={{width:'240px'}}
                                            className="btn"
                                            onClick={() => setState({...state, buyer_type: "Corporation"})}

                                        >
                                            <img
                                                alt="submitellipseblue"
                                                className="submitellipseblue"
                                                src={
                                                state.buyer_type === "Corporation" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            Corporation/Orgnization
                                        </button>
                                    </div>
                                    <br/>
                                    <Col lg={6} md={6} sm={12} xs={12} className="detailleft">
                                 <div>
                                 {state.buyer_type === 'Corporation' && 
                                      <div>
                                      <label>Name</label><br/>
                                      <input name="name"
                                      placeholder='Name'
                                      value={state.buyerName}
                                      onChange={(e) => setState({...state,buyerName: e.target.value})}
                                      />  
                                      <label>Address</label><br/>
                                      <input name="address"
                                      placeholder='Address'
                                      value={state.buyerAddress}
                                      onChange={(e) => setState({...state,buyerAddress: e.target.value})}
                                      />  
                                      <label>Phone</label><br/>
                                      <input name="phone"
                                      placeholder='Phone'
                                      type='number'
                                      value={state.buyerPhone}
                                      onChange={(e) => setState({...state,buyerPhone: e.target.value})}
                                      />  
                                      <label>Email</label><br/>
                                      <input name="email"
                                      placeholder='Email'
                                      type='email'
                                      value={state.buyerEmail}
                                      onChange={(e) => setState({...state,buyerEmail: e.target.value})}
                                      />  
                                      </div>
                                    }
                                
                                     {state.buyer_type === "Individual" && 
                                     
                                    <div>
                                    <label> Full Name</label><br/>
                                        <input name="name"
                                        placeholder='Name'
                                        value={state.buyerName}
                                        onChange={(e) => setState({...state,
                                            buyerName: e.target.value,
                                        })}
                                        />
                                         <label>Address</label><br/>
                                      <input name="address"
                                      placeholder='Address'
                                      value={state.buyerAddress}
                                      onChange={(e) => setState({...state,buyerAddress: e.target.value})}
                                      />  
                                       <label>Phone</label><br/>
                                      <input name="phone"
                                      placeholder='Phone'
                                      type='number'
                                      value={state.buyerPhone}
                                      onChange={(e) => setState({...state,buyerPhone: e.target.value})}
                                      />  
                                      <label>Email</label><br/>
                                      <input name="email"
                                      placeholder='Email'
                                      type='email'
                                      value={state.buyerEmail}
                                      onChange={(e) => setState({...state,buyerEmail: e.target.value})}
                                      />                                           
                                    </div>
                                    }
                           
                                 
                                </div>
                                    </Col>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col>
                                        <div>
                                            <button
                                                className="back bak"
                                                onClick={() => setState({...state, key: "six"})}

                                            >
                                                Back
                                            </button>
                                            <button
                                                className="continue con"
                                                onClick={() => setState({...state, key: "eight"})}

                                            >
                                                Continue
                                            </button>
                                        </div>

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane> */}
                <Tab.Pane eventKey="second">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Date of Offer</p>
                            </div>
                            <div className="detail">
                              
                                <Row>
                                    
                                 
                                <Col lg={8} md={8} sm={12} xs={12} className="detailleft">

                                    <div className="noise" style={{marginTop:'0px',}}>
                                        <label>When will the offer be made?</label><br/>
                                      
                                    </div>
                                    <br/>
                                    <Col lg={6} md={6} sm={12} xs={12} className="detailleft">
                                 <div>
                                 
                                    <div >
                                    <label>Offer Date:</label><br/>
                                    <input 
                                        name="offer_made_date"
                                        placeholder='Offer Date'
                                        type='date'
                                        value={state.offer_made_date ? state.offer_made_date.slice(0, 10) : ''}
                                        onChange={(e) => setState({...state, offer_made_date: e.target.value})}
                                        />
                                    </div>
                                </div>
                                    </Col>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col>
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

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Purchase Price</p>
                            </div>
                            <div className="detail">
                              
                                <Row>
                                    
                                 
                                <Col lg={8} md={8} sm={12} xs={12} className="detailleft">

                                    <div className="noise" style={{marginTop:'0px',}}>
                                        <label>How much are you offering for the property?</label><br/>
                                      
                                    </div>
                                    <br/>
                                    <Col lg={6} md={6} sm={12} xs={12} className="detailleft">
                                 <div>
                                 
                                    <div >
                                    <label>Amount</label><br/>
                                    <input 
                                        name="amount"
                                        
                                        value={state.offer_amount ? '$' + state.offer_amount : ''}
                                        onChange={(e) => setState({...state, offer_amount: e.target.value.replace(/^\$/, '')})}
                                    /> 
                                    </div>
                                </div>
                                    </Col>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col>
                                        <div>
                                            <button
                                                className="back bak"
                                                onClick={() => setState({...state, key: "second"})}

                                            >
                                                Back
                                            </button>
                                            <button
                                                className="continue con"
                                                onClick={() => setState({...state, key: "four"})}

                                            >
                                                Continue
                                            </button>
                                        </div>

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="four">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Deposit</p>
                            </div>
                            <div className="detail">       
                                <Row>             
                                                       
                                <Col lg={8} md={8} sm={12} xs={12} className="detailleft">

                                    <div className="noise" style={{marginTop:'0px',}}>
                                        <label>How much is the initial deposit?</label><br/>
                                        
                                    </div>
                                    <br/>
                                    <Col lg={6} md={6} sm={12} xs={12} className="detailleft">
                                 <div>
                                    <div>
                                    <label>Amount</label><br/>
                                    <input 
                                        name="ammount"
                                        // placeholder='Amount'
                                        // type='number'
                                        value={state.initial_deposit_amount ? '$' + state.initial_deposit_amount : ''}
                                        onChange={(e) => setState({...state, initial_deposit_amount: e.target.value.replace(/^\$/, '')})}
                                    />  
                                    </div>
                                  
                                </div>
                                
                                    </Col>
                                    <Col lg={6} md={6} sm={12} xs={12} className="detailleft">
                                    <div className="noise" style={{marginTop:'0px',}}>
                                        <label>How much is the initial deposit?</label><br/>
                                        <button
                                        style={{width:'240px'}}
                                            className="btn mt-2" 
                                            onClick={() => setState({...state, deposit_paid_mode: "cash"})}

                                        >
                                            <img
                                                alt="submitellipse"
                                                className="submitellipse"
                                                src={
                                                state.deposit_paid_mode === "cash" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            Cash
                                        </button>
                                       
                                        <button
                                        style={{width:'240px'}}
                                            className="btn mt-2"
                                            onClick={() => setState({...state, deposit_paid_mode: "personal cheque"})}

                                        >
                                            <img
                                                alt="submitellipseblue"
                                                className="submitellipseblue"
                                                src={
                                                state.deposit_paid_mode === "personal cheque" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            Personal Cheque
                                        </button>
                                        <button
                                        style={{width:'240px'}}
                                            className="btn mt-2"
                                            onClick={() => setState({...state, deposit_paid_mode: "bank draft"})}

                                        >
                                            <img
                                                alt="submitellipseblue"
                                                className="submitellipseblue"
                                                src={
                                                state.deposit_paid_mode === "bank draft" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            
                                            Bank Draft
                                        </button>
                                        <button
                                        style={{width:'240px'}}
                                            className="btn mt-2"
                                            onClick={() => setState({...state, deposit_paid_mode: "certified cheque"})}

                                        >
                                            <img
                                                alt="submitellipseblue"
                                                className="submitellipseblue"
                                                src={
                                                state.deposit_paid_mode === "certified cheque" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            Certified Cheque
                                        </button>
                                        <button
                                        style={{width:'240px'}}
                                            className="btn mt-2"
                                            onClick={() => setState({...state, deposit_paid_mode: "other"})}

                                        >
                                            <img
                                                alt="submitellipseblue"
                                                className="submitellipseblue"
                                                src={
                                                state.deposit_paid_mode === "other" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                           Other
                                        </button>
                                    </div>
                                 <div>
                                    <div>
                                 <div className="noise mt-3" style={{marginTop:'0px',}}>
                                        <label>When is the deposit due?</label><br/>
                                        
                                    </div>
                                    <input 
                                    name="deposit_due_date"
                                    placeholder='Offer Date'
                                    type='date'
                                    value={state.deposit_due_date ? state.deposit_due_date.slice(0, 10) : ''}
                                    onChange={(e) => setState({...state, deposit_due_date: e.target.value})}
                                    />
                                    </div>
                                  
                                </div>
                                    </Col>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col>
                                        <div>
                                            <button
                                                className="back bak"
                                                onClick={() => setState({...state, key: "third"})}

                                            >
                                                Back
                                            </button>
                                            <button
                                                className="continue con"
                                                onClick={() => setState({...state, key: "five"})}

                                            >
                                                Continue
                                            </button>
                                        </div>

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane>
                {/* <Tab.Pane eventKey="five">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Escrow Agent</p>
                            </div>
                            <div className="detail">
                              
                                <Row>
                                    
                                 
                                <Col lg={8} md={8} sm={12} xs={12} className="detailleft">

                                    <div className="noise" style={{marginTop:'0px',}}>
                                        <label>Who will hold the deposit until the deal is closed?</label><br/>
                                        <button
                                        style={{width:'240px'}}
                                            className="btn" 
                                            onClick={() => setState({...state, who_will_hold_the_deposit: "Individual"})}

                                        >
                                            <img
                                                alt="submitellipse"
                                                className="submitellipse"
                                                src={
                                                state.who_will_hold_the_deposit === "Individual" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            Individual
                                        </button>
                                     
                                        <button
                                        style={{width:'240px'}}
                                            className="btn"
                                            onClick={() => setState({...state, who_will_hold_the_deposit: "Corporation"})}

                                        >
                                            <img
                                                alt="submitellipseblue"
                                                className="submitellipseblue"
                                                src={
                                                state.who_will_hold_the_deposit === "Corporation" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            Corporation/Orgnization
                                        </button>
                                    </div>
                                    <br/>
                                    <Col lg={6} md={6} sm={12} xs={12} className="detailleft">
                                 <div>
                                 {state.who_will_hold_the_deposit === 'Corporation' && 
                                      <div>
                                      <label>Name</label><br/>
                                      <input name="name"
                                      placeholder='Name'
                                      value={state.holder_name}
                                      onChange={(e) => setState({...state,holder_name: e.target.value})}
                                      />  
                                      
                                      </div>
                                    }
                                
                                     {state.who_will_hold_the_deposit === "Individual" && 
                                     
                                    <div>
                                    <label>Full Name</label><br/>
                                        <input name="name"
                                        placeholder='Name'
                                        value={state.holder_name}
                                        onChange={(e) => setState({...state,
                                            holder_name: e.target.value,
                                        })}
                                        />
                                     
                                                                               
                                    </div>
                                    }
                                      {
                                    (state.error && (state.holder_name === "")) ? (
                                        <div className="submitted-error">
                                            Please fill out this field.
                                        </div>
                                    ) : ""
                                }
                                </div>
                                    </Col>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col>
                                        <div>
                                            <button
                                                className="back bak"
                                                onClick={() => setState({...state, key: "ten"})}

                                            >
                                                Back
                                            </button>
                                            <button
                                                className="continue con"
                                                onClick={() => setState({...state, key: "twelve"})}

                                            >
                                                Continue
                                            </button>
                                        </div>

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane> */}
                {/* <Tab.Pane eventKey="twelve">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Closing and Possession</p>
                            </div>
                            <div className="detail">
                              
                                <Row>
                                    
                                <Col lg={6} md={6} sm={12} xs={12} className="detailleft">
                                    <div className="noise" style={{marginTop:'0px',}}>
                                        <label>When will you provide possession?</label><br/>
                                       
                                       
                                       
                                        <button
                                        style={{width:'330px'}}
                                            className="btn mt-2"
                                            onClick={() => setState({...state, when_seller_provide_possession: "upon closing and funding"})}

                                        >
                                            <img
                                                alt="submitellipseblue"
                                                className="submitellipseblue"
                                                src={
                                                state.when_seller_provide_possession === "upon closing and funding" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            
                                            upon closing and funding
                                        </button>
                                       
                                        <button
                                        style={{width:'330px'}}
                                            className="btn mt-2"
                                            onClick={() => setState({...state, when_seller_provide_possession: "before funding, under a temporary lease"})}

                                        >
                                            <img
                                                alt="submitellipseblue"
                                                className="submitellipseblue"
                                                src={
                                                state.when_seller_provide_possession === "before funding, under a temporary lease" ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                           Before funding, under a temporary lease
                                        </button>
                                    </div>
                                 <div>
                               
                                      {state.when_seller_provide_possession === 'Before funding, under a temporary lease' && 
                                                 <div className='mt-3'>
                                                 
                                                 <label>Possession Date:</label><br/>
                                                    <input name="community"
                                                    type='date'
                                                    value={state.closing_date ? state.closing_date.slice(0, 10) : ''}
                                                    onChange={(e) => setState({...state, closing_date: e.target.value})}
                                                    />  
                                               
                                                 </div>
                                                }
                                               
                                                <div className='mt-3'>
                                     
                                                     <label>Closing (Funding) Date:</label><br/>
                                                 <input name="closing_date"
                                                 type='date'
                                                 value={state.closing_date ? state.closing_date.slice(0, 10) : ''}
                                                 onChange={(e) => setState({...state, closing_date: e.target.value})}
                                                 /> 
                                    </div>
                                   
                                  
                                </div>
                                    </Col>  
                    
                                    <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col>
                                        <div>
                                            <button
                                                className="back bak"
                                                onClick={() => setState({...state, key: "eleven"})}

                                            >
                                                Back
                                            </button>
                                            <button
                                                className="continue con"
                                                onClick={() => setState({...state, key: "thirteen"})}

                                            >
                                                Continue
                                            </button>
                                        </div>

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane> */}
                <Tab.Pane eventKey="five">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Conditions</p>
                            </div>
                            <div className="detail">       
                                <Row>             
                                                       
                                <Col lg={8} md={8} sm={12} xs={12} className="detailleft">

                                    <div className="noise" style={{marginTop:'0px',}}>
                                        <label>Is this offer subject to any conditions?</label><br/>
                                        <button
                                        
                                            className="btn" 
                                            onClick={() => setState({...state, offer_subject_conditions: 1})}

                                        >
                                            <img
                                                alt="submitellipse"
                                                className="submitellipse"
                                                src={
                                                state.offer_subject_conditions === 1 ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                          Yes
                                        </button>
                                     
                                        <button
                                        
                                            className="btn"
                                            onClick={() => setState({...state, offer_subject_conditions: 2})}

                                        >
                                            <img
                                                alt="submitellipseblue"
                                                className="submitellipseblue"
                                                src={
                                                state.offer_subject_conditions === 2 ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            No
                                        </button>
                                    </div>
                                    <br/>
                                   
                                    <div className="noise" style={{marginTop:'0px',}}>
                                        {/* <label>When must these conditions be completed by?</label><br/> */}

       
                                    </div>
                                    <Col lg={6} md={6} sm={12} xs={12} className="detailleft">
                                 <div>
                                    
                                    <div>
                                    {state.offer_subject_conditions === 1 && 
                                    <div className="propdetail">
                                        <label>Completion Date:</label><br/>
                                        <input 
                                        name="conditions_completed_date"
                                        placeholder='Offer Date'
                                        type='date'
                                        value={state.conditions_completed_date ? state.conditions_completed_date.slice(0, 10) : ''}
                                        onChange={(e) => setState({...state, conditions_completed_date: e.target.value})}
                                        />
                                    </div>
                                    }
                                    {state.offer_subject_conditions === 2 && 
                                    <div className="propdetail">
                                        {state.conditions_completed_date !== '' &&
                                        setState({...state,conditions_completed_date: ''})
                                        }
                                    </div>
                                    }

                                
                                  
                                    </div>
                                  
                                </div>
                                    </Col>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col>
                                        <div>
                                            <button
                                                className="back bak"
                                                onClick={() => setState({...state, key: "four"})}

                                            >
                                                Back
                                            </button>
                                            <button
                                                className="continue con"
                                                onClick={() => setState({...state, key: "six"})}

                                            >
                                                Continue
                                            </button>
                                        </div>

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="six">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Acceptance</p>
                            </div>
                            <div className="detail">       
                                <Row>             
                                                       
                                <Col lg={8} md={8} sm={12} xs={12} className="detailleft">

                                    <div className="noise" style={{marginTop:'0px',}}>
                                        <label>What is the deadline for you to accept this offer?</label><br/>
                                    </div>
                                    <br/>
                                   
                                    <Col lg={6} md={6} sm={12} xs={12} className="detailleft">
                                 <div>
                                    <div>
                                 <div className="noise mt-3" style={{marginTop:'0px',}}>
                                        <label>Date:</label><br/>
                                        
                                    </div>
                                    <input 
                                    name="offer_deadline_date"
                                    placeholder='Offer deadline'
                                    type='date'
                                    value={state.offer_deadline_date ? state.offer_deadline_date.slice(0, 10) : ''}
                                    onChange={(e) => setState({...state, offer_deadline_date: e.target.value})}
                                    />
                                    </div>
                                  
                                </div>
                                    </Col>
                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <div>
                                            <button
                                                className="back"
                                                onClick={() => setState({...state, key: "fourteen"})}
                                                >
                                                Back
                                            </button>
                                            <button className="submit" 
                                            onClick={submitProperty}
                                            // onClick={() => uploadData()}

                                            >
                                                {state.loader ? <Spinner animation="grow"/> : "Submit Offer"}
                                            </button>
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane>
                {/* <Tab.Pane eventKey="fifteen">
                    <Row>
                        <Col lg={10} md={12} sm={12} xs={12} className="col">
                            <div className="property">
                                <p className="heading">Additional Clauses</p>
                            </div>
                            <div className="detail">
                              
                                <Row>
                                    
                                 
                                <Col lg={8} md={8} sm={12} xs={12} className="detailleft">

                                    <div className="noise" style={{marginTop:'0px',}}>
                                        <label>Do you want to include any additional information or ongoing terms for the offer?</label><br/>
                                        <button
                                        
                                            className="btn" 
                                            onClick={() => setState({...state, any_additional_information: 1})}

                                        >
                                            <img
                                                alt="submitellipse"
                                                className="submitellipse"
                                                src={
                                                state.any_additional_information === 1 ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                           Yes
                                        </button>
                                     
                                        <button
                                        
                                            className="btn"
                                            onClick={() => setState({...state, any_additional_information: 2})}

                                        >
                                            <img
                                                alt="submitellipseblue"
                                                className="submitellipseblue"
                                                src={
                                                state.any_additional_information === 2 ?
                                                        submitellipseblue : submitellipse
                                                }
                                            />
                                            No
                                        </button>
                                    </div>
                                    <br/>
                                   
                                    <div>
                                    {state.any_additional_information === 1 && 
                                            <div className="propdetail">
                                            <label>Additional Clause</label><br/>
                                            <textarea
                                                name="propertyDetail"
                                                value={state.additionalClause}
                                                onChange={(e) => setState({...state,additionalClause: e.target.value})}
                                            />
                                        </div>
                                            }
                                    </div>
                                    {state.any_additional_information === 2 && 
                                    <div className="propdetail">
                                        {state.additionalClause !== '' &&
                                        setState({...state,additionalClause: ''})
                                        }
                                    </div>
                                    }
                                    
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col>
                                    {
                                    (state.error && (state.holder_name === "")) ? (
                                        <div className="submitted-error">
                                            Please fill out Holder Name  field.
                                        </div>
                                    ) : ""
                                     }
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <div>
                                            <button
                                                className="back"
                                                onClick={() => setState({...state, key: "fourteen"})}
                                                >
                                                Back
                                            </button>
                                            <button className="submit" 
                                            onClick={submitProperty}

                                            >
                                                {state.loader ? <Spinner animation="grow"/> : "Submit Offer"}
                                            </button>
                                        </div>
                                    </Col>

                                </Row>
                                
                            </div>
                        </Col>
                    </Row>
                </Tab.Pane> */}
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
})(SubmitOffer);
