import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass, Wallet } from 'lucide-react';

const BudgetHeader = ({ tripTitle = 'European Summer Journey', dates = '12 Aug — 20 Aug 2026', tripId = 'trip-101' }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LEFT: Logo & Back Link */}
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

        {/* CENTER: Title & Dates */}
        <div className="flex flex-col items-center text-center truncate max-w-xs sm:max-w-md">
          <span className="truncate font-heading text-sm sm:text-base font-extrabold text-slate-900">
            {tripTitle}
          </span>
          <span className="text-[11px] font-medium text-slate-500">{dates}</span>
        </div>

        {/* RIGHT: Budget Badge */}
        <div className="flex items-center gap-2 rounded-xl bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700 border border-teal-200/60">
          <Wallet className="h-4 w-4 text-teal-600" />
          <span className="hidden sm:inline">Budget Breakdown</span>
        </div>

      </div>
    </header>
  );
};

export default BudgetHeader;
