
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const stats = [
    { number: '50+', label: 'Games That We Worked On' },
    { number: '8+', label: 'Years In The Industry At Your Service' },
  ];

  const platforms = [
    { name: 'PlayStation', logo: '🎮' },
    { name: 'Xbox', logo: '🎮' },
    { name: 'Nintendo', logo: '🎮' },
    { name: 'Google Play', logo: '📱' },
    { name: 'App Store', logo: '📱' },
    { name: 'Steam', logo: '💻' },
    { name: 'Oculus', logo: '🥽' },
  ];

  const engines = [
    { name: 'Unity', logo: '⚙️' },
    { name: 'Unreal Engine', logo: '⚙️' },
    { name: 'Godot', logo: '⚙️' },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/lovable-uploads/35bbf63f-186e-47b2-a8c3-0f4a531dd205.png)'
        }}
      />
      <div className="absolute inset-0 bg-lynx-dark/80"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-lynx-pink rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="section-padding pt-24 pb-16 relative z-10">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                  OUR TEAM OF
                  <span className="block gradient-text">
                    HEROES & EXPERTS
                  </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                  Professional game development studio creating extraordinary gaming experiences 
                  across multiple platforms with cutting-edge technology and creative excellence.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-lynx-pink/30 group"
                >
                  Get Started
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-lynx-pink text-lynx-pink hover:bg-lynx-pink hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 group"
                >
                  <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="space-y-8 animate-slide-in-right">
              <div className="bg-gradient-to-br from-lynx-pink to-pink-500 p-8 rounded-2xl text-white">
                <div className="grid grid-cols-2 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl font-black mb-2">{stat.number}</div>
                      <div className="text-sm font-medium opacity-90">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Platforms & Engines */}
          <div className="mt-20 space-y-12 animate-fade-in">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">PLATFORMS</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                {platforms.map((platform, index) => (
                  <div key={index} className="bg-lynx-gray hover:bg-lynx-pink/10 p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover-glow">
                    <div className="text-3xl mb-2">{platform.logo}</div>
                    <div className="text-sm font-medium text-gray-300">{platform.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">ENGINES</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                {engines.map((engine, index) => (
                  <div key={index} className="bg-lynx-gray hover:bg-lynx-pink/10 p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover-glow">
                    <div className="text-3xl mb-2">{engine.logo}</div>
                    <div className="text-sm font-medium text-gray-300">{engine.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
