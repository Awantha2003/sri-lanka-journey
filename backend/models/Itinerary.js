const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  days: { type: Number, default: 10 },
  itinerary: [
    {
      day: Number,
      city: String,
      hotel: String,
      vehicle: String,
      places: [String],
      weather: {
        condition: String,
        temperature: Number,
      },
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Itinerary", itinerarySchema);
