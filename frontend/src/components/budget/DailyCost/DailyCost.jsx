import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import BudgetStatus from '../BudgetStatus/BudgetStatus';

const DailyCost = ({ dailyBreakdown = [], currency = '€' }) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
      <div>
        <h3 className="font-heading text-lg font-bold text-slate-900">Daily Cost & Budget Status</h3>
        <p className="text-xs text-slate-500">Day-by-day estimated spending and budget alerts</p>
      </div>

      <div className="space-y-3">
        {dailyBreakdown.map((item) => (
          <div
            key={item.dayNumber}
            className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 gap-3 transition-all hover:bg-slate-50"
          >
            {/* Left: Day & City */}
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 font-heading text-xs font-bold text-white shadow-2xs shrink-0">
                Day {item.dayNumber}
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{item.city}</span>
                  <span className="text-xs font-normal text-slate-500">({item.date})</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Base allocation: {currency}{item.baseAllocation} • Activities: {currency}{item.activitiesCost}
                </p>
              </div>
            </div>

            {/* Right: Daily Total & Status Badge */}
            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 border-slate-200/60 pt-2 sm:pt-0">
              <span className="font-heading text-base font-extrabold text-slate-900">
                {currency}{item.totalCost.toLocaleString()}
              </span>
              <BudgetStatus isOverBudget={item.isOverBudget} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyCost;
