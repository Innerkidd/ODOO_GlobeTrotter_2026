import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../../pages/LandingPage/LandingPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import AuthGoogleSuccess from '../../pages/AuthGoogleSuccess/AuthGoogleSuccess';
import DashboardPage from '../../pages/DashboardPage/DashboardPage';
import CreateTripPage from '../../pages/CreateTripPage/CreateTripPage';
import ItineraryBuilderPage from '../../pages/ItineraryBuilderPage/ItineraryBuilderPage';
import ItineraryViewPage from '../../pages/ItineraryViewPage/ItineraryViewPage';
import BudgetPage from '../../pages/BudgetPage/BudgetPage';
import CalendarPage from '../../pages/CalendarPage/CalendarPage';
import ShareTripPage from '../../pages/ShareTripPage/ShareTripPage';
import PublicTripPage from '../../pages/PublicTripPage/PublicTripPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/auth/google/success" element={<AuthGoogleSuccess />} />

      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/create-trip" element={<CreateTripPage />} />
      <Route path="/trips/:tripId/itinerary" element={<ItineraryBuilderPage />} />

      {/* Itinerary View Routes */}
      <Route path="/trips/:tripId/itinerary/view" element={<ItineraryViewPage />} />
      <Route path="/itinerary/view" element={<ItineraryViewPage />} />

      {/* Budget Routes */}
      <Route path="/trips/:tripId/budget" element={<BudgetPage />} />
      <Route path="/budget" element={<BudgetPage />} />

      {/* Calendar / Timeline Routes */}
      <Route path="/trips/:tripId/calendar" element={<CalendarPage />} />
      <Route path="/calendar" element={<CalendarPage />} />

      {/* Share Trip & Public Itinerary Routes */}
      <Route path="/trips/:tripId/share" element={<ShareTripPage />} />
      <Route path="/share" element={<ShareTripPage />} />
      <Route path="/public/trips/:shareId" element={<PublicTripPage />} />
      <Route path="/public/trips/demo-trip" element={<PublicTripPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;