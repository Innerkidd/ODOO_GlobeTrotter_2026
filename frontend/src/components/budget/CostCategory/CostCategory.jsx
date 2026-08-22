import React from 'react';
import { Hotel, Car, Ticket, Utensils } from 'lucide-react';

const iconMap = {
  Hotel: Hotel,
  Car: Car,
  Ticket: Ticket,
  Utensils: Utensils,
};

const CostCategory = ({ categories = [], currency = '€' }) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
      <div>
        <h3 className="font-heading text-lg font-bold text-slate-900">Cost Breakdown by Category</h3>
        <p className="text-xs text-slate-500">Expense distribution across travel essentials</p>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => {
          const IconComponent = iconMap[cat.icon] || Ticket;

          return (
            <div key={cat.id} className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: cat.color }}
                  >
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <span className="font-semibold text-slate-800">{cat.name}</span>
                </div>
                <div className="flex items-center gap-3 font-semibold">
                  <span className="text-slate-900">{currency}{cat.amount.toLocaleString()}</span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                    {cat.percentage}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full transition-all duration-500 rounded-full"
                  style={{
                    width: `${cat.percentage}%`,
                    backgroundColor: cat.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CostCategory;
