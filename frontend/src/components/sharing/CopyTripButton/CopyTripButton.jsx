import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Copy, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '../../../../services/api/axiosClient';

const CopyTripButton = ({ tripTitle = 'Trip', shareId = null }) => {
  const navigate = useNavigate();
  const [isCopying, setIsCopying] = useState(false);

  const handleCopyTrip = async () => {
    setIsCopying(true);
    try {
      const res = await apiClient.post(`/api/public/${shareId}/copy`);
      const { tripId, name } = res.data.data;
      toast.success(`"${name}" copied for editing!`);
      navigate(`/trips/${tripId}`);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Login required to copy this trip.');
      } else {
        toast.error('Unable to copy trip.');
      }
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopyTrip}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 active:scale-95 cursor-pointer"
      disabled={isCopying}
    >
      <Copy className="h-4 w-4" />
      {isCopying ? (
        <svg className="h-4 w-4 text-white" aria-hidden="true" focusable="true">
          <use href="#icon-spinner" />
        </svg>
      ) : (
        <svg className="h-4 w-4" aria-hidden="true" focusable="true">
          <use href="#icon-copy" />
        </svg>
      )}
      <span>{isCopying ? 'Copying...' : 'Copy Trip to Edit'}</span>
    </button>
  );
};

export default CopyTripButton;