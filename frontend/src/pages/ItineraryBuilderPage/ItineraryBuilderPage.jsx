import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import DashboardNavbar from '../../components/dashboard/DashboardNavbar/DashboardNavbar';
import Footer from '../../components/common/Footer/Footer';
import TripOverviewHeader from '../../components/itinerary/TripOverviewHeader/TripOverviewHeader';
import CityStopsList from '../../components/itinerary/CityStopsList/CityStopsList';
import CitySearchModal from '../../components/itinerary/CitySearchModal/CitySearchModal';
import ActivitySearchModal from '../../components/itinerary/ActivitySearchModal/ActivitySearchModal';

import { apiRequest } from '../../lib/apiClient';

const ItineraryBuilderPage = () => {
  const { tripId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Auth guard
  useEffect(() => {
    const token = localStorage.getItem('globetrotter_token');
    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const [trip, setTrip] = useState(null);
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [activeStopForActivity, setActiveStopForActivity] = useState(null);

  // Load trip details and stops directly from PostgreSQL DB
  useEffect(() => {
    const loadTripData = async () => {
      try {
        let tripData = location.state?.trip;

        if (tripId) {
          try {
            const tripRes = await apiRequest(`/trips/${tripId}`);
            if (tripRes?.data) {
              tripData = {
                id: tripRes.data.id,
                tripName: tripRes.data.title,
                startDate: tripRes.data.startDate,
                endDate: tripRes.data.endDate,
                description: tripRes.data.description,
                coverPhotoPreviewUrl: tripRes.data.coverImage,
              };
            }
          } catch (err) {
            console.warn('Backend trip load warning:', err.message);
          }
        }

        setTrip(tripData || { id: tripId, tripName: 'My Journey', startDate: '', endDate: '' });

        if (tripId) {
          try {
            const stopsRes = await apiRequest(`/trips/${tripId}/stops`);
            if (stopsRes?.data) {
              const mappedStops = stopsRes.data.map((s) => ({
                id: s.id,
                cityName: s.city,
                country: s.country,
                startDate: s.arrival,
                endDate: s.departure,
                activities: (s.activities || []).map((a) => ({
                  id: a.id,
                  name: a.name,
                  type: a.category || 'Sightseeing',
                  duration: a.duration || '0',
                  estimatedCost: a.cost || 0,
                })),
              }));
              setStops(mappedStops);
            }
          } catch (stopsErr) {
            console.warn('Could not fetch stops from DB:', stopsErr.message);
          }
        }
      } catch (err) {
        console.error('Builder load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTripData();
  }, [tripId]);

  // Add City Stop - persisted to PostgreSQL database
  const handleAddCity = async (city) => {
    const isDuplicate = stops.some(
      (s) => (s.cityName || s.city || '').toLowerCase() === city.name.toLowerCase() && (s.country || '').toLowerCase() === city.country.toLowerCase()
    );
    if (isDuplicate) {
      toast.info('City already added to this trip.');
      return;
    }

    const defaultArrival = trip?.startDate ? new Date(trip.startDate).toISOString() : new Date().toISOString();
    const defaultDeparture = trip?.endDate ? new Date(trip.endDate).toISOString() : new Date().toISOString();

    try {
      const res = await apiRequest(`/trips/${tripId}/stops`, {
        method: 'POST',
        body: JSON.stringify({
          city: city.name,
          country: city.country,
          arrival: defaultArrival,
          departure: defaultDeparture,
        }),
      });

      if (res?.data) {
        const newStop = {
          id: res.data.id,
          cityName: res.data.city,
          country: res.data.country,
          startDate: res.data.arrival,
          endDate: res.data.departure,
          activities: res.data.activities || [],
        };
        setStops((prev) => [...prev, newStop]);
        toast.success(`${city.name} added to your journey.`);
      }
    } catch (err) {
      console.error('Add stop error:', err.message);
      toast.error(err.message || `Failed to save ${city.name} to database.`);
    }
  };

  // Reorder Stops - persisted to DB
  const handleMoveUp = async (index) => {
    if (index === 0) return;
    const newStops = [...stops];
    const targetIndex = index - 1;
    [newStops[index], newStops[targetIndex]] = [newStops[targetIndex], newStops[index]];
    setStops(newStops);

    try {
      await apiRequest(`/trips/${tripId}/stops/reorder`, {
        method: 'PUT',
        body: JSON.stringify({ orderedStopIds: newStops.map((s) => s.id) }),
      });
    } catch (err) {
      console.warn('Reorder stops error:', err.message);
    }
  };

  const handleMoveDown = async (index) => {
    if (index === stops.length - 1) return;
    const newStops = [...stops];
    const targetIndex = index + 1;
    [newStops[index], newStops[targetIndex]] = [newStops[targetIndex], newStops[index]];
    setStops(newStops);

    try {
      await apiRequest(`/trips/${tripId}/stops/reorder`, {
        method: 'PUT',
        body: JSON.stringify({ orderedStopIds: newStops.map((s) => s.id) }),
      });
    } catch (err) {
      console.warn('Reorder stops error:', err.message);
    }
  };

  // Remove City Stop - deleted from DB
  const handleRemoveStop = async (stopId) => {
    try {
      await apiRequest(`/trips/stops/${stopId}`, { method: 'DELETE' });
      setStops((prev) => prev.filter((s) => s.id !== stopId));
      toast.success('Stop removed.');
    } catch (err) {
      toast.error(err.message || 'Could not delete stop from database.');
    }
  };

  // Update Stop Dates - persisted to DB
  const handleUpdateDates = async (stopId, startDate, endDate) => {
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      toast.error('End date must be on or after start date.');
      return;
    }

    try {
      const res = await apiRequest(`/trips/stops/${stopId}`, {
        method: 'PUT',
        body: JSON.stringify({
          arrival: startDate ? new Date(startDate).toISOString() : null,
          departure: endDate ? new Date(endDate).toISOString() : null,
        }),
      });

      setStops((prev) =>
        prev.map((s) =>
          s.id === stopId
            ? { ...s, startDate: res.data.arrival, endDate: res.data.departure }
            : s
        )
      );
      toast.success('Stop dates updated.');
    } catch (err) {
      console.warn('Update stop dates warning:', err.message);
    }
  };

  // Add Activity - persisted to DB
  const handleAddActivity = async (activity, stopId) => {
    try {
      const res = await apiRequest('/activities', {
        method: 'POST',
        body: JSON.stringify({
          tripStopId: stopId,
          name: activity.name,
          category: activity.type || 'Sightseeing',
          cost: Number(activity.estimatedCost) || 0,
          duration: Number(activity.duration) || 60,
          description: activity.description || '',
        }),
      });

      if (res?.data) {
        const newActivity = {
          id: res.data.id,
          name: res.data.name,
          type: res.data.category,
          duration: res.data.duration,
          estimatedCost: res.data.cost,
        };

        setStops((prev) =>
          prev.map((s) =>
            s.id === stopId ? { ...s, activities: [...s.activities, newActivity] } : s
          )
        );
        toast.success(`"${activity.name}" added to itinerary.`);
      }
    } catch (err) {
      console.error('Add activity error:', err.message);
      toast.error(err.message || 'Could not add activity to database.');
    }
  };

  // Remove Activity - deleted from DB
  const handleRemoveActivity = async (stopId, activityId) => {
    try {
      await apiRequest(`/activities/${activityId}`, { method: 'DELETE' });
      setStops((prev) =>
        prev.map((s) =>
          s.id === stopId
            ? { ...s, activities: s.activities.filter((a) => a.id !== activityId) }
            : s
        )
      );
      toast.success('Activity removed.');
    } catch (err) {
      toast.error(err.message || 'Could not remove activity from database.');
    }
  };

  // Save Journey Handler
  const handleSaveJourney = async () => {
    if (!trip?.tripName) {
      toast.error('Please give your journey a name first.');
      return;
    }

    try {
      await apiRequest(`/trips/${tripId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: trip.tripName,
          description: trip.description || '',
          startDate: trip.startDate,
          endDate: trip.endDate,
        }),
      });
      toast.success(`Journey "${trip.tripName}" saved to database!`);
    } catch (err) {
      console.warn('Save journey warning:', err.message);
    }

    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
        <span className="h-12 w-12 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></span>
        <span className="mt-4 font-semibold text-slate-600">Loading your trip itinerary...</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-5xl px-4 space-y-8 sm:px-6 lg:px-8">
          {/* Trip Overview Card */}
          <TripOverviewHeader
            trip={trip}
            stopsCount={stops.length}
            onSaveJourney={handleSaveJourney}
          />

          {/* City Stops & Itinerary Builder */}
          <CityStopsList
            stops={stops}
            onOpenAddCity={() => setIsCityModalOpen(true)}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onRemoveStop={handleRemoveStop}
            onUpdateDates={handleUpdateDates}
            onOpenAddActivity={(stop) => setActiveStopForActivity(stop)}
            onRemoveActivity={handleRemoveActivity}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CitySearchModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        onAddCity={handleAddCity}
      />

      <ActivitySearchModal
        isOpen={Boolean(activeStopForActivity)}
        onClose={() => setActiveStopForActivity(null)}
        cityName={activeStopForActivity?.cityName || activeStopForActivity?.city}
        onAddActivity={(activity) => handleAddActivity(activity, activeStopForActivity?.id)}
      />
    </div>
  );
};

export default ItineraryBuilderPage;