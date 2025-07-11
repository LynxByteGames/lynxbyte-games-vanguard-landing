import React from 'react';
import { Gamepad2, Users, CheckCircle, Globe, Wrench, UploadCloud, Repeat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServicesList = () => {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate('/services');
  };

  const services = [
    {
      icon: <Repeat className="w-12 h-12 text-lynx-pink" />, // Game porting
      title: 'Game porting',
      description: 'Porting your game to new platforms and devices.'
    },
    {
      icon: <Gamepad2 className="w-12 h-12 text-lynx-pink" />, // Full-development
      title: 'Full-development',
      description: 'Complete game development from idea to launch.'
    },
    {
      icon: <Users className="w-12 h-12 text-lynx-pink" />, // Co-development
      title: 'Co-development',
      description: 'Collaborative game development with your team.'
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-lynx-pink" />, // QA & Localization
      title: 'QA & Localization',
      description: 'Quality assurance and localization for global reach.'
    },
    {
      icon: <Wrench className="w-12 h-12 text-lynx-pink" />, // Optimization & Bug fixing
      title: 'Optimization & Bug fixing',
      description: 'Performance optimization and bug fixing.'
    },
    {
      icon: <UploadCloud className="w-12 h-12 text-lynx-pink" />, // Release Management
      title: 'Release Management',
      description: 'Managing and supporting your game releases.'
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
