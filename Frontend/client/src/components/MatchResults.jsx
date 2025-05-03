import React from 'react';

const MatchResults = ({ hotels, vehicles }) => {
  return (
    <div className="space-y-6 mt-4">
      <div>
        <h3 className="text-lg font-semibold">🏨 Matched Hotels:</h3>
        {hotels.length === 0 ? (
          <p>No hotels found for this city and budget.</p>
        ) : (
          <ul className="list-disc ml-5">
            {hotels.map((hotel) => (
              <li key={hotel.id}>
                {hotel.name} – ⭐ {hotel.rating} stars ({hotel.price} budget)
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold">🚗 Suitable Vehicles:</h3>
        {vehicles.length === 0 ? (
          <p>No vehicles match the group size.</p>
        ) : (
          <ul className="list-disc ml-5">
            {vehicles.map((v) => (
              <li key={v.id}>
                {v.type} – Capacity: {v.capacity} (Region: {v.region})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MatchResults;
