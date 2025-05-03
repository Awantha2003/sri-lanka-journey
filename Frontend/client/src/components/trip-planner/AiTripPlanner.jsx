import React, { useState } from 'react';
import { Calendar, Users, Wallet, Send } from 'lucide-react';
import axios from 'axios';
import { useBooking } from '../../contexts/BookingContext';

export function AiTripPlanner() {
  const { dispatch } = useBooking();

  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    startDate: '',
    duration: 7,
    budget: 1000,
    travelers: 2,
    interests: [],
    token: '',
  });
  const [itinerary, setItinerary] = useState(null);

  const interestOptions = [
    'Beach',
    'Culture',
    'Wildlife',
    'Adventure',
    'Food',
    'History',
    'Nature',
    'Shopping',
  ];

  const handleInterestToggle = (interest) => {
    setPreferences((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      days: preferences.duration,
      groupSize: preferences.travelers,
      style: preferences.interests[0]?.toLowerCase() || 'nature',
      budget: preferences.budget <= 500 ? 'low' : preferences.budget <= 1500 ? 'mid' : 'high',
    };

    try {
      const res = await axios.post('http://localhost:5000/api/generate-itinerary', payload, {
        headers: {
          Authorization: `Bearer ${preferences.token}`,
          'Content-Type': 'application/json',
        },
      });
      setItinerary(res.data);
    } catch (err) {
      alert("Failed to generate trip plan");
      console.error(err);
    }

    const trip = {
      id: Math.random().toString(36).substr(2, 9),
      destination: 'Sri Lanka',
      dates: {
        start: preferences.startDate,
        end: new Date(
          new Date(preferences.startDate).getTime() +
            preferences.duration * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
      activities: preferences.interests,
      budget: preferences.budget,
      status: 'planning',
    };

    dispatch({
      type: 'START_TRIP',
      payload: trip,
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Plan Your Perfect Trip</h2>
        <p className="text-gray-600">Let our AI help you create your dream vacation</p>
      </div>

      <input
        type="text"
        placeholder="Paste JWT Token here"
        className="mb-4 w-full p-3 border rounded-lg"
        value={preferences.token}
        onChange={(e) => setPreferences((prev) => ({ ...prev, token: e.target.value }))}
      />

      <div className="space-y-8">
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    value={preferences.startDate}
                    onChange={(e) => setPreferences((prev) => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Days</label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={preferences.duration}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, duration: parseInt(e.target.value) }))}
                  min="1"
                  max="30"
                />
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
            >
              Next: Preferences
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => handleInterestToggle(interest)}
                    className={`p-3 rounded-lg border ${
                      preferences.interests.includes(interest)
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                        : 'border-gray-300 hover:border-emerald-500'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget (USD)</label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    value={preferences.budget}
                    onChange={(e) => setPreferences((prev) => ({ ...prev, budget: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Travelers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    value={preferences.travelers}
                    onChange={(e) => setPreferences((prev) => ({ ...prev, travelers: parseInt(e.target.value) }))}
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition flex items-center justify-center"
              >
                <Send size={20} className="mr-2" />
                Generate Trip Plan
              </button>
            </div>

            {itinerary && (
              <pre className="bg-gray-50 p-4 mt-6 rounded-md border text-sm overflow-auto">
                {JSON.stringify(itinerary, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AiTripPlanner;
