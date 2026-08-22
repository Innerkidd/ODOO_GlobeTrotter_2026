const express = require('express');
const { authenticate } = require('../middleware/auth');
const activityController = require('../controllers/activityController');

const router = express.Router();

router.use(authenticate);

router.get('/', activityController.getActivities);
router.get('/:id', activityController.getActivityById);
router.post('/', activityController.addActivity);
router.put('/:id', activityController.updateActivity);
router.delete('/:id', activityController.deleteActivity);

module.exports = router;