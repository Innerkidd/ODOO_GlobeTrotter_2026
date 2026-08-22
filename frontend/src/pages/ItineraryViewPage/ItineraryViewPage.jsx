import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItineraryNavbar from '../../components/itinerary/ItineraryNavbar/ItineraryNavbar';
import TripHeader from '../../components/itinerary/TripHeader/TripHeader';
import ViewModeToggle from '../../components/itinerary/ViewModeToggle/ViewModeToggle';
import ListView from '../../components/itinerary/ListView/ListView';
import CalendarView from '../../components/itinerary/CalendarView/CalendarView';
import Footer from '../../components/common/Footer/Footer';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { Compass } from 'lucide-react';
import { apiRequest } from '../../lib/apiClient';

const ItineraryViewPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItineraryView = async () => {
      if (!tripId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await apiRequest(`/trips/${tripId}/itinerary-view`);
        if (res?.data) {
          const apiData = res.data;
          setTripData({
            id: apiData.tripId,
            title: apiData.tripName,
            formattedDates: `${apiData.startDate?.split('T')[0]} to ${apiData.endDate?.split('T')[0]}`,
            stopsCount: apiData.totalStops || 0,
            totalActivities: apiData.totalActivities || 0,
            currency: '₹',
            days: (apiData.days || []).map((d) => ({
              dayNumber: d.day,
              date: d.date,
              city: d.city || 'Travel Day',
              country: d.country || '',
              activities: (d.activities || []).map((a) => ({
                id: a.id,
                name: a.name,
                time: a.startTime ? new Date(a.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Flexible',
                duration: a.duration ? `${a.duration} mins` : '',
                cost: a.estimatedCost || 0,
                category: a.type || 'Sightseeing',
                notes: a.description || '',
              })),
            })),
          });
        }
      } catch (err) {
        console.warn('Could not fetch itinerary view from DB:', err.message);
        setTripData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItineraryView();
  }, [tripId]);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans antialiased">
      {/* Top Navbar */}
      <ItineraryNavbar tripTitle={tripData?.title || 'Trip Itinerary'} />

      {/* Main Content Body */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <span className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></span>
            <span className="ml-4 font-semibold text-slate-600">Loading itinerary...</span>
          </div>
        ) : tripData ? (
          <>
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
          </>
        ) : (
          <div className="py-12">
            <EmptyState
              icon={Compass}
              title="No Itinerary Found"
              description="Create a new trip or select a trip from your dashboard to view the itinerary."
              actionLabel="Go to Dashboard"
              onAction={() => navigate('/dashboard')}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ItineraryViewPage;
