import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';

const Hero = () => {
  const [destination, setDestination] = useState('');
  const [selectedChip, setSelectedChip] = useState('');
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/destinations/popular')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPopularDestinations(data.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query) => {
    if (!query || query.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    setLoading(true);
    fetch(`/api/destinations/search?q=${encodeURIComponent(query.trim())}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSearchResults(data.data);
          setShowResults(true);
        }
      })
      .catch(() => setSearchResults([]))
      .finally(() => setLoading(false));
  };

  const handleChipClick = (name) => {
    setSelectedChip(name);
    setDestination(name);
    setSearchResults([]);
    setShowResults(false);
  };

  const handleResultClick = (name) => {
    setDestination(name);
    setSelectedChip(name);
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex flex-col items-center text-center max-w-3xl">
          
          {/* Top Pill Tag */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-3.5 py-1.5 text-xs font-semibold text-teal-800 backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span>Personalized Travel Planning</span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.15] lg:text-6xl">
            Plan Your Journey.{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
              Your Way.
            </span>
          </h1>

          <p className="mt-5 text-lg font-normal text-slate-600 leading-relaxed sm:text-xl">
            Create multi-city trips, discover activities, and organize your entire journey in one place.
          </p>

          <div className="mt-8 w-full max-w-xl" ref={searchRef}>
            <form onSubmit={(e) => { e.preventDefault(); navigate('/login'); }} className="relative flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/50 transition-all focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/10">
              <div className="flex items-center pl-3 pr-2 text-slate-400">
                <MapPin className="h-5 w-5 text-teal-600" />
              </div>
              <input
                type="text"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setSelectedChip('');
                  handleSearch(e.target.value);
                }}
                placeholder="Where to next? (e.g. Tokyo, Paris, Amalfi)"
                className="w-full bg-transparent px-2 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none text-base font-medium"
              />
              <Link
                to="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-teal-600 active:scale-95 shrink-0 cursor-pointer"
                aria-label="Plan a Trip"
              >
                <span>Plan a Trip</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </form>

            {showResults && searchResults.length > 0 && (
              <div className="mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg">
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleResultClick(item.name)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors cursor-pointer first:rounded-t-xl last:rounded-b-xl"
                  >
                    <MapPin className="h-4 w-4 text-teal-600 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.country}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {showResults && searchResults.length === 0 && !loading && destination.trim().length > 0 && (
              <div className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-lg">
                No destinations found for "{destination}"
              </div>
            )}

            {popularDestinations.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-500">
                <span className="text-slate-400">Popular:</span>
                {popularDestinations.map((dest) => (
                  <button
                    key={dest.id || dest.name}
                    type="button"
                    onClick={() => handleChipClick(dest.name)}
                    className={`rounded-full border px-3 py-1 transition-all cursor-pointer active:scale-95 ${
                      selectedChip === dest.name || destination.toLowerCase() === dest.name.toLowerCase()
                        ? 'border-teal-500 bg-teal-50 text-teal-700 font-semibold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:bg-slate-50'
                    }`}
                  >
                    {dest.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
