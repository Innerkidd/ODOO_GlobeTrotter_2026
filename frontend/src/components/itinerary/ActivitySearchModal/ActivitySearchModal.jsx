import React, { useState } from 'react';
import { Search, X, Plus, Clock, Tag } from 'lucide-react';
import { mockActivitiesByCity } from '../../../data/staticData/itineraryMockData';

const ActivitySearchModal = ({ isOpen, onClose, cityName, onAddActivity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!isOpen) return null;

  const activities = mockActivitiesByCity[cityName] || mockActivitiesByCity.DEFAULT;
  const categories = ['All', 'Sightseeing', 'Culture', 'Food & Drink', 'Adventure'];

  const filteredActivities = activities.filter((act) => {
    const matchesSearch =
      act.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || act.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-heading text-lg font-bold text-slate-900">
              Add Activity to {cityName || 'Stop'}
            </h3>
            <p className="text-xs text-slate-500">Search and select activities for this stop</p>
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
            placeholder="Search activity or tour..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-9 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-teal-600 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        {/* Category Chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white font-semibold shadow-2xs'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Activities List */}
        <div className="mt-4 max-h-72 overflow-y-auto space-y-2 pr-1">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((act) => (
              <div
                key={act.id}
                className="group flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 shadow-2xs transition-all hover:border-teal-200 hover:bg-teal-50/30"
              >
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{act.name}</h4>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 font-medium text-teal-700">
                      <Tag className="h-3 w-3" />
                      {act.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {act.duration}
                    </span>
                    <span className="font-semibold text-slate-700">{act.cost}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onAddActivity(act);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1 rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 transition-all hover:bg-teal-600 hover:text-white active:scale-95 cursor-pointer shrink-0"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching activities found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitySearchModal;
