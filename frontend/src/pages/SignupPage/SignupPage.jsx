import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import AuthLayout from '../../components/auth/AuthLayout/AuthLayout';
import AuthCard from '../../components/auth/AuthCard/AuthCard';
import AuthHeader from '../../components/auth/AuthHeader/AuthHeader';
import FormField from '../../components/auth/FormField/FormField';
import PasswordInput from '../../components/auth/PasswordInput/PasswordInput';
import GoogleButton from '../../components/auth/GoogleButton/GoogleButton';
import AuthDivider from '../../components/auth/AuthDivider/AuthDivider';

// Zod Validation Schema for Signup
const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Full name must be at least 2 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must agree to the Terms & Privacy Policy' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const SignupPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.info('Account creation form validated! Account creation will be connected when authentication APIs are integrated.', {
        duration: 5000,
      });
    }, 600);
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create your account"
          subtitle="Start planning your next journey with GlobeTrotter"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Full Name Input */}
          <FormField
            id="fullName"
            label="Full Name"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            register={register}
            error={errors.fullName}
          />

          {/* Email Input */}
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            register={register}
            error={errors.email}
          />

          {/* Password Input */}
          <div>
            <PasswordInput
              id="password"
              label="Password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              register={register}
              error={errors.password}
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Must contain at least 8 characters.
            </p>
          </div>

          {/* Confirm Password Input */}
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Re-enter password"
            autoComplete="new-password"
            register={register}
            error={errors.confirmPassword}
          />

          {/* Terms & Conditions Checkbox */}
          <div>
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none">
              <input
                type="checkbox"
                {...register('agreeTerms')}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500/20"
              />
              <span>
                I agree to the{' '}
                <span className="font-semibold text-slate-800 underline">Terms of Service</span>{' '}
                and{' '}
                <span className="font-semibold text-slate-800 underline">Privacy Policy</span>
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="mt-1.5 text-xs font-medium text-red-600 animate-fadeIn">
                {errors.agreeTerms.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <AuthDivider text="OR" />

        {/* Google OAuth UI Button */}
        <GoogleButton text="Continue with Google" />

        {/* Link to Sign In */}
        <p className="mt-6 text-center text-xs sm:text-sm text-slate-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-teal-600 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-600 rounded-sm"
          >
            Sign in
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default SignupPage;
