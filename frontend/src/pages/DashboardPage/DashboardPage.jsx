import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { apiRequest } from '../../lib/apiClient';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar/DashboardNavbar';
import WelcomeHeader from '../../components/dashboard/WelcomeHeader/WelcomeHeader';
import RecentTrips from '../../components/dashboard/RecentTrips/RecentTrips';
import RecommendedDestinations from '../../components/dashboard/RecommendedDestinations/RecommendedDestinations';
import BudgetHighlights from '../../components/dashboard/BudgetHighlights/BudgetHighlights';
import Footer from '../../components/common/Footer/Footer';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = () => {
    const token = localStorage.getItem('globetrotter_token');
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    apiRequest('/dashboard')
      .then((res) => setDashboardData(res.data))
      .catch((err) => {
        if (err.message === 'Invalid token.' || err.message === 'Access denied. No token provided.' || err.message === 'Token expired.') {
          localStorage.removeItem('globetrotter_token');
          return;
        }
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handlePlanNewTrip = () => {
    navigate('/create-trip');
  };

  const handleViewTrip = (trip) => {
    navigate(`/trips/${trip.id}/itinerary/view`);
  };

  const handleSelectDestination = (dest) => {
    toast.info(`Selected "${dest.city || dest.name}, ${dest.country}". City exploration will be connected in future updates.`, {
      duration: 4000,
    });
  };

  const mappedTrips = (dashboardData?.recentTrips || []).map((trip) => ({
    id: trip.id,
    title: trip.title || trip.name,
    coverImage: trip.coverImage || '',
    destinations: trip.destinations || [],
    startDate: trip.startDate,
    endDate: trip.endDate,
    destinationCount: trip.destinationCount || 0,
    status: trip.status || 'Upcoming',
  }));

  const mappedDestinations = (dashboardData?.recommendedDestinations || []).map((d) => ({
    id: d.id,
    city: d.city || d.name,
    country: d.country,
    image: d.image || '',
    tag: d.tag || '',
    tagline: d.tagline || d.description || '',
  }));

  const mappedBudget = {
    totalBudget: dashboardData?.budgetHighlights?.totalBudget || 0,
    plannedAmount: dashboardData?.budgetHighlights?.totalSpent || dashboardData?.budgetHighlights?.plannedAmount || 0,
    remainingAmount: dashboardData?.budgetHighlights?.remainingBudget || dashboardData?.budgetHighlights?.remainingAmount || 0,
    currency: dashboardData?.budgetHighlights?.currency || '₹',
    categories: dashboardData?.budgetHighlights?.categories || [],
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
          <p className="text-sm text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      <DashboardNavbar
        userName={dashboardData?.user?.name || 'Traveler'}
        avatarUrl={dashboardData?.user?.avatar || ''}
      />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 space-y-10 sm:px-6 lg:px-8">
          <WelcomeHeader
            userName={dashboardData?.user?.name || 'Traveler'}
            onPlanNewTrip={handlePlanNewTrip}
          />

          <RecentTrips
            trips={mappedTrips}
            onViewTrip={handleViewTrip}
            onPlanNewTrip={handlePlanNewTrip}
          />

          <RecommendedDestinations
            destinations={mappedDestinations}
            onSelectDestination={handleSelectDestination}
          />

          <BudgetHighlights budget={mappedBudget} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
