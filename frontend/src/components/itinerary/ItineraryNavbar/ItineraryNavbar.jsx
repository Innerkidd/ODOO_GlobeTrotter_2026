import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Compass, ArrowLeft, Pencil, Wallet } from 'lucide-react';

const ItineraryNavbar = ({ tripTitle = 'Trip Itinerary' }) => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const targetTripId = tripId || 'trip-101';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LEFT: Logo & Back Link */}
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="group flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:border-slate-300 focus-visible:outline-2 focus-visible:outline-teal-600"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-slate-500 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <div className="h-4 w-px bg-slate-200" />

          <Link
            to="/"
            className="flex items-center gap-2 transition-transform hover:opacity-90 focus-visible:outline-2 focus-visible:outline-teal-600 rounded-lg p-0.5"
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

        {/* CENTER: Trip Breadcrumb */}
        <div className="flex items-center gap-2 truncate max-w-xs sm:max-w-md">
          <span className="text-xs font-medium text-slate-400">Viewing:</span>
          <span className="truncate text-sm font-bold text-slate-800 font-heading">
            {tripTitle}
          </span>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/trips/${targetTripId}/budget`)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:text-teal-700 cursor-pointer"
            aria-label="View Budget"
          >
            <Wallet className="h-3.5 w-3.5 text-teal-600" />
            <span>Budget</span>
          </button>

          <button
            type="button"
            onClick={() => navigate(`/trips/${targetTripId}/itinerary`)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 focus-visible:outline-2 focus-visible:outline-teal-600 active:scale-95 cursor-pointer"
            aria-label="Edit Itinerary"
          >
            <Pencil className="h-3.5 w-3.5" />
            <span>Edit Itinerary</span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default ItineraryNavbar;
