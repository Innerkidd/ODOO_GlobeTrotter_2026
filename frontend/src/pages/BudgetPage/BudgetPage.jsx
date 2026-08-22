import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import BudgetHeader from '../../components/budget/BudgetHeader/BudgetHeader';
import BudgetSummary from '../../components/budget/BudgetSummary/BudgetSummary';
import CostCategory from '../../components/budget/CostCategory/CostCategory';
import BudgetChart from '../../components/budget/BudgetChart/BudgetChart';
import DailyCost from '../../components/budget/DailyCost/DailyCost';
import EmptyBudgetState from '../../components/budget/EmptyBudgetState/EmptyBudgetState';
import Footer from '../../components/common/Footer/Footer';

import { apiRequest } from '../../lib/apiClient';

const BudgetPage = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const [loading, setLoading] = useState(true);
  const [budgetInfo, setBudgetInfo] = useState(null);

  // Fetch budget strictly from backend API for the current trip
  useEffect(() => {
    const loadBudgetData = async () => {
      if (!tripId) {
        setLoading(false);
        setBudgetInfo(null);
        return;
      }

      try {
        setLoading(true);
        const res = await apiRequest(`/trips/${tripId}/budget`);
        if (res?.data) {
          setBudgetInfo(res.data);
        } else {
          setBudgetInfo(null);
        }
      } catch (err) {
        console.warn('No budget data found for trip:', tripId, err.message);
        setBudgetInfo(null);
      } finally {
        setLoading(false);
      }
    };

    loadBudgetData();
  }, [tripId]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <BudgetHeader
        tripTitle={budgetInfo?.tripName || 'Trip Budget'}
        dates={budgetInfo?.startDate ? `${budgetInfo.startDate.split('T')[0]} to ${budgetInfo.endDate?.split('T')[0]}` : ''}
        tripId={tripId}
      />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 space-y-8 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <span className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></span>
              <span className="ml-4 font-semibold text-slate-600">Loading budget data...</span>
            </div>
          ) : budgetInfo && (budgetInfo.totalEstimatedCost > 0 || budgetInfo.plannedBudget > 0 || (budgetInfo.categories && budgetInfo.categories.length > 0)) ? (
            <>
              {/* Top Metrics Cards */}
              <BudgetSummary
                currency={budgetInfo.currency || '₹'}
                totalEstimated={budgetInfo.totalEstimatedCost || 0}
                averagePerDay={budgetInfo.averageCostPerDay || 0}
                targetBudget={budgetInfo.plannedBudget || 0}
                remaining={(budgetInfo.plannedBudget || 0) - (budgetInfo.totalEstimatedCost || 0)}
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
            <div className="py-12">
              <EmptyBudgetState
                onAddDetails={() => {
                  if (tripId) {
                    navigate(`/trips/${tripId}/itinerary`);
                  } else {
                    navigate('/create-trip');
                  }
                }}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BudgetPage;