import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import TravelVisual from './TravelVisual';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* LEFT COLUMN: Copywriting & Primary CTA */}
          <div className="flex flex-col items-start text-left lg:col-span-6">
            
            {/* Top Pill Tag */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-3.5 py-1.5 text-xs font-semibold text-teal-800 backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-teal-600" />
              <span>Personalized Travel Planning</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.15] lg:text-6xl">
              Plan Your Journey.{' '}
              <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                Your Way.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 text-lg font-normal text-slate-600 leading-relaxed sm:text-xl">
              Create multi-city trips, discover activities, and organize your entire journey in one place.
            </p>

            {/* Primary CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-600/25 transition-all hover:from-teal-500 hover:to-emerald-500 hover:shadow-xl hover:shadow-teal-600/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 active:scale-95"
                aria-label="Plan a Trip"
              >
                <span>Plan a Trip</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Travel Visual */}
          <div className="flex justify-center lg:col-span-6 lg:justify-end">
            <TravelVisual />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
