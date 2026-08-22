<<<<<<< Updated upstream
import React from 'react';
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../lib/apiClient';

>>>>>>> Stashed changes
import AuthLayout from '../../components/auth/AuthLayout/AuthLayout';
import TripForm from '../../components/trips/TripForm/TripForm';

const CreateTripPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auth guard: redirect to login if no token
  useEffect(() => {
    const token = localStorage.getItem('globetrotter_token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await apiRequest('/trips', {
        method: 'POST',
        body: JSON.stringify({
          tripName: data.tripName,
          startDate: data.startDate,
          endDate: data.endDate,
          description: data.description || '',
          coverImage: null,
          isPublic: false,
        }),
      });

      // res.data is the created Trip row from the backend
      const tripForHandoff = {
        id: res.data.id,                 // REAL backend id
        tripName: res.data.title,        // map back for consistency
        startDate: res.data.startDate,
        endDate: res.data.endDate,
        description: res.data.description,
        coverPhotoPreviewUrl: null,      // frontend-only preview (no upload yet)
        stops: [],
      };

      toast.success('Trip details ready for the next step.');

      // Navigate to itinerary with real trip id
      navigate(`/trips/${res.data.id}/itinerary`, { state: { trip: tripForHandoff } });
    } catch (err) {
      toast.error(err.message || 'Could not create trip. Please try again.');
    } finally {
      setIsSubmitting(false);
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
        <TripForm onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Form fields are handled by TripForm component */}
        </TripForm>
      </div>
    </AuthLayout>
  );
};

<<<<<<< Updated upstream
export default CreateTripPage;
=======
export default CreateTripPage;
>>>>>>> Stashed changes
