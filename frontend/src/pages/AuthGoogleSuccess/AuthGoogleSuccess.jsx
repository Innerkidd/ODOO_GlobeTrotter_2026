import React, { useEffect } from 'react';
import { setStoredToken } from '../../../services/api/axiosClient';

const AuthGoogleSuccess = () => {
  useEffect(() => {
    // Backend redirects here with: /auth/google/success#token=<JWT>
    console.log('[OAuth] AuthGoogleSuccess mounted, hash:', window.location.hash);
    const hash = window.location.hash;
    const tokenMatch = hash.match(/[#&]token=([^&]+)/);

    if (tokenMatch) {
      const token = decodeURIComponent(tokenMatch[1]);
      console.log('[OAuth] Token received on frontend, length:', token.length);
      setStoredToken(token);
      console.log('[OAuth] Token stored as globetrotter_token');
      // Strip the token from the URL/history, then full reload lets
      // AuthProvider validate it via GET /auth/me and enter the app
      window.history.replaceState(null, '', '/dashboard');
      console.log('[OAuth] Navigating to dashboard');
      window.location.replace('/dashboard');
    } else {
      console.log('[OAuth] No token found in hash, redirecting to login');
      window.location.replace('/login');
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 text-slate-900">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600" />
        <h1 className="font-heading text-xl font-bold text-slate-900">Completing sign in...</h1>
        <p className="mt-2 text-sm text-slate-600">Please wait while we sign you in.</p>
      </div>
    </div>
  );
};

export default AuthGoogleSuccess;