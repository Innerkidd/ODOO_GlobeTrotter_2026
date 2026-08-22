const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const httpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const TRIP_SELECT = {
  id: true,
  title: true,
  startDate: true,
  endDate: true,
};

const ACTIVITY_SELECT = {
  id: true,
  cost: true,
};

const calculateTripDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 1;
  }

  const msPerDay = 24 * 60 * 60 * 1000;
  const diff = end.getTime() - start.getTime();
  const days = Math.floor(diff / msPerDay) + 1;

  return days >= 1 ? days : 1;
};

const getActivitiesCostForTrip = async (tripId) => {
  const stops = await prisma.tripStop.findMany({
    where: { tripId },
    include: {
      activities: {
        select: {
          cost: true,
        },
      },
    },
  });

  let total = 0;
  for (const stop of stops) {
    for (const activity of stop.activities) {
      total += Number(activity.cost) || 0;
    }
  }

  return total;
};

const getExpensesByCategory = async (tripId, category) => {
  const expenses = await prisma.expense.findMany({
    where: {
      tripId,
      category: category.toLowerCase(),
    },
    select: {
      amount: true,
    },
  });

  return expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
};

const budgetService = {};

budgetService.getBudgetSummary = async (tripId, userId) => {
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    select: TRIP_SELECT,
  });

  if (!trip) {
    throw httpError(404, 'Trip not found.');
  }

  const activitiesCost = await getActivitiesCostForTrip(tripId);

  const transportCost = await getExpensesByCategory(tripId, 'transport');
  const stayCost = await getExpensesByCategory(tripId, 'stay');
  const mealsCost = await getExpensesByCategory(tripId, 'meals');

  const totalEstimatedCost =
    transportCost + stayCost + activitiesCost + mealsCost;

  const tripDays = calculateTripDuration(trip.startDate, trip.endDate);
  const averageCostPerDay = totalEstimatedCost / tripDays;

  const categories = {
    transport: transportCost,
    stay: stayCost,
    activities: activitiesCost,
    meals: mealsCost,
  };

  const categoryPercentages = {};
  const categoryNames = ['transport', 'stay', 'activities', 'meals'];

  for (const key of categoryNames) {
    const cost = categories[key];
    if (totalEstimatedCost > 0) {
      categoryPercentages[key] = Math.round((cost / totalEstimatedCost) * 100 * 100) / 100;
    } else {
      categoryPercentages[key] = 0;
    }
  }

  const dailyCosts = [];
  const tripStart = new Date(trip.startDate);

  for (let i = 0; i < tripDays; i++) {
    const date = new Date(tripStart.getTime() + i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    dailyCosts.push({
      date: dateStr,
      day: i + 1,
      cost: Math.round((totalEstimatedCost / tripDays) * 100) / 100,
      status: 'within_budget',
    });
  }

  let budgetStatus = 'within_budget';

  return {
    tripId: trip.id,
    tripName: trip.title,
    currency: 'INR',

    plannedBudget: null,
    totalEstimatedCost,
    averageCostPerDay: Math.round(averageCostPerDay * 100) / 100,

    categories,
    categoryPercentages,

    dailyCosts,
    budgetStatus,
  };
};

module.exports = budgetService;