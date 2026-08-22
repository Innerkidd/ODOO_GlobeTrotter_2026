import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

import AuthLayout from '../../components/auth/AuthLayout/AuthLayout';
import AuthCard from '../../components/auth/AuthCard/AuthCard';
import AuthHeader from '../../components/auth/AuthHeader/AuthHeader';
import FormField from '../../components/auth/FormField/FormField';

// Zod Validation Schema for Forgot Password
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

const ForgotPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.info('Form validated! Password reset functionality will be connected when authentication APIs are integrated.', {
        duration: 5000,
      });
    }, 600);
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Forgot your password?"
          subtitle="Enter your email address and we'll help you reset your password."
        />

        {submitted ? (
          <div className="my-4 rounded-xl border border-teal-200 bg-teal-50/80 p-4 text-center text-xs sm:text-sm text-teal-800 backdrop-blur-xs">
            <p className="font-semibold">Reset Request Received</p>
            <p className="mt-1 text-teal-700">
              Password reset functionality will be connected when the authentication API is integrated.
            </p>
          </div>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Email Input */}
          <FormField
            id="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            register={register}
            error={errors.email}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending link...' : 'Send Reset Link'}
          </button>
        </form>

        {/* Back to Sign In Link */}
        <div className="mt-6 flex justify-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-teal-600 rounded-sm p-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
