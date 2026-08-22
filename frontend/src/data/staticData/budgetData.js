import { mockItinerary } from './itineraryData';

export const mockBaseBudget = {
  transport: 65000,
  stay: 85000,
  meals: 35000,
  targetDailyBudget: 42000,
  totalTargetBudget: 250000,
};

export const calculateBudgetData = (itinerary = mockItinerary) => {
  const currency = itinerary?.currency || '₹';
  const days = itinerary?.days || [];
  const totalDays = days.length || 1;

  // Derive total activities cost from itinerary state
  const activitiesTotal = days.reduce((sum, day) => {
    const dayActivitiesCost = (day.activities || []).reduce(
      (actSum, act) => actSum + (Number(act.cost) || 0),
      0
    );
    return sum + dayActivitiesCost;
  }, 0);

  const transport = mockBaseBudget.transport;
  const stay = mockBaseBudget.stay;
  const meals = mockBaseBudget.meals;
  const activities = activitiesTotal;

  const totalEstimatedCost = transport + stay + activities + meals;
  const averageCostPerDay = Math.round(totalEstimatedCost / totalDays);

  const categories = [
    { id: 'stay', name: 'Stay / Accommodations', amount: stay, color: '#0d9488', icon: 'Hotel' },
    { id: 'transport', name: 'Transport / Flights', amount: transport, color: '#0284c7', icon: 'Car' },
    { id: 'activities', name: 'Activities & Tours', amount: activities, color: '#f59e0b', icon: 'Ticket' },
    { id: 'meals', name: 'Meals & Dining', amount: meals, color: '#e11d48', icon: 'Utensils' },
  ].map((cat) => ({
    ...cat,
    percentage: totalEstimatedCost > 0 ? Math.round((cat.amount / totalEstimatedCost) * 100) : 0,
  }));

  // Daily cost breakdown & threshold checks
  const baseDailyAllocation = Math.round((transport + stay + meals) / totalDays);
  const targetDaily = mockBaseBudget.targetDailyBudget;

  const dailyBreakdown = days.map((day) => {
    const dayActCost = (day.activities || []).reduce(
      (sum, act) => sum + (Number(act.cost) || 0),
      0
    );
    const dayTotal = baseDailyAllocation + dayActCost;
    const isOverBudget = dayTotal > targetDaily;

    return {
      dayNumber: day.dayNumber,
      date: day.date,
      city: day.city,
      activitiesCost: dayActCost,
      baseAllocation: baseDailyAllocation,
      totalCost: dayTotal,
      isOverBudget,
    };
  });

  return {
    currency,
    totalDays,
    totalEstimatedCost,
    averageCostPerDay,
    totalTargetBudget: mockBaseBudget.totalTargetBudget,
    remainingBudget: mockBaseBudget.totalTargetBudget - totalEstimatedCost,
    categories,
    dailyBreakdown,
  };
};
