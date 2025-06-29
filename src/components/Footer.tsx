
import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-lynx-gray border-t border-lynx-dark">
      <div className="section-padding py-16">
        <div className="container-width">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Gamepad2 className="w-8 h-8 text-lynx-pink" />
                <span className="text-2xl font-black">LYNXBYTE</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Leading game development studio creating innovative and engaging gaming experiences across multiple platforms.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-lynx-pink transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-lynx-pink transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-lynx-pink transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-lynx-pink transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-lynx-pink transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/case-studies" className="text-gray-300 hover:text-lynx-pink transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link to="/insights" className="text-gray-300 hover:text-lynx-pink transition-colors">
                    Insights
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-300 hover:text-lynx-pink transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold mb-6">Services</h3>
              <ul className="space-y-3">
                <li className="text-gray-300">Game Development</li>
                <li className="text-gray-300">Mobile Games</li>
                <li className="text-gray-300">PC & Console</li>
                <li className="text-gray-300">VR/AR Games</li>
                <li className="text-gray-300">Technical Consulting</li>
                <li className="text-gray-300">Game Design</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-lynx-pink" />
                  <span className="text-gray-300">hello@lynxbyte.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-lynx-pink" />
                  <span className="text-gray-300">+48 123 456 789</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-lynx-pink mt-1" />
                  <span className="text-gray-300">
                    Warsaw, Poland<br />
                    Krakowskie Przedmieście 1
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-lynx-dark mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2024 LYNXBYTE GAMES. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-lynx-pink text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-lynx-pink text-sm transition-colors">
                  Terms & Conditions
                </a>
                <a href="#" className="text-gray-400 hover:text-lynx-pink text-sm transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
