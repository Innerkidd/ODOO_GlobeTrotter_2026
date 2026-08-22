import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink, Share2, MessageCircle, Twitter } from 'lucide-react';
import { toast } from 'sonner';

import { apiClient } from '../../services/api/apiClient';

const ShareActions = ({ tripId = 'demo-trip', tripTitle = 'European Summer Journey' }) => {
  const navigate = useNavigate();
  const [shareUrl, setShareUrl] = useState('');
  const [shareId, setShareId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch share link from backend
  useEffect(() => {
    const fetchShareLink = async () => {
      try {
        const res = await apiClient.post(`/api/trips/${tripId}/share`);
        setShareUrl(res.data.shareUrl);
        setShareId(res.data.shareId);
        setLoading(false);
      } catch (err) {
        console.error('Share API error:', err);
        setError(err.message || 'Could not generate share link.');
        setLoading(false);
      }
    };

    fetchShareLink();
  }, [tripId]);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tripTitle,
          text: `Check out my travel itinerary!`,
          url: shareUrl,
        });
        toast.success('Shared successfully!');
      } catch {
        // User cancelled or share failed
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
      } catch {
        toast.error('Unable to copy link.');
      }
    }
  };

  const handleWhatsApp = () => {
    if (!shareUrl) return;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${tripTitle} ${shareUrl}`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTwitter = () => {
    if (!shareUrl) return;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${tripTitle} ${shareUrl}`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenPublicView = () => {
    if (shareId) {
      navigate(`/public/trips/${shareId}`);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
        <span className="text-slate-600 animate-spin">Loading share options...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
        <p className="text-slate-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
      <div>
        <h3 className="font-heading text-lg font-bold text-slate-900">Share Options & Public View</h3>
        <p className="text-xs text-slate-500">Quickly send to messaging apps or preview the public page</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Native Web Share API */}
        <button
          type="button"
          onClick={handleNativeShare}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-teal-600 active:scale-95 cursor-pointer"
          disabled={!shareUrl}
        >
          <Share2 className="h-4 w-4" />
          <span>Share...</span>
        </button>

        {/* WhatsApp Share */}
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-emerald-50 px-4 py-2.5 text-xs sm:text-sm font-semibold text-emerald-800 transition-all hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-teal-600 active:scale-95 cursor-pointer"
          disabled={!shareUrl}
        >
          <MessageCircle className="h-4 w-4 text-emerald-600" />
          <span>WhatsApp</span>
        </button>

        {/* Twitter/X Share */}
        <button
          type="button"
          onClick={handleTwitter}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 transition-all hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-teal-600 active:scale-95 cursor-pointer"
          disabled={!shareUrl}
        >
          <Twitter className="h-4 w-4 text-sky-500" />
          <span>Twitter / X</span>
        </button>

        {/* Open Public View Button */}
        <button
          type="button"
          onClick={handleOpenPublicView}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 shadow-xs transition-all hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-teal-600 active:scale-95 cursor-pointer ml-auto"
          disabled={!shareId}
        >
          <ExternalLink className="h-4 w-4 text-teal-600" />
          <span>Open Public View</span>
        </button>
      </div>
    </div>
  );
};

export default ShareActions;