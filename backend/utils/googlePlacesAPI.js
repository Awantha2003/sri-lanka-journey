const axios = require('axios');

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const fetchNearbyPlaces = async (lat, lng, type) => {
  const radius = 3000; // 3km
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_PLACES_API_KEY}`;
  const response = await axios.get(url);
  return response.data.results;
};

module.exports = { fetchNearbyPlaces };
