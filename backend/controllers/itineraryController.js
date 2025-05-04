const axios = require("axios");
const places = require("../data/places");
const hotels = require("../data/hotels");
const vehicles = require("../data/vehicles");
const { getWeatherForCity } = require("../utils/weatherUtils");
const Itinerary = require("../models/Itinerary");

// Utility: Choose vehicle type and count based on group size
function getVehicleForGroup(category, groupSize) {
  const vehicleEntry = vehicles.find(v => v.category === category);
  let type = 'Car';
  if (!vehicleEntry) return { type, count: 1 };

  if (groupSize <= 3) type = vehicleEntry.recommended.soloOrCouple;
  else if (groupSize <= 7) type = vehicleEntry.recommended.smallGroup;
  else type = vehicleEntry.recommended.largeGroup;

  const capacity = groupSize <= 3 ? 3 : groupSize <= 7 ? 7 : 15;
  const count = Math.ceil(groupSize / capacity);

  return { type, count };
}

// Utility: Get hotel name and room count
function getHotelForGroup(category, budget, groupSize) {
  const hotelEntry = hotels.find(h => h.category === category);
  if (!hotelEntry) return { name: 'Standard Hotel', rooms: 1 };

  const name = hotelEntry[budget] || hotelEntry.mid;
  const rooms = Math.ceil(groupSize / 2);

  return { name, rooms };
}

// Utility: Geocode a city to get lat/lng
async function geocodeCity(city) {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: city + ', Sri Lanka',
          key: apiKey,
        },
      }
    );

    const location = response.data.results?.[0]?.geometry?.location;
    return location || { lat: null, lng: null };
  } catch (error) {
    console.error(`❌ Geocoding failed for ${city}:`, error.message);
    return { lat: null, lng: null };
  }
}

exports.generateItinerary = async (req, res) => {
  const {
    days = 10,
    groupSize = 2,
    categories = ["Cultural Triangle (Ancient Cities)"],
    budget = "mid"
  } = req.body;

  if (!days || days < 1 || !groupSize || groupSize < 1 || !Array.isArray(categories)) {
    return res.status(400).json({ msg: "Invalid trip settings. Please provide valid days, group size, and categories." });
  }

  try {
    const matchedPlaces = places.filter(p => categories.includes(p.category));

    const flatPlaces = matchedPlaces.flatMap(cat =>
      cat.places.map(place => ({
        place,
        category: cat.category,
        city: cat.provinces?.[0] || "Unknown"
      }))
    );

    if (flatPlaces.length === 0) {
      return res.status(404).json({ msg: "No matching places found for selected categories." });
    }

    const selected = flatPlaces.slice(0, days);

    const itinerary = [];

    for (let i = 0; i < selected.length; i++) {
      const entry = selected[i];

      // 🌦️ Get weather with fallback
      let weather;
      try {
        weather = await getWeatherForCity(entry.city);
      } catch (err) {
        weather = { description: "Weather unavailable" };
        console.warn(`⚠️ Weather fetch failed for ${entry.city}: ${err.message}`);
      }

      const hotelInfo = getHotelForGroup(entry.category, budget, groupSize);
      const vehicleInfo = getVehicleForGroup(entry.category, groupSize);

      const geo = await geocodeCity(entry.city);

      itinerary.push({
        day: i + 1,
        city: entry.city,
        places: [entry.place],
        hotel: `${hotelInfo.name} (x${hotelInfo.rooms} rooms)`,
        vehicle: `${vehicleInfo.type} × ${vehicleInfo.count}`,
        weather,
        lat: geo.lat,
        lng: geo.lng
      });
    }

    const newItinerary = await Itinerary.create({
      user: req.user?.id || "guest",
      days: itinerary.length,
      itinerary,
    });

    res.status(201).json(newItinerary);
  } catch (err) {
    console.error("❌ Itinerary generation failed:", err.message);
    res.status(500).json({ msg: "Failed to generate itinerary" });
  }
};
