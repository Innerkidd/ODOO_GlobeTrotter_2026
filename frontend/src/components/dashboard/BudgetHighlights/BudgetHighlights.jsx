import React from 'react';
import { Wallet, PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import EmptyState from '../../common/EmptyState/EmptyState';

const BudgetHighlights = ({ budget = {} }) => {
  const currency = budget.currency || '₹';
  const total = budget.totalBudget || 0;
  const planned = budget.plannedAmount || 0;
  const remaining = budget.remainingAmount || 0;
  const percentPlanned = total > 0 ? Math.round((planned / total) * 100) : 0;
  const categories = budget.categories || [];

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
            <Wallet className="h-4 w-4" />
          </div>
          <h2 className="font-heading text-xl font-bold text-slate-900">
            Budget Highlights
          </h2>
        </div>
        <span className="text-xs font-medium text-slate-500">
          Estimated Overview
        </span>
      </div>

      {/* Main Container Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          
          {/* LEFT: 3 Stat Callout Cards */}
          <div className="space-y-6 lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              
              {/* Total Budget Card */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <p className="text-xs font-medium text-slate-500">Total Budget</p>
                <p className="mt-1 font-heading text-2xl font-extrabold text-slate-900">
                  {currency}{total.toLocaleString()}
                </p>
                <p className="mt-1 text-[11px] text-slate-400">All allocated trips</p>
              </div>

              {/* Planned Card */}
              <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-4">
                <p className="text-xs font-medium text-teal-800">Planned Costs</p>
                <p className="mt-1 font-heading text-2xl font-extrabold text-teal-700">
                  {currency}{planned.toLocaleString()}
                </p>
                <p className="mt-1 text-[11px] font-semibold text-teal-600">
                  {percentPlanned}% of total
                </p>
              </div>

              {/* Remaining Card */}
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                <p className="text-xs font-medium text-emerald-800">Remaining</p>
                <p className="mt-1 font-heading text-2xl font-extrabold text-emerald-700">
                  {currency}{remaining.toLocaleString()}
                </p>
                <p className="mt-1 text-[11px] font-semibold text-emerald-600">
                  Available to plan
                </p>
              </div>

            </div>

            {/* Overall Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Budget Allocated</span>
                <span>{percentPlanned}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${percentPlanned}%` }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Category Breakdown */}
          <div className="flex flex-col items-center justify-center border-t border-slate-100 pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            {categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                  <PieIcon className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold text-slate-700">No expense categories yet</p>
                <p className="text-[11px] text-slate-400 mt-1">Expenses will be calculated as you add trip activities.</p>
              </div>
            ) : (
              <>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categories}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={4}
                      >
                        {categories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${currency}${value.toLocaleString()}`, 'Amount']}
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          borderColor: '#334155',
                          borderRadius: '0.75rem',
                          color: '#fff',
                          fontSize: '12px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs w-full">
                  {categories.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="truncate text-slate-600">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BudgetHighlights;
