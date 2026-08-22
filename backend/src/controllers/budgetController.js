const budgetService = require('../services/budgetService');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const httpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const budgetController = {};

budgetController.getBudget = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.id;

    const summary = await budgetService.getBudgetSummary(tripId, userId);

    res.status(200).json({
      success: true,
      data: summary,
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

module.exports = budgetController;