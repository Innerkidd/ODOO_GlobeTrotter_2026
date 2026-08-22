import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, Mail, CheckCircle2, KeyRound, ShieldCheck, Eye, EyeOff } from 'lucide-react';

import AuthLayout from '../../components/auth/AuthLayout/AuthLayout';
import AuthCard from '../../components/auth/AuthCard/AuthCard';
import AuthHeader from '../../components/auth/AuthHeader/AuthHeader';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  // Step state: 1 = Email, 2 = Verification Code, 3 = New Password, 4 = Success
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Send Reset Code
  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
      toast.success(`Verification code sent to ${email}`);
    }, 800);
  };

  // Step 2: Handle OTP input changes
  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.charAt(value.length - 1);
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next box
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    const codeString = otpCode.join('');
    if (codeString.length < 6) {
      toast.error('Please enter the complete 6-digit code.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
      toast.success('Code verified successfully!');
    }, 600);
  };

  // Password strength calculator
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'Empty', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 50, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 75, label: 'Good', color: 'bg-teal-500' };
    return { score: 100, label: 'Strong', color: 'bg-emerald-600' };
  };

  const strength = getPasswordStrength(newPassword);

  // Step 3: Reset Password
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
      toast.success('Password reset successfully!');
    }, 800);
  };

  return (
    <AuthLayout>
      <AuthCard>
        {/* STEP 1: Enter Email */}
        {step === 1 && (
          <>
            <AuthHeader
              title="Forgot your password?"
              subtitle="Enter your registered email and we'll send you a verification code."
            />

            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 pl-10 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-teal-600 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? 'Sending code...' : 'Send Verification Code'}
              </button>
            </form>
          </>
        )}

        {/* STEP 2: Enter Verification Code */}
        {step === 2 && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 ring-1 ring-teal-100 shadow-2xs">
              <Mail className="h-6 w-6" />
            </div>

            <AuthHeader
              title="Check your email"
              subtitle={`We've sent a 6-digit verification code to ${email}`}
            />

            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div className="flex justify-center gap-2">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="h-12 w-10 sm:w-11 rounded-xl border border-slate-300 bg-white text-center font-heading text-lg font-bold text-slate-900 shadow-2xs transition-all focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-hidden"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? 'Verifying...' : 'Verify Code'}
              </button>

              <div className="text-center text-xs text-slate-500">
                Didn't receive code?{' '}
                <button
                  type="button"
                  onClick={() => toast.success(`Code re-sent to ${email}`)}
                  className="font-semibold text-teal-600 hover:underline cursor-pointer"
                >
                  Click to resend
                </button>
              </div>
            </form>
          </>
        )}

        {/* STEP 3: Create New Password */}
        {step === 3 && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 ring-1 ring-teal-100 shadow-2xs">
              <KeyRound className="h-6 w-6" />
            </div>

            <AuthHeader
              title="Set new password"
              subtitle="Must be at least 6 characters long."
            />

            <form onSubmit={handleResetPassword} className="space-y-4">
              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-teal-600 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Strength Bar */}
                {newPassword && (
                  <div className="mt-2 space-y-1">
                    <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full transition-all duration-300 ${strength.color}`}
                        style={{ width: `${strength.score}%` }}
                      />
                    </div>
                    <p className="text-[11px] font-semibold text-slate-500">
                      Strength: <span className="text-slate-700">{strength.label}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-teal-600 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </>
        )}

        {/* STEP 4: Success Card */}
        {step === 4 && (
          <div className="py-4 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
              <CheckCircle2 className="h-10 w-10 animate-bounce" />
            </div>

            <AuthHeader
              title="Password reset complete!"
              subtitle="Your password has been successfully updated. You can now log in with your new password."
            />

            <button
              type="button"
              onClick={() => {
                toast.success('Redirecting to Sign in...');
                navigate('/login');
              }}
              className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-500 cursor-pointer"
            >
              Sign in with New Password
            </button>
          </div>
        )}

        {/* Back to Sign In Link */}
        {step !== 4 && (
          <div className="mt-6 flex justify-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-teal-600 rounded-sm p-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Sign in</span>
            </Link>
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;