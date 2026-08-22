import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { apiClient } from '../../services/api/apiClient';

const ShareLink = ({ tripId }) => {
  const [shareUrl, setShareUrl] = useState('');
  const [shareId, setShareId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error('Unable to copy link.');
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-3">
        <span className="text-slate-600 animate-spin">Generating share link...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-3">
        <p className="text-slate-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor="shareable-url" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" focusable="true">
            <use href="#icon-link" />
          </svg>
          Shareable Link
        </label>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
          Public Read-Only Link
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <input
          id="shareable-url"
          type="text"
          readOnly
          value={shareUrl || `${window.location.origin}/public/trips/${shareId || 'demo-trip}'}`
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-mono text-slate-800 focus:outline-hidden"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:from-teal-500 hover:to-emerald-500 focus-visible:outline-2 focus-visible:outline-teal-600 active:scale-95 cursor-pointer shrink-0"
        >
          {copied ? (
            <>
              <svg className="h-4 w-4 text-white" aria-hidden="true" focusable="true">
                <use href="#icon-check" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4" aria-hidden="true" focusable="true">
                <use href="#icon-copy" />
              </svg>
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ShareLink;