import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-6 text-center">
      {/* Brand Logo & Name */}
      <Link
        to="/"
        className="group mb-6 inline-flex items-center gap-2.5 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 rounded-lg p-1"
        aria-label="GlobeTrotter Home"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-500/20">
          <Compass className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45" />
        </div>
        <span className="font-heading text-2xl font-extrabold tracking-tight text-slate-900">
          Globe<span className="text-teal-600">Trotter</span>
        </span>
      </Link>

      {/* Heading & Subtitle */}
      <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-sm text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default AuthHeader;
