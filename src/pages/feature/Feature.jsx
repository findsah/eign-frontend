import React, { useRef, useState, useEffect } from 'react';
// import ServerCallings from 'path/to/ServerCallings'; // import the ServerCallings module
import {Carousel, Col, Container, Row} from 'react-bootstrap';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import a from '../../assets/images/a.png';
import b from '../../assets/images/b.png';
import c from '../../assets/images/c.png';
import d from '../../assets/images/d.png';
import e from '../../assets/images/e.png';
import f from '../../assets/images/f.png';
import g from '../../assets/images/g.png';
import h from '../../assets/images/h.png';

import v from '../../assets/video/v1.mp4';

import bed from '../../assets/icons/bed.png';
import sqf from '../../assets/icons/sqf.png';
import lot from '../../assets/icons/lot.png';
import bath from '../../assets/icons/bath.png';
import crime from '../../assets/icons/crime.png';
import noise from '../../assets/icons/noise.png';
import school from '../../assets/icons/school.png';
import livabililty from '../../assets/icons/livabililty.png';

import ac from '../../assets/icons/ac.png';
import pool from '../../assets/icons/pool.png';
import alarm from '../../assets/icons/alarm.png';
import parking from '../../assets/icons/parking.png';
import laundry from '../../assets/icons/laundry.png';
import intercom from '../../assets/icons/intercom.png';
import fireplace from '../../assets/icons/fireplace.png';
import transport from '../../assets/icons/transport.png';
import electricity from '../../assets/icons/electricity.png';
import watersupply from '../../assets/icons/watersupply.png';

import play from '../../assets/icons/play.png';
import voice from '../../assets/icons/voice.png';
import heart from '../../assets/icons/heart.png';
import share from '../../assets/icons/share.png';

import chart from '../../assets/images/chart.png';
import location from '../../assets/images/location.png';

import bgPattern from '../../assets/images/bg-pattern.png';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties, getPropertyDetails } from './service/GetPropertyApi';
// import axios from "axios";
// import {frontend_server, backend_server} from "../../globals";
// import {ServerCallings} from "../../utils/ServerCallings";
import AWS from 'aws-sdk';
import ImageGallery from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.min.css';

// Image component

const Image = ({ url, index, handleClick }) => {
    console.log('url',url);
    const [isOpen, setIsOpen] = useState(false);
    const isVideo = url?.endsWith('.mp4');
  
    const handleOpen = () => {
      setIsOpen(true);
    };
  
    const handleClose = () => {
      setIsOpen(false);
    };
  
    return (
      <>
        <div onClick={() => handleClick(index)}>
          {isVideo ? (
            <button onClick={handleOpen}>
              <video  controls className={index === 1 ? 'img1' : 'img2'}>
                <source  src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </button>
          ) : (
            <img
              src={url}
              alt={`Property Image ${index}`}
              className={index === 1 ? 'img1' : 'img2'}
            />
          )}
        </div>
        {isVideo && (
          <ModalVideo
            channel="custom"
            isOpen={isOpen}
            url={url}
            onClose={handleClose}
          />
        // <video controls>
        //         <source src={url} type="video/mp4" />
        //         Your browser does not support the video tag.
        //       </video>
        )}
      </>
    );
  };
  // Image gallery component
const ImageGalleryComponent = ({ urls }) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const videoRef = useRef(null);
    const  getProperties  = useSelector((state) => state.fetchProeryReducer)

    const imageOrvideo = getProperties?.property?.image_or_video;
    const [state, setState] = useState({
        propertyFeature: true,
        propertyHistory: true,
        propertyTaxes: true,
        neighbourhood: true,
        similar: true,
        schools: true,
        mortgage: true,
        surrounding: true,
        videoDuration: "",
        videoCurrentime: "",
        property: [],
      });
    const images = urls?.map((url) => ({ src: url }));
  
    const handleImageClick = (index) => {
        console.log('index',index);
      setIsLightboxOpen(true);
      setLightboxIndex(index);
    };
  
    const playPause = () => {
      if (videoRef.current.paused || videoRef.current.ended) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    };
  
    const muteUnmute = () => {
      videoRef.current.muted = !videoRef.current.muted;
    };
    return (
     <>
      <Col lg={3} md={3} sm={12} xs={12}>
        {urls?.slice(0, 2).map((url, index) => (
          <Row key={index}>
            <Col>
              <Image url={url} index={index} handleClick={handleImageClick} />
            </Col>
          </Row>
        ))}
        {isLightboxOpen && (
          <ImageGallery
            mainSrc={images[lightboxIndex].src}
            nextSrc={images[(lightboxIndex + 1) % images.length].src}
            prevSrc={images[(lightboxIndex + images.length - 1) % images.length].src}
            onCloseRequest={() => setIsLightboxOpen(false)}
            onMovePrevRequest={() => setLightboxIndex((lightboxIndex + images.length - 1) % images.length)}
            onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
          />
        )}
      </Col>
      <Col lg={6} md={6} sm={12} xs={12}>
      <Carousel className="img3">
        {/* <Carousel.Item>
          <video ref={videoRef}>
            <source src={imageOrvideo} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
          <div className="share-and-heart">
            <button>
              <img src={heart} alt="heart" />
            </button>
            <button>
              <img src={share} alt="share" />
            </button>
          </div>
          <button className="play" onClick={playPause}>
            <img src={play} alt="play" />
          </button>
          <div className="voice-and-time">
            <p>
              {state.videoCurrentime ? <span>{state.videoCurrentime} / </span> : ''}
              {state.videoDuration}
            </p>
            <button onClick={muteUnmute}>
              <img src={voice} alt="voice" />
            </button>
          </div>
        </Carousel.Item> */}
        {urls?.map((image, index) => (
            <Carousel.Item key={index}>
                        <Image url={imageOrvideo} index={index } handleClick={handleImageClick} />

          </Carousel.Item>
        ))}
      </Carousel>
      {isLightboxOpen && (
        <ImageGallery
          mainSrc={images[lightboxIndex].src}
          nextSrc={images[(lightboxIndex + 1) % images.length].src}
          prevSrc={images[(lightboxIndex + images.length - 1) % images.length].src}
          onCloseRequest={() => setIsLightboxOpen(false)}
          onMovePrevRequest={() => setLightboxIndex((lightboxIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
        />
      )}
    </Col>

      <Col lg={3} md={3} sm={12} xs={12}>
        {urls?.slice(0, 2).map((url, index) => (
          <Row key={index}>
            <Col>
              <Image url={url} index={index} handleClick={handleImageClick} />
            </Col>
          </Row>
        ))}
        {isLightboxOpen && (
          <ImageGallery
            mainSrc={images[lightboxIndex].src}
            nextSrc={images[(lightboxIndex + 1) % images.length].src}
            prevSrc={images[(lightboxIndex + images.length - 1) % images.length].src}
            onCloseRequest={() => setIsLightboxOpen(false)}
            onMovePrevRequest={() => setLightboxIndex((lightboxIndex + images.length - 1) % images.length)}
            onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
          />
        )}
      </Col>
     </>
      
    );
  };
function Feature(props) {
    const { id } = useParams();
  const [state, setState] = useState({
    propertyFeature: true,
    propertyHistory: true,
    propertyTaxes: true,
    neighbourhood: true,
    similar: true,
    schools: true,
    mortgage: true,
    surrounding: true,
    videoDuration: "",
    videoCurrentime: "",
    property: [],
  });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const dispatch = useDispatch()
  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
  }
  const  getProperties  = useSelector((state) => state.fetchProeryReducer)
  console.log('getProperties',getProperties);
  const urls = getProperties?.property?.property_attachment?.split(",");
  const firstRemoveUrl = urls?.slice(1);
  console.log('withReomveUrls',firstRemoveUrl);
  const imageOrvideo = getProperties?.property?.image_or_video;
  const onInfoWindowClose = () => {
    setSelectedPlace(null);
  }
  useEffect(() => {
    dispatch(getPropertyDetails(id));
  }, [dispatch]);
  const videoRef = useRef(null);

//   useEffect(() => {
//     const getProperty = () => {
//       ServerCallings.getOneProperty(props.match.params['id'], (data) => {
//         if (data) {
//           setState(data);
//         }
//       });
//     };

//     const formatTime = (timeInSeconds) => {
//       const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

//       return {
//         minutes: result.substr(3, 2),
//         seconds: result.substr(6, 2),
//       };
//     };

//     const initializeVideo = () => {
//       const videoDuration = Math.round(videoRef.current.duration);
//       const time = formatTime(videoDuration);

//       setState({ videoDuration: `${time.minutes}:${time.seconds}` });
//     };

//     const updateTimeElapsed = () => {
//       const time = formatTime(Math.round(videoRef.current.currentTime));

//       setState({ videoCurrentime: `${time.minutes}:${time.seconds}` });
//     };

//     videoRef.current.addEventListener('loadedmetadata', initializeVideo);
//     videoRef.current.addEventListener('timeupdate', updateTimeElapsed);

//     getProperty();

//     // cleanup
//     return () => {
//       videoRef.current.removeEventListener('loadedmetadata', initializeVideo);
//       videoRef.current.removeEventListener('timeupdate', updateTimeElapsed);
//     };
//   }, [props.match.params]);


  
  const playPause = () => {
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const muteUnmute = () => {
    videoRef.current.muted = !videoRef.current.muted;
  };

  let files;
  const { propertyFeature, propertyHistory, propertyTaxes, neighbourhood, schools, surrounding, mortgage, similar, videoDuration, videoCurrentime } = state;

  if (state.property[0]) {
    files = state.property[0]['files'].map((file) => {
      return (
        <Carousel.Item>
          {/* <img src={backend_server + '/' + file.image} alt="c" /> */}
          <img src={c} alt="c" />
        </Carousel.Item>
      );
    });
  }

//   return (
//     <div>
//       <video ref={videoRef} controls>
//         <source src="path/to/video.mp4" type="video/mp4" />
//       </video>
//       <button onClick={playPause}>Play/Pause</button>
//       <button onClick={muteUnmute}>Mute/Unmute</button>
//       <p>
//         {videoCurrentime} / {videoDuration}
//       </p>
//       <Carousel>{files}</Carousel>
//     </div>
//   );
return (

    <div className="feature bgHeaderPattern">
         <div>
      {getProperties.status === "loading" && <p>Loading...</p>}
      {/* {getProperties.status === "succeeded" && (
        <div>
          <h2>{getProperties.property.home_address}</h2>
          <p>Price: ${getProperties.property.price}</p>
          <p>Property Type: {getProperties.property.property_type}</p>
        </div>
      )} */}
      {getProperties.status === "failed" && <p>{getProperties.error}</p>}
    </div>
        <img src={bgPattern} alt="bgPattern" className="bgPattern"/>
        <div className="images">
            {/* <Row>
            <Col lg={3} md={3} sm={12} xs={12}>
                {urls?.slice(1, 3).map((url, index) => {
                    const isVideo = url?.endsWith('.mp4');
                    return (
                    <Row key={index}>
                        <Col>
                        {isVideo ? (
                            <video controls className={index === 1 ? 'img1' : 'img2'}>
                            <source src={url} type="video/mp4" />
                            </video>
                        ) : (
                            <img
                            src={url}
                            alt={`Property Image ${index}`}
                            className={index === 1 ? 'img1' : 'img2'}
                            />
                        )}
                        </Col>
                    </Row>
                    );
                })}
                </Col>

                <Col lg={6} md={6} sm={12} xs={12}>
                    <Carousel className="img3">
                        <Carousel.Item>
                            <video ref={videoRef}>
                                <source src={imageOrvideo} type="video/mp4"/>
                                Your browser does not support HTML video.
                            </video>
                            <div className="share-and-heart">
                                <button>
                                    <img src={heart} alt="heart"/>
                                </button>
                                <button>
                                    <img src={share} alt="share"/>
                                </button>
                            </div>
                            <button className="play" onClick={playPause}>
                                <img src={play} alt="play"/>
                            </button>
                            <div className="voice-and-time">
                                <p>{videoCurrentime ? <span>{videoCurrentime} / </span> : ""}{videoDuration}</p>
                                <button onClick={muteUnmute}>
                                    <img src={voice} alt="voice"/>
                                </button>
                            </div>
                        </Carousel.Item>
                    
                        {urls?.slice(1).map((image, index) => (
                        <Carousel.Item>
                         
                            {image?.endsWith('.mp4') ? (
                            <video controls>
                                <source src={image} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            ) : (
                            <img src={image} alt={`Property Image`} />
                            )}
                        </Carousel.Item>
                            ))}
                    </Carousel>
                </Col>
   
                <Col lg={3} md={3} sm={12} xs={12}>
                {urls?.slice(1, 3).map((url, index) => {
                    const isVideo = url?.endsWith('.mp4');
                    return (
                    <Row key={index}>
                        <Col>
                        {isVideo ? (
                            <video controls className={index === 1 ? 'img1' : 'img2'}>
                            <source src={url} type="video/mp4" />
                            </video>
                        ) : (
                            <img
                            src={url}
                            alt={`Property Image ${index}`}
                            className={index === 1 ? 'img1' : 'img2'}
                            />
                        )}
                        </Col>
                    </Row>
                    );
                })}
                </Col>
            </Row> */}
            <Row>
            <ImageGalleryComponent urls={urls} />
            </Row>
        </div>
        <Container>
            <Row className="features">
                <Col lg={6} md={6} sm={12} xs={12}>
                    <h3>{getProperties?.property?.home_address}</h3>
                    <Row className="details">
                        <Col lg={3} md={4} sm={4} xs={4}>
                            <div>
                                <img src={bed} alt="bed" width="40.88" height="22.87"/>
                                <p>{getProperties?.property?.beds} Bed</p>
                            </div>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={4}>
                            <div>
                                <img src={bath} alt="bed" width="32.21" height="25.99"/>
                                <p>{getProperties?.property?.baths} Bath</p>
                            </div>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={4}>
                            <div>
                                <img src={sqf} alt="bed" width="22.31" height="17.35"/>
                                <p>1,321 sqf</p>
                            </div>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={4}>
                            <div>
                                <img src={lot} alt="bed" width="22.72" height="18.59"/>
                                <p>{getProperties?.property?.lot} lot</p>
                            </div>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={4}>
                            <div>
                                <img src={livabililty} alt="bed" width="24.33" height="24.33"/>
                                <span className="small"><i className="fa fa-star"></i>4.5</span>
                                <span>Livability</span>
                            </div>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={4}>
                            <div>
                                <img src={school} alt="bed" width="22.98" height="22.95"/>
                                <span className="small"><i className="fa fa-star"></i>4.5</span>
                                <span>School</span>
                            </div>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={4}>
                            <div>
                                <img src={crime} alt="bed" width="29.74" height="24.4"/>
                                <span className="small"><i className="fa fa-star"></i>4.5</span>
                                <span>Crime</span>
                            </div>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={4}>
                            <div>
                                <img src={noise} alt="bed" width="28.39" height="28.39"/>
                                <span className="small"><i className="fa fa-star"></i>4.5</span>
                                <span>Noise</span>
                            </div>
                        </Col>
                    </Row>
                    <h5 className="mb-2">Details</h5>
                    {/* <p>
                        Luxurious sun-drenched newly renovated corner 1Bed / 1,5 Bath Condo, approx. 771 sq
                        ft with a private terrace at the Maison East Condominium is located on one of the
                        most desirable streets on the Upper East Side just four blocks away from the Central
                        Park and Metropolitan Museum.
                    </p> */}
                    <p>
                    {getProperties?.property?.property_detail}
                    </p>
                    <hr/>
                    <h5>Apertment Features</h5>
                    <Row className="apartment">
                        <Col lg={4} md={6} sm={6} xs={6}>
                            <img src={ac} alt="bed" width="36.04px" height="29.56px"/>
                            <p>Air Conditioning</p>
                        </Col>
                        <Col lg={4} md={6} sm={6} xs={6}>
                            <img src={transport} alt="bed" width="24.24px" height="33.78px"/>
                            <p>Close to Transport</p>
                        </Col>
                        <Col lg={4} md={6} sm={6} xs={6}>
                            <img src={electricity} alt="bed" width="33.78px" height="33.78px"/>
                            <p>Electricity</p>
                        </Col>
                        <Col lg={4} md={6} sm={6} xs={6}>
                            <img src={alarm} alt="bed" width="35.9px" height="33.65px"/>
                            <p>Alarm</p>
                        </Col>
                        <Col lg={4} md={6} sm={6} xs={6}>
                            <img src={intercom} alt="bed" width="35.16px" height="25.34px"/>
                            <p>Intercom</p>
                        </Col>
                        <Col lg={4} md={6} sm={6} xs={6}>
                            <img src={pool} alt="bed" width="31.9px" height="24.3px"/>
                            <p>In-Ground Pool </p>
                        </Col>
                        <Col lg={4} md={6} sm={6} xs={6}>
                            <img src={parking} alt="bed" width="33.78px" height="29.69px"/>
                            <p>Parking</p>
                        </Col>
                        <Col lg={4} md={6} sm={6} xs={6}>
                            <img src={watersupply} alt="bed" width="31.16px" height="28.11px"/>
                            <p>Water Supply</p>
                        </Col>
                        <Col lg={4} md={6} sm={6} xs={6}>
                            <img src={laundry} alt="bed" width="25.51px" height="31.02px"/>
                            <p>Laundry</p>
                        </Col>
                        <Col lg={4} md={6} sm={6} xs={6}>
                            <img src={fireplace} alt="bed" width="30px" height="30px"/>
                            <p>Fire Place</p>
                        </Col>
                    </Row>
                    <Row className="property feature">
                        <Col>
                            <h5>Property Feature</h5>
                            <i
                                className={propertyFeature ? "fa fa-angle-up" : "fa fa-angle-down"}
                                onClick={() => setState({propertyFeature: !propertyFeature})}
                            ></i>
                        </Col>
                        <Col lg={10} md={10} sm={10} xs={10}
                             style={{display: propertyFeature ? "block" : "none"}}>
                            <div>
                                <p>Price/Sq.Ft.</p>
                                <span>$725/Sq.Ft.</span>
                            </div>
                            <div>
                                <p>Baths</p>
                                <span>{getProperties?.property?.baths} Full, 1 parial</span>
                            </div>
                            <div>
                                <p>Stories</p>
                                <span>{getProperties?.property?.stories}</span>
                            </div>
                            <div>
                                <p>Property Type</p>
                                <span>{getProperties?.property?.property_type}</span>
                            </div>
                            <div>
                                <p>Community</p>
                                <span>{getProperties?.property?.community}</span>
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <Row className="property history">
                        <Col>
                            <h5>Property History</h5>
                            <i
                                className={propertyHistory ? "fa fa-angle-up" : "fa fa-angle-down"}
                                onClick={() => setState({propertyHistory: !propertyHistory})}
                            ></i>
                        </Col>
                        <Col lg={10} md={10} sm={10} xs={10}
                             style={{display: propertyHistory ? "block" : "none"}}>
                            <div className="box">
                                <div>
                                    <span className="date">Jun 9, 2020</span>
                                    <span className="status">Listed Active</span>
                                </div>
                                <h6>$565,630</h6>
                            </div>
                            <div className="box">
                                <div>
                                    <span className="date">Apr 7, 2012</span>
                                    <span className="status s">Sold</span>
                                </div>
                                <h6>$340,000</h6>
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <Row className="property taxes">
                        <Col>
                            <h5>Property Taxes</h5>
                            <i
                                className={propertyTaxes ? "fa fa-angle-up" : "fa fa-angle-down"}
                                onClick={() => setState({propertyTaxes: !propertyTaxes})}
                            ></i>
                        </Col>
                        <Col lg={10} md={10} sm={10} xs={10}
                             style={{display: propertyTaxes ? "block" : "none"}}>
                            <div>
                                <span>Tax Amount</span>
                                <span className="colon">:</span>
                                <span className="amount">$55,630</span>
                            </div>
                            <div>
                                <span>Land</span>
                                <span className="colon">:</span>
                                <span className="amount">$3,694,000</span>
                            </div>
                            <div>
                                <span>Improvements</span>
                                <span className="colon">:</span>
                                <span className="amount">$2,148,100</span>
                            </div>
                            <div>
                                <span>Total</span>
                                <span className="colon">:</span>
                                <span className="amount">$5,842,100</span>
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <Row className="property neighbourhood">
                        <Col>
                            <h5>Neighbourhood</h5>
                            <i
                                className={neighbourhood ? "fa fa-angle-up" : "fa fa-angle-down"}
                                onClick={() => setState({neighbourhood: !neighbourhood})}
                            ></i>
                        </Col>
                        <Col lg={10} md={10} sm={10} xs={10}
                             style={{display: neighbourhood ? "block" : "none"}}>
                            <p>Charlotte Hall, MD</p>
                            <Row>
                                <Col lg={4} md={4} sm={4} xs={4}>
                                    <div>
                                        <h5>$399k</h5>
                                        <span>Median Price for sale</span>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4} xs={4}>
                                    <div>
                                        <h5>$150</h5>
                                        <span>Median Price per sq.ft</span>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4} xs={4}>
                                    <div>
                                        <h5>48</h5>
                                        <span>Median Price on Market</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <div className="payment">
                        <div className="dollarvalues">
                            <span className="dollarvalue">&#36;{getProperties?.property?.price}</span><span><button
                            type="btn">For Sale</button></span>
                            <span className="listed">Listed 2 days ago</span>
                        </div>
                        <div className="para">
                            <p>{getProperties?.property?.home_address}</p>
                        </div>
                        <div className="getpre">
                            <span><button type="btn">Get pre-qualified</button></span>
                            <span className="estpayment">Est. payment: <br/><span
                                className="simplefont">&#36;{getProperties?.property?.est_payment}</span></span>

                        </div>
                    </div>

                    <div className="buttonsstyles">
                        <button id="send">Send message to seller</button>
                        <Link to={`/submit-offer/${getProperties?.property?.id}`}>
                        
                        <button id="submit">Submit an offer</button>
                        </Link>
                    </div>


                    <div className="calendarsettings">
                        <div>
                            <svg width="20" height="22" viewBox="0 0 20 22" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18 2H17V0H15V2H5V0H3V2H2C0.9 2 0 2.9 0 4V20C0 21.1 0.9 22 2 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM18 20H2V7H18V20Z"
                                    fill="#4F4F4F"/>
                            </svg>
                            <span className="scedule">Scedule a tour</span>
                        </div>
                        <Row className="makingborder m-0">
                            <Col lg={2} md={2} sm={2} xs={2}>
                                <button className="calendar">
                                    <span>WED<br/>12</span>

                                </button>
                            </Col>
                            <Col lg={2} md={2} sm={2} xs={2}>
                                <button className="calendar">
                                    <span>THU<br/>13</span>

                                </button>
                            </Col>
                            <Col lg={2} md={2} sm={2} xs={2}>
                                <button className="calendar">
                                    <span>FRI<br/>14</span>

                                </button>
                            </Col>
                            <Col lg={2} md={2} sm={2} xs={2}>
                                <button className="calendar">
                                    <span>SAT<br/>15</span>

                                </button>
                            </Col>
                            <Col lg={2} md={2} sm={2} xs={2}>
                                <button className="calendar">
                                    <span>SUN<br/>16</span>

                                </button>
                            </Col>
                            <Col lg={2} md={2} sm={2} xs={2}>
                                <button className="calendar">
                                    <span>WED<span id="floatingbutton">&#62;</span><br/>12</span>
                                </button>
                            </Col>

                            <Col className="choosing">
                                <button id="choose">Choose Time</button>
                                <button id="scedule">Scedule a Tour</button>
                            </Col>

                        </Row>

                    </div>
                    <hr/>
                    <Row className="property donutchart">
                        <Col>
                            <h5>Monthly Mortgage</h5>
                            <i
                                className={mortgage ? "fa fa-angle-up" : "fa fa-angle-down"}
                                onClick={() => setState({mortgage: !mortgage})}
                            ></i>
                        </Col>
                        <Col lg={10} md={10} sm={10} xs={10} style={{display: mortgage ? "block" : "none"}}>
                            <div className="chart">
                                <img src={chart} alt="chart"/>
                            </div>
                            <div className="donutchart">
                                <div className="principal">
                                    <span><span className="dot" style={{backgroundColor: "blue"}}></span>Principal & Interest</span>
                                    <span>&#36;{getProperties?.property?.interest}</span>
                                </div>
                                <div className="principal">
                                    <span><span className="dot" style={{backgroundColor: "#3CD7E1"}}></span>Property Taxes</span>
                                    <span>&#36;{getProperties?.property?.tax}</span>
                                </div>
                                <div className="principal">
                                    <span><span className="dot" style={{backgroundColor: "#FECA7A"}}></span>Home Insurance</span>
                                    <span>&#36;{getProperties?.property?.insurance}</span>
                                </div>
                                <div className="principal">
                                    <span><span className="dot" style={{backgroundColor: "#F2994A"}}></span>HOA</span>
                                    <span>&#36;{getProperties?.property?.HOA}</span>
                                </div>
                                <div className="principal">
                                    <span><span className="dot" style={{backgroundColor: "#C1DAFF"}}></span>Mortgage Insurance</span>
                                    <span>&#36;{getProperties?.property?.mortgage_insurance}</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <Row className="property location">
                        <Col>
                            <h5>Nearby Schools</h5>
                            <i
                                className={schools ? "fa fa-angle-up" : "fa fa-angle-down"}
                                onClick={() => setState({schools: !schools})}
                            ></i>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12} style={{display: schools ? "block" : "none", position:'relative'}}>
                            {/* <img src={location} alt="location" width="100%"/> */}
                           
                                    <Map google={props.google} zoom={14}>
 
                                        <Marker onClick={onMarkerClick}
                                                name={'Current location'} />

                                      {selectedPlace && (
                                                <InfoWindow onClose={onInfoWindowClose}>
                                                <div>
                                                    <h1>{selectedPlace.name}</h1>
                                                </div>
                                                </InfoWindow>
                                            )}
                                        </Map>
                                        {/* <Map google={props.google} zoom={14}>
                                            <Marker onClick={onMarkerClick} name={'Current location'} />
                                            {selectedPlace && (
                                                <InfoWindow onClose={onInfoWindowClose}>
                                                <div>
                                                    <h1>{selectedPlace.name}</h1>
                                                </div>
                                                </InfoWindow>
                                            )}
                                            </Map> */}
                            <div className="address">
                                <div className="first">
                                    <span id="one">
                                        Ps 183 Robert L Stevenson
                                        </span>
                                    <span>0.1</span>
                                </div>
                                <div className="second">
                                    <span>Public<span className="public">Grades PK-5</span></span>
                                    <span>mi</span>
                                </div>
                            </div>
                            <hr/>
                            <div className="address">
                                <div className="first">
                                    <span id="one">
                                        Ps 183 Robert L Stevenson
                                        </span>
                                    <span>0.1</span>
                                </div>
                                <div className="second">
                                    <span>Public<span className="public">Grades PK-5</span></span>
                                    <span>mi</span>
                                </div>
                            </div>
                            <hr/>
                            <div className="address">
                                <div className="first">
                                    <span id="one">
                                        Ps 183 Robert L Stevenson
                                        </span>
                                    <span>0.1</span>
                                </div>
                                <div className="second">
                                    <span>Public<span className="public">Grades PK-5</span></span>
                                    <span>mi</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <Row className="property surrounding">
                        <Col>
                            <h5>Surrounding</h5>
                            <i
                                className={surrounding ? "fa fa-angle-up" : "fa fa-angle-down"}
                                onClick={() => setState({surrounding: !surrounding})}
                            ></i>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12} style={{display: surrounding ? "block" : "none"}}>
                            <div className="settingborder">
                                <div id="noice">
                                    noice
                                </div>
                                <div id="na">
                                    N / A noise Level outside the property building at
                                    city
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row><Col lg={6} md={6} sm={12} xs={12}>
                <hr/>
            </Col></Row>
            <Row className="property similar">
                <Col lg={6} md={6} sm={12} xs={12}>
                    <h5>Awesome Simiar Home</h5>
                    <i
                        className={similar ? "fa fa-angle-up" : "fa fa-angle-down"}
                        onClick={() => setState({similar: !similar})}
                    ></i>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12} style={{display: similar ? "block" : "none"}}>
                    <Row>
                        <Col lg={4} md={6} sm={12} xs={12}>
                            <div className="box">
                                <Carousel className="img3">
                                    <Carousel.Item>
                                        <img src={f} alt="f"/>
                                        <button className="now">Now</button>
                                        <div className="heart">
                                            <button>
                                                <img src={heart} alt="heart"/>
                                            </button>
                                        </div>
                                        <button className="play">
                                            <img src={play} alt="play"/>
                                        </button>
                                        <div className="voice-and-time">
                                            <p>1:48</p>
                                            <button>
                                                <img src={voice} alt="voice"/>
                                            </button>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src={g} alt="g"/>
                                        <button className="now">Now</button>
                                        <div className="heart">
                                            <button>
                                                <img src={heart} alt="heart"/>
                                            </button>
                                        </div>
                                        <button className="play">
                                            <img src={play} alt="play"/>
                                        </button>
                                        <div className="voice-and-time">
                                            <p>1:48</p>
                                            <button>
                                                <img src={voice} alt="voice"/>
                                            </button>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src={h} alt="h"/>
                                        <button className="now">Now</button>
                                        <div className="heart">
                                            <button>
                                                <img src={heart} alt="heart"/>
                                            </button>
                                        </div>
                                        <button className="play">
                                            <img src={play} alt="play"/>
                                        </button>
                                        <div className="voice-and-time">
                                            <p>1:48</p>
                                            <button>
                                                <img src={voice} alt="voice"/>
                                            </button>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                                <div className="details">
                                    <div className="detail">
                                        <span className="amount">$1,150,000</span>
                                        <span className="bed">
                                            <img src={bed} alt="bed" width="22.92" height="12.82"/>
                                            <span>3 Bed</span>
                                        </span>
                                        <span className="bath">
                                            <img src={bath} alt="bed" width="18.06" height="14.57"/>
                                            <span>2 Bath</span>
                                        </span>
                                    </div>
                                    <p className="address">914 Edgemont Avenue Elk River, MN 55</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={6} sm={12} xs={12}>
                            <div className="box">
                                <Carousel className="img3">
                                    <Carousel.Item>
                                        <img src={g} alt="g"/>
                                        <div className="heart">
                                            <button>
                                                <img src={heart} alt="heart"/>
                                            </button>
                                        </div>
                                        <button className="play">
                                            <img src={play} alt="play"/>
                                        </button>
                                        <div className="voice-and-time">
                                            <p>1:48</p>
                                            <button>
                                                <img src={voice} alt="voice"/>
                                            </button>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src={h} alt="h"/>
                                        <div className="heart">
                                            <button>
                                                <img src={heart} alt="heart"/>
                                            </button>
                                        </div>
                                        <button className="play">
                                            <img src={play} alt="play"/>
                                        </button>
                                        <div className="voice-and-time">
                                            <p>1:48</p>
                                            <button>
                                                <img src={voice} alt="voice"/>
                                            </button>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src={f} alt="f"/>
                                        <div className="heart">
                                            <button>
                                                <img src={heart} alt="heart"/>
                                            </button>
                                        </div>
                                        <button className="play">
                                            <img src={play} alt="play"/>
                                        </button>
                                        <div className="voice-and-time">
                                            <p>1:48</p>
                                            <button>
                                                <img src={voice} alt="voice"/>
                                            </button>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                                <div className="details">
                                    <div className="detail">
                                        <span className="amount">$1,150,000</span>
                                        <span className="bed">
                                            <img src={bed} alt="bed" width="22.92" height="12.82"/>
                                            <span>3 Bed</span>
                                        </span>
                                        <span className="bath">
                                            <img src={bath} alt="bed" width="18.06" height="14.57"/>
                                            <span>2 Bath</span>
                                        </span>
                                    </div>
                                    <p className="address">914 Edgemont Avenue Elk River, MN 55</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={6} sm={12} xs={12}>
                            <div className="box">
                                <Carousel className="img3">
                                    <Carousel.Item>
                                        <img src={h} alt="h"/>
                                        <div className="heart">
                                            <button>
                                                <img src={heart} alt="heart"/>
                                            </button>
                                        </div>
                                        <button className="play">
                                            <img src={play} alt="play"/>
                                        </button>
                                        <div className="voice-and-time">
                                            <p>1:48</p>
                                            <button>
                                                <img src={voice} alt="voice"/>
                                            </button>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src={f} alt="f"/>
                                        <div className="heart">
                                            <button>
                                                <img src={heart} alt="heart"/>
                                            </button>
                                        </div>
                                        <button className="play">
                                            <img src={play} alt="play"/>
                                        </button>
                                        <div className="voice-and-time">
                                            <p>1:48</p>
                                            <button>
                                                <img src={voice} alt="voice"/>
                                            </button>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src={g} alt="g"/>
                                        <div className="heart">
                                            <button>
                                                <img src={heart} alt="heart"/>
                                            </button>
                                        </div>
                                        <button className="play">
                                            <img src={play} alt="play"/>
                                        </button>
                                        <div className="voice-and-time">
                                            <p>1:48</p>
                                            <button>
                                                <img src={voice} alt="voice"/>
                                            </button>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                                <div className="details">
                                    <div className="detail">
                                        <span className="amount">$1,150,000</span>
                                        <span className="bed">
                                            <img src={bed} alt="bed" width="22.92" height="12.82"/>
                                            <span>3 Bed</span>
                                        </span>
                                        <span className="bath">
                                            <img src={bath} alt="bed" width="18.06" height="14.57"/>
                                            <span>2 Bath</span>
                                        </span>
                                    </div>
                                    <p className="address">914 Edgemont Avenue Elk River, MN 55</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </div>

);
}

// export default Feature;
export default GoogleApiWrapper({
  apiKey: "AIzaSyDbdny-RZwrzev6K-UNVwYXnSo-WODzPew"
})(Feature);
