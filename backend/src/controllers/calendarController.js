const calendarService = require('../services/calendarService');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const httpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const calendarController = {};

calendarController.getCalendar = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.id;

    const calendarData = await calendarService.getTripCalendar(tripId, userId);

    res.status(200).json({
      success: true,
      data: calendarData,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
};

module.exports = calendarController;