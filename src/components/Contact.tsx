import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { EMAILJS_CONFIG } from '@/config/emailjs';

interface ContactProps {
  className?: string;
}

const Contact: React.FC<ContactProps> = ({ className = "" }) => {
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

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('EmailJS initialized with key:', EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  // Function to send data to Discord webhook
  const sendToDiscord = async (formData: any) => {
    const webhookUrl = 'https://discord.com/api/webhooks/1393033317586047006/6fMJG91n-5HxZA-gonKFbbqIHlbCUHg6XQaRpsesDwbMF0oogooCjahwT_n1AiWwnEbL';
    
    const embed = {
      title: '🎮 New Contact Form Submission',
      color: 0xff2e9a, // Lynx pink color
      fields: [
        {
          name: '👤 Name',
          value: `${formData.firstName} ${formData.lastName}`,
          inline: true
        },
        {
          name: '📧 Email',
          value: formData.email,
          inline: true
        },
        {
          name: '🏢 Company',
          value: formData.company || 'Not provided',
          inline: true
        },
        {
          name: '💬 Message',
          value: formData.message.length > 1024 ? formData.message.substring(0, 1021) + '...' : formData.message,
          inline: false
        },
        {
          name: '📢 Marketing Consent',
          value: formData.acceptMarketing ? '✅ Yes' : '❌ No',
          inline: true
        },
        {
          name: '⏰ Timestamp',
          value: new Date().toLocaleString('pl-PL'),
          inline: true
        }
      ],
      footer: {
        text: 'Lynxbyte Games Contact Form'
      },
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [embed]
        })
      });

      if (response.ok) {
        console.log('Discord webhook sent successfully');
        return true;
      } else {
        console.error('Discord webhook failed:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Discord webhook error:', error);
      return false;
    }
  };

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
      console.log('EmailJS Config:', EMAILJS_CONFIG);
      
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

      console.log('Template Params:', templateParams);

      // Send both email and Discord notification
      const [emailResult, discordResult] = await Promise.allSettled([
        emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        ),
        sendToDiscord(formData)
      ]);

      console.log('EmailJS Result:', emailResult);
      console.log('Discord Result:', discordResult);

      // Check if at least one method succeeded
      const emailSuccess = emailResult.status === 'fulfilled' && emailResult.value.status === 200;
      const discordSuccess = discordResult.status === 'fulfilled' && discordResult.value === true;

      if (emailSuccess || discordSuccess) {
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
      } else {
        throw new Error('Both email and Discord failed');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        text: error.text
      });
      toast.error(`Failed to send message: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className={`bg-lynx-dark py-12 md:py-20 section-padding ${className}`}>
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Text Content */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 leading-tight">
                Ready to join the <br />
                <span className="text-lynx-pink">winning side?</span>
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 leading-tight">
                Console market is <span className="text-lynx-pink">$86.7B and growing</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
                The only question is: <span className="text-lynx-pink">when do we start?</span>
              </p>
            </div>

            {/* CEO Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="/lovable-uploads/bl_black.png" 
                  alt="CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white">Bartosz Ludera</h3>
                <p className="text-lynx-pink text-base sm:text-lg">Founder & CEO</p>
                <p className="text-gray-400 text-sm sm:text-base break-all">bartosz.ludera@lynxbytegames.eu</p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-lynx-gray p-4 sm:p-6 md:p-8 rounded-2xl order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" ref={formRef}>
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="mt-1 flex-shrink-0"
                    required
                  />
                  <label htmlFor="privacy" className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    *I have read and accept the Privacy Policy and Terms & Conditions.
                  </label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="marketing"
                    checked={formData.acceptMarketing}
                    onCheckedChange={(checked) => handleCheckboxChange('acceptMarketing', checked as boolean)}
                    className="mt-1 flex-shrink-0"
                  />
                  <label htmlFor="marketing" className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    I agree to receive information about products, services, promotions and news from LYNXBYTE GAMES PSA, based in Poland and its related entities, including other companies from the gaming group, at the provided email address.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-lynx-pink hover:bg-lynx-pink-hover text-white font-semibold py-3 rounded-full text-base md:text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
