import React from 'react';
import { Clock, Tag, MapPin } from 'lucide-react';

const TimelineItem = ({ activity, currency = '₹', isLast = false }) => {
  return (
    <div className="relative pl-6 pb-6 last:pb-0">
      {/* Vertical Connecting Line */}
      {!isLast && (
        <div className="absolute top-3 left-[9px] h-full w-0.5 bg-teal-200" />
      )}

      {/* Circle Timeline Node */}
      <div className="absolute top-1.5 left-0 flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 ring-4 ring-teal-50">
        <div className="h-1.5 w-1.5 rounded-full bg-white" />
      </div>

      {/* Timeline Card */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs space-y-2 transition-all hover:border-slate-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-700">
              <Clock className="h-3 w-3" />
              {activity.time}
            </span>
            <h4 className="font-heading text-sm sm:text-base font-bold text-slate-900">
              {activity.name}
            </h4>
          </div>
          <span className="font-heading text-sm font-extrabold text-slate-900 shrink-0">
            {activity.cost > 0 ? `${currency}${activity.cost.toLocaleString()}` : 'Free'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 font-semibold text-teal-700">
            <Tag className="h-3 w-3" />
            {activity.category}
          </span>
          <span>•</span>
          <span>{activity.duration}</span>
        </div>

        {activity.notes && (
          <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 italic">
            {activity.notes}
          </p>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;
