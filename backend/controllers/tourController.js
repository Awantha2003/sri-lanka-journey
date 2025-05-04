const TourPackage = require('../models/TourPackage');

// @desc Get all tour packages
const getAllTours = async (req, res) => {
  try {
    const filters = req.query;
    const tours = await TourPackage.find(filters);
    res.status(200).json(tours);
  } catch (err) {
    console.error("❌ Error fetching tours:", err);
    res.status(500).json({ message: err.message });
  }
};

// @desc Get single tour by ID
const getTourById = async (req, res) => {
  try {
    const tour = await TourPackage.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.status(200).json(tour);
  } catch (err) {
    console.error("❌ Error fetching tour:", err);
    res.status(500).json({ message: err.message });
  }
};

// @desc Create new tour (ensures imageUrls is saved)
const createTour = async (req, res) => {
  try {
    const newTour = new TourPackage({
      name: req.body.name,
      description: req.body.description,
      durationDays: req.body.durationDays,
      priceLKR: req.body.priceLKR,
      region: req.body.region,
      category: req.body.category,
      imageUrls: req.body.imageUrls || [],
      stops: req.body.stops || [],
    });

    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (err) {
    console.error("❌ Error creating tour:", err);
    res.status(400).json({ message: err.message });
  }
};

// @desc Update a tour (ensures imageUrls stays updated)
const updateTour = async (req, res) => {
  try {
    const updated = await TourPackage.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        durationDays: req.body.durationDays,
        priceLKR: req.body.priceLKR,
        region: req.body.region,
        category: req.body.category,
        imageUrls: req.body.imageUrls || [],
        stops: req.body.stops || [],
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Tour not found' });
    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Error updating tour:", err);
    res.status(400).json({ message: err.message });
  }
};

// @desc Delete a tour
const deleteTour = async (req, res) => {
  try {
    const deleted = await TourPackage.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Tour not found' });
    res.status(200).json({ message: 'Tour deleted' });
  } catch (err) {
    console.error("❌ Error deleting tour:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};