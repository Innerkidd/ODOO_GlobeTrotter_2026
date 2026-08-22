import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { useAuth } from '../../../context/AuthContext';

import AuthLayout from '../../components/auth/AuthLayout/AuthLayout';
import AuthCard from '../../components/auth/AuthCard/AuthCard';
import AuthHeader from '../../components/auth/AuthHeader/AuthHeader';
import FormField from '../../components/auth/FormField/FormField';
import PasswordInput from '../../components/auth/PasswordInput/PasswordInput';
import GoogleButton from '../../components/auth/GoogleButton/GoogleButton';
import AuthDivider from '../../components/auth/AuthDivider/AuthDivider';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
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
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const result = await login(data);
    setIsSubmitting(false);

    if (result.success) {
      toast.success('Login successful');
      navigate('/dashboard', { replace: true });
    } else {
      toast.error(result.message || 'Invalid credentials');
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Sign in"
          subtitle="Start planning your next journey with GlobeTrotter"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
              placeholder="••••••••"
              autoComplete="current-password"
              register={register}
              error={errors.password}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Divider */}
        <AuthDivider text="OR" />

        {/* Google OAuth UI Button */}
        <GoogleButton text="Continue with Google" />

        {/* Link to Sign Up */}
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