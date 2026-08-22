import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BudgetHeader from '../../components/budget/BudgetHeader/BudgetHeader';
import BudgetSummary from '../../components/budget/BudgetSummary/BudgetSummary';
import CostCategory from '../../components/budget/CostCategory/CostCategory';
import BudgetChart from '../../components/budget/BudgetChart/BudgetChart';
import DailyCost from '../../components/budget/DailyCost/DailyCost';
import EmptyBudgetState from '../../components/budget/EmptyBudgetState/EmptyBudgetState';
import Footer from '../../components/common/Footer/Footer';
import { mockItinerary } from '../../data/staticData/itineraryData';
import { calculateBudgetData } from '../../data/staticData/budgetData';

const BudgetPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const targetTripId = tripId || mockItinerary.id;

  const [itinerary] = useState(mockItinerary);
  const budgetInfo = calculateBudgetData(itinerary);

  const hasData = itinerary && itinerary.days && itinerary.days.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <BudgetHeader
        tripTitle={itinerary.title}
        dates={itinerary.formattedDates}
        tripId={targetTripId}
      />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 space-y-8 sm:px-6 lg:px-8">
          
          {hasData ? (
            <>
              {/* Top Metrics Cards */}
              <BudgetSummary
                currency={budgetInfo.currency}
                totalEstimated={budgetInfo.totalEstimatedCost}
                averagePerDay={budgetInfo.averageCostPerDay}
                targetBudget={budgetInfo.totalTargetBudget}
                remaining={budgetInfo.remainingBudget}
              />

              {/* Middle Section: Cost Category Breakdown + Recharts Donut */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <CostCategory
                  categories={budgetInfo.categories}
                  currency={budgetInfo.currency}
                />
                <BudgetChart
                  categories={budgetInfo.categories}
                  currency={budgetInfo.currency}
                />
              </div>

              {/* Bottom Section: Daily Breakdown & Alerts */}
              <DailyCost
                dailyBreakdown={budgetInfo.dailyBreakdown}
                currency={budgetInfo.currency}
              />
            </>
          ) : (
            <EmptyBudgetState
              onAddDetails={() => navigate(`/trips/${targetTripId}/itinerary`)}
            />
          )}

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BudgetPage;