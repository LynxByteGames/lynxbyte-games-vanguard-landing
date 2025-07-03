
import React from 'react';
import { CheckCircle } from 'lucide-react';

const USP = () => {
  const advantages = [
    'Experienced team with 8+ years in gaming industry',
    'Full-stack development from concept to deployment',
    'Cross-platform expertise across all major platforms',
    'Proven track record with 50+ successful games',
    'Cutting-edge technology and innovative solutions',
    'Dedicated support throughout the entire process'
  ];

  return (
    <section className="py-20 bg-lynx-dark">
      <div className="section-padding">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black mb-8">
                WHY CHOOSE <span className="gradient-text">LYNXBYTE?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We don't just develop games – we craft experiences that captivate players and drive success. 
                Our unique approach combines technical excellence with creative innovation.
              </p>
              
              <div className="space-y-4">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-lynx-pink mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-lynx-pink/20 to-purple-500/20 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-6">🎮</div>
              <h3 className="text-2xl font-bold mb-4">Ready to Create Something Amazing?</h3>
              <p className="text-gray-300 mb-6">
                Join the ranks of successful game developers who chose LYNXBYTE to bring their vision to life.
              </p>
              <div className="text-4xl font-black gradient-text">
                Your Game, Our Expertise
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USP;
