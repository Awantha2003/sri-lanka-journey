import React, { useState } from 'react';
import { Calendar, MapPin, Users, Search as SearchIcon } from 'lucide-react';

export function SearchSection() {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travelType, setTravelType] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({
      destination,
      dates,
      travelType,
    });
    // Add actual search logic here
  };

  return (
    <section id="search" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 -mt-24 relative z-30">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Find Your Perfect Sri Lankan Experience
          </h2>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Destination
              </label>
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Where to?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Dates
              </label>
              <div className="relative">
                <Calendar
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="When?"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Travel Type
              </label>
              <div className="relative">
                <Users
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={travelType}
                  onChange={(e) => setTravelType(e.target.value)}
                >
                  <option value="">Select type</option>
                  <option value="beach">Beach Vacation</option>
                  <option value="cultural">Cultural Tour</option>
                  <option value="wildlife">Wildlife Safari</option>
                  <option value="adventure">Adventure</option>
                  <option value="honeymoon">Honeymoon</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center"
            >
              <SearchIcon size={18} className="mr-2" />
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SearchSection;