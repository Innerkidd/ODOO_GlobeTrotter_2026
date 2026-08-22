import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const DateNavigation = ({ currentDateIndex, totalDays, currentDay, onPrev, onNext }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs">
      <button
        type="button"
        disabled={currentDateIndex === 0}
        onClick={onPrev}
        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Prev Day</span>
      </button>

      <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
        <Calendar className="h-4 w-4 text-teal-600" />
        <span>
          Day {currentDay.dayNumber} of {totalDays} — {currentDay.city} ({currentDay.date})
        </span>
      </div>

      <button
        type="button"
        disabled={currentDateIndex === totalDays - 1}
        onClick={onNext}
        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
      >
        <span>Next Day</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default DateNavigation;
