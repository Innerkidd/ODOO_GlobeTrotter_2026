import React from 'react';
import { Clock, Tag } from 'lucide-react';

const ActivityBlock = ({ activity, currency = '€' }) => {
  const { name, time, duration, cost, category, notes } = activity;

  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs transition-all hover:border-teal-300 hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        
        {/* Left: Time & Activity Info */}
        <div className="space-y-1.5 max-w-xl">
          
          {/* Time & Category Row */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1 text-teal-700 font-bold bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
              <Clock className="h-3.5 w-3.5 text-teal-600" />
              {time || 'Time not set'}
            </span>

            {duration && (
              <span className="text-slate-400 font-normal">• {duration}</span>
            )}

            {category && (
              <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                <Tag className="h-3 w-3 text-slate-400" />
                {category}
              </span>
            )}
          </div>

          {/* Activity Title */}
          <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
            {name}
          </h3>

          {/* Notes / Description */}
          {notes && (
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {notes}
            </p>
          )}

        </div>

        {/* Right: Cost Tag */}
        <div className="flex items-center justify-between sm:flex-col sm:items-end border-t border-slate-100 pt-2 sm:border-t-0 sm:pt-0 shrink-0">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Est. Cost
          </span>
          <span className="font-heading text-base sm:text-lg font-extrabold text-slate-900">
            {cost !== undefined && cost !== null
              ? cost === 0
                ? 'Free'
                : `${currency}${cost}`
              : 'N/A'}
          </span>
        </div>

      </div>
    </div>
  );
};

export default ActivityBlock;
