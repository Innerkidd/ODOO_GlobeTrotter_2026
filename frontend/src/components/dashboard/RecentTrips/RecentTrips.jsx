import React from 'react';
import TripCard from './TripCard';
import EmptyState from '../../common/EmptyState/EmptyState';
import { Compass, Plane } from 'lucide-react';

const RecentTrips = ({ trips = [], onViewTrip, onPlanNewTrip }) => {
  return (
    <section className="space-y-4">
      {/* Section Title Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
            <Compass className="h-4 w-4" />
          </div>
          <h2 className="font-heading text-xl font-bold text-slate-900">Recent Trips</h2>
        </div>
        {trips.length > 0 && (
          <span className="text-xs font-medium text-slate-500">
            Showing {trips.length} trips
          </span>
        )}
      </div>

      {/* Grid or Empty State */}
      {trips.length === 0 ? (
        <EmptyState
          icon={Plane}
          title="No trips yet"
          description="Start planning your first adventure by adding destinations and daily activities."
          actionLabel="+ Plan New Trip"
          onAction={onPlanNewTrip}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onViewTrip={onViewTrip} />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentTrips;
