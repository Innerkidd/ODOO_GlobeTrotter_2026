import React from 'react';
import { Clock, Tag, Trash2 } from 'lucide-react';

const ActivityItem = ({ activity, onRemove }) => {
  return (
    <div className="group flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-3 shadow-2xs transition-all hover:border-slate-300">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600 font-semibold text-xs shrink-0">
          Act
        </div>
        <div>
          <h5 className="text-xs sm:text-sm font-semibold text-slate-900">{activity.name}</h5>
          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1 text-teal-700 font-medium">
              <Tag className="h-3 w-3" />
              {activity.category}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {activity.duration}
            </span>
            <span>•</span>
            <span className="font-semibold text-slate-700">{activity.cost}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRemove(activity.id)}
        className="rounded-lg p-1.5 text-slate-400 opacity-80 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
        title="Remove Activity"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ActivityItem;
