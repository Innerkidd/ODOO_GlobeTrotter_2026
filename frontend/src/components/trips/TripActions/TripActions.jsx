import React from 'react';

const TripActions = ({ onCancel, isSubmitting }) => {
  return (
    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95 cursor-pointer"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-teal-600 active:scale-95 cursor-pointer disabled:opacity-50"
      >
        Create Trip
      </button>
    </div>
  );
};

export default TripActions;
