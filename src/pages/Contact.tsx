import React from 'react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-lynx-dark">
      <Navbar />
      
      {/* Add top padding to account for fixed navbar */}
      <div className="pt-8">
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage; 