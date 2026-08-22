const config = require('../config');
const sharingService = require('../services/sharingService');

const enableShare = async (req, res, next) => {
  try {
    const result = await sharingService.enableShare(req.user.id, req.params.tripId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const disableShare = async (req, res, next) => {
  try {
    const result = await sharingService.disableShare(req.user.id, req.params.tripId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getPublicTrip = async (req, res, next) => {
  try {
    const result = await sharingService.getPublicTrip(req.params.token);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const copyTrip = async (req, res, next) => {
  try {
    const result = await sharingService.copyTrip(req.user.id, req.params.token);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { enableShare, disableShare, getPublicTrip, copyTrip };
