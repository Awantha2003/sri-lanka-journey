// backend/controllers/matchController.js

const hotels = require('../data/hotels');
const vehicles = require('../data/vehicles');

const getMatches = (req, res) => {
  const { city, budget, groupSize } = req.query;

  if (!city || !budget || !groupSize) {
    return res.status(400).json({ message: "Missing query parameters" });
  }

  const matchedHotels = hotels.filter(
    (hotel) =>
      hotel.city.toLowerCase() === city.toLowerCase() &&
      hotel.price.toLowerCase() === budget.toLowerCase()
  );

  const matchedVehicles = vehicles.filter(
    (vehicle) => vehicle.capacity >= parseInt(groupSize)
  );

  res.json({
    hotels: matchedHotels,
    vehicles: matchedVehicles,
  });
};

module.exports = {
  getMatches,
};
