import React from 'react';
import { GoogleMap, Marker, Polyline, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = {
  lat: 7.8731, // Center of Sri Lanka
  lng: 80.7718,
};

const MapView = ({ itinerary = [] }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyAN_ywtpU4y9sB0W-LVlbb3oCZafXSw1us',
  });

  if (loadError) return <p>❌ Error loading map</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  // Use first location to center map, fallback to default
  const mapCenter = itinerary.length > 0
    ? { lat: itinerary[0].lat, lng: itinerary[0].lng }
    : defaultCenter;

  // Path to connect all locations
  const pathCoordinates = itinerary.map((stop) => ({
    lat: stop.lat,
    lng: stop.lng,
  }));

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={7}
      center={mapCenter}
    >
      {itinerary.map((stop, index) => (
        <Marker
          key={index}
          position={{ lat: stop.lat, lng: stop.lng }}
          label={`Day ${stop.day}`}
          title={stop.city || stop.location || `Stop ${index + 1}`}
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
