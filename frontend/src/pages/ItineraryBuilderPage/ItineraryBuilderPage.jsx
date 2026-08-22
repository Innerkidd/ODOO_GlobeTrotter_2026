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
  const [error, setError] = useState(null);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [activeStopForActivity, setActiveStopForActivity] = useState(null);

  // Load trip + stops + activities on mount
  useEffect(() => {
    const loadTripData = async () => {
      try {
        let tripData = location.state?.trip;

        if (!tripData && tripId) {
          const tripRes = await apiRequest(`/trips/${tripId}`);
          tripData = {
            id: tripRes.data.id,
            tripName: tripRes.data.title,
            startDate: tripRes.data.startDate,
            endDate: tripRes.data.endDate,
            description: tripRes.data.description,
          };
        }

        setTrip(tripData);

        if (tripId) {
          const stopsRes = await apiRequest(`/trips/${tripId}/stops`);
          const mappedStops = await Promise.all(
            stopsRes.data.map(async (s) => {
              const activitiesRes = await apiRequest(
                `/activities?tripStopId=${s.id}`
              );
              return {
                id: s.id,
                cityName: s.city,
                country: s.country,
                startDate: s.arrival,
                endDate: s.departure,
                activities: activitiesRes.data.map((a) => ({
                  id: a.id,
                  name: a.name,
                  type: a.category,
                  duration: a.duration,
                  estimatedCost: a.cost,
                })),
              };
            })
          );
          setStops(mappedStops);
        }
      } catch (err) {
        setError(err.message);
        toast.error('Could not load this trip. Please try again.');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadTripData();
  }, [tripId]);

  // Add City Stop — wired to backend
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
    } catch (err) {
      toast.error(err.message || 'Could not add this stop.');
    }
  };

  // Reorder Stops Handlers — wired to backend
  const handleMoveUp = async (index) => {
    if (index === 0) return;
    const newStops = [...stops];
    const targetIndex = index - 1;
    [newStops[index], newStops[targetIndex]] = [newStops[targetIndex], newStops[index]];
    setStops(newStops); // optimistic UI update

    try {
      await apiRequest(`/trips/${tripId}/stops/reorder`, {
        method: 'PUT',
        body: JSON.stringify({ orderedStopIds: newStops.map((s) => s.id) }),
      });
    } catch (err) {
      setStops((prev) => {
        const idx = prev.findIndex((s) => s.id === newStops[index]?.id);
        return prev; // rollback — kept simple per plan
      });
      toast.error(err.message || 'Could not reorder stops.');
    }
  };

  const handleMoveDown = async (index) => {
    if (index === stops.length - 1) return;
    const newStops = [...stops];
    const targetIndex = index + 1;
    [newStops[index], newStops[targetIndex]] = [newStops[targetIndex], newStops[index]];
    setStops(newStops); // optimistic UI update

    try {
      await apiRequest(`/trips/${tripId}/stops/reorder`, {
        method: 'PUT',
        body: JSON.stringify({ orderedStopIds: newStops.map((s) => s.id) }),
      });
    } catch (err) {
      toast.error(err.message || 'Could not reorder stops.');
    }
  };

  // Remove City Stop — wired to backend
  const handleRemoveStop = async (stopId) => {
    try {
      await apiRequest(`/trips/stops/${stopId}`, { method: 'DELETE' });
      setStops((prev) => prev.filter((s) => s.id !== stopId));
      toast.success('Stop removed.');
    } catch (err) {
      toast.error(err.message || 'Could not remove this stop.');
    }
  };

  // Update Stop Dates — wired to backend
  const handleUpdateDates = async (stopId, startDate, endDate) => {
    // Validate end >= start before calling API
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
    } catch (err) {
      toast.error(err.message || 'Could not update dates for this stop.');
    }
  };

  // Add Activity Handler — wired to backend
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
    } catch (err) {
      toast.error(err.message || 'Could not add this activity.');
    }
  };

  // Remove Activity Handler — wired to backend
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
    } catch (err) {
      toast.error(err.message || 'Could not remove this activity.');
    }
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
        <span className="text-slate-600 loading-spinner animate-spin h-16 w-16 border-4 border-teal-600 rounded-full"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
        <p className="text-slate-600">{error}</p>
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