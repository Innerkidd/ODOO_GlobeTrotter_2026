import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../../pages/LandingPage/LandingPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import AuthGoogleSuccess from '../../pages/AuthGoogleSuccess/AuthGoogleSuccess';
import DashboardPage from '../../pages/DashboardPage/DashboardPage';
import ItineraryViewPage from '../../pages/ItineraryViewPage/ItineraryViewPage';
import CreateTripPage from '../../pages/CreateTripPage/CreateTripPage';
import MyTripsPage from '../../pages/MyTripsPage/MyTripsPage';
import ItineraryPage from '../../pages/ItineraryPage/ItineraryPage';
import BudgetPage from '../../pages/BudgetPage/BudgetPage';
import CalendarPage from '../../pages/CalendarPage/CalendarPage';
import { useAuth } from '../../../context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-sm">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const PublicRoute = ({ element }) => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return element;
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : element;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
      <Route path="/signup" element={<PublicRoute element={<SignupPage />} />} />
      <Route path="/forgot-password" element={<PublicRoute element={<ForgotPasswordPage />} />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/auth/google/success" element={<AuthGoogleSuccess />} />

      <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
      <Route path="/create-trip" element={<ProtectedRoute element={<CreateTripPage />} />} />
      <Route path="/my-trips" element={<ProtectedRoute element={<MyTripsPage />} />} />
      <Route path="/itinerary/:id" element={<ProtectedRoute element={<ItineraryPage />} />} />
      <Route path="/budget" element={<ProtectedRoute element={<BudgetPage />} />} />
      <Route path="/calendar" element={<ProtectedRoute element={<CalendarPage />} />} />

      {/* Itinerary View Routes */}
      <Route path="/trips/:tripId/itinerary/view" element={<ItineraryViewPage />} />
      <Route path="/itinerary/view" element={<ItineraryViewPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;