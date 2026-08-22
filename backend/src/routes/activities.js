const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

router.get('/:id', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

router.post('/', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

router.put('/:id', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

router.delete('/:id', (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

module.exports = router;
