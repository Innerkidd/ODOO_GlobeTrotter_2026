const express = require('express');
const { authenticate } = require('../middleware/auth');
const tripController = require('../controllers/tripController');

const router = express.Router();

router.use(authenticate);

router.get('/', tripController.getTrips);
router.get('/:id', tripController.getTripById);
router.post('/', tripController.createTrip);
router.put('/:id', tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);

module.exports = router;
