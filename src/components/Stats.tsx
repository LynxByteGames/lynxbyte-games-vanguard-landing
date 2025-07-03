
import React from 'react';

const Stats = () => {
  const stats = [
    { number: '50+', label: 'Games Developed', description: 'Successfully launched projects' },
    { number: '8+', label: 'Years Experience', description: 'In the gaming industry' },
    { number: '25M+', label: 'Total Downloads', description: 'Across all platforms' }
  ];

  return (
    <section className="py-20 bg-lynx-gray">
      <div className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              OUR <span className="gradient-text">IMPACT</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Numbers that speak for our excellence and dedication to creating outstanding games
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-lynx-pink to-pink-500 p-8 rounded-2xl mb-4">
                  <div className="text-5xl lg:text-6xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-white">{stat.label}</div>
                </div>
                <p className="text-gray-300">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
