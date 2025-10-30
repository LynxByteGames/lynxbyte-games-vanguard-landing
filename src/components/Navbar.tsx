import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInsightsHovered, setIsInsightsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isEasyGamePort = location.pathname.startsWith('/easygameport');

  const navItems = [
    { name: 'Main', href: '/' },
    { name: 'EasyGamePort', href: '/easygameport', featured: true },
    { name: 'Porting framework', href: '/services' },
    // { name: 'Case Studies', href: '/case-studies' },
    { name: 'Insights', href: '/insights' },
    { name: 'Careers', href: '/careers' },
  ];

  const blogPosts = [
    { name: 'Meet LYNXBYTE GAMES at Gamescom 2025 - Let’s Connect!', slug: 'gamescom-2025' },
    { name: 'Game porting 101 - all information you need to port the game to consoles', slug: 'optimizing-game-performance' }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const handleBlogPostClick = (slug: string) => {
    navigate(`/insights/${slug}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-lynx-dark/90 backdrop-blur-md border-b border-lynx-gray">
      <div className="section-padding">
        <div className="container-width">
          <div className={`flex items-center justify-between ${isEasyGamePort ? 'h-24' : 'h-20'}`}>
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-4 group">
              {isEasyGamePort ? (
                <img
                  src="/lovable-uploads/easygameportlogo.png"
                  alt="EasyGamePort logo"
                  className="h-32 md:h-28 lg:h-32 w-auto"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <>
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
                </>
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const active = isActive(item.href);
                if ((item as any).featured) {
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-lynx-pink to-lynx-pink-hover shadow-lg shadow-lynx-pink/30 ring-2 ${active ? 'ring-lynx-pink' : 'ring-lynx-pink/40'} hover:scale-105 hover:shadow-lynx-pink/50 transition-all`}
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] leading-none bg-lynx-dark text-lynx-pink border border-lynx-pink/50 px-2 py-1 rounded-full animate-pulse">
                        NEW
                      </span>
                    </Link>
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
                  
                  if ((item as any).featured) {
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block text-center transition-colors duration-300 font-semibold py-3 rounded-full text-white bg-gradient-to-r from-lynx-pink to-lynx-pink-hover shadow-lg shadow-lynx-pink/30 ring-2 ${active ? 'ring-lynx-pink' : 'ring-lynx-pink/40'} hover:scale-[1.02] hover:shadow-lynx-pink/50 transition-transform`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="mr-2">{item.name}</span>
                        <span className="text-[10px] leading-none bg-lynx-dark text-lynx-pink border border-lynx-pink/50 px-2 py-1 rounded-full align-middle">
                          NEW
                        </span>
                      </Link>
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
