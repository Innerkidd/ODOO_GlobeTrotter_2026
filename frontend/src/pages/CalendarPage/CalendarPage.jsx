import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import CalendarHeader from '../../components/calendar/CalendarHeader/CalendarHeader';
import ViewToggle from '../../components/calendar/ViewToggle/ViewToggle';
import CalendarGrid from '../../components/calendar/CalendarGrid/CalendarGrid';
import TimelineView from '../../components/calendar/TimelineView/TimelineView';
import DateNavigation from '../../components/calendar/DateNavigation/DateNavigation';
import EmptyCalendar from '../../components/calendar/EmptyCalendar/EmptyCalendar';
import Footer from '../../components/common/Footer/Footer';

import { apiRequest } from '../../lib/apiClient';

const CalendarPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [targetTripId, setTargetTripId] = useState(tripId || null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [calendarData, setCalendarData] = useState(null);
  const [viewMode, setViewMode] = useState('calendar');
  const [currentDateIndex, setCurrentDateIndex] = useState(0);

  // Fetch calendar data from backend on mount
  useEffect(() => {
    const loadCalendarData = async () => {
      if (!targetTripId) {
        setLoading(false);
        setError('No trip ID specified.');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await apiRequest(`/api/calendar/${targetTripId}`);
        setCalendarData(res.data);
      } catch (err) {
        console.error('Calendar API error:', err);
        if (err.message.includes('401') || err.message.includes('403')) {
          setError('Authentication required. Please log in.');
          toast.error('Session expired. Please log in again.');
          navigate('/login');
        } else if (err.message.includes('404')) {
          setError('Trip not found.');
          toast.error('The requested trip could not be found.');
        } else {
          setError(err.message || 'Could not load calendar data.');
          toast.error('Could not load calendar data. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadCalendarData();
  }, [targetTripId]);

  // If tripId changes through routing, refetch
  useEffect(() => {
    if (targetTripId) {
      loadCalendarData();
    }
  }, [targetTripId]);

  // Fallback: if no tripId in params, show empty state
  const hasTripId = !!targetTripId;
  const isLoading = loading && !calendarData;
  const hasError = !!error && !calendarData;

  // Transform backend data to frontend UI shape
  const mappedCalendarData = calendarData
    ? {
        trip: {
          title: calendarData.trip?.name || 'My Trip',
          startDate: calendarData.trip?.startDate,
          endDate: calendarData.trip?.endDate,
        },
        days: calendarData.days?.map((day) => ({
          dayNumber: day.dayNumber || 1,
          date: day.date,
          city: day.city?.name || '',
          country: day.city?.country || '',
          activities: day.activities?.map((act) => ({
            id: act.id,
            name: act.name,
            time: act.startTime || '00:00',
            duration: typeof act.duration === 'number' ? String(act.duration) : '0',
            cost: typeof act.estimatedCost === 'number' ? act.estimatedCost : 0,
            category: act.type || 'Sightseeing',
          })) || [],
        })) || [],
      }
    : null;

  const days = mappedCalendarData?.days || [];
  const hasDays = days.length > 0;
  const currentDay = hasDays ? days[currentDateIndex] : null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <CalendarHeader
        tripTitle={mappedCalendarData?.trip?.title || 'Calendar'}
        dates={
          mappedCalendarData?.trip?.startDate && mappedCalendarData?.trip?.endDate
            ? `${mappedCalendarData.trip.startDate} — ${mappedCalendarData.trip.endDate}`
            : ''
        }
        totalDays={hasDays ? days.length : 0}
        stopsCount={hasDays ? days.reduce((sum, d) => sum + d.activities.length, 0) : 0}
        tripId={targetTripId}
      />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 space-y-6 sm:px-6 lg:px-8">
          {isLoading && !hasError ? (
            <div className="flex min-h-screen items-center justify-center">
              <span className="text-slate-600 animate-spin loading-spinner h-8 w-8 border-4 border-teal-600 rounded-full"></span>
              <span className="ml-4 text-slate-600">Loading calendar data...</span>
            </div>
          ) : hasError ? (
            <div className="flex min-h-screen items-center justify-center">
              <p className="text-slate-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-500"
              >
                Retry
              </button>
            </div>
          ) : !hasTripId ? (
            <EmptyCalendar
              onGoToBuilder={() => {
                if (targetTripId) navigate(`/trips/${targetTripId}/itinerary`);
              }}
            />
          ) : mappedCalendarData ? (
            <>
              <ViewToggle
                activeView={viewMode}
                onViewChange={(mode) => setViewMode(mode)}
              />

              {currentDay && (
                <DateNavigation
                  currentDateIndex={currentDateIndex}
                  totalDays={days.length}
                  currentDay={currentDay}
                  onPrev={() => setCurrentDateIndex((prev) => Math.max(0, prev - 1))}
                  onNext={() => setCurrentDateIndex((prev) => Math.min(days.length - 1, prev + 1))}
                />
              )}

              {viewMode === 'calendar' ? (
                <CalendarGrid days={days} currency="₹" />
              ) : (
                <TimelineView days={days} currency="₹" />
              )}
            </>
          ) : (
            <EmptyCalendar
              onGoToBuilder={() => {
                if (targetTripId) navigate(`/trips/${targetTripId}/itinerary`);
              }}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CalendarPage;