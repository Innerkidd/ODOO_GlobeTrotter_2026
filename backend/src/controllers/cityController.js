const cityService = require('../services/cityService');

const getPopularDestinations = async (req, res, next) => {
  try {
    const destinations = await cityService.getPopularDestinations();
    res.status(200).json({
      success: true,
      data: destinations,
    });
  } catch (error) {
    next(error);
  }
};

const searchDestinations = async (req, res, next) => {
  try {
    const { q } = req.query;
    const destinations = await cityService.searchDestinations(q);
    res.status(200).json({
      success: true,
      data: destinations,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPopularDestinations,
  searchDestinations,
};
