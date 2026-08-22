const tripService = require('../services/tripService');

const createTrip = async (req, res, next) => {
  try {
    const trip = await tripService.createTrip(req.user.id, {
      title: req.body.tripName || req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      coverImage: req.body.coverPhoto || req.body.coverImage,
      isPublic: req.body.isPublic,
    });

    res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

const getTrips = async (req, res, next) => {
  try {
    const trips = await tripService.getTrips(req.user.id);

    const mapped = trips.map((trip) => ({
      id: trip.id,
      title: trip.title,
      description: trip.description,
      startDate: trip.startDate,
      endDate: trip.endDate,
      coverImage: trip.coverImage,
      destinationCount: trip._count.stops,
      createdAt: trip.createdAt,
    }));

    res.status(200).json({
      success: true,
      data: mapped,
    });
  } catch (error) {
    next(error);
  }
};

const getTripById = async (req, res, next) => {
  try {
    const trip = await tripService.getTripById(req.user.id, req.params.id);

    res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

const updateTrip = async (req, res, next) => {
  try {
    const trip = await tripService.updateTrip(req.user.id, req.params.id, {
      title: req.body.tripName || req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      coverImage: req.body.coverPhoto || req.body.coverImage,
      isPublic: req.body.isPublic,
    });

    res.status(200).json({
      success: true,
      message: 'Trip updated successfully',
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTrip = async (req, res, next) => {
  try {
    const result = await tripService.deleteTrip(req.user.id, req.params.id);

    res.status(200).json({
      success: true,
      message: 'Trip deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
};
