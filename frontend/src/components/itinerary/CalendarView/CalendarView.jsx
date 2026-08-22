import React from 'react';
import EmptyItinerary from '../EmptyItinerary/EmptyItinerary';
import { Calendar, MapPin, Clock, Tag } from 'lucide-react';

const CalendarView = ({ days = [], currency = '€' }) => {
  if (!days || days.length === 0) {
    return <EmptyItinerary />;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-4 px-6">Date & Day</th>
              <th className="py-4 px-6">Destination</th>
              <th className="py-4 px-6">Scheduled Activities</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {days.map((day) => (
              <tr key={day.dayNumber} className="hover:bg-slate-50/60 transition-colors">
                
                {/* Date & Day Cell */}
                <td className="py-4 px-6 align-top whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-50 text-xs font-bold text-teal-700">
                      D{day.dayNumber}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                      <Calendar className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                      <span>{day.date}</span>
                    </div>
                  </div>
                </td>

                {/* Destination Cell */}
                <td className="py-4 px-6 align-top whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-0.5 text-xs font-semibold text-emerald-800">
                    <MapPin className="h-3 w-3 text-emerald-600" />
                    {day.city}, {day.country}
                  </span>
                </td>

                {/* Scheduled Activities Cell */}
                <td className="py-4 px-6 align-top">
                  {day.activities.length === 0 ? (
                    <span className="text-xs italic text-slate-400">
                      Free day (No activities)
                    </span>
                  ) : (
                    <div className="space-y-2.5">
                      {day.activities.map((act) => (
                        <div
                          key={act.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 text-xs"
                        >
                          <div className="space-y-0.5">
                            <p className="font-semibold text-slate-900">{act.name}</p>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                              <span className="flex items-center gap-1 text-teal-600 font-medium">
                                <Clock className="h-3 w-3" />
                                {act.time || 'Time not set'}
                              </span>
                              {act.category && (
                                <span className="flex items-center gap-0.5 text-slate-400">
                                  • {act.category}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="font-semibold text-slate-800 text-right shrink-0">
                            {act.cost === 0 ? 'Free' : `${currency}${act.cost}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarView;
