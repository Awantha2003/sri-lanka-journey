const { fetchNearbyPlaces } = require('../utils/googlePlacesAPI');

exports.getNearbySuggestions = async (req, res) => {
  const { lat, lng, type } = req.query;

  if (!lat || !lng || !type) {
    return res.status(400).json({ message: 'Missing lat, lng, or type' });
  }

  try {
    const places = await fetchNearbyPlaces(lat, lng, type);
    res.json(places);
  } catch (error) {
    console.error('Nearby API error:', error.message);
    res.status(500).json({ message: 'Failed to fetch nearby suggestions' });
  }
};
