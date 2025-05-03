const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Link to user
  itinerary: [
    {
      day: Number,
      location: String,
      lat: Number,
      lng: Number,
    }
  ],
  selectedHotel: {
    name: String,
    city: String,
    price: String,
    rating: Number,
  },
  selectedVehicle: {
    type: String,
    capacity: Number,
    region: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Trip', tripSchema);
