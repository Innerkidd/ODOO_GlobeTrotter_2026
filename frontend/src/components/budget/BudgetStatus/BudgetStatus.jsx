import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const BudgetStatus = ({ isOverBudget }) => {
  if (isOverBudget) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 border border-rose-200/80">
        <AlertCircle className="h-3.5 w-3.5 text-rose-600" />
        Over Budget
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/80">
      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
      Within Budget
    </span>
  );
};

export default BudgetStatus;
