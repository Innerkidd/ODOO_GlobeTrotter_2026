const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const httpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const calendarService = {};

calendarService.getTripCalendar = async (tripId, userId) => {
  // Verify trip exists and belongs to user
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

  // Get all stops for the trip, ordered by their sequence
  const stops = await prisma.tripStop.findMany({
    where: { tripId },
    select: {
      id: true,
      city: true,
      country: true,
      arrival: true,
      departure: true,
      order: true,
      _count: {
        select: { activities: true },
      },
    },
    orderBy: { order: 'asc' },
  });

  // Get all activities for the trip's stops
  // We need activities from all stops, with their startTime and other fields
  const allActivities = [];
  for (const stop of stops) {
    const activities = await prisma.activity.findMany({
      where: { tripStopId: stop.id },
      select: {
        id: true,
        name: true,
        category: true,
        cost: true,
        duration: true,
        startTime: true,
        endTime: true,
      },
    });
    allActivities.push(...activities.map((a) => ({ ...a, tripStopId: stop.id })));
  }

  // Build the calendar data grouped by date
  // We'll use the stop's arrival date as the date for that stop's activities
  // Activities within a stop that don't have a specific date get the stop's arrival date

  const dayMap = new Map(); // date string -> { city, country, activities }

  for (const stop of stops) {
    // Determine the primary date for this stop
    // Use arrival date if available, otherwise departure, otherwise trip start
    const stopDate = stop.arrival ? new Date(stop.arrival) : new Date(trip.startDate);
    const dateStr = stopDate.toISOString().split('T')[0];

    if (!dayMap.has(dateStr)) {
      dayMap.set(dateStr, {
        city: stop.city,
        country: stop.country,
        activities: [],
      });
    }

    const dayData = dayMap.get(dateStr);

    // Add activities for this stop
    for (const activity of allActivities) {
      if (activity.tripStopId === stop.id) {
        // Determine activity time display
        let startTimeDisplay = null;
        if (activity.startTime) {
          startTimeDisplay = activity.startTime.toISOString().split('T')[0];
        } else {
          startTimeDisplay = '00:00';
        }

        dayData.activities.push({
          id: activity.id,
          name: activity.name,
          type: activity.category,
          startTime: startTimeDisplay,
          duration: activity.duration || 0,
          estimatedCost: activity.cost || 0,
        });
      }
    }
  }

  // Sort activities within each day by start time
  for (const [, dayData] of dayMap) {
    dayData.activities.sort((a, b) => {
      const timeA = a.startTime === '00:00' ? Infinity : parseInt(a.startTime.split(':')[0] * 60 + parseInt(a.startTime.split(':')[1]));
      const timeB = b.startTime === '00:00' ? Infinity : parseInt(b.startTime.split(':')[0] * 60 + parseInt(b.startTime.split(':')[1]));
      return timeA - timeB;
    });
  }

  // Convert map to sorted array by date
  const sortedDates = Array.from(dayMap.entries()).sort(([dateA], [dateB]) => {
    return new Date(dateA).getTime() - new Date(dateB).getTime();
  });

  const days = sortedDates.map(([date, data]) => ({
    date,
    city: {
      name: data.city,
      country: data.country,
    },
    activities: data.activities,
  }));

  return {
    trip: {
      id: trip.id,
      name: trip.title,
      startDate: trip.startDate,
      endDate: trip.endDate,
    },
    days,
  };
};

module.exports = calendarService;