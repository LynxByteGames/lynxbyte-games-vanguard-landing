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
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-8">
              WHY CHOOSE <span className="text-lynx-pink">LYNXBYTE GAMES</span> ?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
              We don't just develop games – we craft experiences that captivate players and drive success. 
              Our unique approach combines technical excellence with creative innovation.
            </p>
          </div>

          {/* Advantages List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start space-x-3 bg-lynx-gray/30 p-6 rounded-xl">
                <CheckCircle className="w-6 h-6 text-lynx-pink mt-1 flex-shrink-0" />
                <span className="text-gray-300">{advantage}</span>
              </div>
            ))}
          </div>

          {/* Quality Guarantee Section */}
          <div className="bg-lynx-gray/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-lynx-pink/20 animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-lynx-pink mb-6">
                  <div className="w-16 h-16 bg-lynx-pink/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                  OUR <span className="text-lynx-pink">QUALITY GUARANTEE</span>
                </h3>
                
                <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-6">
                  We're so confident in our development quality that we offer an unprecedented guarantee: 
                  if your game receives more than <span className="text-lynx-pink font-semibold">15% negative technical reviews </span> 
                  in the first <span className="text-lynx-pink font-semibold">30 days</span> after release, 
                  we'll not only refund a portion of your development costs but also fix all technical issues within <span className="text-lynx-pink font-semibold">24 hours</span>.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-lynx-pink rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Cost Refund Guarantee</h4>
                      <p className="text-gray-400 text-sm">Partial refund of development costs if quality standards aren't met</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-lynx-pink rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">24-Hour Bug Fix Promise</h4>
                      <p className="text-gray-400 text-sm">All technical issues resolved within one business day</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-lynx-pink rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">30-Day Quality Window</h4>
                      <p className="text-gray-400 text-sm">Comprehensive monitoring and support during critical launch period</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-lynx-dark/80 rounded-2xl p-6 lg:p-8 border border-lynx-pink/30">
                  <div className="text-center">
                    <div className="text-4xl lg:text-6xl text-lynx-pink font-black mb-4">15%</div>
                    <h4 className="text-white font-bold mb-2 text-lg lg:text-xl">Negative Review Threshold</h4>
                    <p className="text-gray-400 text-sm mb-6">Technical reviews only</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm lg:text-base">Time Window</span>
                        <span className="text-lynx-pink font-semibold text-sm lg:text-base">30 Days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm lg:text-base">Response Time</span>
                        <span className="text-lynx-pink font-semibold text-sm lg:text-base">24 Hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm lg:text-base">Guarantee Type</span>
                        <span className="text-lynx-pink font-semibold text-sm lg:text-base">Cost + Fix</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements for visual appeal */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-lynx-pink/20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-lynx-pink/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USP;
