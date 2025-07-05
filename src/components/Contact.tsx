import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { EMAILJS_CONFIG } from '@/config/emailjs';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptPrivacy) {
      toast.error('Please accept the Privacy Policy and Terms & Conditions.');
      return;
    }

    setIsLoading(true);

    try {
      // EmailJS configuration
      const templateParams = {
        to_email: EMAILJS_CONFIG.TO_EMAIL,
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        company: formData.company,
        message: formData.message,
        accept_marketing: formData.acceptMarketing ? 'Yes' : 'No',
        reply_to: formData.email
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (result.status === 200) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          message: '',
          acceptPrivacy: false,
          acceptMarketing: false
        });
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      toast.error('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-lynx-dark py-20 section-padding">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div>

              <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                Ready to join the <br />
                <span className="text-lynx-pink">winning side?</span>
              </h2>
              <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                                Console market is <span className="text-lynx-pink">$86.7B and growing</span>

              </h2>
              <p className="text-xl text-gray-300 mb-8">
                The only question is: <span className="text-lynx-pink">when do we start?</span>
              </p>
            </div>

            {/* CEO Info */}
            <div className="flex items-center space-x-6">
              <div className="w-28 h-28 rounded-full overflow-hidden">
                <img 
                  src="/lovable-uploads/bl_black.png" 
                  alt="CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white">Bartosz Ludera</h3>
                <p className="text-lynx-pink text-lg">Founder & CEO</p>
                <p className="text-gray-400">bartosz.ludera@lynxbytegames.eu</p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-lynx-gray p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
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

              {/* Email */}
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
                    *I have read and accept the Privacy Policy and Terms & Conditions.
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
                    I agree to receive information about products, services, promotions and news from LYNXBYTE GAMES PSA, based in Poland and its related entities, including other companies from the gaming group, at the provided email address.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-lynx-pink hover:bg-lynx-pink-hover text-black font-semibold py-3 rounded-full text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
