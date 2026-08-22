const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const ACTIVITY_SELECT = {
  id: true,
  name: true,
  description: true,
  category: true,
  cost: true,
  duration: true,
  startTime: true,
  endTime: true,
  createdAt: true,
  updatedAt: true,
};

const httpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const verifyActivityOwnership = async (userId, activityId) => {
  const activity = await prisma.activity.findFirst({
    where: { id: activityId, tripStop: { trip: { userId } } },
    select: { id: true, tripStopId: true },
  });
  if (!activity) {
    throw httpError(404, 'Activity not found.');
  }
  return activity;
};

const verifyStopOwnership = async (userId, tripStopId) => {
  const stop = await prisma.tripStop.findFirst({
    where: { id: tripStopId, trip: { userId } },
    select: { id: true },
  });
  if (!stop) {
    throw httpError(404, 'Stop not found.');
  }
  return stop;
};

const getActivities = async (userId, tripStopId) => {
  if (!tripStopId) {
    throw httpError(400, 'tripStopId query parameter is required.');
  }

  await verifyStopOwnership(userId, tripStopId);

  return prisma.activity.findMany({
    where: { tripStopId },
    select: ACTIVITY_SELECT,
    orderBy: { createdAt: 'asc' },
  });
};

const getActivityById = async (userId, activityId) => {
  const activity = await prisma.activity.findFirst({
    where: { id: activityId, tripStop: { trip: { userId } } },
    select: ACTIVITY_SELECT,
  });

  if (!activity) {
    throw httpError(404, 'Activity not found.');
  }

  return activity;
};

const addActivity = async (userId, activityData) => {
  const { tripStopId, name, description, category, cost, duration, startTime, endTime } = activityData;

  if (!tripStopId) {
    throw httpError(400, 'tripStopId is required.');
  }
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw httpError(400, 'Activity name is required.');
  }

  await verifyStopOwnership(userId, tripStopId);

  return prisma.activity.create({
    data: {
      name: name.trim(),
      description: description || null,
      category: category || null,
      cost: cost || 0,
      duration: duration || null,
      startTime: startTime ? new Date(startTime) : null,
      endTime: endTime ? new Date(endTime) : null,
      tripStopId,
    },
    select: ACTIVITY_SELECT,
  });
};

const updateActivity = async (userId, activityId, updateData) => {
  await verifyActivityOwnership(userId, activityId);

  const { name, description, category, cost, duration, startTime, endTime } = updateData;

  if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
    throw httpError(400, 'Activity name cannot be empty.');
  }

  const data = {};
  if (name !== undefined) data.name = name.trim();
  if (description !== undefined) data.description = description || null;
  if (category !== undefined) data.category = category || null;
  if (cost !== undefined) data.cost = cost;
  if (duration !== undefined) data.duration = duration;
  if (startTime !== undefined) data.startTime = startTime ? new Date(startTime) : null;
  if (endTime !== undefined) data.endTime = endTime ? new Date(endTime) : null;

  return prisma.activity.update({
    where: { id: activityId },
    data,
    select: ACTIVITY_SELECT,
  });
};

const deleteActivity = async (userId, activityId) => {
  await verifyActivityOwnership(userId, activityId);

  await prisma.activity.delete({ where: { id: activityId } });

  return { id: activityId, deleted: true };
};

module.exports = {
  getActivities,
  getActivityById,
  addActivity,
  updateActivity,
  deleteActivity,
};