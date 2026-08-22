import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const TripCard = ({ trip, onViewTrip }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-md">
      {/* Cover Image Container */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider shadow-2xs backdrop-blur-xs ${
              trip.status === 'Upcoming'
                ? 'bg-teal-500/90 text-white'
                : 'bg-slate-800/90 text-slate-200'
            }`}
          >
            {trip.status}
          </span>
        </div>

        {/* Title overlay on image bottom */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-heading text-lg font-bold text-white drop-shadow-xs">
            {trip.title}
          </h3>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="space-y-2.5">
          {/* Destinations summary */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <MapPin className="h-3.5 w-3.5 text-teal-600 shrink-0" />
            <span className="truncate">{trip.destinations.join(' · ')}</span>
          </div>

          {/* Dates */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>
              {trip.startDate} — {trip.endDate}
            </span>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-5 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => onViewTrip(trip)}
            className="flex w-full items-center justify-between text-xs font-semibold text-teal-600 transition-colors hover:text-teal-700 cursor-pointer"
          >
            <span>View Trip Details</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
