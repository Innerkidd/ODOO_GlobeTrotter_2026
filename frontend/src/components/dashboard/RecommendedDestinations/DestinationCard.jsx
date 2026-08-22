import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';

const DestinationCard = ({ destination, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(destination)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-md cursor-pointer"
    >
      {/* Destination Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={destination.image}
          alt={`${destination.city}, ${destination.country}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

        {/* Tag Badge */}
        {destination.tag && (
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-800 backdrop-blur-xs shadow-2xs">
              {destination.tag}
            </span>
          </div>
        )}

        {/* Action Icon */}
        <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-slate-900">
          <ArrowUpRight className="h-4 w-4" />
        </div>

        {/* Overlay City & Country Name */}
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-300">
            <MapPin className="h-3.5 w-3.5" />
            <span>{destination.country}</span>
          </div>
          <h3 className="font-heading text-xl font-extrabold text-white leading-tight">
            {destination.city}
          </h3>
        </div>
      </div>

      {/* Description Tagline */}
      <div className="p-4 bg-white">
        <p className="text-xs leading-relaxed text-slate-600">
          {destination.tagline}
        </p>
      </div>
    </div>
  );
};

export default DestinationCard;
