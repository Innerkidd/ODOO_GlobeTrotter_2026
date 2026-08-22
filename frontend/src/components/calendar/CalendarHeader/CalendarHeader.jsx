import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass, CalendarDays, MapPin, Pencil, Share2 } from 'lucide-react';

const CalendarHeader = ({
  tripTitle = 'European Summer Journey',
  dates = '12 Aug — 20 Aug 2026',
  totalDays = 8,
  stopsCount = 3,
  tripId = 'trip-101',
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LEFT: Back to Itinerary & Logo */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(`/trips/${tripId}/itinerary/view`)}
            className="group flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:border-slate-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-600"
            aria-label="Back to Itinerary"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-slate-500 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Back to Itinerary</span>
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <Link
            to="/"
            className="hidden sm:flex items-center gap-2 transition-transform hover:opacity-90 focus-visible:outline-2 focus-visible:outline-teal-600 rounded-lg p-0.5"
            aria-label="GlobeTrotter Home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-xs">
              <Compass className="h-4 w-4" />
            </div>
            <span className="font-heading text-lg font-extrabold tracking-tight text-slate-900 hidden md:inline">
              Globe<span className="text-teal-600">Trotter</span>
            </span>
          </Link>
        </div>

        {/* CENTER: Trip Overview */}
        <div className="flex flex-col items-center text-center truncate max-w-xs sm:max-w-md">
          <span className="truncate font-heading text-sm sm:text-base font-extrabold text-slate-900">
            {tripTitle}
          </span>
          <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3 text-teal-600" />
              {dates}
            </span>
            <span>•</span>
            <span>{totalDays} Days</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-emerald-600" />
              {stopsCount} Cities
            </span>
          </div>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/trips/${tripId}/share`)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:text-teal-700 cursor-pointer"
            aria-label="Share Trip"
          >
            <Share2 className="h-3.5 w-3.5 text-teal-600" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            type="button"
            onClick={() => navigate(`/trips/${tripId}/itinerary`)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 focus-visible:outline-2 focus-visible:outline-teal-600 active:scale-95 cursor-pointer"
            aria-label="Edit Itinerary"
          >
            <Pencil className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default CalendarHeader;
