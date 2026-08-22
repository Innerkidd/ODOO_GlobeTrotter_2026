import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { apiRequest } from '../../lib/apiClient';
import AuthLayout from '../../components/auth/AuthLayout/AuthLayout';
import TripForm from '../../components/trips/TripForm/TripForm';

const CreateTripPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auth guard: redirect to login if no token
  useEffect(() => {
    const token = localStorage.getItem('globetrotter_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleTripSubmit = async (data) => {
    setIsSubmitting(true);
    let createdTripId = null;
    let tripForHandoff = null;

    try {
      const res = await apiRequest('/trips', {
        method: 'POST',
        body: JSON.stringify({
          tripName: data.tripName,
          startDate: data.startDate,
          endDate: data.endDate,
          description: data.description || '',
          coverImage: data.coverPhotoPreviewUrl || null,
          isPublic: false,
        }),
      });

      if (res?.data?.id) {
        createdTripId = res.data.id;
        tripForHandoff = {
          id: res.data.id,
          tripName: res.data.title || data.tripName,
          startDate: res.data.startDate || data.startDate,
          endDate: res.data.endDate || data.endDate,
          description: res.data.description || data.description,
          coverPhotoPreviewUrl: data.coverPhotoPreviewUrl || null,
          stops: [],
        };
      }
    } catch (err) {
      console.warn('Backend trip creation warning (using local trip state):', err.message);
      // Fallback for unauthenticated or local state session
      createdTripId = `trip-${Date.now()}`;
      tripForHandoff = {
        id: createdTripId,
        tripName: data.tripName,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description || '',
        coverPhotoPreviewUrl: data.coverPhotoPreviewUrl || null,
        stops: [],
      };
    } finally {
      setIsSubmitting(false);
    }

    if (createdTripId) {
      toast.success('Trip created! Start building your itinerary.');
      navigate(`/trips/${createdTripId}/itinerary`, { state: { trip: tripForHandoff } });
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xs">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Create Your Trip
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Start planning your personalized journey.
        </p>
        <div className="mt-6">
          <TripForm onSubmit={handleTripSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default CreateTripPage;
