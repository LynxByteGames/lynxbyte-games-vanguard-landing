
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    acceptPrivacy: false,
    acceptMarketing: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <section className="bg-lynx-dark py-20 section-padding">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div>
              <div className="text-yellow-400 font-semibold mb-4 text-sm uppercase tracking-wider">
                开启成功之路 ↘
              </div>
              <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                Ready to join the <br />
                <span className="gradient-text">winning side?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get in touch. Zero fluff. Pure strategy.
              </p>
            </div>

            {/* CEO Info */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face" 
                  alt="CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Wojciech Jaworski</h3>
                <p className="text-gray-400">CEO</p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-lynx-gray p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="bg-white text-gray-900 border-0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="bg-white text-gray-900 border-0"
                    required
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    E-mail
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@justforfun.com"
                    className="bg-white text-gray-900 border-0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="069 549 222 666"
                    className="bg-white text-gray-900 border-0"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Just For Fun"
                  className="bg-white text-gray-900 border-0"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message..."
                  rows={4}
                  className="bg-white text-gray-900 border-0"
                  required
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={formData.acceptPrivacy}
                    onCheckedChange={(checked) => handleCheckboxChange('acceptPrivacy', checked as boolean)}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-300 leading-relaxed">
                    I have read and accept the Privacy Policy and Terms & Conditions.
                  </label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="marketing"
                    checked={formData.acceptMarketing}
                    onCheckedChange={(checked) => handleCheckboxChange('acceptMarketing', checked as boolean)}
                    className="mt-1"
                  />
                  <label htmlFor="marketing" className="text-sm text-gray-300 leading-relaxed">
                    I agree to receive information about products, services, promotions and news from LYNXBYTE GAMES, based in Poland and its related entities, including other companies from the gaming group, at the provided email address.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-full text-lg transition-all duration-300"
              >
                Send message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
