import React, { useState } from 'react';
import ItineraryNavbar from '../../components/itinerary/ItineraryNavbar/ItineraryNavbar';
import TripHeader from '../../components/itinerary/TripHeader/TripHeader';
import ViewModeToggle from '../../components/itinerary/ViewModeToggle/ViewModeToggle';
import ListView from '../../components/itinerary/ListView/ListView';
import CalendarView from '../../components/itinerary/CalendarView/CalendarView';
import Footer from '../../components/common/Footer/Footer';
import { mockItinerary } from '../../data/staticData/itineraryData';

const ItineraryViewPage = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const tripData = mockItinerary;

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans antialiased">
      {/* Top Navbar */}
      <ItineraryNavbar tripTitle={tripData.title} />

      {/* Main Content Body */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* Trip Header Banner */}
        <TripHeader trip={tripData} />

        {/* View Mode Toggle Controls */}
        <ViewModeToggle
          activeView={viewMode}
          onViewChange={(mode) => setViewMode(mode)}
        />

        {/* Conditional View Renderer */}
        {viewMode === 'list' ? (
          <ListView days={tripData.days} currency={tripData.currency} />
        ) : (
          <CalendarView days={tripData.days} currency={tripData.currency} />
        )}

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ItineraryViewPage;
