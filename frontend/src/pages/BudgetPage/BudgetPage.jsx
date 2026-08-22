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

const BudgetPage = () => {
  const navigate = useNavigate();
  const { tripId: routeTripId } = useParams();
  const [tripId, setTripId] = useState(routeTripId || null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [budgetInfo, setBudgetInfo] = useState(null);

  // Fetch budget from backend on mount
  useEffect(() => {
    const loadBudgetData = async () => {
      if (!tripId) {
        setLoading(false);
        setError('No trip ID specified.');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await apiRequest(`/api/trips/${tripId}/budget`);
        setBudgetInfo(res.data);
      } catch (err) {
        console.error('Budget API error:', err);
        if (err.message.includes('401') || err.message.includes('403')) {
          setError('Authentication required. Please log in.');
          toast.error('Session expired. Please log in again.');
          navigate('/login');
        } else if (err.message.includes('404')) {
          setError('Trip not found.');
          toast.error('The requested trip could not be found.');
        } else {
          setError(err.message || 'Could not load budget data.');
          toast.error('Could not load budget data. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadBudgetData();
  }, [tripId]);

  // If tripId changes through routing, refetch
  useEffect(() => {
    if (tripId) {
      loadBudgetData();
    }
  }, [tripId]);

  // Fallback: if no tripId in params and we're at /budget, navigate to first trip or show empty state
  const hasTripId = !!tripId;
  const isLoading = loading && !budgetInfo;
  const hasError = !!error && !budgetInfo;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <BudgetHeader
        tripTitle={budgetInfo?.tripName || 'Budget'}
        dates={budgetInfo?.currency ? undefined : ''}
        tripId={tripId || undefined}
      />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 space-y-8 sm:px-6 lg:px-8">
          {isLoading && !hasError ? (
            <div className="flex min-h-screen items-center justify-center">
              <span className="text-slate-600 animate-spin loading-spinner h-8 w-8 border-4 border-teal-600 rounded-full"></span>
              <span className="ml-4 text-slate-600">Loading budget data...</span>
            </div>
          ) : hasError ? (
            <div className="flex min-h-screen items-center justify-center">
              <p className="text-slate-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-500"
              >
                Retry
              </button>
            </div>
          ) : budgetInfo ? (
            <>
              {/* Top Metrics Cards */}
              <BudgetSummary
                currency={budgetInfo.currency || '₹'}
                totalEstimated={budgetInfo.totalEstimatedCost || 0}
                averagePerDay={budgetInfo.averageCostPerDay || 0}
                targetBudget={budgetInfo.plannedBudget || mockBaseBudget?.totalTargetBudget || 0}
                remaining={budgetInfo.plannedBudget
                  ? budgetInfo.plannedBudget - (budgetInfo.totalEstimatedCost || 0)
                  : mockBaseBudget?.totalTargetBudget - (budgetInfo.totalEstimatedCost || 0)}
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
                if (tripId) navigate(`/trips/${tripId}/itinerary`);
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