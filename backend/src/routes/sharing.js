const express = require('express');

const router = express.Router();

router.post('/:tripId', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

router.delete('/:tripId', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

router.get('/:tripId/users', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

router.put('/:tripId/users/:userId', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

router.delete('/:tripId/users/:userId', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

router.get('/public/:token', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

module.exports = router;
