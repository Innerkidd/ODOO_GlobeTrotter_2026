import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const ShareHeader = ({
  tripTitle = 'European Summer Journey',
  dates = '12 Aug — 20 Aug 2026',
  stopsCount = 3,
  totalActivities = 8,
  tripId = 'trip-101',
}) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 space-y-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(`/trips/${tripId}/itinerary/view`)}
          className="group flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:border-slate-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-600"
          aria-label="Back to Itinerary"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-slate-500 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Back to Itinerary</span>
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 border border-teal-200/60">
          <Share2 className="h-3.5 w-3.5 text-teal-600" />
          Share Journey
        </span>
      </div>

      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Share {tripTitle}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Get a shareable link to send to friends or preview the public read-only view.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-600 border-t border-slate-100 pt-3">
        <div className="flex items-center gap-1.5 text-slate-700">
          <Calendar className="h-4 w-4 text-teal-600 shrink-0" />
          <span>{dates}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-700">
          <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{stopsCount} {stopsCount === 1 ? 'City' : 'Cities'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-700">
          <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
          <span>{totalActivities} {totalActivities === 1 ? 'Activity' : 'Activities'}</span>
        </div>
      </div>
    </div>
  );
};

export default ShareHeader;
