import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, CheckCircle2, Globe } from 'lucide-react';
import PublicTripHeader from '../../components/sharing/PublicTripHeader/PublicTripHeader';
import PublicTripDay from '../../components/sharing/PublicTripDay/PublicTripDay';
import CopyTripButton from '../../components/sharing/CopyTripButton/CopyTripButton';
import Footer from '../../components/common/Footer/Footer';
import { mockItinerary } from '../../data/staticData/itineraryData';

const PublicTripPage = () => {
  const { shareId } = useParams();
  const [trip] = useState(mockItinerary);
  const days = trip.days || [];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <PublicTripHeader trip={trip} />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-4xl px-4 space-y-8 sm:px-6 lg:px-8">
          
          {/* Editorial Trip Banner */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200/60">
                <Globe className="h-3.5 w-3.5 text-emerald-600" />
                Public Travel Guide
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {trip.title}
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              Explore this curated itinerary for {trip.title}. View the daily schedule, cities, and recommended activities below.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center gap-4 text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-teal-600" />
                  {trip.formattedDates}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  {trip.stopsCount} Cities
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-teal-600" />
                  {trip.totalActivities} Activities
                </span>
              </div>

              <CopyTripButton tripTitle={trip.title} />
            </div>
          </div>

          {/* Read-Only Day List */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-bold text-slate-900">Itinerary Schedule</h2>
            {days.map((day) => (
              <PublicTripDay key={day.dayNumber} day={day} currency={trip.currency} />
            ))}
          </div>

          {/* Bottom Action Footer Box */}
          <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-900 via-slate-900 to-emerald-950 p-6 text-center text-white shadow-lg space-y-3">
            <h3 className="font-heading text-xl font-bold">Inspired by this journey?</h3>
            <p className="text-xs sm:text-sm text-teal-100 max-w-md mx-auto">
              Copy this itinerary to customize your own travel dates, cities, and activities on GlobeTrotter.
            </p>
            <div className="pt-2 flex justify-center">
              <CopyTripButton tripTitle={trip.title} />
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicTripPage;
