import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-slate-50/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
<<<<<<< HEAD
        {/* LEFT: Logo & Brand Name */}
        <Link
          to="/"
          className="flex items-center gap-2.5 transition-transform hover:opacity-90 focus-visible:outline-2 focus-visible:outline-teal-600 rounded-lg p-1"
          aria-label="GlobeTrotter Home"
        >
=======
        <div className="flex items-center gap-2.5">
>>>>>>> 5c3f867 (feat:landing page backend)
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-sm shadow-teal-500/20">
            <Compass className="h-5 w-5" />
          </div>
          <span className="font-heading text-xl font-extrabold tracking-tight text-slate-900">
            Globe<span className="text-teal-600">Trotter</span>
          </span>
        </Link>

        <div>
<<<<<<< HEAD
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 active:scale-95"
=======
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 active:scale-95 cursor-pointer"
>>>>>>> 5c3f867 (feat:landing page backend)
            aria-label="Sign In"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
