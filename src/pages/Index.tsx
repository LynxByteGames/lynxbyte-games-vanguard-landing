
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-lynx-dark">
      <Navbar />
      <Hero />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
