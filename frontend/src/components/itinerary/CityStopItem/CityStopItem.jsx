import React from 'react';
import { ChevronUp, ChevronDown, Trash2, Plus, Calendar, Compass } from 'lucide-react';
import FormField from '../../auth/FormField/FormField';
import ActivityItem from '../ActivityItem/ActivityItem';
import EmptyState from '../../common/EmptyState/EmptyState';

const getInputClassName = () =>
  `w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-teal-600 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20`;

const CityStopItem = ({
  stop,
  index,
  totalStops,
  onMoveUp,
  onMoveDown,
  onRemoveStop,
  onUpdateDates,
  onOpenAddActivity,
  onRemoveActivity,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm space-y-5">
      {/* Header Row: Stop Index, City, Reorder & Delete Controls */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 font-heading text-xs font-bold text-white shadow-2xs">
            {index + 1}
          </span>
          <div>
            <h3 className="font-heading text-lg font-bold text-slate-900">{stop.city}</h3>
            <p className="text-xs text-slate-500">{stop.country}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMoveUp(index)}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
            title="Move Stop Up"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled={index === totalStops - 1}
            onClick={() => onMoveDown(index)}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
            title="Move Stop Down"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <div className="h-4 w-px bg-slate-200 mx-1" />
          <button
            type="button"
            onClick={() => onRemoveStop(stop.id)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
            title="Remove Stop"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Date Range Fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField id={`startDate-${stop.id}`} label="Stop Start Date">
          <input
            id={`startDate-${stop.id}`}
            type="date"
            value={stop.startDate || ''}
            onChange={(e) => onUpdateDates(stop.id, 'startDate', e.target.value)}
            className={getInputClassName()}
          />
        </FormField>

        <FormField id={`endDate-${stop.id}`} label="Stop End Date">
          <input
            id={`endDate-${stop.id}`}
            type="date"
            value={stop.endDate || ''}
            onChange={(e) => onUpdateDates(stop.id, 'endDate', e.target.value)}
            className={getInputClassName()}
          />
        </FormField>
      </div>

      {/* Activities Section */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Activities ({stop.activities.length})
          </h4>
          <button
            type="button"
            onClick={() => onOpenAddActivity(stop)}
            className="inline-flex items-center gap-1 rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-100 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Activity
          </button>
        </div>

        {stop.activities.length > 0 ? (
          <div className="space-y-2">
            {stop.activities.map((act) => (
              <ActivityItem
                key={act.id}
                activity={act}
                onRemove={(actId) => onRemoveActivity(stop.id, actId)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Compass}
            title="No activities added"
            description={`Discover and add activities for your stay in ${stop.city}.`}
            actionLabel="Add Activity"
            onAction={() => onOpenAddActivity(stop)}
          />
        )}
      </div>
    </div>
  );
};

export default CityStopItem;
