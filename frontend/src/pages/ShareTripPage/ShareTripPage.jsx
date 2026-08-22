import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar/DashboardNavbar';
import Footer from '../../components/common/Footer/Footer';
import ShareHeader from '../../components/sharing/ShareHeader/ShareHeader';
import ShareLink from '../../components/sharing/ShareLink/ShareLink';
import ShareActions from '../../components/sharing/ShareActions/ShareActions';
import PublicTripPreview from '../../components/sharing/PublicTripPreview/PublicTripPreview';
import { mockItinerary } from '../../data/staticData/itineraryData';

const ShareTripPage = () => {
  const { tripId } = useParams();
  const targetTripId = tripId || mockItinerary.id;
  const [trip] = useState(mockItinerary);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-4xl px-4 space-y-6 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <ShareHeader
            tripTitle={trip.title}
            dates={trip.formattedDates}
            stopsCount={trip.stopsCount}
            totalActivities={trip.totalActivities}
            tripId={targetTripId}
          />

          {/* Shareable Link Box */}
          <ShareLink tripId={targetTripId} />

          {/* Social Share Actions & Open Public View */}
          <ShareActions tripId={targetTripId} tripTitle={trip.title} />

          {/* Public Preview Card */}
          <PublicTripPreview trip={trip} />

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ShareTripPage;
