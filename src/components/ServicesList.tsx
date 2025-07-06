import React from 'react';
import { Gamepad2, Smartphone, Monitor, Headset, Code, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServicesList = () => {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate('/services');
  };

  const services = [
    {
      icon: <Gamepad2 className="w-12 h-12 text-lynx-pink" />,
      title: 'Game Development',
      description: 'Full-cycle game development from concept to launch across all platforms.'
    },
    {
      icon: <Smartphone className="w-12 h-12 text-lynx-pink" />,
      title: 'Mobile Games',
      description: 'Native and cross-platform mobile game development for iOS and Android.'
    },
    {
      icon: <Monitor className="w-12 h-12 text-lynx-pink" />,
      title: 'PC & Console',
      description: 'High-performance games for PC, PlayStation, Xbox, and Nintendo platforms.'
    },
    {
      icon: <Headset className="w-12 h-12 text-lynx-pink" />,
      title: 'VR/AR Games',
      description: 'Immersive virtual and augmented reality gaming experiences.'
    },
    {
      icon: <Code className="w-12 h-12 text-lynx-pink" />,
      title: 'Technical Consulting',
      description: 'Expert technical guidance and optimization for your gaming projects.'
    },
    {
      icon: <Palette className="w-12 h-12 text-lynx-pink" />,
      title: 'Game Design',
      description: 'Creative game design, mechanics, and user experience optimization.'
    }
  ];

  return (
    <section className="py-20 bg-lynx-gray">
      <div className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              OUR <span className="text-lynx-pink">SERVICES</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We offer comprehensive game development services to bring your vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                onClick={handleServiceClick}
                className="bg-lynx-dark p-8 rounded-2xl hover:bg-lynx-pink/5 transition-all duration-300 hover-glow cursor-pointer hover:scale-105"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
