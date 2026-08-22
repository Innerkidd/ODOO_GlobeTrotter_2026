const express = require('express');
const cityController = require('../controllers/cityController');

const router = express.Router();

router.get('/popular', cityController.getPopularDestinations);
router.get('/search', cityController.searchDestinations);

module.exports = router;
