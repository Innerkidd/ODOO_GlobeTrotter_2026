import React from 'react';
import { List, Calendar as CalendarIcon } from 'lucide-react';

const ViewModeToggle = ({ activeView = 'list', onViewChange }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* Label */}
      <span className="text-xs sm:text-sm font-semibold text-slate-600">
        View Mode:
      </span>

      {/* Segmented Buttons Container */}
      <div
        className="inline-flex rounded-xl border border-slate-200 bg-slate-100/80 p-1 shadow-inner"
        role="group"
        aria-label="Itinerary View Mode Toggle"
      >
        {/* List View Button */}
        <button
          type="button"
          onClick={() => onViewChange('list')}
          className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer select-none ${
            activeView === 'list'
              ? 'bg-white text-teal-700 shadow-sm shadow-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
          aria-pressed={activeView === 'list'}
        >
          <List className="h-4 w-4" />
          <span>List View</span>
        </button>

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
          <CalendarIcon className="h-4 w-4" />
          <span>Calendar View</span>
        </button>
      </div>
    </div>
  );
};

export default ViewModeToggle;
