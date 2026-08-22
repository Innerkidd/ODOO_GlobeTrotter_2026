import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, currency }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg text-xs">
        <p className="font-bold text-slate-900">{data.name}</p>
        <p className="mt-1 font-semibold text-teal-700">
          Amount: {currency}{data.amount.toLocaleString()} ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

const BudgetChart = ({ categories = [], currency = '€' }) => {
  const chartData = categories.map((cat) => ({
    name: cat.name.split(' / ')[0], // Short name e.g. "Stay"
    value: cat.amount,
    amount: cat.amount,
    percentage: cat.percentage,
    color: cat.color,
  }));

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
      <div>
        <h3 className="font-heading text-lg font-bold text-slate-900">Cost Distribution Chart</h3>
        <p className="text-xs text-slate-500">Visual share of estimated expenses</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip currency={currency} />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-xs font-semibold text-slate-700">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetChart;
