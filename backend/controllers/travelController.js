const axios = require('axios');

// Load Google Maps API key from .env
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

exports.getTravelInfo = async (req, res) => {
  const { origin, destination } = req.query;

  // Validate inputs
  if (!origin || !destination) {
    return res.status(400).json({ message: 'Missing origin or destination' });
  }

  // Check API key presence
  if (!GOOGLE_MAPS_API_KEY) {
    console.error('❌ Missing Google Maps API Key');
    return res.status(500).json({ message: 'Server misconfiguration: API key not set' });
  }

  try {
    // -----------------------------
    // 1️⃣ Google Distance Matrix API
    // -----------------------------
    const matrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API_KEY}`;
    const matrixRes = await axios.get(matrixUrl);

    const matrixData = matrixRes.data;

    if (
      matrixData.status !== 'OK' ||
      !matrixData.rows[0]?.elements[0]?.distance ||
      !matrixData.rows[0]?.elements[0]?.duration
    ) {
      console.error('❌ Invalid distance matrix response:', matrixData);
      return res.status(502).json({ message: 'Invalid response from Google Distance Matrix API' });
    }

    const distance = matrixData.rows[0].elements[0].distance.text;
    const duration = matrixData.rows[0].elements[0].duration.text;

    // --------------------------
    // 2️⃣ Google Directions API
    // --------------------------
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API_KEY}`;
    const directionsRes = await axios.get(directionsUrl);

    if (directionsRes.data.status !== 'OK') {
      console.error('❌ Invalid directions response:', directionsRes.data);
      return res.status(502).json({ message: 'Invalid response from Google Directions API' });
    }

    // ✅ Send response
    res.json({
      distance,
      duration,
      directions: directionsRes.data,
    });
  } catch (error) {
    console.error('🔥 Travel info error:', error.message);
    res.status(500).json({ message: 'Failed to fetch travel info' });
  }
};
