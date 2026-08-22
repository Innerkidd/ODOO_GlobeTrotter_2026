const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const TRIP_SELECT = {
  id: true,
  title: true,
  description: true,
  startDate: true,
  endDate: true,
  coverImage: true,
  isPublic: true,
  createdAt: true,
  updatedAt: true,
};

const httpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const createTrip = async (userId, tripData) => {
  const { title, description, startDate, endDate, coverImage, isPublic } = tripData;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    throw httpError(400, 'Trip title is required.');
  }
  if (!startDate) {
    throw httpError(400, 'Start date is required.');
  }
  if (!endDate) {
    throw httpError(400, 'End date is required.');
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw httpError(400, 'Invalid date format.');
  }
  if (end < start) {
    throw httpError(400, 'End date must be on or after start date.');
  }

  return prisma.trip.create({
    data: {
      title: title.trim(),
      description: description || null,
      startDate: start,
      endDate: end,
      coverImage: coverImage || null,
      isPublic: isPublic || false,
      userId,
    },
    select: TRIP_SELECT,
  });
};

const getTrips = async (userId) => {
  return prisma.trip.findMany({
    where: { userId },
    select: {
      ...TRIP_SELECT,
      _count: {
        select: { stops: true },
      },
    },
    orderBy: { startDate: 'desc' },
  });
};

const getTripById = async (userId, tripId) => {
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    select: TRIP_SELECT,
  });

  if (!trip) {
    throw httpError(404, 'Trip not found.');
  }

  return trip;
};

const updateTrip = async (userId, tripId, tripData) => {
  const existing = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    select: { id: true },
  });

  if (!existing) {
    throw httpError(404, 'Trip not found.');
  }

  const { title, description, startDate, endDate, coverImage, isPublic } = tripData;

  if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
    throw httpError(400, 'Trip title cannot be empty.');
  }

  const data = {};
  if (title !== undefined) data.title = title.trim();
  if (description !== undefined) data.description = description || null;
  if (coverImage !== undefined) data.coverImage = coverImage || null;
  if (isPublic !== undefined) data.isPublic = isPublic;

  if (startDate !== undefined || endDate !== undefined) {
    const start = startDate ? new Date(startDate) : existing.startDate;
    const end = endDate ? new Date(endDate) : existing.endDate;

    if (startDate && isNaN(start.getTime())) {
      throw httpError(400, 'Invalid start date format.');
    }
    if (endDate && isNaN(end.getTime())) {
      throw httpError(400, 'Invalid end date format.');
    }
    if (end < start) {
      throw httpError(400, 'End date must be on or after start date.');
    }

    if (startDate !== undefined) data.startDate = start;
    if (endDate !== undefined) data.endDate = end;
  }

  return prisma.trip.update({
    where: { id: tripId },
    data,
    select: TRIP_SELECT,
  });
};

const deleteTrip = async (userId, tripId) => {
  const existing = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    select: { id: true },
  });

  if (!existing) {
    throw httpError(404, 'Trip not found.');
  }

  await prisma.trip.delete({ where: { id: tripId } });

  return { id: tripId, deleted: true };
};

module.exports = {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
};
