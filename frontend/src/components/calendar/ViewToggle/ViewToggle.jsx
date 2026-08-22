import React from 'react';
import { CalendarDays, GitCommitHorizontal } from 'lucide-react';

const ViewToggle = ({ activeView = 'calendar', onViewChange }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* Label */}
      <span className="text-xs sm:text-sm font-semibold text-slate-600">
        Schedule Presentation:
      </span>

      {/* Segmented Buttons Container */}
      <div
        className="inline-flex rounded-xl border border-slate-200 bg-slate-100/80 p-1 shadow-inner"
        role="group"
        aria-label="Schedule Presentation Mode Toggle"
      >
        {/* Calendar View Button */}
        <button
          type="button"
          onClick={() => onViewChange('calendar')}
          className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer select-none ${
            activeView === 'calendar'
              ? 'bg-white text-teal-700 shadow-sm shadow-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
          aria-pressed={activeView === 'calendar'}
        >
          <CalendarDays className="h-4 w-4" />
          <span>Calendar View</span>
        </button>

        {/* Timeline View Button */}
        <button
          type="button"
          onClick={() => onViewChange('timeline')}
          className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer select-none ${
            activeView === 'timeline'
              ? 'bg-white text-teal-700 shadow-sm shadow-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
          aria-pressed={activeView === 'timeline'}
        >
          <GitCommitHorizontal className="h-4 w-4" />
          <span>Timeline View</span>
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;
