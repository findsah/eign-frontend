import React, { useState, useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, ZoomControl, Tooltip, Circle, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import {L, Icon, divIcon, point } from "leaflet";
import { useSelector } from "react-redux";
import location from '../../assets/icons/location.png';
import crruntloctaion from '../../assets/icons/crruntloctaion.svg';
const customIcon = new Icon({
    iconUrl: crruntloctaion,
    iconSize: [38, 38] // size of the icon
  });
  const customIcon2 = new Icon({
    iconUrl: location,
    iconSize: [38, 38] // size of the icon
  });
const LeafLetMap = ({ allProperties }) => {
  const mapRef = useRef(null);
  const { getCurrentLocation } = useSelector((state) => state?.shareSlice);
  const lat = localStorage.getItem('lat');
  const lng = localStorage.getItem('lng');
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  const [center, setCenter] = useState({ lat: latNum, lng: lngNum });
  const [zoomLevel, setZoomLevel] = useState(10);
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
  const handleZoomChange = (map) => {
    setZoomLevel(map.getZoom());
  };
  const handleMapMove = (map) => {
    
    const bounds = map.getBounds();
    const center = map.getCenter();
  
    const filteredProperties = allProperties?.filter((property) => {
      // Adjust the condition based on your desired logic
      const propertyLat = parseFloat(property.location_lat);
        const propertyLng = parseFloat(property.location_long);
      return (
        bounds.contains([propertyLat, propertyLng]) ||
        center.distanceTo([propertyLat, propertyLng]) <= 1000
      );
    });
  
  };
  
  const MapEvents = () => {
    const map = useMapEvents({
      zoomend: () => handleZoomChange(map),
      moveend: () => handleMapMove(map),
    });
  
    return null;
  };
  useEffect(() => {
    // Initial filtering of properties based on the initial zoom level
    if (mapRef.current) {
      handleMapMove(mapRef.current.leafletElement);
    }
  }, [mapRef]);


  const createClusterCustomIcon = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true)
    });
  };
  return (
    <MapContainer center={center} zoom={3} whenCreated={(map) => (mapRef.current = map)} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
  );
};

export default LeafLetMap;
