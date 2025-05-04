const express = require('express');
const { getNearbySuggestions } = require('../controllers/nearbyController');

const router = express.Router();

router.get('/nearby-suggestions', getNearbySuggestions);

module.exports = router;
