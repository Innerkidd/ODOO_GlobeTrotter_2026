import React, { useState } from 'react';
import { Search, MapPin, X, Plus } from 'lucide-react';
import { mockCities } from '../../../data/staticData/itineraryMockData';

const CitySearchModal = ({ isOpen, onClose, onAddCity }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredCities = mockCities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-heading text-lg font-bold text-slate-900">Add City Stop</h3>
            <p className="text-xs text-slate-500">Search and select a destination for your trip</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mt-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city or country (e.g. Paris, Japan)..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-9 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-teal-600 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        {/* City Results List */}
        <div className="mt-4 max-h-72 overflow-y-auto space-y-2 pr-1">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <div
                key={city.id}
                className="group flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 shadow-2xs transition-all hover:border-teal-200 hover:bg-teal-50/30"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="h-10 w-10 rounded-lg object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{city.name}</h4>
                    <p className="text-xs text-slate-500">{city.country}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onAddCity(city);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1 rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 transition-all hover:bg-teal-600 hover:text-white active:scale-95 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching destinations found for "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitySearchModal;
