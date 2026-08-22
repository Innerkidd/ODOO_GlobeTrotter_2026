const express = require('express');

const router = express.Router();

router.get('/:tripId', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

router.post('/:tripId', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

router.put('/:id', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

router.delete('/:id', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

router.put('/:tripId/reorder', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

module.exports = router;
