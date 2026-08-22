import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const calculateDays = (start, end) => {
  if (!start || !end) return 1;
  const s = new Date(start);
  const e = new Date(end);
  const diffTime = Math.abs(e - s);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return isNaN(diffDays) ? 1 : diffDays;
};

const formatDateStr = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

const DEFAULT_COVER_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80';

const TripOverviewHeader = ({ trip = {}, stopsCount = 0, onSaveJourney }) => {
  const navigate = useNavigate();
  const durationDays = calculateDays(trip.startDate, trip.endDate);

  const rawImage = trip.coverPhotoPreviewUrl || trip.coverImage;
  const [imgSrc, setImgSrc] = useState(rawImage || DEFAULT_COVER_IMAGE);
  const [imgError, setImgError] = useState(false);

  const formattedStart = formatDateStr(trip.startDate);
  const formattedEnd = formatDateStr(trip.endDate);

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc(DEFAULT_COVER_IMAGE);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md">
      <div className="flex flex-col md:flex-row items-stretch">
        {/* Cover Photo Thumbnail */}
        <div className="md:w-64 h-44 md:h-auto shrink-0 overflow-hidden bg-slate-100 relative">
          <img
            src={imgSrc || DEFAULT_COVER_IMAGE}
            alt={trip.tripName || trip.title || 'Trip Cover'}
            onError={handleImageError}
            className="h-full w-full object-cover transition-opacity duration-300"
          />
        </div>

        {/* Content Details */}
        <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 border border-teal-200/60">
                Draft Journey
              </span>
            </div>

            <h1 className="mt-2 font-heading text-2xl font-extrabold text-slate-900 sm:text-3xl">
              {trip.tripName || trip.title || 'Untitled Trip'}
            </h1>

            {trip.description && (
              <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                {trip.description}
              </p>
            )}
          </div>

          {/* Key Metrics Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-4 text-slate-600">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Calendar className="h-4 w-4 text-teal-600" />
                {formattedStart ? `${formattedStart} to ${formattedEnd}` : 'Dates not set'}
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Clock className="h-4 w-4 text-teal-600" />
                {durationDays} {durationDays === 1 ? 'day' : 'days'}
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <MapPin className="h-4 w-4 text-teal-600" />
                {stopsCount} {stopsCount === 1 ? 'stop' : 'stops'}
              </span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => navigate(`/trips/${trip.id || 'trip-101'}/budget`)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:text-teal-700 cursor-pointer"
              >
                <Wallet className="h-4 w-4 text-teal-600" />
                <span>View Budget</span>
              </button>

              <button
                type="button"
                onClick={onSaveJourney}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <CheckCircle className="h-4 w-4" />
                Save Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripOverviewHeader;
