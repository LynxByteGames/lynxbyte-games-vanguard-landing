import React from 'react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Gamepad2, Smartphone, Monitor, Headphones, Code, Palette } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'Game Development',
      description: 'Full-cycle game development from concept to launch across multiple platforms.',
      features: ['Cross-platform development', 'Performance optimization', 'Quality assurance']
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile Games',
      description: 'Native and hybrid mobile game development for iOS and Android platforms.',
      features: ['Touch controls optimization', 'App store optimization', 'Monetization strategies']
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: 'PC & Console',
      description: 'High-performance games for PC, PlayStation, Xbox, and Nintendo platforms.',
      features: ['Console certification', 'High-end graphics', 'Controller support']
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: 'VR/AR Games',
      description: 'Immersive virtual and augmented reality gaming experiences.',
      features: ['VR optimization', 'Spatial interaction', 'Motion tracking']
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Technical Consulting',
      description: 'Expert technical guidance and code review for your gaming projects.',
      features: ['Code optimization', 'Architecture design', 'Performance audits']
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Game Design',
      description: 'Creative game design and user experience optimization services.',
      features: ['UI/UX design', 'Game mechanics', 'Player engagement']
    }
  ];

  return (
    <div className="min-h-screen bg-lynx-dark">
      <Navbar />
      
      <section className="pt-24 pb-16 section-padding">
        <div className="container-width">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              OUR <span className="gradient-text">SERVICES</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive game development services to bring your vision to life with 
              cutting-edge technology and creative excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-lynx-gray hover:bg-lynx-gray/80 p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover-glow animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-lynx-pink mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-lynx-pink transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-gray-400 flex items-center">
                      <div className="w-1.5 h-1.5 bg-lynx-pink rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
};

export default Services;
