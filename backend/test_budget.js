const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Test the budget service logic inline
async function testBudgetLogic() {
  // Test 1: getActivitiesCostForTrip with no data
  const stops = await prisma.tripStop.findMany({
    where: { tripId: 'nonexistent' },
    include: {
      activities: {
        select: { cost: true },
      },
    },
  });
  console.log('Stops for nonexistent trip:', stops.length);
  
  // Test 2: calculateTripDuration
  const result = (() => {
    const startDate = '2024-01-01';
    const endDate = '2024-01-05';
    const start = new Date(startDate);
    const end = new Date(endDate);
    const msPerDay = 24 * 60 * 60 * 1000;
    const diff = end.getTime() - start.getTime();
    const days = Math.floor(diff / msPerDay) + 1;
    return days;
  })();
  console.log('Trip duration calculation:', result, 'days');
  
  // Test 3: category percentages with total = 0
  const totalEstimatedCost = 0;
  const categoryPercentages = {};
  const categoryNames = ['transport', 'stay', 'activities', 'meals'];
  for (const key of categoryNames) {
    if (totalEstimatedCost > 0) {
      categoryPercentages[key] = Math.round((0 / totalEstimatedCost) * 100 * 100) / 100;
    } else {
      categoryPercentages[key] = 0;
    }
  }
  console.log('Category percentages when total=0:', categoryPercentages);
  
  await prisma.$disconnect();
}

testBudgetLogic().then(() => console.log('Done')).catch(e => console.error(e));