import React, { useState } from 'react';
import axios from 'axios';

function ItineraryForm() {
  const [form, setForm] = useState({
    days: 3,
    groupSize: 2,
    style: 'nature',
    budget: 'mid',
  });

  const [itinerary, setItinerary] = useState(null);

  const handleGenerate = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert("You're not logged in. Please sign in to continue.");

      const response = await axios.post(
        'http://localhost:5000/api/generate-itinerary',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItinerary(response.data); // Save itinerary in state
    } catch (error) {
      console.error('❌ Error:', error.response?.data || error.message);
      alert(error.response?.data?.msg || 'Failed to generate itinerary');
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">🌍 Plan Your Sri Lanka Journey</h2>

      {/* === FORM FIELDS === */}
      <div className="mb-3">
        <label className="block font-medium">Days:</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={form.days}
          onChange={(e) => setForm({ ...form, days: parseInt(e.target.value) })}
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Group Size:</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={form.groupSize}
          onChange={(e) => setForm({ ...form, groupSize: parseInt(e.target.value) })}
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Style:</label>
        <select
          className="w-full border p-2 rounded"
          value={form.style}
          onChange={(e) => setForm({ ...form, style: e.target.value })}
        >
          <option value="nature">Nature</option>
          <option value="beach">Beach</option>
          <option value="culture">Culture</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Budget:</label>
        <select
          className="w-full border p-2 rounded"
          value={form.budget}
          onChange={(e) => setForm({ ...form, budget: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="mid">Mid</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        onClick={handleGenerate}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        🚀 Generate Itinerary
      </button>

      {/* === SHOW GENERATED ITINERARY === */}
      {itinerary && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">🧭 Your Smart Itinerary</h3>
          {itinerary.days.map((day, index) => (
            <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
              <h4 className="font-semibold">Day {index + 1}</h4>
              <p><strong>City:</strong> {day.city}</p>
              <p><strong>Activities:</strong> {day.activities.join(', ')}</p>
              <p><strong>Hotel:</strong> {day.hotel}</p>
              <p><strong>Weather:</strong> {day.weather}</p>
              <p><strong>Vehicle:</strong> {day.vehicle}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItineraryForm;
