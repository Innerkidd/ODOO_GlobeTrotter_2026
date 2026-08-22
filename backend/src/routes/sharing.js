const express = require('express');
const { authenticate } = require('../middleware/auth');
const sharingController = require('../controllers/sharingController');

const router = express.Router();

// Authenticated: owner sharing management
router.post('/:tripId', authenticate, sharingController.enableShare);
router.delete('/:tripId', authenticate, sharingController.disableShare);

// Public: read-only itinerary (no auth required)
router.get('/public/:token', sharingController.getPublicTrip);

// Authenticated: copy a public trip into own account
router.post('/public/:token/copy', authenticate, sharingController.copyTrip);

module.exports = router;
