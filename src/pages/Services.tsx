import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LogoCarousel from '@/components/LogoCarousel';
import { Gamepad2, Smartphone, Monitor, Headphones, Code, Palette, X, ArrowRight, ChevronDown, ChevronUp, Repeat, Users, CheckCircle, Wrench, UploadCloud } from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const services = [
    {
      icon: <Repeat className="w-8 h-8" />, // Game porting
      title: 'Game Porting',
      description: 'Game porting to best platforms like PlayStation, Xbox, Nintendo Switch & PC.',
      features: ['Porting from PC & Mobile to Consoles', 'Performance optimization', 'Certification & Quality assurance'],
      detailedDescription: `Our game porting service ensures your title reaches new audiences by adapting it to additional platforms with maximum performance and fidelity. We take your existing game and make it run seamlessly on consoles, mobile devices, or PC, preserving the core experience while optimizing for each system's unique requirements.\n\nOur porting process includes:\n• Pre-contract estimation \n• Platform-specific optimization (graphics, performance, controls)\n• Compliance with certification requirements \n• Rigorous cross-platform testing and QA\n• Support for updates, patches, and post-launch maintenance\n\nWe minimize risk and time-to-market while maximizing technical quality and player experience on every platform.`
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />, // Full development
      title: 'Full development',
      description: 'Full-cycle game development from concept to launch across multiple platforms.',
      features: ['Unity, Unreal Engine & Godot Engine', 'Ready to release development', 'From design to release'],
      detailedDescription: `Mobile gaming represents the fastest-growing segment in the gaming industry, and we're experts at creating compelling mobile experiences that players love.\n\nOur mobile game development expertise spans both native iOS and Android development, as well as cross-platform solutions that maximize your reach. We understand the unique challenges of mobile gaming, from battery optimization to varying screen sizes and device capabilities.\n\nKey mobile development features:\n• Responsive design for all device sizes\n• Touch gesture optimization and haptic feedback\n• App Store and Google Play optimization\n• In-app purchase and advertising integration\n• Social features and multiplayer capabilities\n• Analytics and user behavior tracking`
    },
    {
      icon: <Users className="w-8 h-8" />, // Co-development
      title: 'Co-development',
      description: 'We work closely with your team to deliver features, content, or technical solutions.',
      features: ['Feature or module co-development', 'Multiplayer implementation', 'Engine & tools integration'],
      detailedDescription: `Our experts support your team in key areas: feature development, content updates, or technical problem-solving. We adapt to your workflow and tools, helping you scale up and deliver on time.`
    },
    {
      icon: <CheckCircle className="w-8 h-8" />, // QA & Localization
      title: 'QA & Localization',
      description: 'Testing, certification, and localization for global releases.',
      features: ['FQA, CQA & LQA', 'Game translation', 'Platform compliance'],
      detailedDescription: `We provide functional, compliance, and localization testing. Our team adapts your game for new languages and markets, ensuring a smooth global launch.`
    },
    {
      icon: <Wrench className="w-8 h-8" />, // Optimization & Bug fixing
      title: 'Optimization & Bug fixing',
      description: 'Performance tuning and bug fixing for new and existing games.',
      features: ['Performance profiling', 'Bug fixing', 'Code review'],
      detailedDescription: `We identify and resolve bottlenecks, memory leaks, and bugs. Our team delivers code reviews and technical audits to keep your game running smoothly.`
    },
    {
      icon: <UploadCloud className="w-8 h-8" />, // Release Management
      title: 'Release Management',
      description: 'Support for launching, updating, and maintaining your game.',
      features: ['Store submission', 'Patch management', 'LiveOps support'],
      detailedDescription: `We handle store submissions, updates, and post-launch support. Our team ensures your game’s success after release with ongoing monitoring and player engagement.`
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
      question: "Can I order QA services for just a few hours?",
      answer: "Yes. Whether you need 10 hours or 1,500 hours of QA, we’re happy to help in any situation."
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

  const handleServiceClick = (index: number) => {
    setSelectedService(index);
  };

  const handleClose = () => {
    setSelectedService(null);
  };

  const handleFAQClick = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Handle URL parameter for auto-opening service modal
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam !== null) {
      const serviceIndex = parseInt(serviceParam);
      if (serviceIndex >= 0 && serviceIndex < services.length) {
        setSelectedService(serviceIndex);
      }
    }
  }, [searchParams]);

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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                onClick={() => handleServiceClick(index)}
                className="bg-lynx-gray hover:bg-lynx-gray/80 p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover-glow animate-fade-in group cursor-pointer relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-lynx-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-lynx-pink mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-lynx-pink transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-400 flex items-center">
                        <div className="w-1.5 h-1.5 bg-lynx-pink rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Learn more button */}
                  <div className="flex items-center text-lynx-pink group-hover:text-white transition-colors duration-300">
                    <span className="text-sm font-medium">Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
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

      {/* Modal Overlay */}
      {selectedService !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-lynx-gray rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-lynx-pink/20 animate-scale-in">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className="text-lynx-pink mr-4">
                    {services[selectedService].icon}
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    {services[selectedService].title}
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-700 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="text-gray-300 leading-relaxed whitespace-pre-line mb-8">
                {services[selectedService].detailedDescription}
              </div>

              <div className="border-t border-gray-600 pt-6">
                <h4 className="text-xl font-bold text-lynx-pink mb-4">Key Features</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {services[selectedService].features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center bg-lynx-dark/50 p-3 rounded-lg">
                      <div className="w-2 h-2 bg-lynx-pink rounded-full mr-3"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                {selectedService === 2 ? (
                  <button
                    onClick={() => window.open('https://www.skillshot.pl/jobs/36884-general-game-developer-unity-unreal-porting-specia', '_blank')}
                    className="bg-lynx-pink hover:bg-lynx-pink/80 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Work with us
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/contact')}
                    className="bg-lynx-pink hover:bg-lynx-pink/80 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Work with us
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Contact />
      <Footer />
    </div>
  );
};

export default Services;
