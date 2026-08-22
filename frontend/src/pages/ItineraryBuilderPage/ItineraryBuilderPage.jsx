import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import DashboardNavbar from '../../components/dashboard/DashboardNavbar/DashboardNavbar';
import Footer from '../../components/common/Footer/Footer';
import TripOverviewHeader from '../../components/itinerary/TripOverviewHeader/TripOverviewHeader';
import CityStopsList from '../../components/itinerary/CityStopsList/CityStopsList';
import CitySearchModal from '../../components/itinerary/CitySearchModal/CitySearchModal';
import ActivitySearchModal from '../../components/itinerary/ActivitySearchModal/ActivitySearchModal';

const ItineraryBuilderPage = () => {
  const { tripId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const initialTrip = location.state?.tripDraft || {
    id: tripId,
    tripName: 'My Personalized Journey',
    startDate: '',
    endDate: '',
    description: '',
    coverPhotoPreviewUrl: null,
  };

  const [trip] = useState(initialTrip);
  const [stops, setStops] = useState([]);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [activeStopForActivity, setActiveStopForActivity] = useState(null);

  // Add City Stop Handler
  const handleAddCity = (city) => {
    const newStop = {
      id: crypto.randomUUID(),
      city: city.name,
      country: city.country,
      startDate: trip.startDate || '',
      endDate: trip.endDate || '',
      activities: [],
    };
    setStops((prev) => [...prev, newStop]);
    toast.success(`Added ${city.name} to your itinerary.`);
  };

  // Reorder Stops Handlers
  const handleMoveUp = (index) => {
    if (index === 0) return;
    setStops((prev) => {
      const updated = [...prev];
      const temp = updated[index - 1];
      updated[index - 1] = updated[index];
      updated[index] = temp;
      return updated;
    });
  };

  const handleMoveDown = (index) => {
    if (index === stops.length - 1) return;
    setStops((prev) => {
      const updated = [...prev];
      const temp = updated[index + 1];
      updated[index + 1] = updated[index];
      updated[index] = temp;
      return updated;
    });
  };

  // Remove City Stop Handler
  const handleRemoveStop = (stopId) => {
    setStops((prev) => prev.filter((s) => s.id !== stopId));
    toast.info('City stop removed.');
  };

  // Update Stop Dates Handler
  const handleUpdateDates = (stopId, field, value) => {
    setStops((prev) =>
      prev.map((s) => (s.id === stopId ? { ...s, [field]: value } : s))
    );
  };

  // Add Activity Handler
  const handleAddActivity = (activity) => {
    if (!activeStopForActivity) return;

    setStops((prev) =>
      prev.map((s) => {
        if (s.id === activeStopForActivity.id) {
          return {
            ...s,
            activities: [...s.activities, { ...activity, id: crypto.randomUUID() }],
          };
        }
        return s;
      })
    );
    toast.success(`Added ${activity.name} to ${activeStopForActivity.city}.`);
  };

  // Remove Activity Handler
  const handleRemoveActivity = (stopId, activityId) => {
    setStops((prev) =>
      prev.map((s) => {
        if (s.id === stopId) {
          return {
            ...s,
            activities: s.activities.filter((a) => a.id !== activityId),
          };
        }
        return s;
      })
    );
  };

  // Save Journey Handler
  const handleSaveJourney = () => {
    toast.success(`Journey "${trip.tripName}" saved successfully!`);
    navigate('/dashboard');
  };

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
        cityName={activeStopForActivity?.city}
        onAddActivity={handleAddActivity}
      />
    </div>
  );
};

export default ItineraryBuilderPage;
