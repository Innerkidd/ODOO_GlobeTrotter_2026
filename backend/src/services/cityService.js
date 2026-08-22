const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const DESTINATION_SELECT = {
  id: true,
  name: true,
  country: true,
};

const getPopularDestinations = async () => {
  return prisma.destination.findMany({
    where: { isPopular: true },
    select: DESTINATION_SELECT,
    orderBy: { name: 'asc' },
  });
};

const searchDestinations = async (query) => {
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return [];
  }

  return prisma.destination.findMany({
    where: {
      name: {
        contains: query.trim(),
        mode: 'insensitive',
      },
    },
    select: DESTINATION_SELECT,
    orderBy: { name: 'asc' },
    take: 20,
  });
};

module.exports = {
  getPopularDestinations,
  searchDestinations,
};
