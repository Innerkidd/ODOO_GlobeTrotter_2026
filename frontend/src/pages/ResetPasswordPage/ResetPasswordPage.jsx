import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

import { resetPassword } from '../../../services/authService';

import AuthLayout from '../../components/auth/AuthLayout/AuthLayout';
import AuthCard from '../../components/auth/AuthCard/AuthCard';
import AuthHeader from '../../components/auth/AuthHeader/AuthHeader';
import PasswordInput from '../../components/auth/PasswordInput/PasswordInput';

const resetPasswordSchema = z
  .object({
    password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const ResetPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Reset token comes from the link: /reset-password?token=<token> (or #token=<token>)
  const [resetToken, setResetToken] = useState('');

  useEffect(() => {
    let token = searchParams.get('token') || '';
    if (!token && window.location.hash) {
      const match = window.location.hash.match(/[#&]token=([^&]+)/);
      if (match) {
        token = decodeURIComponent(match[1]);
      }
    }
    setResetToken(token || '');
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    if (!resetToken) {
      toast.error('Invalid or missing reset token. Please request a new reset link.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await resetPassword({ token: resetToken, password: data.password });
      setSubmitted(true);
      toast.success(response?.message || 'Password has been reset successfully.');
      setTimeout(() => navigate('/login', { replace: true }), 2000);
    } catch (error) {
      // Invalid / expired token or validation errors - show backend message
      toast.error(error?.response?.data?.message || 'Password reset failed. The link may be invalid or expired.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Reset your password"
          subtitle="Choose a new password for your account."
        />

        {!resetToken ? (
          <div className="my-4 rounded-xl border border-red-200 bg-red-50/80 p-4 text-center text-xs sm:text-sm text-red-700 backdrop-blur-xs">
            <p className="font-semibold">Invalid reset link</p>
            <p className="mt-1">This password reset link is missing its token. Please request a new one.</p>
          </div>
        ) : null}

        {submitted ? (
          <div className="my-4 rounded-xl border border-teal-200 bg-teal-50/80 p-4 text-center text-xs sm:text-sm text-teal-800 backdrop-blur-xs">
            <p className="font-semibold">Password Reset Successful</p>
            <p className="mt-1 text-teal-700">You can now sign in with your new password.</p>
          </div>
        ) : null}

        {resetToken && !submitted && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* New Password Input */}
            <div>
              <PasswordInput
                id="password"
                label="New Password"
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
              label="Confirm New Password"
              placeholder="Re-enter password"
              autoComplete="new-password"
              register={register}
              error={errors.confirmPassword}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Resetting password...' : 'Reset Password'}
            </button>
          </form>
        )}

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

export default ResetPasswordPage;