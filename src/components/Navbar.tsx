import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Main', href: '/' },
    { name: 'Services', href: '/services' },
    // { name: 'Case Studies', href: '/case-studies' },
    { name: 'Insights', href: '/insights' },
    { name: 'Careers', href: '/careers' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
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
