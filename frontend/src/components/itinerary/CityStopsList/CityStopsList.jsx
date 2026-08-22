import React from 'react';
import { Plus, MapPin } from 'lucide-react';
import CityStopItem from '../CityStopItem/CityStopItem';
import EmptyState from '../../common/EmptyState/EmptyState';

const CityStopsList = ({
  stops,
  onOpenAddCity,
  onMoveUp,
  onMoveDown,
  onRemoveStop,
  onUpdateDates,
  onOpenAddActivity,
  onRemoveActivity,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900">City Stops & Itinerary</h2>
          <p className="text-xs text-slate-500">Organize your stops and daily activities in order</p>
        </div>
        <button
          type="button"
          onClick={onOpenAddCity}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-teal-500 hover:to-emerald-500 focus-visible:outline-2 focus-visible:outline-teal-600 active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add City Stop
        </button>
      </div>

      {stops.length > 0 ? (
        <div className="space-y-4">
          {stops.map((stop, index) => (
            <CityStopItem
              key={stop.id}
              stop={stop}
              index={index}
              totalStops={stops.length}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              onRemoveStop={onRemoveStop}
              onUpdateDates={onUpdateDates}
              onOpenAddActivity={onOpenAddActivity}
              onRemoveActivity={onRemoveActivity}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={MapPin}
          title="No city stops added yet"
          description="Start building your itinerary by adding your first destination stop."
          actionLabel="Add City Stop"
          onAction={onOpenAddCity}
        />
      )}
    </div>
  );
};

export default CityStopsList;
