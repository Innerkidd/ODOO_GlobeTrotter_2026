import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Share2, MessageCircle, Twitter } from 'lucide-react';
import { toast } from 'sonner';

const ShareActions = ({ tripId = 'demo-trip', tripTitle = 'European Summer Journey' }) => {
  const navigate = useNavigate();
  const publicUrl = `${window.location.origin}/public/trips/${tripId}`;
  const shareText = `Check out my travel itinerary for ${tripTitle} on GlobeTrotter!`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tripTitle,
          text: shareText,
          url: publicUrl,
        });
        toast.success('Shared successfully!');
      } catch {
        // User cancelled or share failed
      }
    } else {
      try {
        await navigator.clipboard.writeText(publicUrl);
        toast.success('Link copied to clipboard!');
      } catch {
        toast.error('Unable to copy link.');
      }
    }
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${publicUrl}`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(publicUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
        >
          <Share2 className="h-4 w-4" />
          <span>Share...</span>
        </button>

        {/* WhatsApp Share */}
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-emerald-50 px-4 py-2.5 text-xs sm:text-sm font-semibold text-emerald-800 transition-all hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-teal-600 active:scale-95 cursor-pointer"
        >
          <MessageCircle className="h-4 w-4 text-emerald-600" />
          <span>WhatsApp</span>
        </button>

        {/* Twitter/X Share */}
        <button
          type="button"
          onClick={handleTwitter}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 transition-all hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-teal-600 active:scale-95 cursor-pointer"
        >
          <Twitter className="h-4 w-4 text-sky-500" />
          <span>Twitter / X</span>
        </button>

        {/* Open Public View Button */}
        <button
          type="button"
          onClick={() => navigate(`/public/trips/${tripId}`)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 shadow-xs transition-all hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-teal-600 active:scale-95 cursor-pointer ml-auto"
        >
          <ExternalLink className="h-4 w-4 text-teal-600" />
          <span>Open Public View</span>
        </button>
      </div>
    </div>
  );
};

export default ShareActions;
