import React from 'react';
import { Globe2, CalendarCheck, Wallet } from 'lucide-react';

const features = [
  {
    id: 'multi-city',
    title: 'Multi-City Trips',
    description: 'Plan and organize multiple destinations in one journey.',
    icon: Globe2,
    iconBg: 'bg-teal-50 text-teal-600 border-teal-100',
  },
  {
    id: 'smart-itinerary',
    title: 'Smart Itinerary',
    description: 'Organize dates, activities, and your daily travel plan.',
    icon: CalendarCheck,
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    id: 'budget-tracking',
    title: 'Budget Tracking',
    description: 'Understand your estimated trip costs and stay within budget.',
    icon: Wallet,
    iconBg: 'bg-teal-50 text-teal-700 border-teal-100',
  },
];

const FeatureCards = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid: 3 columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-md hover:shadow-teal-900/5"
              >
                {/* Icon Box */}
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${feature.iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeatureCards;
