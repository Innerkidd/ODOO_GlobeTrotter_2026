const express = require('express');
const { authenticate } = require('../middleware/auth');
const calendarController = require('../controllers/calendarController');

const router = express.Router();

router.use(authenticate);

router.get('/:tripId', calendarController.getCalendar);

module.exports = router;