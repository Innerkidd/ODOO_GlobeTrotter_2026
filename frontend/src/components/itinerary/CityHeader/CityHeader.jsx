import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

const CityHeader = ({ dayNumber, date, city, country }) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-3">
      {/* Left: Day & Date */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 font-heading text-sm font-extrabold text-white shadow-xs shrink-0">
          D{dayNumber}
        </div>
        <div>
          <h2 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-slate-900">
            DAY {dayNumber}
          </h2>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Calendar className="h-3.5 w-3.5 text-teal-600" />
            <span>{date}</span>
          </div>
        </div>
      </div>

      {/* Right: City & Country Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3.5 py-1 text-xs font-semibold text-emerald-800 self-start sm:self-auto">
        <MapPin className="h-3.5 w-3.5 text-emerald-600" />
        <span>
          {city.toUpperCase()}, {country ? country.toUpperCase() : ''}
        </span>
      </div>
    </div>
  );
};

export default CityHeader;
