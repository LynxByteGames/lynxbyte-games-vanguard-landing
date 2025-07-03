
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
    <section className="relative overflow-hidden bg-lynx-dark">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/lovable-uploads/35bbf63f-186e-47b2-a8c3-0f4a531dd205.png)'
        }}
      />
      <div className="absolute inset-0 bg-lynx-dark/85"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-lynx-pink rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 right-20 w-8 h-8 border-2 border-lynx-pink/30 rotate-45 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-6 h-6 bg-purple-500/20 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-lynx-pink/20 transform rotate-45 animate-pulse delay-300"></div>
      </div>

      <div className="section-padding pt-32 pb-20 relative z-10">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="relative">
                  <h1 className="text-4xl lg:text-6xl font-black leading-tight">
                    OUR TEAM OF
                    <span className="block gradient-text relative">
                      HEROES & EXPERTS
                      <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-lynx-pink to-transparent opacity-50"></div>
                    </span>
                  </h1>
                </div>
                <p className="text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed">
                  Professional game development studio creating extraordinary gaming experiences 
                  across multiple platforms with cutting-edge technology and creative excellence.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-gradient-to-r from-lynx-pink to-pink-500 hover:from-lynx-pink-hover hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-lynx-pink/40 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <span className="relative">Get Started</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform relative" size={20} />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-lynx-pink text-lynx-pink hover:bg-lynx-pink hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 group backdrop-blur-sm bg-white/5"
                >
                  <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="space-y-8 animate-slide-in-right">
              <div className="bg-gradient-to-br from-lynx-pink/90 to-pink-500/90 p-8 rounded-2xl text-white backdrop-blur-sm border border-white/10 shadow-2xl">
                <div className="grid grid-cols-2 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center relative">
                      <div className="absolute inset-0 bg-white/5 rounded-lg blur-sm"></div>
                      <div className="relative">
                        <div className="text-3xl lg:text-4xl font-black mb-2 text-shadow">{stat.number}</div>
                        <div className="text-sm font-medium opacity-90">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Platforms & Engines */}
          <div className="mt-16 space-y-12 animate-fade-in">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-8 text-center">PLATFORMS</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-6">
                {platforms.map((platform, index) => (
                  <div key={index} className="bg-lynx-gray/80 hover:bg-lynx-pink/10 p-4 lg:p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover-glow backdrop-blur-sm border border-white/5">
                    <div className="text-2xl lg:text-3xl mb-2">{platform.logo}</div>
                    <div className="text-xs lg:text-sm font-medium text-gray-300">{platform.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-8 text-center">ENGINES</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                {engines.map((engine, index) => (
                  <div key={index} className="bg-lynx-gray/80 hover:bg-lynx-pink/10 p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover-glow backdrop-blur-sm border border-white/5">
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
