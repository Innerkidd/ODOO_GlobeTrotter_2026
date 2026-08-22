import React from 'react';
import { Wallet, Calendar, PiggyBank, TrendingUp } from 'lucide-react';

const BudgetSummary = ({ currency = '€', totalEstimated = 0, averagePerDay = 0, targetBudget = 0, remaining = 0 }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Estimated Total Trip Cost */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Estimated Trip Cost
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
            <Wallet className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <p className="font-heading text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {currency}{totalEstimated.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-500">Total estimated expenses</p>
        </div>
      </div>

      {/* 2. Average Cost Per Day */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Avg Cost / Day
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <Calendar className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <p className="font-heading text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {currency}{averagePerDay.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-500">Per day average spend</p>
        </div>
      </div>

      {/* 3. Target Planned Budget */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Planned Budget
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <PiggyBank className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <p className="font-heading text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {currency}{targetBudget.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-500">Target budget limit</p>
        </div>
      </div>

      {/* 4. Budget Balance / Variance */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Budget Balance
          </span>
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${remaining >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <p className={`font-heading text-2xl font-extrabold ${remaining >= 0 ? 'text-emerald-600' : 'text-rose-600'} sm:text-3xl`}>
            {remaining >= 0 ? '+' : ''}{currency}{remaining.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {remaining >= 0 ? 'Under target budget' : 'Exceeds target budget'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;
