import React, { useState } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const NearbySuggestions = () => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [type, setType] = useState('restaurant');
  const [results, setResults] = useState([]);
  const [center, setCenter] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAN_ywtpU4y9sB0W-LVlbb3oCZafXSw1us', // You can move this to .env if needed
  });

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `/api/nearby-suggestions?lat=${lat}&lng=${lng}&type=${type}`
      );

      // Ensure you get an array of places
      const places = Array.isArray(res.data) ? res.data : res.data.results || [];
      setResults(places);

      setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
    } catch (error) {
      console.error('Failed to fetch nearby places:', error);
      setResults([]);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Nearby Suggestions</h2>

      {/* Form Inputs */}
      <div className="mb-4 flex gap-3">
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="border px-3 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          className="border px-3 py-1 rounded"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="restaurant">Restaurant</option>
          <option value="hotel">Hotel</option>
        </select>
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-1 rounded">
          Search
        </button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Array.isArray(results) &&
          results.map((place, index) => (
            <div key={index} className="p-4 border rounded shadow">
              <h3 className="font-semibold text-lg">{place.name}</h3>
              <p className="text-sm text-gray-600">{place.vicinity}</p>
              <p className="text-sm">Rating: {place.rating || 'N/A'}</p>
              {place.photos && (
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyAN_ywtpU4y9sB0W-LVlbb3oCZafXSw1us`}
                  alt={place.name}
                  className="mt-2 rounded"
                />
              )}
            </div>
          ))}
      </div>

      {/* Map */}
      {isLoaded && center && (
        <div className="h-[400px] w-full">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={14}
          >
            {Array.isArray(results) &&
              results.map((place, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: place.geometry?.location?.lat,
                    lng: place.geometry?.location?.lng,
                  }}
                />
              ))}
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default NearbySuggestions;
