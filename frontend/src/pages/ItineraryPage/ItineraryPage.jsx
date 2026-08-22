import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, List, MapPin, Clock, DollarSign, Compass, Loader2 } from 'lucide-react';
import { getItineraryView } from '../../../services/itineraryService';

const ItineraryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    setLoading(true);
    setError(null);
    getItineraryView(id)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || err.message || 'Failed to load itinerary'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-teal-600" />
          <p className="text-sm text-slate-500">Loading itinerary...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-sm font-medium text-red-600">{error}</p>
          <button onClick={() => navigate('/my-trips')} className="mt-3 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-500 cursor-pointer">
            Back to My Trips
          </button>
        </div>
      </div>
    );
  }

  if (!data || data.totalStops === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <button onClick={() => navigate('/my-trips')} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer">
            <ArrowLeft className="h-4 w-4" /> Back to My Trips
          </button>
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <Compass className="mx-auto mb-4 h-12 w-12 text-slate-300" />
            <h2 className="font-heading text-xl font-bold text-slate-900">Your itinerary is empty</h2>
            <p className="mt-2 text-sm text-slate-500">Add destinations and activities to start planning.</p>
            <button onClick={() => navigate('/my-trips')} className="mt-6 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-500 cursor-pointer">
              Back to My Trips
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formatTime = (t) => {
    if (!t) return 'Time not set';
    const d = new Date(t);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/my-trips')} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer">
          <ArrowLeft className="h-4 w-4" /> Back to My Trips
        </button>

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 sm:text-3xl">{data.tripName}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {formatDate(data.startDate)} — {formatDate(data.endDate)}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {data.totalStops} {data.totalStops === 1 ? 'stop' : 'stops'}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {data.totalActivities} {data.totalActivities === 1 ? 'activity' : 'activities'}</span>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-2">
          <button onClick={() => setViewMode('list')} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
            <List className="h-3.5 w-3.5" /> List
          </button>
          <button onClick={() => setViewMode('calendar')} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${viewMode === 'calendar' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
            <Calendar className="h-3.5 w-3.5" /> Calendar
          </button>
        </div>

        {viewMode === 'list' ? (
          <div className="space-y-4">
            {data.days.map((day) => (
              <div key={day.day} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Day {day.day}</span>
                    <span className="ml-2 text-xs text-slate-400">{formatDate(day.date)}</span>
                  </div>
                  {day.city && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                      <MapPin className="h-3 w-3" /> {day.city}, {day.country}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  {day.activities.length === 0 ? (
                    <p className="text-sm text-slate-400 italic">No activities planned for this day.</p>
                  ) : (
                    <div className="space-y-3">
                      {day.activities.map((act) => (
                        <div key={act.id} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                            <Clock className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900">{act.name}</p>
                            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                              {act.type && <span className="rounded-full bg-teal-50 px-2 py-0.5 text-teal-700 font-medium">{act.type}</span>}
                              <span>{formatTime(act.startTime)}</span>
                              {act.duration && <span>{act.duration} min</span>}
                              {act.estimatedCost > 0 && <span className="flex items-center gap-0.5"><DollarSign className="h-3 w-3" />{act.estimatedCost}</span>}
                            </div>
                            {act.description && <p className="mt-1 text-xs text-slate-500">{act.description}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.days.map((day) => (
              <div key={day.day} className={`rounded-2xl border bg-white shadow-sm overflow-hidden ${day.city ? 'border-slate-200' : 'border-dashed border-slate-200'}`}>
                <div className="border-b border-slate-100 px-4 py-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Day {day.day}</span>
                  <span className="ml-2 text-xs text-slate-400">{formatDate(day.date)}</span>
                </div>
                {day.city ? (
                  <div className="p-4">
                    <p className="text-sm font-semibold text-slate-900">{day.city}, {day.country}</p>
                    {day.activities.length === 0 ? (
                      <p className="mt-2 text-xs text-slate-400 italic">No activities</p>
                    ) : (
                      <ul className="mt-2 space-y-1.5">
                        {day.activities.map((act) => (
                          <li key={act.id} className="text-xs text-slate-600">
                            <span className="font-medium">{act.name}</span>
                            {act.startTime && <span className="ml-1 text-slate-400">({formatTime(act.startTime)})</span>}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <div className="p-4">
                    <p className="text-xs text-slate-400 italic">Free day</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryPage;