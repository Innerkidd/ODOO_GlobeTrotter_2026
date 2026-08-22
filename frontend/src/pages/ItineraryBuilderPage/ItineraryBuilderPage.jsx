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

  // Auth guard: redirect to login if no token
  useEffect(() => {
    const token = localStorage.getItem('globetrotter_token');
    if (!token) {
      navigate('/login');
      return;
    }
  }, []);

  const [trip, setTrip] = useState(null);
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [activeStopForActivity, setActiveStopForActivity] = useState(null);

  // Load trip + stops + activities on mount
  useEffect(() => {
    const loadTripData = async () => {
      try {
        let tripData = location.state?.trip;

        if (!tripData && tripId) {
          try {
            const tripRes = await apiRequest(`/trips/${tripId}`);
            if (tripRes?.data) {
              tripData = {
                id: tripRes.data.id,
                tripName: tripRes.data.title,
                startDate: tripRes.data.startDate,
                endDate: tripRes.data.endDate,
                description: tripRes.data.description,
              };
            }
          } catch (backendErr) {
            console.warn('Trip not in backend DB, using fallback draft state:', backendErr.message);
            tripData = {
              id: tripId,
              tripName: 'My Trip',
              startDate: '',
              endDate: '',
              description: '',
            };
          }
        }

        setTrip(tripData || { id: tripId || 'new-trip', tripName: 'My Journey', startDate: '', endDate: '' });

        if (tripId && tripData?.id) {
          try {
            const stopsRes = await apiRequest(`/trips/${tripId}/stops`);
            if (stopsRes?.data) {
              const mappedStops = await Promise.all(
                stopsRes.data.map(async (s) => {
                  let activitiesList = [];
                  try {
                    const activitiesRes = await apiRequest(`/activities?tripStopId=${s.id}`);
                    if (activitiesRes?.data) {
                      activitiesList = activitiesRes.data.map((a) => ({
                        id: a.id,
                        name: a.name,
                        type: a.category,
                        duration: a.duration,
                        estimatedCost: a.cost,
                      }));
                    }
                  } catch {
                    activitiesList = [];
                  }

                  return {
                    id: s.id,
                    cityName: s.city,
                    country: s.country,
                    startDate: s.arrival,
                    endDate: s.departure,
                    activities: activitiesList,
                  };
                })
              );
              setStops(mappedStops);
            }
          } catch (stopsErr) {
            console.warn('Could not fetch stops:', stopsErr.message);
          }
        }
      } catch (err) {
        console.error('Builder initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTripData();
  }, [tripId]);

  // Add City Stop — wired to backend with local state fallback
  const handleAddCity = async (city) => {
    const isDuplicate = stops.some(
      (s) => s.cityName.toLowerCase() === city.name.toLowerCase() && s.country.toLowerCase() === city.country.toLowerCase()
    );
    if (isDuplicate) {
      toast.info('City already added to this trip.');
      return;
    }

    try {
      const res = await apiRequest(`/trips/${tripId}/stops`, {
        method: 'POST',
        body: JSON.stringify({
          city: city.name,
          country: city.country,
          arrival: '',
          departure: '',
        }),
      });
      const newStop = {
        id: res.data.id,
        cityName: res.data.city,
        country: res.data.country,
        startDate: res.data.arrival,
        endDate: res.data.departure,
        activities: [],
      };
      setStops((prev) => [...prev, newStop]);
      toast.success(`${city.name} added to your trip.`);
    } catch {
      // Local fallback stop
      const newStop = {
        id: `stop-${Date.now()}`,
        cityName: city.name,
        country: city.country,
        startDate: '',
        endDate: '',
        activities: [],
      };
      setStops((prev) => [...prev, newStop]);
      toast.success(`${city.name} added to your trip.`);
    }
  };

  // Reorder Stops Handlers
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
    } catch {
      // Keep optimistic UI
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
    } catch {
      // Keep optimistic UI
    }
  };

  // Remove City Stop
  const handleRemoveStop = async (stopId) => {
    try {
      await apiRequest(`/trips/stops/${stopId}`, { method: 'DELETE' });
    } catch {
      // Ignore backend delete failure for local stops
    }
    setStops((prev) => prev.filter((s) => s.id !== stopId));
    toast.success('Stop removed.');
  };

  // Update Stop Dates
  const handleUpdateDates = async (stopId, startDate, endDate) => {
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      toast.error('End date must be after start date.');
      return;
    }
    try {
      const res = await apiRequest(`/trips/stops/${stopId}`, {
        method: 'PUT',
        body: JSON.stringify({ arrival: startDate, departure: endDate }),
      });
      setStops((prev) =>
        prev.map((s) =>
          s.id === stopId
            ? { ...s, startDate: res.data.arrival, endDate: res.data.departure }
            : s
        )
      );
    } catch {
      setStops((prev) =>
        prev.map((s) =>
          s.id === stopId ? { ...s, startDate, endDate } : s
        )
      );
    }
  };

  // Add Activity Handler
  const handleAddActivity = async (activity, stopId) => {
    try {
      const res = await apiRequest('/activities', {
        method: 'POST',
        body: JSON.stringify({
          tripStopId: stopId,
          name: activity.name,
          category: activity.type,
          cost: activity.estimatedCost,
          duration: activity.duration,
          description: activity.description || '',
        }),
      });
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
    } catch {
      const newActivity = {
        id: `act-${Date.now()}`,
        name: activity.name,
        type: activity.type,
        duration: activity.duration,
        estimatedCost: activity.estimatedCost,
      };
      setStops((prev) =>
        prev.map((s) =>
          s.id === stopId ? { ...s, activities: [...s.activities, newActivity] } : s
        )
      );
    }
  };

  // Remove Activity Handler
  const handleRemoveActivity = async (stopId, activityId) => {
    try {
      await apiRequest(`/activities/${activityId}`, { method: 'DELETE' });
    } catch {
      // Keep local remove
    }
    setStops((prev) =>
      prev.map((s) =>
        s.id === stopId
          ? { ...s, activities: s.activities.filter((a) => a.id !== activityId) }
          : s
      )
    );
  };

  // Save Journey Handler
  const handleSaveJourney = () => {
    if (!trip?.tripName) {
      toast.error('Please give your journey a name first.');
      return;
    }
    toast.success(`Journey "${trip.tripName}" saved successfully!`);
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
        <span className="text-slate-600 loading-spinner animate-spin h-12 w-12 border-4 border-teal-600 border-t-transparent rounded-full"></span>
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
        cityName={activeStopForActivity?.cityName}
        onAddActivity={(activity) => handleAddActivity(activity, activeStopForActivity?.id)}
      />
    </div>
  );
};

export default ItineraryBuilderPage;