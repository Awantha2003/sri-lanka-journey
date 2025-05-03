// backend/controllers/tripController.js
const Trip = require('../models/Trip');

const saveTrip = async (req, res) => {
  try {
    const { userId, itinerary, hotel, vehicle } = req.body;

    if (!itinerary || !hotel || !vehicle) {
      return res.status(400).json({ message: 'Missing trip data' });
    }

    const newTrip = new Trip({ userId, itinerary, hotel, vehicle });
    const saved = await newTrip.save();

    res.status(201).json({ message: 'Trip saved successfully', trip: saved });
  } catch (error) {
    res.status(500).json({ message: 'Error saving trip', error });
  }
};

module.exports = { saveTrip };
