const express = require('express');
const { authenticate } = require('../middleware/auth');
const tripController = require('../controllers/tripController');
const tripStopController = require('../controllers/tripStopController');

const router = express.Router();

router.use(authenticate);

router.get('/', tripController.getTrips);
router.get('/:id', tripController.getTripById);
router.post('/', tripController.createTrip);
router.put('/:id', tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);

router.post('/:tripId/stops', tripStopController.addStop);
router.get('/:tripId/stops', tripStopController.getStops);
router.put('/:tripId/stops/reorder', tripStopController.reorderStops);
router.put('/stops/:stopId', tripStopController.updateStop);
router.delete('/stops/:stopId', tripStopController.deleteStop);

module.exports = router;
