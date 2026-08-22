import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Tag, MapPin, Sparkles } from 'lucide-react';

const CalendarDayCard = ({ day, currency = '₹', defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const activities = day.activities || [];
  const hasActivities = activities.length > 0;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-slate-300 space-y-4">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 font-heading text-xs font-bold text-white shadow-2xs shrink-0">
            D{day.dayNumber}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-base font-bold text-slate-900">{day.date}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
                <MapPin className="h-3 w-3 text-emerald-600" />
                {day.city}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {hasActivities ? `${activities.length} ${activities.length === 1 ? 'Activity' : 'Activities'} Planned` : 'Free Day'}
            </p>
          </div>
        </div>

        {/* Expand / Collapse Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
        >
          <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Collapsed Activity Badges Summary */}
      {!isExpanded && (
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
          {hasActivities ? (
            activities.map((act) => (
              <span
                key={act.id}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
              >
                <span className="font-semibold text-teal-700">{act.time}</span>
                <span>{act.name}</span>
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400 italic">No activities planned for this day.</span>
          )}
        </div>
      )}

      {/* Expanded Activity Schedule List */}
      {isExpanded && (
        <div className="space-y-3 pt-2 border-t border-slate-100">
          {hasActivities ? (
            activities.map((act) => (
              <div
                key={act.id}
                className="rounded-xl border border-slate-200/60 bg-slate-50/60 p-3.5 space-y-1.5 transition-all hover:bg-slate-50"
              >
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-teal-700 font-bold">
                      <Clock className="h-3.5 w-3.5" />
                      {act.time}
                    </span>
                    <span className="text-slate-900 font-bold">{act.name}</span>
                  </div>
                  <span className="text-slate-900 font-extrabold">
                    {act.cost > 0 ? `${currency}${act.cost.toLocaleString()}` : 'Free'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-teal-700 font-medium">
                      <Tag className="h-3 w-3" />
                      {act.category}
                    </span>
                    <span>•</span>
                    <span>{act.duration}</span>
                  </div>
                  {act.notes && (
                    <p className="text-xs text-slate-600 italic truncate max-w-xs">{act.notes}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-xs text-slate-500 rounded-xl bg-slate-50 border border-dashed border-slate-200">
              <Sparkles className="h-4 w-4 text-teal-500 mx-auto mb-1" />
              <span>No activities scheduled. Enjoy your free day in {day.city}!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarDayCard;
