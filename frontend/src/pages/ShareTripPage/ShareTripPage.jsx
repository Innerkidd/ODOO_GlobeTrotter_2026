import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar/DashboardNavbar';
import Footer from '../../components/common/Footer/Footer';
import ShareHeader from '../../components/sharing/ShareHeader/ShareHeader';
import ShareLink from '../../components/sharing/ShareLink/ShareLink';
import ShareActions from '../../components/sharing/ShareActions/ShareActions';
import PublicTripPreview from '../../components/sharing/PublicTripPreview/PublicTripPreview';

const ShareTripPage = () => {
  const { tripId } = useParams();
  const targetTripId = tripId || null;
  const [trip, setTrip] = useState(null);
  const [shareData, setShareData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch trip and share data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripRes = await apiRequest(`/api/trips/${targetTripId}`);
        setTrip(tripRes.data);

        const shareRes = await apiRequest.post(`/api/trips/${targetTripId}/share`);
        setShareData(shareRes.data);
      } catch (err) {
        console.error('Share trip data error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (targetTripId) {
      fetchData();
    }
  }, [targetTripId]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
        <div className="flex min-h-screen items-center justify-center">
          <span className="text-slate-600 animate-spin loading-spinner h-8 w-8 border-4 border-teal-600 rounded-full"></span>
          <span className="ml-4 text-slate-600">Loading trip data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-4xl px-4 space-y-6 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <ShareHeader
            tripTitle={trip?.title || 'Share Journey'}
            dates={trip?.formattedDates || ''}
            stopsCount={trip?.stopsCount || 0}
            totalActivities={trip?.totalActivities || 0}
            tripId={targetTripId}
            shareData={shareData}
          />

          {/* Shareable Link Box */}
          {shareData ? (
            <ShareLink tripId={targetTripId} shareUrl={shareData.shareUrl} shareId={shareData.shareId} />
          ) : (
            <ShareLink tripId={targetTripId} />
          )}

          {/* Social Share Actions & Open Public View */}
          {shareData ? (
            <ShareActions tripId={targetTripId} tripTitle={trip?.title || ''} shareData={shareData} />
          ) : (
            <ShareActions tripId={targetTripId} tripTitle={trip?.title || ''} />
          )}

          {/* Public Preview Card */}
          {shareData ? (
            <PublicTripPreview trip={trip} shareId={shareData.shareId} />
          ) : (
            <PublicTripPreview trip={trip} />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ShareTripPage;