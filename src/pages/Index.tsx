
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import ServicesList from '@/components/ServicesList';
import BlogPosts from '@/components/BlogPosts';
import Stats from '@/components/Stats';
import USP from '@/components/USP';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LogoCarousel from '@/components/LogoCarousel';

const Index = () => {
  return (
    <div className="min-h-screen bg-lynx-dark">
      <Navbar />
      <Hero />
      <LogoCarousel/>
      <AboutUs />
      <ServicesList />
      <USP />
      <BlogPosts />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
