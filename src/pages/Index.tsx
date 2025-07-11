
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import clsx from 'clsx';


const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the email to your backend
    // For now, we'll just log it and show a success message
    console.log('Email submitted:', email);
    alert('Thank you for your interest! We will send your pitch deck shortly.');
    setShowForm(false);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-lynx-dark">

      <Navbar />
      <Hero />
      <LogoCarousel/>
      <AboutUs />

      {/* Pitch Deck Lead Magnet Section */}
      <section className="relative py-16 section-padding bg-lynx-pink/10 overflow-hidden">
        {/* Subtelne dekoracje tła */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-lynx-pink/30 rounded-full blur-3xl z-0" />
        <div className="absolute -bottom-28 -right-28 w-96 h-96 bg-lynx-pink/20 rounded-full blur-3xl z-0" />
        <div className="container-width flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-white">
              DOWNLOAD OUR <br className="hidden lg:block" />
              <span className="text-lynx-pink">PITCH DECK</span>
            </h2>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              Need more details? Download our pitch deck now! <span className="inline-block"></span>
            </p>
            <ul className="text-base text-gray-300 mb-6 space-y-1">
              <li className="flex items-center gap-2"><span className="text-lynx-pink">🚀</span> See our proven success stories</li>
              <li className="flex items-center gap-2"><span className="text-lynx-pink">🎮</span> Discover how we can help your project</li>
              <li className="flex items-center gap-2"><span className="text-lynx-pink">🤝</span> Get in touch directly with our team</li>
            </ul>
            {!showForm && (
              <Button
                className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl mb-3 focus:ring-4 focus:ring-lynx-pink/40"
                style={{boxShadow: '0 0 24px 2px #ff2e9a55'}}
                onClick={() => setShowForm(true)}
              >
                Get My Pitch Deck Now
              </Button>
            )}
            {showForm ? (
              <form className={clsx("w-full max-w-sm flex flex-col gap-3 items-center lg:items-start", showForm && 'scale-100 opacity-100')} style={{transition: 'all 0.4s cubic-bezier(.4,2,.6,1)'}} onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 w-full">
                  <Input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="bg-white text-gray-900 placeholder-gray-500 border border-gray-300 focus:border-lynx-pink focus:ring-lynx-pink flex-1 rounded-lg shadow-sm"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 w-full shadow-lg"
                  style={{boxShadow: '0 0 12px 1px #ff2e9a55'}}
                >
                  Send Me the Pitch Deck
                </Button>
                <p className="text-xs text-gray-400 mt-1">
                  Yes, this is our lead magnet - we won’t spam you. We send it manually to get to know you better.
                </p>
              </form>
            ) : null}
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <button
              type="button"
              aria-label="Get Your Pitch Deck"
              onClick={() => setShowForm(true)}
              className="focus:outline-none group relative"
              style={{background: 'none', border: 'none', padding: 0, margin: 0, display: 'block'}}
            >
              <img
                src="/lovable-uploads/pitchdeck.jpg"
                alt="Lynxbyte Games Pitch Deck Cover"
                className="rounded-2xl shadow-xl w-full max-w-2xl min-h-[340px] min-w-[320px] border-4 border-lynx-pink/60 transition-transform duration-300 cursor-pointer"
                style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
              />
              {/* Download icon overlay on hover */}
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-lynx-pink/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white drop-shadow-lg" fill="none" viewBox="0 0 64 64" stroke="currentColor" strokeWidth="2">
                  <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,0.15)" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M32 18v24m0 0l-8-8m8 8l8-8" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>
      <ServicesList />
      <USP />
      <BlogPosts />
      <Contact />
      <Footer />

    </div>
  );
};

export default Index;
