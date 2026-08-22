import React from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import PublicTripActivity from '../PublicTripActivity/PublicTripActivity';

const PublicTripDay = ({ day, currency = '₹' }) => {
  const activities = day.activities || [];
  const hasActivities = activities.length > 0;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
      {/* Day & City Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-600 font-heading text-xs font-bold text-white shadow-2xs shrink-0">
            D{day.dayNumber}
          </span>
          <div>
            <h4 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
              <span>{day.city}</span>
              <span className="text-xs text-slate-500 font-normal">({day.country})</span>
            </h4>
            <p className="text-xs font-medium text-slate-500">{day.date}</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
          <MapPin className="h-3 w-3 text-emerald-600" />
          {day.city}
        </span>
      </div>

      {/* Activity List */}
      {hasActivities ? (
        <div className="space-y-2">
          {activities.map((act) => (
            <PublicTripActivity key={act.id} activity={act} currency={currency} />
          ))}
        </div>
      ) : (
        <div className="py-4 text-center text-xs text-slate-500 rounded-xl bg-slate-50 border border-dashed border-slate-200">
          <Sparkles className="h-4 w-4 text-teal-500 mx-auto mb-1" />
          <span>Free day in {day.city}! No scheduled activities.</span>
        </div>
      )}
    </div>
  );
};

export default PublicTripDay;
