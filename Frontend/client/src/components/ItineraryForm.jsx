import React, { useState } from 'react';
import axios from 'axios';

const categoryOptions = [
  { label: '🏯 Cultural Triangle', value: 'Cultural Triangle (Ancient Cities)' },
  { label: '🏞️ Hill Country', value: 'Hill Country & Scenic Highlands' },
  { label: '🐘 Wildlife Safari', value: 'Wildlife Safari' },
  { label: '🏖️ South Coast Beaches', value: 'South Coast Beaches' },
  { label: '🏖️ East Coast Beaches', value: 'East Coast Beaches' },
  { label: '🏝️ Remote Beaches', value: 'Remote & Untouched Beaches' },
  { label: '☸️ Buddhist Pilgrimage', value: 'Buddhist Pilgrimage Sites' },
  { label: '🕌 Hindu Heritage', value: 'Hindu Religious Heritage' },
  { label: '🌋 Rock Peaks', value: 'Rock Formations & Mountain Peaks' },
  { label: '🌲 Rainforests', value: 'Rainforests & Nature Reserves' },
  { label: '🏰 Colonial History', value: 'Colonial Forts & History' },
  { label: '🌆 City Life', value: 'City Life & Urban Exploration' },
  { label: '🌄 Tea Country', value: 'Tea Country & Plantations' },
  { label: '🚴 Adventure', value: 'Eco & Adventure Tourism' },
  { label: '🌅 Viewpoints', value: 'Scenic Viewpoints & Sunsets' },
  { label: '🐳 Whale Watching', value: 'Marine Life & Whale Watching' },
  { label: '🛍️ Shopping & Nightlife', value: 'Shopping & Nightlife' },
  { label: '🖼️ Museums & Arts', value: 'Museums & Arts (Libraries)' },
  { label: '⛵ Water Sports', value: 'Water Sports & Diving' },
  { label: '🧘 Wellness', value: 'Spiritual & Meditation Retreats' },
  { label: '🥾 Hiking Trails', value: 'Hiking & Nature Trails' },
  { label: '🎣 Fishing Villages', value: 'Fishing Villages & Lagoons' },
  { label: '🎭 Cultural Shows', value: 'Cultural Shows & Dance Rituals' },
  { label: '🍃 Ayurveda', value: 'Ayurveda & Wellness (Yoga)' },
  { label: '⛺ Camping & Glamping', value: 'Camping, Glamping & Eco Lodges' },
  { label: '🐢 Turtle Watching', value: 'Turtle Watching & Conservation' },
  { label: '🚣 River Adventures', value: 'River & Water Adventures' },
  { label: '🐦 Bird Watching', value: 'Bird Watching' },
  { label: '🏛️ Archaeological Sites', value: 'Archaeological Ruins & Excavations' },
  { label: '🧗 Rock Climbing', value: 'Rock Climbing & Caving' },
  { label: '🛶 Island Hopping', value: 'Island Hopping & Boat Safaris' },
];

function ItineraryForm({ onItineraryReady }) {
  const [form, setForm] = useState({
    days: 3,
    groupSize: 2,
    categories: [],
    budget: 'mid',
  });

  const [itinerary, setItinerary] = useState(null);

  const toggleCategory = (value) => {
    const current = form.categories;
    if (current.includes(value)) {
      setForm({ ...form, categories: current.filter((c) => c !== value) });
    } else {
      setForm({ ...form, categories: [...current, value] });
    }
  };

  const handleGenerate = async () => {
    if (form.days < 1 || form.groupSize < 1) {
      alert("❌ Please enter valid Days and Group Size.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) return alert("You're not logged in. Please sign in.");

      const response = await axios.post(
        'http://localhost:5000/api/generate-itinerary',
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const generated = response.data;
      setItinerary(generated);

      if (onItineraryReady) {
        onItineraryReady(generated.itinerary);
      }
    } catch (error) {
      console.error('❌ Error:', error.response?.data || error.message);
      alert(error.response?.data?.msg || 'Failed to generate itinerary');
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-700">🌍 Plan Your Sri Lanka Journey</h2>

      {/* Days & Group */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium">Days:</label>
          <input
            type="number"
            min="1"
            className="w-full border p-2 rounded"
            value={form.days}
            onChange={(e) =>
              setForm({ ...form, days: parseInt(e.target.value) || 1 })
            }
          />
        </div>

        <div>
          <label className="block font-medium">Group Size:</label>
          <input
            type="number"
            min="1"
            className="w-full border p-2 rounded"
            value={form.groupSize}
            onChange={(e) =>
              setForm({ ...form, groupSize: parseInt(e.target.value) || 1 })
            }
          />
        </div>
      </div>

      {/* Budget */}
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

      {/* Selected Categories (Cart-style) */}
      {form.categories.length > 0 && (
        <div className="mb-4">
          <label className="block font-medium">🎒 Selected Categories:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.categories.map((cat) => (
              <span key={cat} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm shadow">
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Category Selector */}
      <div className="mb-6">
        <label className="block font-medium mb-2">🧭 Select Interests:</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {categoryOptions.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => toggleCategory(opt.value)}
              className={`border px-3 py-2 rounded text-left transition ${
                form.categories.includes(opt.value)
                  ? "bg-emerald-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 w-full text-lg"
      >
        🚀 Generate Itinerary
      </button>

      {/* Generated Itinerary */}
      {itinerary && itinerary.itinerary && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-3 text-emerald-800">📅 Your Smart Itinerary</h3>
          {itinerary.itinerary.map((day, index) => (
            <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
              <h4 className="font-semibold mb-1">Day {index + 1}</h4>
              <p><strong>City:</strong> {day.city}</p>
              <p><strong>Places:</strong> {day.places.join(', ')}</p>
              <p><strong>Hotel:</strong> {day.hotel}</p>
              <p><strong>Weather:</strong> {day.weather.condition} ({day.weather.temperature}°C)</p>
              <p><strong>Vehicle:</strong> {day.vehicle}</p>
              {day.lat && day.lng && (
                <p><strong>Coordinates:</strong> {day.lat}, {day.lng}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItineraryForm;
