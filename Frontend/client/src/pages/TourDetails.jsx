import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tours/${id}`);
        setTour(res.data);
      } catch (err) {
        console.error('Error loading tour:', err);
      }
    };
    fetchTour();
  }, [id]);

  if (!tour) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-800 mb-4">{tour.name}</h2>
      <p className="text-gray-700 mb-2">
        {tour.durationDays} days • LKR {Number(tour.priceLKR).toLocaleString()}
      </p>
      <p className="text-gray-600 mb-6">{tour.description}</p>

      {/* Image Carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {tour.imageUrls?.map((img, idx) => (
          <img
            key={idx}
            src={`http://localhost:5000${img}`}
            alt={`Tour ${idx}`}
            className="rounded-lg h-40 object-cover w-full"
          />
        ))}
      </div>

      {/* Daily Stops */}
      {tour.stops?.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-2">📅 Itinerary</h3>
          <div className="space-y-3">
            {tour.stops.map((stop, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">Day {stop.day}: {stop.place}</p>
                <p className="text-sm text-gray-600">{stop.city} — {stop.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* CTA */}
      <div className="mt-6">
        <Link
          to="/plan-trip"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Book This Tour
        </Link>
      </div>
    </div>
  );
};

export default TourDetails;
