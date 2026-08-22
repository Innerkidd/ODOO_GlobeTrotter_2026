import React from 'react';
import { Clock, Tag } from 'lucide-react';

const PublicTripActivity = ({ activity, currency = '₹' }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-200/70 bg-white p-3.5 gap-2 transition-all hover:border-slate-300">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-700">
            <Clock className="h-3 w-3" />
            {activity.time}
          </span>
          <h5 className="font-heading text-xs sm:text-sm font-bold text-slate-900">{activity.name}</h5>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 font-medium text-teal-700">
            <Tag className="h-3 w-3" />
            {activity.category}
          </span>
          <span>•</span>
          <span>{activity.duration}</span>
        </div>
        {activity.notes && (
          <p className="text-xs text-slate-600 italic">{activity.notes}</p>
        )}
      </div>

      <div className="self-end sm:self-center font-heading text-xs sm:text-sm font-extrabold text-slate-900 shrink-0">
        {activity.cost > 0 ? `${currency}${activity.cost.toLocaleString()}` : 'Free'}
      </div>
    </div>
  );
};

export default PublicTripActivity;
