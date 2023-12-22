// GeoFencingMap.js

import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript,  MarkerF, CircleF } from '@react-google-maps/api';
import { useGeoFencing } from '../Hooks/useGEoFencing';

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

const GeoFencingMap = () => {
  const [userLocation, setUserLocation] = useState({ lat: 0, long: 0 });
  const { createPoint,checkIfInside, isWithinGeoFence } = useGeoFencing();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        createPoint({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          radius: 1000
        })
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );

  }, []);

  // console.log(userLocation, "useer")

  const center = {
    lat: userLocation.lat,
    lng: userLocation.long,
  };
  // console.log(center, "center")
  const geofenceOptions = {
    center,
    radius: 1000, // Radius in meters
    strokeColor: '#FF0000', // Red border color
    strokeOpacity: 0.8, // Opacity of the border
    strokeWeight: 2, // Thickness of the border
    fillColor: '#FF0000', // Fill color
    fillOpacity: 0.2, // Opacity of the fill
    clickable: false
  };
 
   
  const handleClickedMap = (e) => {
    
    isWithinGeoFence({
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng()
    }, {
      lat: userLocation.lat,
      long: userLocation.long
    })
    console.log(isWithinGeoFence({
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),

    }, {
      lat: userLocation.lat,
      long: userLocation.long
    }), "checkoutside")
  }
  const handleClickInside = (e) => {
    
    checkIfInside({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })
    console.log(checkIfInside({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }),"checkifinside")
   
  }
  return (
    <LoadScript googleMapsApiKey="AIzaSyBlegafUoRrp__B_PS-s7gywXdOrFbvR30">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
        onClick={handleClickedMap}
      >
        <CircleF  {...geofenceOptions} onClick={handleClickInside} />
        {/* Marker for the user's location */}
        <MarkerF
          position={center}
        />
        
        {/* <button onClick={handleCreatePoint}>Create New Geofence Point</button> */}
      </GoogleMap>
    </LoadScript>

  );
};

export default GeoFencingMap;
