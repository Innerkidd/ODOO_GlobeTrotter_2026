import React from 'react';
import { Plus, Sparkles } from 'lucide-react';

const WelcomeHeader = ({ userName = 'Traveler', onPlanNewTrip }) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-teal-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        {/* Left Copy */}
        <div>
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span>Travel Dashboard</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Welcome back, {userName} 👋
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-slate-600">
            Ready to plan your next adventure? Organize stops, daily activities, and trip budgets.
          </p>
        </div>

        {/* Right CTA Button */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onPlanNewTrip}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-teal-600 active:scale-95 sm:w-auto cursor-pointer"
            aria-label="Plan New Trip"
          >
            <Plus className="h-4 w-4 transition-transform group-hover:rotate-90 duration-200" />
            <span>Plan New Trip</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
