const itineraryViewService = require('../services/itineraryViewService');

const getItineraryView = async (req, res, next) => {
  try {
    const data = await itineraryViewService.getItineraryView(req.user.id, req.params.tripId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getItineraryView };