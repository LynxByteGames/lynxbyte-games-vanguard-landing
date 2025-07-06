import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import LogoCarousel from './LogoCarousel';

const Hero = () => {
  const [stats, setStats] = useState([0, 0, 0]);
  const targetStats = [50, 8, 0];



  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats(targetStats.map(target => 
        Math.floor(target * progress)
      ));

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-lynx-dark h-[110vh]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/lovable-uploads/hero.png)'
        }}
      />
      <div className="absolute inset-0 bg-lynx-dark/70"></div>

      <div className="section-padding h-full flex items-center justify-center relative z-10">
        <div className="container-width">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-black leading-tight text-white">
                YOUR GETEWAY TO GAMING SUCCESS ON
                <span className="block text-lynx-pink relative">
                  CONSOLES PLATFORMS
                </span>
              </h1>
            </div>

            {/* Description */}
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-white/80 leading-relaxed">
                Professional game development studio creating extraordinary gaming experiences 
                across multiple platforms with cutting-edge technology and creative excellence.
              </p>
            </div>

            {/* Work with us Button */}
            <div className="flex justify-center">
              <Button 
                className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-lynx-pink/40"
              >
                Work with us
              </Button>
            </div>

            {/* Animated Stats */}
            <div className="flex justify-center space-x-12 mt-8">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-lynx-pink mb-2">
                  {stats[0]}+
                </div>
                <div className="text-sm text-white/70">Games Developed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-lynx-pink mb-2">
                  {stats[1]}+
                </div>
                <div className="text-sm text-white/70">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-lynx-pink mb-2">
                  {stats[2]}h
                </div>
                <div className="text-sm text-white/70">of crunch of your developers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <LogoCarousel/>
    </section>
  );
};

export default Hero;
