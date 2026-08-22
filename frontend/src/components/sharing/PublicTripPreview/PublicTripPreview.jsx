import React from 'react';
import { Eye, MapPin, Calendar } from 'lucide-react';
import { mockItinerary } from '../../../data/staticData/itineraryData';

const PublicTripPreview = ({ trip = mockItinerary }) => {
  const days = trip.days || [];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
          <Eye className="h-4 w-4 text-teal-600" />
          <span>Public View Preview</span>
        </h3>
        <span className="text-xs text-slate-500 font-medium">Read-Only</span>
      </div>

      {/* Mini Public Card */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="h-3.5 w-3.5 text-teal-600" />
            <span>{trip.formattedDates}</span>
          </div>
          <h4 className="font-heading text-xl font-extrabold text-slate-900">{trip.title}</h4>
        </div>

        <div className="space-y-3">
          {days.slice(0, 3).map((day) => (
            <div key={day.dayNumber} className="rounded-lg bg-white p-3 border border-slate-200/60 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Day {day.dayNumber} — {day.city}</span>
                <span className="text-slate-500">{day.activities.length} activities</span>
              </div>
              {day.activities.slice(0, 2).map((act) => (
                <div key={act.id} className="flex items-center justify-between text-xs text-slate-600 pl-2 border-l-2 border-teal-500">
                  <span>{act.time} · {act.name}</span>
                  <span className="font-semibold text-slate-800">{act.cost > 0 ? `${trip.currency}${act.cost.toLocaleString()}` : 'Free'}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicTripPreview;
