import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LogoCarousel from '@/components/LogoCarousel';
import { Gamepad2, Monitor, ChevronDown, ChevronUp, Repeat, Users, CheckCircle, UploadCloud } from 'lucide-react';

const Services = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const portingSteps = [
    {
      number: '1',
      title: 'PROJECT ONBOARD',
      items: ['Project estimation', 'Contract', 'Repository configuration', 'Engine version upgrade', 'Consoles SDK instalation', 'Game benchmark'],
      duration: '1 MONTH',
      icon: <Repeat className="w-6 h-6" />
    },
    {
      number: '2',
      title: 'PERFORMANCE',
      items: ['RAM Optimization', 'Grafnic, meshses', 'and shaders optimization', 'Adressables/VSM'],
      duration: '1-2 MONTH(S)',
      icon: <Monitor className="w-6 h-6" />
    },
    {
      number: '3',
      title: 'CONSOLE FEATURE',
      items: ['Save system', 'UX/UI changes', 'Full gamepad controlls', 'Vibrations'],
      duration: '1-3 MONTH(S)',
      icon: <Gamepad2 className="w-6 h-6" />
    },
    {
      number: '4',
      title: 'ADDITIONAL',
      items: ['Multiplayer & Crossplay', 'DLC Implementation', 'WinGDK Version', 'Asian market', 'Localization & Culturalization'],
      duration: '1-2 MONTH(S)',
      icon: <Users className="w-6 h-6" />
    },
    {
      number: '5',
      title: 'CERTIFICATION',
      items: ['FQA', 'CQA', 'Bug fixing', 'Certification', 'Post cert fix'],
      duration: '1 MONTH',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      number: '6',
      title: 'RELEASE',
      items: ['Release Management', 'Ongoing maintance', 'Updates', 'Bug fixes'],
      duration: 'GUARANTEE',
      icon: <UploadCloud className="w-6 h-6" />
    }
  ];

  const faqData = [
    {
      question: "What is the cost and timeline for porting a game?",
      answer: "It depends on the size of the game, code quality, and required UX/UI changes. Each game is priced individually, but costs typically range from €15,000 to €250,000. The porting process can take anywhere from a few weeks to up to a year. Our record? A full port in under a week! If you'd like a quote - reach out and we'll provide a free detailed estimate."
    },
    {
      question: "Do you port games to Nintendo Switch 2?",
      answer: "Yes, we do. The challenge is not the development itself, but the publishing. Nintendo currently places heavy restrictions on releasing games for that platform. However, we can assist you throughout the entire process."
    },
    {
      question: "Do you provide ongoing support after the game launch?",
      answer: "Yes, we offer comprehensive post-launch support including bug fixes, performance and content updates, server maintenance, analytics, and player feedback analysis to help optimize your game."
    },
    {
      question: "Can we work on a rev-share model?",
      answer: "At the moment, we do not offer revenue share models. However, we can offer reduced development costs while still operating under a fixed-price model."
    },
    {
      question: "Does the game need to have controller support implemented before porting?",
      answer: "Absolutely not. We handle the entire process, including adapting UX/UI and implementing controller support as needed."
    },
    {
      question: "Can you guarantee that my game will be successfully ported to consoles?",
      answer: "Yes. We offer a full guarantee: either your game is successfully ported to the target console, or we refund 100% of the costs. We thoroughly review each game before signing any contract, so we are 110% confident the process will go smoothly."
    },
    {
      question: "Can I hire a single person through body leasing?",
      answer: "No. We work exclusively on a per-project or per-feature basis. We provide guarantees and take full responsibility for our work."
    },
    {
      question: "Do you work with indie developers and small studios?",
      answer: "Yes! We collaborate with teams of all sizes, from solo indie devs to large studios. Our services are scalable and we can tailor our approach to fit your budget and timeline. We're passionate about turning creative visions into reality."
    },
    {
      question: "Do I need to own my own consoles or developer accounts?",
      answer: "No. We provide all necessary hardware, accounts, and certifications. You simply assign us the task - we handle everything from A to Z."
    },
    {
      question: "Do you also publish games?",
      answer: "Yes, but currently on a limited basis. Previously we offered full free publishing and porting services. While porting is now paid, we can still provide publishing under a revenue share model."
    }
  ];

  const handleFAQClick = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-lynx-dark">
      <Navbar />
      
      <section className="pt-24 pb-16 section-padding">
        <div className="container-width">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              OUR <span className="text-lynx-pink">SERVICES</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive game development services to bring your vision to life with 
              cutting-edge technology and creative excellence.
            </p>
          </div>

          {/* Game Porting Process Flow */}
          <div className="relative max-w-7xl mx-auto">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 1 }}>
              <defs>
                <marker id="arrowhead" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,8 L12,4 z" fill="#EC4899" />
                </marker>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Desktop connections - hidden on mobile */}
              <g className="hidden lg:block">
                {/* Top row: 1 → 2 → 3 */}
                <path 
                  d="M 28% 20% Q 33% 18% 38% 20%" 
                  stroke="#EC4899" 
                  strokeWidth="2.5" 
                  fill="none" 
                  markerEnd="url(#arrowhead)"
                  filter="url(#glow)"
                  opacity="0.9"
                />
                <path 
                  d="M 61% 20% Q 66% 18% 71% 20%" 
                  stroke="#EC4899" 
                  strokeWidth="2.5" 
                  fill="none" 
                  markerEnd="url(#arrowhead)"
                  filter="url(#glow)"
                  opacity="0.9"
                />
                
                {/* Connection from 3 to 4 - curved path */}
                <path 
                  d="M 85% 35% Q 95% 45% 90% 55% Q 85% 65% 15% 65%" 
                  stroke="#EC4899" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeDasharray="6,4"
                  markerEnd="url(#arrowhead)"
                  filter="url(#glow)"
                  opacity="0.8"
                />
                
                {/* Bottom row: 4 → 5 → 6 */}
                <path 
                  d="M 28% 80% Q 33% 78% 38% 80%" 
                  stroke="#EC4899" 
                  strokeWidth="2.5" 
                  fill="none" 
                  markerEnd="url(#arrowhead)"
                  filter="url(#glow)"
                  opacity="0.9"
                />
                <path 
                  d="M 61% 80% Q 66% 78% 71% 80%" 
                  stroke="#EC4899" 
                  strokeWidth="2.5" 
                  fill="none" 
                  markerEnd="url(#arrowhead)"
                  filter="url(#glow)"
                  opacity="0.9"
                />
              </g>
              
              {/* Mobile/Tablet connections - visible only on smaller screens */}
              <g className="lg:hidden">
                {/* Vertical flowing connections for mobile */}
                <path 
                  d="M 50% 15% Q 55% 20% 50% 25%" 
                  stroke="#EC4899" 
                  strokeWidth="2" 
                  fill="none" 
                  markerEnd="url(#arrowhead)"
                  filter="url(#glow)"
                  opacity="0.8"
                />
                <path 
                  d="M 50% 35% Q 45% 40% 50% 45%" 
                  stroke="#EC4899" 
                  strokeWidth="2" 
                  fill="none" 
                  markerEnd="url(#arrowhead)"
                  filter="url(#glow)"
                  opacity="0.8"
                />
                <path 
                  d="M 50% 55% Q 55% 60% 50% 65%" 
                  stroke="#EC4899" 
                  strokeWidth="2" 
                  fill="none" 
                  markerEnd="url(#arrowhead)"
                  filter="url(#glow)"
                  opacity="0.8"
                />
                <path 
                  d="M 50% 75% Q 45% 80% 50% 85%" 
                  stroke="#EC4899" 
                  strokeWidth="2" 
                  fill="none" 
                  markerEnd="url(#arrowhead)"
                  filter="url(#glow)"
                  opacity="0.8"
                />
                <path 
                  d="M 50% 95% Q 55% 100% 50% 105%" 
                  stroke="#EC4899" 
                  strokeWidth="2" 
                  fill="none" 
                  markerEnd="url(#arrowhead)"
                  filter="url(#glow)"
                  opacity="0.8"
                />
              </g>
              
              {/* Animated dots along paths */}
              <circle r="3" fill="#EC4899" opacity="0.6">
                <animateMotion dur="8s" repeatCount="indefinite">
                  <path d="M 28% 20% Q 33% 18% 38% 20%"/>
                </animateMotion>
              </circle>
              <circle r="3" fill="#EC4899" opacity="0.6">
                <animateMotion dur="10s" repeatCount="indefinite">
                  <path d="M 85% 35% Q 95% 45% 90% 55% Q 85% 65% 15% 65%"/>
                </animateMotion>
              </circle>
            </svg>

            {/* Process Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative" style={{ zIndex: 2 }}>
              {portingSteps.map((step, index) => (
                <div 
                  key={index}
                  className="bg-lynx-gray/90 backdrop-blur-sm p-6 rounded-xl transition-all duration-300 hover:scale-105 hover-glow animate-fade-in group cursor-pointer relative overflow-hidden border border-lynx-pink/20 hover:border-lynx-pink/50"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Connection Node */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-lynx-pink rounded-full opacity-70 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 shadow-lg shadow-lynx-pink/50">
                    <div className="absolute inset-0 bg-lynx-pink rounded-full animate-ping opacity-30"></div>
                  </div>
                  
                  {/* Step Number and Title */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {step.number}. {step.title}
                    </h3>
                  </div>
                  
                  {/* Step Items */}
                  <ul className="space-y-2 mb-6">
                    {step.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-300 flex items-start">
                        <div className="w-1.5 h-1.5 bg-lynx-pink rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Duration Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-lynx-pink">
                      <div className="w-5 h-5 mr-2">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                      </div>
                      <span className="text-xs font-semibold">{step.duration}</span>
                    </div>
                    {step.duration === 'GUARANTEE' && (
                      <div className="text-lynx-pink">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Process Summary */}
            <div className="mt-12 text-center">
              <div className="bg-lynx-gray/50 backdrop-blur-sm rounded-2xl p-8 border border-lynx-pink/20">
                <h3 className="text-2xl font-bold text-white mb-4">Complete Game Porting Process</h3>
                <p className="text-gray-300 text-lg">
                  Our comprehensive 6-step porting process ensures your game reaches new platforms with optimal performance and full compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Unique Section */}
      <section className="py-16 section-padding bg-gradient-to-br from-lynx-dark to-lynx-gray/30">
        <div className="container-width">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              WHAT MAKES US <span className="text-lynx-pink">UNIQUE</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We don't just develop games - we guarantee their success with our industry-leading quality assurance.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
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
                  
                  <h3 className="text-3xl font-bold text-white mb-6">
                    OUR <span className="text-lynx-pink">QUALITY GUARANTEE</span>
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
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
                  <div className="bg-lynx-dark/80 rounded-2xl p-8 border border-lynx-pink/30">
                    <div className="text-center">
                      <div className="text-lynx-pink text-6xl font-black mb-4">15%</div>
                      <h4 className="text-white font-bold mb-2">Negative Review Threshold</h4>
                      <p className="text-gray-400 text-sm mb-6">Technical reviews only</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Time Window</span>
                          <span className="text-lynx-pink font-semibold">30 Days</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Response Time</span>
                          <span className="text-lynx-pink font-semibold">24 Hours</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Guarantee Type</span>
                          <span className="text-lynx-pink font-semibold">Cost + Fix</span>
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

      <LogoCarousel />

      {/* FAQ Section */}
      <section className="py-16 section-padding bg-lynx-gray/20">
        <div className="container-width">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              FREQUENTLY ASKED <span className="text-lynx-pink">QUESTIONS</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get answers to the most common questions about our game development services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="mb-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => handleFAQClick(index)}
                  className="w-full bg-lynx-gray hover:bg-lynx-gray/80 p-6 rounded-xl transition-all duration-300 text-left group"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white group-hover:text-lynx-pink transition-colors duration-300 pr-4">
                      {faq.question}
                    </h3>
                    <div className="text-lynx-pink group-hover:scale-110 transition-transform duration-300">
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </button>
                
                {openFAQ === index && (
                  <div className="bg-lynx-dark/50 p-6 rounded-b-xl border-t border-gray-600 animate-fade-in">
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
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
