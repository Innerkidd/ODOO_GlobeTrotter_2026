const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const destinations = [
  { name: 'Paris', country: 'France', isPopular: true },
  { name: 'Tokyo', country: 'Japan', isPopular: true },
  { name: 'Rome', country: 'Italy', isPopular: true },
  { name: 'Barcelona', country: 'Spain', isPopular: true },
  { name: 'London', country: 'United Kingdom', isPopular: true },
  { name: 'New York', country: 'United States', isPopular: true },
  { name: 'Dubai', country: 'UAE', isPopular: true },
  { name: 'Bali', country: 'Indonesia', isPopular: true },
  { name: 'Sydney', country: 'Australia', isPopular: true },
  { name: 'Bangkok', country: 'Thailand', isPopular: true },
  { name: 'Amsterdam', country: 'Netherlands', isPopular: false },
  { name: 'Berlin', country: 'Germany', isPopular: false },
  { name: 'Istanbul', country: 'Turkey', isPopular: false },
  { name: 'Singapore', country: 'Singapore', isPopular: false },
  { name: 'Mumbai', country: 'India', isPopular: false },
  { name: 'Delhi', country: 'India', isPopular: false },
  { name: 'Goa', country: 'India', isPopular: false },
  { name: 'Kyoto', country: 'Japan', isPopular: false },
  { name: 'Santorini', country: 'Greece', isPopular: false },
  { name: 'Machu Picchu', country: 'Peru', isPopular: false },
];

async function seed() {
  try {
    const existing = await prisma.destination.count();
    if (existing > 0) {
      console.log(`Database already has ${existing} destinations. Skipping seed.`);
      return;
    }

    await prisma.destination.createMany({ data: destinations });
    console.log(`Seeded ${destinations.length} destinations`);
  } catch (error) {
    console.error('Seed error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
