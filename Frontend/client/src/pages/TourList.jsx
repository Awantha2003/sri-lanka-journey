import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TourList = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tours');
        setTours(res.data);
      } catch (err) {
        console.error('Error fetching tours:', err);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">🌍 Available Tour Packages</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
          >
            {tour.imageUrls?.[0] ? (
              <img
                src={`http://localhost:5000${tour.imageUrls[0]}`}
                alt={tour.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                No image available
              </div>
            )}

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{tour.name}</h3>
              <p className="text-gray-600 text-sm">
                {tour.durationDays} days • LKR {Number(tour.priceLKR).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {tour.region} • {tour.category}
              </p>
              <Link
                to={`/tours/${tour._id}`}
                className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourList;
