import React, { useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

const popularDestinations = ['Paris', 'Tokyo', 'Rome', 'Bali', 'Kyoto'];

const Hero = () => {
  const [destination, setDestination] = useState('');
  const [selectedChip, setSelectedChip] = useState('');

  const handleChipClick = (city) => {
    setSelectedChip(city);
    setDestination(city);
  };

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex flex-col items-center text-center max-w-3xl">
          {/* Headline */}
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.15] lg:text-6xl">
            Plan Your Journey.{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
              Your Way.
            </span>
          </h1>

          {/* Humanized Description */}
          <p className="mt-5 text-lg font-normal text-slate-600 leading-relaxed sm:text-xl">
            Hand-pick your stops, organize daily activities, and stay on budget — without the travel planning headache.
          </p>

          {/* Interactive Search & Plan Box */}
          <div className="mt-8 w-full max-w-xl">
            <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/50 transition-all focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/10">
              <div className="flex items-center pl-3 pr-2 text-slate-400">
                <MapPin className="h-5 w-5 text-teal-600" />
              </div>
              <input
                type="text"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setSelectedChip('');
                }}
                placeholder="Where to next? (e.g. Tokyo, Paris, Amalfi)"
                className="w-full bg-transparent px-2 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none text-base font-medium"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-teal-600 active:scale-95 shrink-0 cursor-pointer"
              >
                <span>Plan a Trip</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </form>

            {/* Quick Suggestion Chips */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-500">
              <span className="text-slate-400">Popular:</span>
              {popularDestinations.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleChipClick(city)}
                  className={`rounded-full border px-3 py-1 transition-all cursor-pointer active:scale-95 ${
                    selectedChip === city || destination.toLowerCase() === city.toLowerCase()
                      ? 'border-teal-500 bg-teal-50 text-teal-700 font-semibold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:bg-slate-50'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
