import React from 'react';
import CityHeader from '../CityHeader/CityHeader';
import ActivityBlock from '../ActivityBlock/ActivityBlock';
import { CalendarX } from 'lucide-react';

const DaySection = ({ dayData, currency = '€' }) => {
  const { dayNumber, date, city, country, activities = [] } = dayData;

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 shadow-xs sm:p-7">
      {/* City Header */}
      <CityHeader
        dayNumber={dayNumber}
        date={date}
        city={city}
        country={country}
      />

      {/* Activities Feed or Empty Day Handler */}
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <CalendarX className="h-4 w-4" />
          </div>
          <p className="text-xs font-semibold text-slate-700">
            No activities planned for this day.
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Use Itinerary Builder to add tours or sightseeing.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <ActivityBlock
              key={activity.id}
              activity={activity}
              currency={currency}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DaySection;
