// backend/routes/tripRoutes.js
const express = require('express');
const { saveTrip } = require('../controllers/tripController');

const router = express.Router();

router.post('/save-trip', saveTrip);

module.exports = router;
