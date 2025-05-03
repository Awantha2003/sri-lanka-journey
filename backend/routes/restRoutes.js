const express = require("express");
const router = express.Router();
const { suggestRestSpots } = require("../controllers/restController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, suggestRestSpots);

module.exports = router;
