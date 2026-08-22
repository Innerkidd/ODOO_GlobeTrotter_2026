import React from 'react';
import { MapPin, Calendar, Sparkles } from 'lucide-react';
import TimelineItem from '../TimelineItem/TimelineItem';

const TimelineView = ({ days = [], currency = '₹' }) => {
  return (
    <div className="space-y-8">
      {days.map((day) => {
        const activities = day.activities || [];
        const hasActivities = activities.length > 0;

        return (
          <div key={day.dayNumber} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-5">
            {/* Day & City Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 font-heading text-xs font-bold text-white shadow-2xs shrink-0">
                  Day {day.dayNumber}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>{day.city}</span>
                    <span className="text-xs text-slate-500 font-normal">({day.country})</span>
                  </h3>
                  <p className="text-xs font-medium text-slate-500">{day.date}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/80 self-start sm:self-auto">
                <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                {day.city} Stop
              </span>
            </div>

            {/* Timeline Vertical Progression */}
            {hasActivities ? (
              <div className="pt-2">
                {activities.map((act, index) => (
                  <TimelineItem
                    key={act.id}
                    activity={act}
                    currency={currency}
                    isLast={index === activities.length - 1}
                  />
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-500 rounded-xl bg-slate-50 border border-dashed border-slate-200">
                <Sparkles className="h-4 w-4 text-teal-500 mx-auto mb-1.5" />
                <span>No activities planned for this day. Free time to explore {day.city}!</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TimelineView;
