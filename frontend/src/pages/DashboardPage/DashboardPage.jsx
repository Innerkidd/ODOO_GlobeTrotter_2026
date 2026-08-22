import React, { useState } from 'react';
import { toast } from 'sonner';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar/DashboardNavbar';
import WelcomeHeader from '../../components/dashboard/WelcomeHeader/WelcomeHeader';
import RecentTrips from '../../components/dashboard/RecentTrips/RecentTrips';
import RecommendedDestinations from '../../components/dashboard/RecommendedDestinations/RecommendedDestinations';
import BudgetHighlights from '../../components/dashboard/BudgetHighlights/BudgetHighlights';
import Footer from '../../components/common/Footer/Footer';
import {
  mockRecentTrips,
  mockRecommendedDestinations,
  mockBudgetHighlights,
} from '../../data/staticData/dashboardData';

const DashboardPage = () => {
  const [trips, setTrips] = useState(mockRecentTrips);

  const handlePlanNewTrip = () => {
    toast.info('Trip creation wizard will be connected when the Create Trip feature is implemented.', {
      duration: 4000,
    });
  };

  const handleViewTrip = (trip) => {
    toast.info(`Opening details for "${trip.title}". Itinerary builder will be connected in future updates.`, {
      duration: 4000,
    });
  };

  const handleSelectDestination = (dest) => {
    toast.info(`Selected "${dest.city}, ${dest.country}". City exploration will be connected in future updates.`, {
      duration: 4000,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Dashboard Navbar */}
      <DashboardNavbar />

      {/* Main Dashboard Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 space-y-10 sm:px-6 lg:px-8">
          
          {/* 1. Welcome & Primary CTA Header */}
          <WelcomeHeader onPlanNewTrip={handlePlanNewTrip} />

          {/* 2. Recent Trips */}
          <RecentTrips
            trips={trips}
            onViewTrip={handleViewTrip}
            onPlanNewTrip={handlePlanNewTrip}
          />

          {/* 3. Recommended Destinations */}
          <RecommendedDestinations
            destinations={mockRecommendedDestinations}
            onSelectDestination={handleSelectDestination}
          />

          {/* 4. Budget Highlights */}
          <BudgetHighlights budget={mockBudgetHighlights} />

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardPage;
