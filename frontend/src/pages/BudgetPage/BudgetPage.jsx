import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import BudgetHeader from '../../components/budget/BudgetHeader/BudgetHeader';
import BudgetSummary from '../../components/budget/BudgetSummary/BudgetSummary';
import CostCategory from '../../components/budget/CostCategory/CostCategory';
import BudgetChart from '../../components/budget/BudgetChart/BudgetChart';
import DailyCost from '../../components/budget/DailyCost/DailyCost';
import EmptyBudgetState from '../../components/budget/EmptyBudgetState/EmptyBudgetState';
import Footer from '../../components/common/Footer/Footer';

import { apiRequest } from '../../lib/apiClient';
import { calculateBudgetData, mockBaseBudget } from '../../data/staticData/budgetData';
import { mockItinerary } from '../../data/staticData/itineraryData';

const BudgetPage = () => {
  const navigate = useNavigate();
  const { tripId: routeTripId } = useParams();
  const targetTripId = routeTripId || 'trip-101';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [budgetInfo, setBudgetInfo] = useState(null);

  // Fetch budget from backend on mount or fallback to mock data
  useEffect(() => {
    const loadBudgetData = async () => {
      try {
        setLoading(true);
        setError(null);

        // path should be /trips/... because apiRequest prepends /api
        const res = await apiRequest(`/trips/${targetTripId}/budget`);
        if (res?.data) {
          setBudgetInfo(res.data);
        } else {
          // Fallback to static mock budget data
          const fallbackData = calculateBudgetData(mockItinerary);
          setBudgetInfo({
            tripName: mockItinerary.title,
            currency: fallbackData.currency,
            totalEstimatedCost: fallbackData.totalEstimatedCost,
            averageCostPerDay: fallbackData.averageCostPerDay,
            plannedBudget: fallbackData.totalTargetBudget,
            categories: fallbackData.categories,
            dailyCosts: fallbackData.dailyBreakdown,
          });
        }
      } catch (err) {
        console.warn('Budget API unreachable or trip not in backend, using static mock budget:', err.message);
        // Seamless fallback to frontend mock budget data
        const fallbackData = calculateBudgetData(mockItinerary);
        setBudgetInfo({
          tripName: mockItinerary.title,
          currency: fallbackData.currency,
          totalEstimatedCost: fallbackData.totalEstimatedCost,
          averageCostPerDay: fallbackData.averageCostPerDay,
          plannedBudget: fallbackData.totalTargetBudget,
          categories: fallbackData.categories,
          dailyCosts: fallbackData.dailyBreakdown,
        });
      } finally {
        setLoading(false);
      }
    };

    loadBudgetData();
  }, [targetTripId]);

  const isLoading = loading && !budgetInfo;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <BudgetHeader
        tripTitle={budgetInfo?.tripName || mockItinerary.title}
        dates={mockItinerary.formattedDates}
        tripId={targetTripId}
      />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 space-y-8 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <span className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></span>
              <span className="ml-4 font-semibold text-slate-600">Loading budget data...</span>
            </div>
          ) : budgetInfo ? (
            <>
              {/* Top Metrics Cards */}
              <BudgetSummary
                currency={budgetInfo.currency || '₹'}
                totalEstimated={budgetInfo.totalEstimatedCost || 0}
                averagePerDay={budgetInfo.averageCostPerDay || 0}
                targetBudget={budgetInfo.plannedBudget || mockBaseBudget?.totalTargetBudget || 250000}
                remaining={(budgetInfo.plannedBudget || mockBaseBudget?.totalTargetBudget || 250000) - (budgetInfo.totalEstimatedCost || 0)}
              />

              {/* Middle Section: Cost Category Breakdown + Recharts Donut */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <CostCategory
                  categories={budgetInfo.categories || []}
                  currency={budgetInfo.currency || '₹'}
                />
                <BudgetChart
                  categories={budgetInfo.categories || []}
                  currency={budgetInfo.currency || '₹'}
                />
              </div>

              {/* Bottom Section: Daily Breakdown & Alerts */}
              <DailyCost
                dailyBreakdown={budgetInfo.dailyCosts || []}
                currency={budgetInfo.currency || '₹'}
              />
            </>
          ) : (
            <EmptyBudgetState
              onAddDetails={() => {
                navigate(`/trips/${targetTripId}/itinerary`);
              }}
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