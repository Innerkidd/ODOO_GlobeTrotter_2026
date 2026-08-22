import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { register as registerService, login as loginService, logout as logoutService, getCurrentUser } from '../services/authService';
import { getStoredToken as getToken, setStoredToken as setToken, clearStoredToken as clearToken } from '../services/api/axiosClient';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const extractMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Restore session on app start: if a token exists, validate it via GET /auth/me
  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      const token = getToken();

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        if (cancelled) return;

        if (response?.success && response?.data?.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          clearToken();
        }
      } catch {
        if (!cancelled) clearToken();
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    restoreSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const startSession = (token, nextUser) => {
    setToken(token);
    setUser(nextUser || null);
    setIsAuthenticated(true);
  };

  const signup = async ({ name, email, password }) => {
    try {
      const response = await registerService({ name, email, password });
      const { token, user: nextUser } = response?.data || {};
      if (!response?.success || !token) {
        return { success: false, message: response?.message || 'Registration failed' };
      }
      startSession(token, nextUser);
      return { success: true };
    } catch (error) {
      return { success: false, message: extractMessage(error) };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await loginService({ email, password });
      const { token, user: nextUser } = response?.data || {};
      if (!response?.success || !token) {
        return { success: false, message: response?.message || 'Invalid email or password' };
      }
      startSession(token, nextUser);
      return { success: true };
    } catch (error) {
      return { success: false, message: extractMessage(error) };
    }
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch {
      // Even if backend logout fails, clear local state safely
    }
    clearToken();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  const value = { user, isLoading, isAuthenticated, signup, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;