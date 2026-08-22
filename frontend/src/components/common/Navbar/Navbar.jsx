import React from 'react';
import { Compass } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-slate-50/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT: Logo & Brand Name */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-sm shadow-teal-500/20">
            <Compass className="h-5 w-5" />
          </div>
          <span className="font-heading text-xl font-extrabold tracking-tight text-slate-900">
            Globe<span className="text-teal-600">Trotter</span>
          </span>
        </div>

        {/* RIGHT: Sign In Button */}
        <div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 active:scale-95"
            aria-label="Sign In"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
