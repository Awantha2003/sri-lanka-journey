// src/components/MapView.jsx
import React from 'react';
import { GoogleMap, Marker, Polyline, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 7.8731, // Sri Lanka center latitude
  lng: 80.7718, // Sri Lanka center longitude
};

const MapView = ({ itinerary }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAN_ywtpU4y9sB0W-LVlbb3oCZafXSw1us',
});

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading Maps...</p>;

  const pathCoordinates = itinerary.map((stop) => ({
    lat: stop.lat,
    lng: stop.lng,
  }));

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={7}
      center={center}
    >
      {itinerary.map((stop, index) => (
        <Marker
          key={index}
          position={{ lat: stop.lat, lng: stop.lng }}
          label={`${stop.day}`}
          title={stop.location}
        />
      ))}

      <Polyline
        path={pathCoordinates}
        options={{
          strokeColor: '#2c7be5',
          strokeOpacity: 0.8,
          strokeWeight: 4,
        }}
      />
    </GoogleMap>
  );
};

export default MapView;
