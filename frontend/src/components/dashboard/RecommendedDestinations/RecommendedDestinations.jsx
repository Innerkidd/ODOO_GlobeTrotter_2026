import React from 'react';
import DestinationCard from './DestinationCard';
import EmptyState from '../../common/EmptyState/EmptyState';
import { Sparkles, MapPin } from 'lucide-react';

const RecommendedDestinations = ({ destinations = [], onSelectDestination }) => {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
            <Sparkles className="h-4 w-4" />
          </div>
          <h2 className="font-heading text-xl font-bold text-slate-900">
            Recommended Destinations
          </h2>
        </div>
        {destinations.length > 0 && (
          <span className="text-xs font-medium text-slate-500">
            Hand-picked for you
          </span>
        )}
      </div>

      {/* Grid of Destination Cards or Empty State */}
      {destinations.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="No recommended destinations"
          description="Recommended destinations will appear here as you explore destinations."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onSelect={onSelectDestination}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecommendedDestinations;
