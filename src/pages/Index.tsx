
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
import { toast } from 'sonner';
import { Link } from 'react-router-dom';


const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to send data to Discord webhook
  const sendToDiscord = async (email: string) => {
    const webhookUrl = 'https://discord.com/api/webhooks/1393033317586047006/6fMJG91n-5HxZA-gonKFbbqIHlbCUHg6XQaRpsesDwbMF0oogooCjahwT_n1AiWwnEbL';
    
    const embed = {
      title: '📄 New Pitch Deck Download Request',
      color: 0xff2e9a, // Lynx pink color
      fields: [
        {
          name: '📧 Email',
          value: email,
          inline: true
        },
        {
          name: '📄 Request Type',
          value: 'Pitch Deck Download',
          inline: true
        },
        {
          name: '🌐 Source',
          value: 'Homepage Lead Magnet',
          inline: true
        },
        {
          name: '⏰ Timestamp',
          value: new Date().toLocaleString('pl-PL'),
          inline: true
        }
      ],
      footer: {
        text: 'Lynxbyte Games Pitch Deck Lead Magnet'
      },
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [embed]
        })
      });

      if (response.ok) {
        console.log('Discord webhook sent successfully for pitch deck request');
        return true;
      } else {
        console.error('Discord webhook failed:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Discord webhook error:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Pitch deck request submitted:', email);
      
      // Send to Discord webhook
      const discordResult = await sendToDiscord(email);
      
      // Open pitch deck in new tab
      //window.open('https://drive.google.com/file/d/1EHUYC-tnpvjPUZHQ8CXd610rDaYgleR1/view?usp=sharing', '_blank');
      
      toast.success('Thank you for your interest! We will send your pitch deck shortly. ');
      
      setShowForm(false);
      setEmail('');
    } catch (error) {
      console.error('Pitch deck request failed:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-lynx-dark">

      <Navbar />
      <Hero />
      {/* EasyGamePort Promo Section */}
      <section className="relative py-12 section-padding bg-lynx-dark overflow-hidden">
        {/* subtle glow accents */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-lynx-pink/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-lynx-pink/10 rounded-full blur-3xl" />
        <div className="container-width relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 p-6 lg:p-10 rounded-2xl border border-lynx-pink/30 bg-lynx-dark/60 shadow-[0_0_32px_#ff2e9a22]">
            <div className="flex-1 text-center lg:text-center">
              <span className="inline-block text-xs tracking-widest uppercase text-lynx-pink/90 border border-lynx-pink/40 bg-lynx-pink/10 rounded-full px-3 py-1">NEW</span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-black text-white">
                EasyGamePort - one plugin to port your game to consoles
              </h2>
              <p className="mt-3 text-gray-300 text-base lg:text-lg">
                Open‑source plugin that automates the repetitive work of console ports: saves, input, achievements/trophies and more. Ship faster, with lower cost.
              </p>
              <div className="mt-4 flex justify-center">
                <span className="inline-block text-sm md:text-base text-white border border-lynx-pink/50 bg-lynx-pink/10 rounded-full px-4 py-2 shadow-[0_0_24px_#ff2e9a33]">
                RIGHT NOW WE ARE LOOKING FOR GAMES TO FREE PORTING
                </span>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-center">
                <Link to="/easygameport" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-lynx-pink text-white font-semibold hover:bg-lynx-pink-hover transition shadow-[0_0_16px_#ff2e9a55]">
                  Explore EasyGamePort
                </Link>
                <Link to="/easygameport#apply" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition">
                  Apply for free port
                </Link>
              </div>
              <div className="mt-4 flex items-center gap-4 opacity-80 justify-center lg:justify-center">
                <img src="/lovable-uploads/play-station.png" alt="PlayStation" className="h-6 w-auto" />
                <img src="/lovable-uploads/consoles-xbox-512.png" alt="Xbox" className="h-6 w-auto" />
                <img src="/lovable-uploads/Nintendo.webp" alt="Nintendo Switch" className="h-6 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>
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
                  disabled={isLoading}
                  className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 w-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{boxShadow: '0 0 12px 1px #ff2e9a55'}}
                >
                  {isLoading ? 'Sending...' : 'Send Me the Pitch Deck'}
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
