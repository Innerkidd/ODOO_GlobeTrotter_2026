const tripStopService = require('../services/tripStopService');

const addStop = async (req, res, next) => {
  try {
    const stop = await tripStopService.addStop(req.user.id, req.params.tripId, {
      city: req.body.cityName || req.body.city,
      country: req.body.country,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      arrival: req.body.startDate || req.body.arrival,
      departure: req.body.endDate || req.body.departure,
      notes: req.body.notes,
    });

    res.status(201).json({
      success: true,
      message: 'Stop added successfully',
      data: stop,
    });
  } catch (error) {
    next(error);
  }
};

const getStops = async (req, res, next) => {
  try {
    const stops = await tripStopService.getStops(req.user.id, req.params.tripId);

    res.status(200).json({
      success: true,
      data: stops,
    });
  } catch (error) {
    next(error);
  }
};

const updateStop = async (req, res, next) => {
  try {
    const stop = await tripStopService.updateStop(req.user.id, req.params.stopId, {
      city: req.body.cityName || req.body.city,
      country: req.body.country,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      arrival: req.body.startDate || req.body.arrival,
      departure: req.body.endDate || req.body.departure,
      notes: req.body.notes,
    });

    res.status(200).json({
      success: true,
      message: 'Stop updated successfully',
      data: stop,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStop = async (req, res, next) => {
  try {
    const result = await tripStopService.deleteStop(req.user.id, req.params.stopId);

    res.status(200).json({
      success: true,
      message: 'Stop removed successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const reorderStops = async (req, res, next) => {
  try {
    const stops = await tripStopService.reorderStops(req.user.id, req.params.tripId, req.body.orderedStopIds);

    res.status(200).json({
      success: true,
      message: 'Stops reordered successfully',
      data: stops,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addStop,
  getStops,
  updateStop,
  deleteStop,
  reorderStops,
};