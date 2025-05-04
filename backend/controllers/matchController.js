// backend/controllers/matchController.js

const hotels = require('../data/hotels');
const vehicles = require('../data/vehicles');

const getMatches = (req, res) => {
  let { city, budget, groupSize } = req.query;

  // Validate query parameters
  if (!city || !budget || !groupSize) {
    return res.status(400).json({ message: "Missing query parameters: city, budget, or groupSize" });
  }

  // Normalize values
  city = city.toLowerCase();
  budget = budget.toLowerCase();
  groupSize = parseInt(groupSize);

  // Match hotels by city and budget
  const matchedHotels = hotels.filter(
    (hotel) =>
      hotel.city?.toLowerCase() === city &&
      hotel.price?.toLowerCase() === budget
  );

  // Match vehicles by group size
  const matchedVehicles = vehicles.filter(
    (vehicle) => vehicle.capacity >= groupSize
  );

  res.json({
    hotels: matchedHotels,
    vehicles: matchedVehicles,
  });
};

module.exports = {
  getMatches,
};
