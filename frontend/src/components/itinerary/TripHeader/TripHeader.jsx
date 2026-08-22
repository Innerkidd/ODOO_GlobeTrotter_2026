import React from 'react';
import { Calendar, MapPin, CheckCircle2, Pencil, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const TripHeader = ({ trip }) => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const targetTripId = tripId || trip?.id || 'trip-101';

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Left Info Column */}
        <div className="space-y-3">
          
          {/* Tag / Category Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-600 animate-pulse" />
            <span>Itinerary Overview</span>
          </div>

          {/* Trip Title */}
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            {trip?.title || 'Trip Itinerary'}
          </h1>

          {/* Key Trip Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-600">
            
            {/* Dates */}
            <div className="flex items-center gap-1.5 text-slate-700">
              <Calendar className="h-4 w-4 text-teal-600 shrink-0" />
              <span>{trip?.formattedDates || 'Dates not set'}</span>
            </div>

            {/* Stops */}
            <div className="flex items-center gap-1.5 text-slate-700">
              <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>
                {trip?.stopsCount || 0} {trip?.stopsCount === 1 ? 'City' : 'Cities'}
              </span>
            </div>

            {/* Total Activities */}
            <div className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
              <span>
                {trip?.totalActivities || 0} {trip?.totalActivities === 1 ? 'Activity' : 'Activities'}
              </span>
            </div>

          </div>
        </div>

        {/* Right Actions Column */}
        <div className="flex items-center gap-3 shrink-0 border-t border-slate-100 pt-4 lg:border-t-0 lg:pt-0">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-teal-600 cursor-pointer active:scale-95"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="h-4 w-4 text-slate-500" />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => navigate(`/trips/${targetTripId}/itinerary`)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 focus-visible:outline-2 focus-visible:outline-teal-600 cursor-pointer active:scale-95"
            aria-label="Edit Itinerary"
          >
            <Pencil className="h-4 w-4" />
            <span>Edit Itinerary</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default TripHeader;
