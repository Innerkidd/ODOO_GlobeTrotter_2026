import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, LogOut, User } from 'lucide-react';

const DashboardNavbar = ({ userName = 'Disha Patel', avatarUrl = '' }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('globetrotter_token');
    navigate('/login');
  };

  // Extract initial (e.g. "Disha Patel" -> "D")
  const initial = userName?.trim() ? userName.trim().charAt(0).toUpperCase() : 'T';

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

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/dashboard"
              className="rounded-lg bg-teal-50 px-3.5 py-1.5 text-xs font-bold text-teal-700 border border-teal-200/60 shadow-2xs"
            >
              Dashboard
            </Link>
            <Link
              to="/budget"
              className="rounded-lg px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
            >
              Budget & Cost
            </Link>
          </nav>
        </div>

        {/* Right: Premium Profile Area */}
        <div className="flex items-center gap-3">
          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50/80 py-1 pl-1 pr-3.5 shadow-2xs transition-all hover:bg-white hover:border-teal-300 hover:shadow-xs">
            {avatarUrl && !imgError ? (
              <img
                src={avatarUrl}
                alt={userName}
                onError={() => setImgError(true)}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-teal-500/30"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-emerald-600 font-heading text-xs font-extrabold text-white ring-2 ring-teal-500/20 shadow-xs">
                {initial}
              </div>
            )}
            
            <div className="flex flex-col text-left">
              <span className="text-xs font-extrabold text-slate-800 leading-tight hidden sm:inline">
                {userName}
              </span>
              <span className="text-[10px] font-semibold text-teal-600 hidden sm:inline">
                Traveler
              </span>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-500 transition-all hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-rose-500 cursor-pointer shadow-2xs"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

      </div>
    </header>
  );
};

export default DashboardNavbar;
