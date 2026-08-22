import React from 'react';
import { Compass } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        
        {/* Left: Brand & Tagline */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-white">
            <Compass className="h-4 w-4" />
          </div>
          <span className="font-heading text-lg font-bold text-slate-900">
            Globe<span className="text-teal-600">Trotter</span>
          </span>
          <span className="hidden text-slate-300 sm:inline">•</span>
          <span className="text-xs text-slate-500">
            Personalized travel planning.
          </span>
        </div>

        {/* Right: Copyright */}
        <div className="text-xs text-slate-400">
          © {new Date().getFullYear()} GlobeTrotter. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
