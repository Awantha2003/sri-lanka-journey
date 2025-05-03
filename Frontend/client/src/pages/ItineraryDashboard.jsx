import React, { useState, useEffect } from 'react';
import MapView from '../components/MapView';
import axios from 'axios';
import MatchResults from '../components/MatchResults';

const sampleItinerary = [
  { day: 1, location: 'Colombo', lat: 6.9271, lng: 79.8612 },
  { day: 2, location: 'Kandy', lat: 7.2906, lng: 80.6337 },
  { day: 3, location: 'Nuwara Eliya', lat: 6.9497, lng: 80.7891 },
  { day: 4, location: 'Ella', lat: 6.8667, lng: 81.0469 },
];

const ItineraryDashboard = () => {
  const [matches, setMatches] = useState({ hotels: [], vehicles: [] });
  const [message, setMessage] = useState('');

  // Fetch match options
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/match-options', {
          params: {
            city: 'Kandy',    // Example logic; can be dynamic later
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
  }, []);

  const handleSaveTrip = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/save-trip', {
        userId: "guest", // or real userId if logged in
        itinerary: sampleItinerary,
        hotel: matches.hotels[0],   // Save the first matched hotel
        vehicle: matches.vehicles[0] // Save the first matched vehicle
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🌍 Trip Route</h2>
      <MapView itinerary={sampleItinerary} />

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">🧠 Smart Match Suggestions</h2>
        <MatchResults hotels={matches.hotels} vehicles={matches.vehicles} />
      </div>

      <button
        onClick={handleSaveTrip}
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
      >
        💾 Save Trip
      </button>

      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
};

export default ItineraryDashboard;
