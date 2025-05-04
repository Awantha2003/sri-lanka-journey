const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  day: Number,
  city: String,
  place: String,
  description: String
}, { _id: false });

const tourPackageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  durationDays: { type: Number, required: true },
  priceLKR: { type: Number, required: true },
  region: String,       // e.g., South, Central, East
  category: String,     // e.g., Nature, Culture, Adventure
  stops: [stopSchema],
  imageUrls: [String],
  isPopular: { type: Boolean, default: false }
}, {
  timestamps: true
});

const TourPackage = mongoose.model('TourPackage', tourPackageSchema);
module.exports = TourPackage;
