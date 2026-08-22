import React from 'react';
import { Compass, Calendar, MapPin, CheckCircle2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import CopyTripButton from '../CopyTripButton/CopyTripButton';

const PublicTripHeader = ({ trip, shareId = null }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LEFT: Branding */}
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

        {/* CENTER: Public Tag */}
        <div className="hidden md:flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 border border-teal-200/60">
          <Eye className="h-3.5 w-3.5 text-teal-600" />
          <span>Shared Public Itinerary</span>
        </div>

        {/* RIGHT: Copy Trip Button */}
        <div>
          <CopyTripButton tripTitle={trip?.title || 'Trip'} shareId={shareId} />
        </div>
      </div>
    </header>
  );
};

export default PublicTripHeader;