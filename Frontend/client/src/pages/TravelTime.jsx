import React, { useState } from 'react';
import axios from 'axios';
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';

const TravelTime = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAN_ywtpU4y9sB0W-LVlbb3oCZafXSw1us', // ⚠️ use process.env in production
  });

  const handleRoute = async () => {
    try {
      const res = await axios.get(
        `/api/travel-info?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&t=${Date.now()}`
      );
      console.log('🚀 Travel API Response:', res.data);

      const data = res.data;

      setRoute(data.directions);
      setDistance(data.distance);
      setDuration(data.duration);
    } catch (err) {
      console.error('❌ Failed to get route:', err);
    }
  };

  const getCenter = () => {
    if (route?.routes?.[0]?.overview_path?.length) {
      const midIndex = Math.floor(route.routes[0].overview_path.length / 2);
      return {
        lat: route.routes[0].overview_path[midIndex].lat(),
        lng: route.routes[0].overview_path[midIndex].lng(),
      };
    }
    return { lat: 7.8731, lng: 80.7718 }; // Sri Lanka default center
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Travel Time & Route</h2>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="border px-3 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border px-3 py-1 rounded"
        />
        <button onClick={handleRoute} className="bg-green-600 text-white px-4 py-1 rounded">
          Get Route
        </button>
      </div>

      {distance && duration && (
        <div className="mb-4 text-gray-700">
          <p>📏 Distance: <strong>{distance}</strong></p>
          <p>⏱️ Duration: <strong>{duration}</strong></p>
        </div>
      )}

      {isLoaded && route && (
        <div className="h-[400px] w-full">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={getCenter()}
            zoom={10}
          >
            <DirectionsRenderer directions={route} />
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default TravelTime;
