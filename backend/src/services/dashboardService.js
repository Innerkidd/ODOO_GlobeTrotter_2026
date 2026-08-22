const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const RECOMMENDED_DESTINATIONS = [
  {
    id: 'dest-1',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    description: 'Experience romantic boulevards, world-class museums, and iconic landmarks.',
  },
  {
    id: 'dest-2',
    name: 'Kyoto',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    description: 'Discover serene temples, traditional wooden houses, and cherry blossom gardens.',
  },
  {
    id: 'dest-3',
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    description: 'Walk through thousands of years of ancient history, art, and vibrant culinary culture.',
  },
  {
    id: 'dest-4',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    description: 'Unwind amidst lush rice terraces, pristine beaches, and spiritual retreats.',
  },
  {
    id: 'dest-5',
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80',
    description: 'Immerse yourself in breathtaking Gaudí architecture and sun-soaked Mediterranean coastlines.',
  },
];

const httpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const calculateTripStatus = (startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (today < start) {
    return 'Upcoming';
  }
  if (today >= start && today <= end) {
    return 'Ongoing';
  }
  return 'Completed';
};

const getDashboard = async (userId) => {
  // A. User Information (Safe fields only)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    throw httpError(404, 'User not found.');
  }

  // B. Recent Trips (up to 5, including coverImage & computed status)
  const trips = await prisma.trip.findMany({
    where: { userId },
    orderBy: { startDate: 'desc' },
    take: 5,
    select: {
      id: true,
      title: true,
      startDate: true,
      endDate: true,
      coverImage: true,
      _count: {
        select: { stops: true },
      },
    },
  });

  const recentTrips = trips.map((trip) => ({
    id: trip.id,
    name: trip.title,
    startDate: trip.startDate,
    endDate: trip.endDate,
    coverImage: trip.coverImage,
    status: calculateTripStatus(trip.startDate, trip.endDate),
    destinationCount: trip._count ? trip._count.stops : 0,
  }));

  // C. Recommended Destinations (Static array)
  const recommendedDestinations = RECOMMENDED_DESTINATIONS;

  // D. Budget Highlights (Aggregated expenses for this user's trips)
  const expenseAggregate = await prisma.expense.aggregate({
    where: {
      trip: {
        userId: userId,
      },
    },
    _sum: {
      amount: true,
    },
  });

  const rawSpent = expenseAggregate._sum.amount || 0;
  const totalSpent = Number(rawSpent.toFixed(2));
  const totalBudget = 0;
  const remainingBudget = Number((totalBudget - totalSpent).toFixed(2));

  return {
    user,
    recentTrips,
    recommendedDestinations,
    budgetHighlights: {
      totalBudget,
      totalSpent,
      remainingBudget,
    },
  };
};

module.exports = {
  getDashboard,
};
