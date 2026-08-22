const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const httpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const getItineraryView = async (userId, tripId) => {
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    select: {
      id: true,
      title: true,
      startDate: true,
      endDate: true,
    },
  });

  if (!trip) {
    throw httpError(404, 'Trip not found.');
  }

  const stops = await prisma.tripStop.findMany({
    where: { tripId },
    include: {
      activities: {
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { order: 'asc' },
  });

  const tripStart = new Date(trip.startDate);
  const tripEnd = new Date(trip.endDate);
  const msPerDay = 24 * 60 * 60 * 1000;
  const dayCount = Math.floor((tripEnd - tripStart) / msPerDay) + 1;

  const days = [];
  let totalActivities = 0;

  for (const stop of stops) {
    totalActivities += stop.activities.length;
  }

  for (let i = 0; i < dayCount; i++) {
    const date = new Date(tripStart.getTime() + i * msPerDay);
    const dateStr = date.toISOString().split('T')[0];

    const matchingStop = stops.find((s) => {
      const arr = new Date(s.arrival);
      const dep = new Date(s.departure);
      return date >= arr && date <= dep;
    });

    if (matchingStop) {
      const isFirstDay = date.toISOString().split('T')[0] === new Date(matchingStop.arrival).toISOString().split('T')[0];

      days.push({
        day: i + 1,
        date: dateStr,
        city: matchingStop.city,
        country: matchingStop.country,
        activities: isFirstDay
          ? matchingStop.activities.map((a) => ({
              id: a.id,
              name: a.name,
              type: a.category,
              duration: a.duration,
              estimatedCost: a.cost,
              startTime: a.startTime,
              description: a.description,
            }))
          : [],
      });
    } else {
      days.push({
        day: i + 1,
        date: dateStr,
        city: null,
        country: null,
        activities: [],
      });
    }
  }

  return {
    tripId: trip.id,
    tripName: trip.title,
    startDate: trip.startDate,
    endDate: trip.endDate,
    totalStops: stops.length,
    totalActivities,
    days,
  };
};

module.exports = { getItineraryView };