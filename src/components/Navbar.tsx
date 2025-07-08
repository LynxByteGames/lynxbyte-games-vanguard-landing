import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isInsightsHovered, setIsInsightsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Main', href: '/' },
    { name: 'Services', href: '/services' },
    // { name: 'Case Studies', href: '/case-studies' },
    { name: 'Insights', href: '/insights' },
    { name: 'Careers', href: '/careers' },
  ];

  const services = [
    { name: 'Game Development', index: 0 },
    { name: 'Mobile Games', index: 1 },
    { name: 'PC & Console', index: 2 },
    { name: 'VR/AR Games', index: 3 },
    { name: 'Technical Consulting', index: 4 },
    { name: 'Game Design', index: 5 }
  ];

  const blogPosts = [
    { name: 'The Future of Gaming: AI and Machine Learning', slug: 'future-of-gaming-ai-ml' },
    { name: 'Optimizing Game Performance Across Platforms', slug: 'optimizing-game-performance' },
    { name: 'Building Engaging Game Narratives', slug: 'building-engaging-narratives' },
    { name: 'Mobile Gaming Market Trends', slug: 'mobile-gaming-market-trends' }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const handleServiceClick = (serviceIndex: number) => {
    navigate(`/services?service=${serviceIndex}`);
  };

  const handleBlogPostClick = (slug: string) => {
    navigate(`/insights/${slug}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-lynx-dark/90 backdrop-blur-md border-b border-lynx-gray">
      <div className="section-padding">
        <div className="container-width">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-4 group">
              <img 
                src="/lovable-uploads/SYGNET-białe.png" 
                alt="Lynxbyte Games Symbol" 
                className="h-16 w-auto"
              />
              <img 
                src="/lovable-uploads/NAPISY-białe.png" 
                alt="Lynxbyte Games Text" 
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const active = isActive(item.href);
                
                if (item.name === 'Services') {
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => setIsServicesHovered(true)}
                      onMouseLeave={() => setIsServicesHovered(false)}
                    >
                      <Link
                        to={item.href}
                        className={`transition-colors duration-300 font-medium relative group ${
                          active 
                            ? 'text-lynx-pink' 
                            : 'text-gray-300 hover:text-lynx-pink'
                        }`}
                      >
                        {item.name}
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-lynx-pink transition-all duration-300 ${
                          active ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                      </Link>
                      
                      {/* Simple Dropdown List */}
                      {isServicesHovered && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-lynx-gray rounded-lg shadow-lg border border-lynx-pink/20 animate-fade-in">
                          <div className="py-2">
                            {services.map((service, index) => (
                              <button
                                key={index}
                                onClick={() => handleServiceClick(service.index)}
                                className="w-full text-left px-4 py-2 text-gray-300 hover:text-lynx-pink hover:bg-lynx-dark/50 transition-colors duration-300"
                              >
                                {service.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.name === 'Insights') {
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => setIsInsightsHovered(true)}
                      onMouseLeave={() => setIsInsightsHovered(false)}
                    >
                      <Link
                        to={item.href}
                        className={`transition-colors duration-300 font-medium relative group ${
                          active 
                            ? 'text-lynx-pink' 
                            : 'text-gray-300 hover:text-lynx-pink'
                        }`}
                      >
                        {item.name}
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-lynx-pink transition-all duration-300 ${
                          active ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                      </Link>
                      
                      {/* Simple Dropdown List */}
                      {isInsightsHovered && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-lynx-gray rounded-lg shadow-lg border border-lynx-pink/20 animate-fade-in">
                          <div className="py-2">
                            {blogPosts.map((post, index) => (
                              <button
                                key={index}
                                onClick={() => handleBlogPostClick(post.slug)}
                                className="w-full text-left px-4 py-2 text-gray-300 hover:text-lynx-pink hover:bg-lynx-dark/50 transition-colors duration-300"
                              >
                                {post.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`transition-colors duration-300 font-medium relative group ${
                      active 
                        ? 'text-lynx-pink' 
                        : 'text-gray-300 hover:text-lynx-pink'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-lynx-pink transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </Link>
                );
              })}
              <Link to="/contact">
                <Button 
                  className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-lynx-pink/30"
                >
                  Work with us
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-lynx-pink transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-lynx-darker border-b border-lynx-gray animate-fade-in">
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  
                  if (item.name === 'Services') {
                    return (
                      <div key={item.name}>
                        <button
                          onClick={() => setIsServicesHovered(!isServicesHovered)}
                          className={`w-full text-left transition-colors duration-300 font-medium py-2 flex items-center justify-between ${
                            active 
                              ? 'text-lynx-pink' 
                              : 'text-gray-300 hover:text-lynx-pink'
                          }`}
                        >
                          <span>{item.name}</span>
                          <span className="text-lynx-pink">{isServicesHovered ? '−' : '+'}</span>
                        </button>
                        
                        {isServicesHovered && (
                          <div className="ml-4 mt-2 space-y-2 border-l border-gray-600 pl-4">
                            {services.map((service, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  handleServiceClick(service.index);
                                  setIsOpen(false);
                                }}
                                className="block w-full text-left text-gray-400 hover:text-lynx-pink transition-colors duration-300 py-1"
                              >
                                {service.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (item.name === 'Insights') {
                    return (
                      <div key={item.name}>
                        <button
                          onClick={() => setIsInsightsHovered(!isInsightsHovered)}
                          className={`w-full text-left transition-colors duration-300 font-medium py-2 flex items-center justify-between ${
                            active 
                              ? 'text-lynx-pink' 
                              : 'text-gray-300 hover:text-lynx-pink'
                          }`}
                        >
                          <span>{item.name}</span>
                          <span className="text-lynx-pink">{isInsightsHovered ? '−' : '+'}</span>
                        </button>
                        
                        {isInsightsHovered && (
                          <div className="ml-4 mt-2 space-y-2 border-l border-gray-600 pl-4">
                            {blogPosts.map((post, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  handleBlogPostClick(post.slug);
                                  setIsOpen(false);
                                }}
                                className="block w-full text-left text-gray-400 hover:text-lynx-pink transition-colors duration-300 py-1"
                              >
                                {post.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block transition-colors duration-300 font-medium py-2 ${
                        active 
                          ? 'text-lynx-pink' 
                          : 'text-gray-300 hover:text-lynx-pink'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <Button 
                    className="w-full bg-lynx-pink hover:bg-lynx-pink-hover text-white py-3 rounded-full font-semibold mt-4"
                  >
                    Work with us
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
