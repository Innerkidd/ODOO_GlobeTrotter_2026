import React from 'react';
import Navbar from '../../components/common/Navbar/Navbar';
import Hero from '../../components/landing/Hero/Hero';
import FeatureCards from '../../components/landing/FeatureCards/FeatureCards';
import CTA from '../../components/landing/CTA/CTA';
import Footer from '../../components/common/Footer/Footer';

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Three Feature Cards */}
        <FeatureCards />

        {/* 4. Final CTA */}
        <CTA />
      </main>

      {/* 5. Minimal Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
