import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LogoCarousel from '@/components/LogoCarousel';
import { Gamepad2, Smartphone, Monitor, Headphones, Code, Palette, X, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const services = [
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'Game Development',
      description: 'Full-cycle game development from concept to launch across multiple platforms.',
      features: ['Cross-platform development', 'Performance optimization', 'Quality assurance'],
      detailedDescription: `Our comprehensive game development service covers every aspect of creating engaging digital experiences. From initial concept brainstorming to final product launch, we handle the entire development lifecycle with precision and creativity.

We specialize in creating games that not only entertain but also deliver exceptional performance across all target platforms. Our team of experienced developers, designers, and QA specialists work together to ensure your vision becomes a reality that exceeds expectations.

Our development process includes:
• Detailed project planning and milestone tracking
• Agile development methodology for flexibility
• Regular client communication and progress updates
• Comprehensive testing and quality assurance
• Post-launch support and maintenance`
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile Games',
      description: 'Native and hybrid mobile game development for iOS and Android platforms.',
      features: ['Touch controls optimization', 'App store optimization', 'Monetization strategies'],
      detailedDescription: `Mobile gaming represents the fastest-growing segment in the gaming industry, and we're experts at creating compelling mobile experiences that players love.

Our mobile game development expertise spans both native iOS and Android development, as well as cross-platform solutions that maximize your reach. We understand the unique challenges of mobile gaming, from battery optimization to varying screen sizes and device capabilities.

Key mobile development features:
• Responsive design for all device sizes
• Touch gesture optimization and haptic feedback
• App Store and Google Play optimization
• In-app purchase and advertising integration
• Social features and multiplayer capabilities
• Analytics and user behavior tracking`
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: 'PC & Console',
      description: 'High-performance games for PC, PlayStation, Xbox, and Nintendo platforms.',
      features: ['Console certification', 'High-end graphics', 'Controller support'],
      detailedDescription: `Creating games for PC and console platforms requires a deep understanding of hardware capabilities and platform-specific requirements. Our team has extensive experience developing for all major gaming platforms.

We specialize in creating high-performance games that take full advantage of modern hardware while maintaining compatibility across different specifications. From indie titles to AAA experiences, we deliver polished products that meet platform standards.

Platform expertise includes:
• PC development with DirectX and Vulkan support
• PlayStation 4/5 development and certification
• Xbox One/Series X|S development and certification
• Nintendo Switch development and certification
• Cross-platform multiplayer implementation
• Performance optimization for various hardware configurations`
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: 'VR/AR Games',
      description: 'Immersive virtual and augmented reality gaming experiences.',
      features: ['VR optimization', 'Spatial interaction', 'Motion tracking'],
      detailedDescription: `Virtual and Augmented Reality represent the cutting edge of gaming technology, offering unprecedented levels of immersion and interactivity. Our VR/AR development team creates experiences that push the boundaries of what's possible.

We develop for all major VR/AR platforms including Meta Quest, HTC Vive, PlayStation VR, and mobile AR solutions. Our expertise in spatial computing, 3D audio, and motion tracking ensures your VR/AR experience is both technically sound and deeply engaging.

VR/AR development capabilities:
• 6DOF tracking and spatial mapping
• Hand and gesture recognition systems
• 3D spatial audio implementation
• Comfort optimization and motion sickness prevention
• Multiplayer VR experiences
• AR markerless tracking and environmental understanding`
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Technical Consulting',
      description: 'Expert technical guidance and code review for your gaming projects.',
      features: ['Code optimization', 'Architecture design', 'Performance audits'],
      detailedDescription: `Sometimes you need expert guidance to take your project to the next level. Our technical consulting services provide the expertise and insights you need to make informed decisions about your game development process.

Whether you're looking to optimize existing code, design a new architecture, or troubleshoot performance issues, our senior developers and technical architects are here to help. We provide actionable recommendations that can save you time, money, and frustration.

Consulting services include:
• Code review and optimization recommendations
• System architecture design and planning
• Performance profiling and bottleneck identification
• Technology stack selection and migration planning
• Security audit and best practices implementation
• Team training and knowledge transfer sessions`
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Game Design',
      description: 'Creative game design and user experience optimization services.',
      features: ['UI/UX design', 'Game mechanics', 'Player engagement'],
      detailedDescription: `Great games start with great design. Our game design team combines creativity with data-driven insights to create engaging experiences that keep players coming back for more.

We specialize in creating intuitive user interfaces, compelling game mechanics, and immersive worlds that captivate players. Our design process is iterative and player-focused, ensuring that every element serves the overall player experience.

Design services encompass:
• Game mechanics design and balancing
• User interface and user experience design
• Level design and world building
• Character design and storytelling
• Player progression and reward systems
• Accessibility design and inclusive gaming features`
    }
  ];

  const faqData = [
    {
      question: "How long does it typically take to develop a game?",
      answer: "Game development timelines vary significantly based on scope and complexity. A simple mobile game might take 3-6 months, while a complex PC/console game can take 1-3 years. We provide detailed project timelines during our initial consultation and use agile methodologies to ensure transparent progress tracking throughout development."
    },
    {
      question: "What platforms do you develop games for?",
      answer: "We develop for all major gaming platforms including iOS, Android, PC (Windows/Mac/Linux), PlayStation 4/5, Xbox One/Series X|S, Nintendo Switch, and VR/AR platforms like Meta Quest and HTC Vive. We can also create cross-platform games that work seamlessly across multiple devices."
    },
    {
      question: "Do you provide ongoing support after game launch?",
      answer: "Yes, we offer comprehensive post-launch support including bug fixes, performance updates, content updates, and server maintenance. We also provide analytics and player feedback analysis to help you optimize your game's performance and player engagement."
    },
    {
      question: "Can you help with game monetization strategies?",
      answer: "Absolutely! We have extensive experience with various monetization models including premium pricing, freemium with in-app purchases, subscription models, and advertising integration. We'll work with you to choose the best strategy for your game and target audience."
    },
    {
      question: "What is your development process like?",
      answer: "We follow an iterative, agile development process that includes concept development, prototyping, production, testing, and launch. We maintain regular communication with clients throughout the process, providing weekly updates and milestone reviews. Our process is designed to be flexible and transparent."
    },
    {
      question: "Do you work with indie developers and small studios?",
      answer: "Yes! We work with clients of all sizes, from individual indie developers to large studios. We offer scalable services and can adapt our approach to fit your budget and timeline. We're passionate about helping bring creative visions to life, regardless of team size."
    },
    {
      question: "Can you help optimize existing games?",
      answer: "Definitely! Our technical consulting services include performance optimization, code refactoring, and feature enhancement for existing games. We can analyze your current codebase and provide specific recommendations to improve performance, add new features, or fix technical issues."
    },
    {
      question: "What technologies and engines do you use?",
      answer: "We work with industry-standard technologies including Unity, Unreal Engine, Godot, and custom engines. Our team is proficient in C#, C++, JavaScript, and other programming languages. We choose the best technology stack based on your project requirements and target platforms."
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
                    Our <span className="text-lynx-pink">Quality Guarantee</span>
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
                <button
                  onClick={handleClose}
                  className="bg-lynx-pink hover:bg-lynx-pink/80 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Close
                </button>
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
