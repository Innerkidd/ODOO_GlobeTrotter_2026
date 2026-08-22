import React from 'react';
import FormField from '../../auth/FormField/FormField';

const getInputClassName = (error) =>
  `w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-hidden ${
    error
      ? 'border-red-400 ring-2 ring-red-100 focus:border-red-500'
      : 'border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20'
  }`;

const TripDateFields = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Start Date */}
      <FormField id="startDate" label="Start Date" error={errors.startDate}>
        <input
          id="startDate"
          type="date"
          {...register('startDate')}
          className={getInputClassName(errors.startDate)}
        />
      </FormField>

      {/* End Date */}
      <FormField id="endDate" label="End Date" error={errors.endDate}>
        <input
          id="endDate"
          type="date"
          {...register('endDate')}
          className={getInputClassName(errors.endDate)}
        />
      </FormField>
    </div>
  );
};

export default TripDateFields;
