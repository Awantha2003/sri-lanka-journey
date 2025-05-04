const express = require('express');
const router = express.Router();
const { getTravelInfo } = require('../controllers/travelController');

router.get('/travel-info', getTravelInfo);

module.exports = router;
