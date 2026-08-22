import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import FormField from '../../auth/FormField/FormField';
import TripDateFields from '../TripDateFields/TripDateFields';
import CoverPhotoUpload from '../CoverPhotoUpload/CoverPhotoUpload';
import TripActions from '../TripActions/TripActions';

const createTripSchema = z
  .object({
    tripName: z.string().min(1, 'Trip name is required').max(100, 'Trip name must be 100 characters or less'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    description: z.string().max(500, 'Description must be 500 characters or less').optional().or(z.literal('')),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return new Date(data.endDate) >= new Date(data.startDate);
    },
    {
      message: 'End date must be on or after the start date.',
      path: ['endDate'],
    }
  );

const getInputClassName = (error) =>
  `w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-hidden ${
    error
      ? 'border-red-400 ring-2 ring-red-100 focus:border-red-500'
      : 'border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20'
  }`;

const TripForm = () => {
  const navigate = useNavigate();
  const [coverPhotoPreviewUrl, setCoverPhotoPreviewUrl] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createTripSchema),
    defaultValues: {
      tripName: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  });

  const handleCoverPhotoSelect = (file, previewUrl) => {
    setCoverPhotoPreviewUrl(previewUrl);
  };

  const onSubmit = (data) => {
    const tripId = crypto.randomUUID();
    const tripDraft = {
      id: tripId,
      tripName: data.tripName,
      startDate: data.startDate,
      endDate: data.endDate,
      description: data.description || '',
      coverPhotoPreviewUrl: coverPhotoPreviewUrl || null,
    };

    toast.success('Trip created! Start building your itinerary.');

    navigate(`/trips/${tripId}/itinerary`, {
      state: { tripDraft },
    });
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 1. Trip Name */}
      <FormField
        id="tripName"
        label="Trip Name"
        type="text"
        placeholder="e.g. European Summer"
        register={register}
        error={errors.tripName}
      />

      {/* 2. Date Range */}
      <TripDateFields register={register} errors={errors} />

      {/* 3. Description */}
      <FormField id="description" label="Trip Description" error={errors.description}>
        <textarea
          id="description"
          rows={3}
          placeholder="Tell us a little about your trip..."
          {...register('description')}
          className={`${getInputClassName(errors.description)} resize-none`}
        />
      </FormField>

      {/* 4. Cover Photo */}
      <CoverPhotoUpload onFileSelect={handleCoverPhotoSelect} />

      {/* 5. Actions */}
      <TripActions onCancel={handleCancel} isSubmitting={isSubmitting} />
    </form>
  );
};

export default TripForm;
