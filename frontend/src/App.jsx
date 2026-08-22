import React from 'react';
<<<<<<< HEAD
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes/AppRoutes';

function App() {
  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <AppRoutes />
    </>
=======
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
>>>>>>> 5c3f867 (feat:landing page backend)
  );
}

export default App;
