import React from 'react';
import AuthLayout from '../../components/auth/AuthLayout/AuthLayout';
import TripForm from '../../components/trips/TripForm/TripForm';

const CreateTripPage = () => {
  return (
    <AuthLayout>
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xs">
        {/* Header */}
        <div className="mb-6 text-center sm:text-left">
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Create Your Trip
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Start planning your personalized journey.
          </p>
        </div>

        {/* Form */}
        <TripForm />
      </div>
    </AuthLayout>
  );
};

export default CreateTripPage;
