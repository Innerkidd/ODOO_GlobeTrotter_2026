import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { apiRequest } from '../../lib/apiClient';

import AuthLayout from '../../components/auth/AuthLayout/AuthLayout';
import AuthCard from '../../components/auth/AuthCard/AuthCard';
import AuthHeader from '../../components/auth/AuthHeader/AuthHeader';
import FormField from '../../components/auth/FormField/FormField';
import PasswordInput from '../../components/auth/PasswordInput/PasswordInput';
import GoogleButton from '../../components/auth/GoogleButton/GoogleButton';
import AuthDivider from '../../components/auth/AuthDivider/AuthDivider';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      localStorage.setItem('globetrotter_token', res.data.token);
      toast.success('Welcome back! Navigating to your dashboard...');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Welcome back"
          subtitle="Sign in to continue planning your trips"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            register={register}
            error={errors.email}
          />

          <PasswordInput
            id="password"
            label="Password"
            placeholder="••••••••"
            autoComplete="current-password"
            register={register}
            error={errors.password}
          />

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 select-none">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500/20"
              />
              <span>Remember me</span>
            </label>

            <Link
              to="/forgot-password"
              className="font-medium text-teal-600 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-600 rounded-sm"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <AuthDivider text="OR" />

        <GoogleButton text="Continue with Google" />

        <p className="mt-6 text-center text-xs sm:text-sm text-slate-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-teal-600 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-600 rounded-sm"
          >
            Sign up
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;
