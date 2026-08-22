import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../../pages/LandingPage/LandingPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import DashboardPage from '../../pages/DashboardPage/DashboardPage';
import ItineraryViewPage from '../../pages/ItineraryViewPage/ItineraryViewPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      
      {/* Itinerary View Routes */}
      <Route path="/trips/:tripId/itinerary/view" element={<ItineraryViewPage />} />
      <Route path="/itinerary/view" element={<ItineraryViewPage />} />
    </Routes>
  );
};

export default AppRoutes;
