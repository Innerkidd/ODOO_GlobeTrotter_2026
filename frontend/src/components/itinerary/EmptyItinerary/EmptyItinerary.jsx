import React from 'react';
import { Compass, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const EmptyItinerary = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const targetTripId = tripId || 'trip-101';

  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-10 sm:p-14 text-center shadow-xs">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
        <Compass className="h-7 w-7 animate-spin-slow" />
      </div>

      <h2 className="font-heading text-xl font-bold text-slate-900 sm:text-2xl">
        Your itinerary is empty
      </h2>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        Add destinations and activities in the Itinerary Builder to start reviewing your personalized journey.
      </p>

      <button
        type="button"
        onClick={() => navigate(`/trips/${targetTripId}/itinerary`)}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 active:scale-95 cursor-pointer"
      >
        <Plus className="h-4 w-4" />
        <span>Back to Itinerary Builder</span>
      </button>
    </div>
  );
};

export default EmptyItinerary;
