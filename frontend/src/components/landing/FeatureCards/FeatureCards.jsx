import React, { useState } from 'react';
import { Compass, Calendar, Wallet, ChevronRight, Check } from 'lucide-react';

const features = [
  {
    id: 'multi-city',
    title: 'Multi-Stop Route Builder',
    description: 'Map out your multi-city route step-by-step. See travel links, drive times, and stay durations all in one place.',
    icon: Compass,
    badge: 'Route Planner',
    highlight: 'Paris → Rome → Barcelona',
    iconBg: 'bg-teal-50 text-teal-600 border-teal-100',
  },
  {
    id: 'smart-itinerary',
    title: 'Day-by-Day Itinerary',
    description: 'Group activities, food spots, and tour bookings by day so your travel schedule feels smooth and unhurried.',
    icon: Calendar,
    badge: 'Daily Schedule',
    highlight: 'Organized by time & location',
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    id: 'budget-tracking',
    title: 'Real-Time Budgeting',
    description: 'Set your overall trip budget, track hotel & activity expenses, and know exactly how much room you have left for fun.',
    icon: Wallet,
    badge: 'Expense Tracker',
    highlight: 'Automatic budget breakdown',
    iconBg: 'bg-teal-50 text-teal-700 border-teal-100',
  },
];

const FeatureCards = () => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                onMouseEnter={() => setActiveCard(feature.id)}
                onMouseLeave={() => setActiveCard(null)}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/5 cursor-pointer"
              >
                <div>
                  {/* Header Row: Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border ${feature.iconBg} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500 group-hover:border-teal-200 group-hover:bg-teal-50/50 group-hover:text-teal-700 transition-colors">
                      <Check className="h-3 w-3 text-teal-600" />
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>

                {/* Interactive Highlight Footer */}
                <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between text-xs font-medium text-slate-500">
                  <span className="truncate text-teal-700 font-medium">{feature.highlight}</span>
                  <span className="inline-flex items-center text-teal-600 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0">
                    Explore <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeatureCards;
