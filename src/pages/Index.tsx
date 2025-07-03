
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CompanyLogos from '@/components/CompanyLogos';
import AboutUs from '@/components/AboutUs';
import ServicesList from '@/components/ServicesList';
import SuccessStories from '@/components/SuccessStories';
import Stats from '@/components/Stats';
import USP from '@/components/USP';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-lynx-dark">
      <Navbar />
      <Hero />
      <CompanyLogos />
      <AboutUs />
      <ServicesList />
      <SuccessStories />
      <Stats />
      <USP />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
