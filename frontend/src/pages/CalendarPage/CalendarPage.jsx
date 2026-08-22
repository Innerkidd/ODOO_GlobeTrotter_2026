import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import CalendarHeader from '../../components/calendar/CalendarHeader/CalendarHeader';
import ViewToggle from '../../components/calendar/ViewToggle/ViewToggle';
import CalendarGrid from '../../components/calendar/CalendarGrid/CalendarGrid';
import TimelineView from '../../components/calendar/TimelineView/TimelineView';
import DateNavigation from '../../components/calendar/DateNavigation/DateNavigation';
import EmptyCalendar from '../../components/calendar/EmptyCalendar/EmptyCalendar';
import Footer from '../../components/common/Footer/Footer';
import { mockItinerary } from '../../data/staticData/itineraryData';

const CalendarPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const targetTripId = tripId || mockItinerary.id;

  const [itinerary] = useState(mockItinerary);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' | 'timeline'
  const [currentDateIndex, setCurrentDateIndex] = useState(0);

  const days = itinerary?.days || [];
  const hasDays = days.length > 0;
  const currentDay = hasDays ? days[currentDateIndex] : null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <CalendarHeader
        tripTitle={itinerary.title}
        dates={itinerary.formattedDates}
        totalDays={days.length}
        stopsCount={itinerary.stopsCount}
        tripId={targetTripId}
      />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 space-y-6 sm:px-6 lg:px-8">
          
          {hasDays ? (
            <>
              {/* Presentation Toggle */}
              <ViewToggle
                activeView={viewMode}
                onViewChange={(mode) => setViewMode(mode)}
              />

              {/* Date Navigation */}
              {currentDay && (
                <DateNavigation
                  currentDateIndex={currentDateIndex}
                  totalDays={days.length}
                  currentDay={currentDay}
                  onPrev={() => setCurrentDateIndex((prev) => Math.max(0, prev - 1))}
                  onNext={() => setCurrentDateIndex((prev) => Math.min(days.length - 1, prev + 1))}
                />
              )}

              {/* View Presentation */}
              {viewMode === 'calendar' ? (
                <CalendarGrid days={days} currency={itinerary.currency} />
              ) : (
                <TimelineView days={days} currency={itinerary.currency} />
              )}
            </>
          ) : (
            <EmptyCalendar
              onGoToBuilder={() => navigate(`/trips/${targetTripId}/itinerary`)}
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