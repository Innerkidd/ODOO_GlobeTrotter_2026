import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, User, LogOut } from 'lucide-react';
import { mockUserData } from '../../../data/staticData/dashboardData';

const DashboardNavbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand Logo & Navigation Link */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 transition-transform hover:opacity-90 focus-visible:outline-2 focus-visible:outline-teal-600 rounded-lg p-1"
            aria-label="GlobeTrotter Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-sm shadow-teal-500/20">
              <Compass className="h-5 w-5" />
            </div>
            <span className="font-heading text-xl font-extrabold tracking-tight text-slate-900">
              Globe<span className="text-teal-600">Trotter</span>
            </span>
          </Link>

          {/* Active Navigation Tab */}
          <nav className="hidden md:flex items-center gap-1">
            <span className="rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
              Dashboard
            </span>
          </nav>
        </div>

        {/* Right: Profile Area */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 py-1 pl-1 pr-3 shadow-2xs">
            <img
              src={mockUserData.avatarUrl}
              alt={mockUserData.name}
              className="h-7 w-7 rounded-full object-cover ring-1 ring-slate-300"
            />
            <span className="text-xs font-semibold text-slate-700 hidden sm:inline">
              {mockUserData.name}
            </span>
          </div>

          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-teal-600"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </header>
  );
};

export default DashboardNavbar;
