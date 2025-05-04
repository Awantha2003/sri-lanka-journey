import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MapView from '../components/MapView';
import axios from 'axios';
import MatchResults from '../components/MatchResults';

const ItineraryDashboard = () => {
  const location = useLocation();
  const itinerary = location.state?.itinerary || [];
  const [matches, setMatches] = useState({ hotels: [], vehicles: [] });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (itinerary.length === 0) return;

        const response = await axios.get('http://localhost:5000/api/match-options', {
          params: {
            city: itinerary[0].city || itinerary[0].location,
            budget: 'medium',
            groupSize: 4,
          },
        });
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    fetchMatches();
  }, [itinerary]);

  const handleSaveTrip = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/save-trip', {
        userId: "guest",
        itinerary,
        hotel: matches.hotels[0],
        vehicle: matches.vehicles[0]
      });

      if (response.status === 201) {
        setMessage("✅ Trip saved successfully!");
      } else {
        setMessage("⚠️ Failed to save trip.");
      }
    } catch (error) {
      console.error('Error saving trip:', error);
      setMessage("❌ Error saving trip.");
    }
  };

  if (!itinerary.length) {
    return <div className="p-6 text-center text-red-600 font-semibold">No itinerary data found.</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-emerald-700">🌍 Trip Route</h2>
      <MapView itinerary={itinerary} />

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">🧠 Smart Match Suggestions</h2>
        <MatchResults hotels={matches.hotels} vehicles={matches.vehicles} />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">📅 Day-by-Day Plan</h2>
        <div className="grid gap-4">
          {itinerary.map((day) => (
            <div key={day.day} className="p-4 bg-gray-100 rounded shadow">
              <h3 className="text-lg font-semibold">Day {day.day} - {day.city}</h3>
              <p><strong>📍 Place:</strong> {day.places.join(', ')}</p>
              <p><strong>🏨 Hotel:</strong> {day.hotel}</p>
              <p><strong>🚗 Vehicle:</strong> {day.vehicle}</p>
              <p><strong>🌤️ Weather:</strong> {day.weather?.description || 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSaveTrip}
        className="mt-10 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
      >
        💾 Save Trip
      </button>

      {message && <p className="mt-4 text-lg text-center font-medium">{message}</p>}
    </div>
  );
};

export default ItineraryDashboard;
