import React from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const TripHeader = ({ trip }) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
      <div className="flex flex-col gap-6">
        
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

      </div>
    </div>
  );
};

export default TripHeader;
