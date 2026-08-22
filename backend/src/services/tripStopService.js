const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const STOP_SELECT = {
  id: true,
  city: true,
  country: true,
  latitude: true,
  longitude: true,
  arrival: true,
  departure: true,
  notes: true,
  order: true,
  createdAt: true,
  updatedAt: true,
};

const httpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const verifyTripOwnership = async (userId, tripId) => {
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    select: { id: true },
  });
  if (!trip) {
    throw httpError(404, 'Trip not found.');
  }
  return trip;
};

const verifyStopOwnership = async (userId, stopId) => {
  const stop = await prisma.tripStop.findFirst({
    where: { id: stopId, trip: { userId } },
    select: { id: true, tripId: true },
  });
  if (!stop) {
    throw httpError(404, 'Stop not found.');
  }
  return stop;
};

const addStop = async (userId, tripId, stopData) => {
  await verifyTripOwnership(userId, tripId);

  const { city, country, latitude, longitude, arrival, departure, notes } = stopData;

  if (!city || typeof city !== 'string' || city.trim().length === 0) {
    throw httpError(400, 'City name is required.');
  }
  if (!country || typeof country !== 'string' || country.trim().length === 0) {
    throw httpError(400, 'Country is required.');
  }
  if (!arrival) {
    throw httpError(400, 'Arrival date is required.');
  }
  if (!departure) {
    throw httpError(400, 'Departure date is required.');
  }

  const arrivalDate = new Date(arrival);
  const departureDate = new Date(departure);

  if (isNaN(arrivalDate.getTime()) || isNaN(departureDate.getTime())) {
    throw httpError(400, 'Invalid date format.');
  }
  if (departureDate < arrivalDate) {
    throw httpError(400, 'Departure must be on or after arrival.');
  }

  const count = await prisma.tripStop.count({ where: { tripId } });

  return prisma.tripStop.create({
    data: {
      city: city.trim(),
      country: country.trim(),
      latitude: latitude || null,
      longitude: longitude || null,
      arrival: arrivalDate,
      departure: departureDate,
      notes: notes || null,
      order: count,
      tripId,
    },
    select: STOP_SELECT,
  });
};

const getStops = async (userId, tripId) => {
  await verifyTripOwnership(userId, tripId);

  const stops = await prisma.tripStop.findMany({
    where: { tripId },
    select: {
      ...STOP_SELECT,
      _count: { select: { activities: true } },
    },
    orderBy: { order: 'asc' },
  });

  return stops.map((stop) => ({
    ...stop,
    activityCount: stop._count.activities,
    _count: undefined,
  }));
};

const updateStop = async (userId, stopId, updateData) => {
  const existing = await verifyStopOwnership(userId, stopId);

  const { city, country, latitude, longitude, arrival, departure, notes } = updateData;

  if (city !== undefined && (typeof city !== 'string' || city.trim().length === 0)) {
    throw httpError(400, 'City name cannot be empty.');
  }
  if (country !== undefined && (typeof country !== 'string' || country.trim().length === 0)) {
    throw httpError(400, 'Country cannot be empty.');
  }

  const data = {};
  if (city !== undefined) data.city = city.trim();
  if (country !== undefined) data.country = country.trim();
  if (latitude !== undefined) data.latitude = latitude;
  if (longitude !== undefined) data.longitude = longitude;
  if (notes !== undefined) data.notes = notes || null;

  if (arrival !== undefined || departure !== undefined) {
    const currentStop = await prisma.tripStop.findUnique({
      where: { id: stopId },
      select: { arrival: true, departure: true },
    });

    const arr = arrival ? new Date(arrival) : currentStop.arrival;
    const dep = departure ? new Date(departure) : currentStop.departure;

    if (arrival && isNaN(arr.getTime())) {
      throw httpError(400, 'Invalid arrival date format.');
    }
    if (departure && isNaN(dep.getTime())) {
      throw httpError(400, 'Invalid departure date format.');
    }
    if (dep < arr) {
      throw httpError(400, 'Departure must be on or after arrival.');
    }

    if (arrival !== undefined) data.arrival = arr;
    if (departure !== undefined) data.departure = dep;
  }

  return prisma.tripStop.update({
    where: { id: stopId },
    data,
    select: STOP_SELECT,
  });
};

const deleteStop = async (userId, stopId) => {
  const existing = await verifyStopOwnership(userId, stopId);

  await prisma.tripStop.delete({ where: { id: stopId } });

  const remaining = await prisma.tripStop.findMany({
    where: { tripId: existing.tripId },
    select: { id: true },
    orderBy: { order: 'asc' },
  });

  await Promise.all(
    remaining.map((stop, index) =>
      prisma.tripStop.update({
        where: { id: stop.id },
        data: { order: index },
      })
    )
  );

  return { id: stopId, deleted: true };
};

const reorderStops = async (userId, tripId, orderedStopIds) => {
  await verifyTripOwnership(userId, tripId);

  if (!Array.isArray(orderedStopIds) || orderedStopIds.length === 0) {
    throw httpError(400, 'orderedStopIds must be a non-empty array.');
  }

  const existingStops = await prisma.tripStop.findMany({
    where: { tripId },
    select: { id: true },
  });

  const existingIds = new Set(existingStops.map((s) => s.id));
  const invalid = orderedStopIds.filter((id) => !existingIds.has(id));
  if (invalid.length > 0) {
    throw httpError(400, `Invalid stop ids: ${invalid.join(', ')}`);
  }

  await prisma.$transaction(
    orderedStopIds.map((id, index) =>
      prisma.tripStop.update({
        where: { id },
        data: { order: index },
      })
    )
  );

  return prisma.tripStop.findMany({
    where: { tripId },
    select: STOP_SELECT,
    orderBy: { order: 'asc' },
  });
};

module.exports = {
  addStop,
  getStops,
  updateStop,
  deleteStop,
  reorderStops,
};
