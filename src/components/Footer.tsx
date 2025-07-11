
import { Gamepad2, Linkedin, Mail, MapPin, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-lynx-gray border-t border-lynx-dark">
      <div className="section-padding py-16">
        <div className="container-width">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
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
              <p className="text-gray-300 leading-relaxed">
                Leading game development studio creating innovative and engaging gaming experiences across multiple platforms.
              </p>
              <div className="flex space-x-4">
                
                <a href="https://www.linkedin.com/company/lynxbyte-games/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-lynx-pink transition-colors">
                  <Linkedin className="w-5 h-5" />
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
                {/* <li>
                  <Link to="/case-studies" className="text-gray-300 hover:text-lynx-pink transition-colors">
                    Case Studies
                  </Link>
                </li> */}
                <li>
                  <Link to="/insights" className="text-gray-300 hover:text-lynx-pink transition-colors">
                    Insights - Blog 
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
                <li className="text-gray-300">Game porting</li>
                <li className="text-gray-300">Full-development</li>
                <li className="text-gray-300">Co-development</li>
                <li className="text-gray-300">QA & Localization</li>
                <li className="text-gray-300">Optimization & Bug fixing</li>
                <li className="text-gray-300">Release Management</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-lynx-pink" />
                  <span className="text-gray-300">contact@lynxbytegames.eu</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Receipt className="w-5 h-5 text-lynx-pink" />
                  <span className="text-gray-300">NIP/EU VAT ID: PL6793324030</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-lynx-pink mt-1" />
                  <span className="text-gray-300">
                    Carcow, Poland<br />
                    Zamknięta 10/1.5 30-544 Kraków
                  </span>
                </div>
                <div className="flex items-start space-x-3 text-gray-300 text-xs">
                  LYNXBYTE GAMES PSA seated in Kraków, Poland, at Zamknięta 10/1.5, 30-544 Kraków, entered in the Register of Entrepreneurs of the National Court Register, kept by the District Court of Kraków-Podgórze in Kraków, IV Commercial Division of the National Court Register under the number 0001158887, with share capital of PLN 25,000.00, with tax identification number (NIP) PL6793324030, and statistical number (REGON) 541035028.
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-lynx-dark mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2025 LYNXBYTE GAMES. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-lynx-pink text-sm transition-colors">
                  
                </a>
                <a href="#" className="text-gray-400 hover:text-lynx-pink text-sm transition-colors">
                </a>
                <a href="#" className="text-gray-400 hover:text-lynx-pink text-sm transition-colors">
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
