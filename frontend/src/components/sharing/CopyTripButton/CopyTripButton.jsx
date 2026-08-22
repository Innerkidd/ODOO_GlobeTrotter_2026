import React from 'react';
import { Copy, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CopyTripButton = ({ tripTitle = 'Trip' }) => {
  const navigate = useNavigate();

  const handleCopyTrip = () => {
    toast.success(`"${tripTitle}" copied for editing!`);
    navigate('/create-trip');
  };

  return (
    <button
      type="button"
      onClick={handleCopyTrip}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 active:scale-95 cursor-pointer"
    >
      <Copy className="h-4 w-4" />
      <span>Copy Trip to Edit</span>
    </button>
  );
};

export default CopyTripButton;
