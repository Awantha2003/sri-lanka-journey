// sri-lanka-journey\backend\routes\itineraryRoutes.js

const express = require("express");
const router = express.Router();
const { generateItinerary } = require("../controllers/itineraryController");
const { protect } = require("../middleware/authMiddleware");

// Protected POST route to generate itinerary
router.post("/", protect, generateItinerary);

module.exports = router;
