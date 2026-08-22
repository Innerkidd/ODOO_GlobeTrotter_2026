import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-teal-100 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 px-6 py-12 text-center text-white shadow-xl sm:px-12 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-300 ring-1 ring-teal-400/30">
            <Compass className="h-6 w-6" />
          </div>

          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to plan your next adventure?
          </h2>

          <div className="mt-8 flex justify-center">
<<<<<<< HEAD
            <Link
              to="/login"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:from-teal-400 hover:to-emerald-400 hover:shadow-xl hover:shadow-teal-500/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 active:scale-95"
=======
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:from-teal-400 hover:to-emerald-400 hover:shadow-xl hover:shadow-teal-500/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 active:scale-95 cursor-pointer"
>>>>>>> 5c3f867 (feat:landing page backend)
              aria-label="Plan a Trip"
            >
              <span>Plan a Trip</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
