import React from 'react';
import { Repeat, ArrowRight, Zap, Shield, Target, Clock, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServicesList = () => {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate('/services');
  };

  const features = [
    {
      icon: <Target className="w-6 h-6 text-lynx-pink" />,
      title: 'Multi-Platform Support',
      description: 'PlayStation, Xbox, Nintendo Switch, PC, Mobile'
    },
    {
      icon: <Clock className="w-6 h-6 text-lynx-pink" />,
      title: 'Fast Delivery',
      description: 'From weeks to months depending on complexity'
    },
    {
      icon: <Award className="w-6 h-6 text-lynx-pink" />,
      title: '100% Success Rate',
      description: 'Full refund guarantee if port fails'
    }
  ];

  return (
    <section className="py-20 bg-lynx-gray">
      <div className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              GAME <span className="text-lynx-pink">PORTING</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We bring your games to every platform with guaranteed success and optimal performance
            </p>
          </div>

          {/* Main Game Porting Service */}
          <div className="max-w-4xl mx-auto">
            <div 
              onClick={handleServiceClick}
              className="bg-lynx-dark p-12 rounded-2xl hover:bg-lynx-pink/5 transition-all duration-300 hover-glow cursor-pointer hover:scale-105 relative overflow-hidden border border-transparent hover:border-lynx-pink/30 group"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-lynx-pink/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Main icon */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-lynx-pink/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Repeat className="w-10 h-10 text-lynx-pink" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-lynx-pink transition-colors duration-300">
                    Game Porting Services
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
                    Professional game porting to all major platforms. From PC to consoles, mobile to cloud gaming - we ensure your game reaches every player, everywhere.
                  </p>
                </div>

                {/* Features grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-lynx-pink/10 rounded-full mb-4 group-hover:bg-lynx-pink/20 transition-colors duration-300">
                        {feature.icon}
                      </div>
                      <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* Call to action */}
                <div className="text-center">
                  <div className="inline-flex items-center text-lynx-pink group-hover:text-white transition-colors duration-300">
                    <Zap className="w-5 h-5 mr-2" />
                    <span className="text-lg font-semibold mr-3">Learn More About Our Process</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
