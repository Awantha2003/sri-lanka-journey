// backend/routes/matchRoutes.js

const express = require('express');
const { getMatches } = require('../controllers/matchController');

const router = express.Router();

router.get('/match-options', getMatches);

module.exports = router;
