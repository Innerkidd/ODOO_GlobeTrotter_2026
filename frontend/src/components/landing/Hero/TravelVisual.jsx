import React from 'react';
import { MapPin, Calendar, Compass, Sparkles, Navigation, Clock, CheckCircle2 } from 'lucide-react';

const TravelVisual = () => {
  return (
    <div className="relative w-full max-w-xl lg:max-w-none">
      {/* Background ambient subtle glow */}
      <div className="absolute -top-10 -right-10 -z-10 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 -z-10 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

      {/* Main Container Card */}
      <div className="relative rounded-2xl border border-slate-200/80 bg-white/90 p-5 sm:p-6 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
        {/* Top Mini Header inside visual */}
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Multi-City Route Preview
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Euro Explorer • 12 Days</span>
          </div>
        </div>

        {/* Interactive-looking Stylized Map & Flight Route SVG */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-xl bg-slate-90/80 p-4 border border-slate-100 bg-gradient-to-br from-slate-50 to-teal-50/30">
          {/* Grid Background Pattern */}
          <svg className="absolute inset-0 h-full w-full stroke-slate-200/60 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
            <defs>
              <pattern id="travel-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M.5 24V.5H24" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#travel-grid)" />
          </svg>

          {/* SVG Flight Routes */}
          <svg className="absolute inset-0 h-full w-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0d9488" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            {/* Route Line 1: Paris -> Rome */}
            <path
              d="M 60 70 Q 140 30 220 100"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="animate-dash-flow"
            />
            {/* Route Line 2: Rome -> Barcelona */}
            <path
              d="M 220 100 Q 170 170 120 180"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="animate-dash-flow"
            />
            {/* Route Line 3: Barcelona -> Athens */}
            <path
              d="M 120 180 Q 240 230 320 190"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="animate-dash-flow"
            />
          </svg>

          {/* Destination Nodes on the map */}
          {/* Node 1: Paris */}
          <div className="absolute top-[22%] left-[12%] flex items-center gap-2 rounded-lg border border-white bg-white/95 px-2.5 py-1.5 shadow-md shadow-slate-200/50 backdrop-blur-xs transition-transform hover:scale-105">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-teal-700">
              <MapPin className="h-3 w-3" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Paris</p>
              <p className="text-[10px] text-slate-500">Days 1 - 3</p>
            </div>
          </div>

          {/* Node 2: Rome */}
          <div className="absolute top-[34%] right-[32%] flex items-center gap-2 rounded-lg border border-white bg-white/95 px-2.5 py-1.5 shadow-md shadow-slate-200/50 backdrop-blur-xs transition-transform hover:scale-105">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <MapPin className="h-3 w-3" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Rome</p>
              <p className="text-[10px] text-slate-500">Days 4 - 7</p>
            </div>
          </div>

          {/* Node 3: Barcelona */}
          <div className="absolute bottom-[22%] left-[25%] flex items-center gap-2 rounded-lg border border-white bg-white/95 px-2.5 py-1.5 shadow-md shadow-slate-200/50 backdrop-blur-xs transition-transform hover:scale-105">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-teal-700">
              <MapPin className="h-3 w-3" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Barcelona</p>
              <p className="text-[10px] text-slate-500">Days 8 - 10</p>
            </div>
          </div>

          {/* Node 4: Athens */}
          <div className="absolute bottom-[16%] right-[10%] flex items-center gap-2 rounded-lg border border-white bg-white/95 px-2.5 py-1.5 shadow-md shadow-slate-200/50 backdrop-blur-xs transition-transform hover:scale-105">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <MapPin className="h-3 w-3" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Athens</p>
              <p className="text-[10px] text-slate-500">Days 11 - 12</p>
            </div>
          </div>
        </div>

        {/* Bottom Floating Trip Item Mockup Card */}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white">
              <Navigation className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Next Activity: Colosseum Tour</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 10:00 AM
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <CheckCircle2 className="h-3 w-3" /> Confirmed
                </span>
              </div>
            </div>
          </div>
          <span className="rounded-full bg-slate-200/70 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            Rome, Italy
          </span>
        </div>
      </div>
    </div>
  );
};

export default TravelVisual;
