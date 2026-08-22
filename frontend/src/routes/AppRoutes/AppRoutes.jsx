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
import ItineraryBuilderPage from '../../pages/ItineraryBuilderPage/ItineraryBuilderPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
<<<<<<< HEAD
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/auth/google/success" element={<AuthGoogleSuccess />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/create-trip" element={<CreateTripPage />} />
      <Route path="/trips/:tripId/itinerary" element={<ItineraryBuilderPage />} />
=======
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

>>>>>>> c20e2d07eb80fdd1322e66e07c7514519f2ed0c4
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;