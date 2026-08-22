const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

function generateShareToken() {
  return crypto.randomBytes(16).toString('hex');
}

async function enableShare(userId, tripId) {
  const trip = await prisma.trip.findUnique({ where: { id: tripId } });

  if (!trip) {
    const err = new Error('Trip not found');
    err.statusCode = 404;
    throw err;
  }

  if (trip.userId !== userId) {
    const err = new Error('Unauthorized');
    err.statusCode = 403;
    throw err;
  }

  if (trip.shareToken) {
    return {
      shareId: trip.shareToken,
      shareUrl: `/public/trips/${trip.shareToken}`,
      isPublic: true,
    };
  }

  let shareToken = generateShareToken();
  let exists = await prisma.trip.findUnique({ where: { shareToken } });
  while (exists) {
    shareToken = generateShareToken();
    exists = await prisma.trip.findUnique({ where: { shareToken } });
  }

  const updated = await prisma.trip.update({
    where: { id: tripId },
    data: { shareToken, isPublic: true },
    select: { shareToken: true, isPublic: true },
  });

  return {
    shareId: updated.shareToken,
    shareUrl: `/public/trips/${updated.shareToken}`,
    isPublic: updated.isPublic,
  };
}

async function disableShare(userId, tripId) {
  const trip = await prisma.trip.findUnique({ where: { id: tripId } });

  if (!trip) {
    const err = new Error('Trip not found');
    err.statusCode = 404;
    throw err;
  }

  if (trip.userId !== userId) {
    const err = new Error('Unauthorized');
    err.statusCode = 403;
    throw err;
  }

  await prisma.trip.update({
    where: { id: tripId },
    data: { isPublic: false },
  });

  return { success: true };
}

async function getPublicTrip(shareToken) {
  const trip = await prisma.trip.findUnique({
    where: { shareToken },
    select: {
      id: true,
      title: true,
      description: true,
      startDate: true,
      endDate: true,
      coverImage: true,
      isPublic: true,
      stops: {
        orderBy: { order: 'asc' },
        select: {
          id: true,
          city: true,
          country: true,
          latitude: true,
          longitude: true,
          arrival: true,
          departure: true,
          order: true,
          activities: {
            select: {
              id: true,
              name: true,
              description: true,
              category: true,
              cost: true,
              duration: true,
              startTime: true,
              endTime: true,
            },
          },
        },
      },
      user: {
        select: { name: true },
      },
    },
  });

  if (!trip || !trip.isPublic) {
    const err = new Error('Shared trip not found');
    err.statusCode = 404;
    throw err;
  }

  const stopCount = trip.stops.length;
  const activityCount = trip.stops.reduce((sum, s) => sum + s.activities.length, 0);

  return {
    trip: {
      id: trip.id,
      title: trip.title,
      description: trip.description,
      startDate: trip.startDate,
      endDate: trip.endDate,
      coverImage: trip.coverImage,
      authorName: trip.user.name,
      stopCount,
      activityCount,
    },
    stops: trip.stops.map((stop) => ({
      id: stop.id,
      city: stop.city,
      country: stop.country,
      latitude: stop.latitude,
      longitude: stop.longitude,
      arrival: stop.arrival,
      departure: stop.departure,
      order: stop.order,
      activities: stop.activities.map((a) => ({
        id: a.id,
        name: a.name,
        description: a.description,
        category: a.category,
        cost: a.cost,
        duration: a.duration,
        startTime: a.startTime,
        endTime: a.endTime,
      })),
    })),
  };
}

async function copyTrip(userId, shareToken) {
  const source = await prisma.trip.findUnique({
    where: { shareToken },
    include: {
      stops: {
        orderBy: { order: 'asc' },
        include: { activities: true },
      },
    },
  });

  if (!source || !source.isPublic) {
    const err = new Error('Shared trip not found');
    err.statusCode = 404;
    throw err;
  }

  const newTrip = await prisma.$transaction(async (tx) => {
    const trip = await tx.trip.create({
      data: {
        title: source.title,
        description: source.description,
        startDate: source.startDate,
        endDate: source.endDate,
        coverImage: source.coverImage,
        userId,
      },
    });

    for (const stop of source.stops) {
      const newStop = await tx.tripStop.create({
        data: {
          city: stop.city,
          country: stop.country,
          latitude: stop.latitude,
          longitude: stop.longitude,
          arrival: stop.arrival,
          departure: stop.departure,
          notes: stop.notes,
          order: stop.order,
          tripId: trip.id,
        },
      });

      for (const activity of stop.activities) {
        const newActivity = await tx.activity.create({
          data: {
            name: activity.name,
            description: activity.description,
            category: activity.category,
            cost: activity.cost,
            duration: activity.duration,
            startTime: activity.startTime,
            endTime: activity.endTime,
            tripStopId: newStop.id,
          },
        });

        if (activity.startTime) {
          const dayDiff = Math.ceil(
            (new Date(activity.startTime).getTime() - new Date(source.startDate).getTime()) / (1000 * 60 * 60 * 24)
          );
          const day = Math.max(1, dayDiff + 1);

          await tx.itineraryActivity.create({
            data: {
              day,
              order: 0,
              tripId: trip.id,
              activityId: newActivity.id,
            },
          });
        }
      }
    }

    return trip;
  });

  return { tripId: newTrip.id, name: newTrip.title };
}

module.exports = { enableShare, disableShare, getPublicTrip, copyTrip };
