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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [calendarData, setCalendarData] = useState(null);
  const [viewMode, setViewMode] = useState('calendar');
  const [currentDateIndex, setCurrentDateIndex] = useState(0);

  // Fetch calendar data strictly from backend database
  useEffect(() => {
    const loadCalendarData = async () => {
      if (!tripId) {
        setLoading(false);
        setCalendarData(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Path is /calendar/:tripId because apiRequest prepends /api
        const res = await apiRequest(`/calendar/${tripId}`);
        setCalendarData(res.data);
      } catch (err) {
        console.warn('Calendar API warning:', err.message);
        if (err.message.includes('401') || err.message.includes('403')) {
          setError('Authentication required. Please log in.');
          toast.error('Session expired. Please log in again.');
          navigate('/login');
        } else {
          setCalendarData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadCalendarData();
  }, [tripId, navigate]);

  // Transform backend data to frontend UI shape
  const mappedCalendarData = calendarData
    ? {
        trip: {
          title: calendarData.trip?.name || calendarData.tripName || 'My Trip',
          startDate: calendarData.trip?.startDate || calendarData.startDate,
          endDate: calendarData.trip?.endDate || calendarData.endDate,
        },
        days: calendarData.days?.map((day) => ({
          dayNumber: day.dayNumber || day.day || 1,
          date: day.date,
          city: day.city?.name || day.city || '',
          country: day.city?.country || day.country || '',
          activities: (day.activities || []).map((act) => ({
            id: act.id,
            name: act.name,
            time: act.startTime || 'Flexible',
            duration: typeof act.duration === 'number' ? String(act.duration) : '0',
            cost: typeof act.estimatedCost === 'number' ? act.estimatedCost : (act.cost || 0),
            category: act.type || act.category || 'Sightseeing',
          })),
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
        tripTitle={mappedCalendarData?.trip?.title || 'Trip Schedule'}
        dates={
          mappedCalendarData?.trip?.startDate && mappedCalendarData?.trip?.endDate
            ? `${mappedCalendarData.trip.startDate.split('T')[0]} — ${mappedCalendarData.trip.endDate.split('T')[0]}`
            : ''
        }
        totalDays={hasDays ? days.length : 0}
        stopsCount={hasDays ? days.reduce((sum, d) => sum + (d.activities?.length || 0), 0) : 0}
        tripId={tripId}
      />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 space-y-6 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <span className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></span>
              <span className="ml-4 font-semibold text-slate-600">Loading schedule...</span>
            </div>
          ) : error ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <p className="text-slate-600 mb-4">{error}</p>
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-500 shadow-md"
              >
                Log In
              </button>
            </div>
          ) : mappedCalendarData && hasDays ? (
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
                if (tripId) {
                  navigate(`/trips/${tripId}/itinerary`);
                } else {
                  navigate('/create-trip');
                }
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