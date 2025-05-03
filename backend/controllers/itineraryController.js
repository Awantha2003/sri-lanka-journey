const places = require("../data/places");
const hotels = require("../data/hotels");
const vehicles = require("../data/vehicles");
const { getWeatherForCity } = require("../utils/weatherUtils");
const Itinerary = require("../models/Itinerary");

exports.generateItinerary = async (req, res) => {
  const {
    days = 10,
    groupSize = 2,
    style = "nature",
    budget = "mid"
  } = req.body;

  try {
    // Filter places by travel style
    const matchingPlaces = places.filter(p => p.type === style);

    // Get unique cities and limit to number of days
    const selectedCities = [...new Set(matchingPlaces.map(p => p.city))].slice(0, days);

    const itinerary = [];

    for (let i = 0; i < selectedCities.length; i++) {
      const city = selectedCities[i];

      const cityPlaces = matchingPlaces.filter(p => p.city === city).slice(0, 2);
      const cityHotel = hotels.find(h => h.city === city && h.budget === budget);
      const vehicle = vehicles.find(v => groupSize <= v.maxPassengers);
      const weather = await getWeatherForCity(city);

      itinerary.push({
        day: i + 1,
        city,
        hotel: cityHotel?.name || "Hotel TBD",
        vehicle: vehicle?.type || "Car",
        places: cityPlaces.map(p => p.name),
        weather,
      });
    }

    // Save to MongoDB
    const newItinerary = await Itinerary.create({
      user: req.user.id,
      days: itinerary.length,
      itinerary,
    });

    res.status(201).json(newItinerary);
  } catch (err) {
    console.error("Itinerary generation failed:", err.message);
    res.status(500).json({ msg: "Failed to generate itinerary" });
  }
};
