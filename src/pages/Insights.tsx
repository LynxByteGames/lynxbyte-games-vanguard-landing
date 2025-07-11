import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Calendar, User, ArrowRight, TrendingUp, Lightbulb, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// Import blog posts
import futureGaming from '@/blogposts/future-of-gaming-ai-ml';
import gamePerformance from '@/blogposts/optimizing-game-performance';

const Insights = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isNewsletterLoading, setIsNewsletterLoading] = useState(false);

  // Function to send newsletter subscription to Discord webhook
  const sendNewsletterToDiscord = async (email: string) => {
    const webhookUrl = 'https://discord.com/api/webhooks/1393033317586047006/6fMJG91n-5HxZA-gonKFbbqIHlbCUHg6XQaRpsesDwbMF0oogooCjahwT_n1AiWwnEbL';
    
    const embed = {
      title: '📧 New Newsletter Subscription',
      color: 0xff2e9a, // Lynx pink color
      fields: [
        {
          name: '📧 Email',
          value: email,
          inline: true
        },
        {
          name: '📰 Subscription Type',
          value: 'Newsletter',
          inline: true
        },
        {
          name: '🌐 Source',
          value: 'Insights Page',
          inline: true
        },
        {
          name: '⏰ Timestamp',
          value: new Date().toLocaleString('pl-PL'),
          inline: true
        }
      ],
      footer: {
        text: 'Lynxbyte Games Newsletter Subscription'
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
        console.log('Discord webhook sent successfully for newsletter subscription');
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

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsNewsletterLoading(true);

    try {
      console.log('Newsletter subscription submitted:', newsletterEmail);
      
      // Send to Discord webhook
      await sendNewsletterToDiscord(newsletterEmail);
      
      toast.success('Thank you for subscribing to our newsletter!');
      setNewsletterEmail('');
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsNewsletterLoading(false);
    }
  };

  const articles = [
    {
      category: futureGaming.category,
      title: futureGaming.title,
      excerpt: futureGaming.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
      author: futureGaming.author,
      date: futureGaming.date,
      readTime: futureGaming.readTime,
      image: futureGaming.image,
      icon: <TrendingUp className="w-5 h-5" />,
      slug: futureGaming.slug
    },
    {
      category: gamePerformance.category,
      title: gamePerformance.title,
      excerpt: gamePerformance.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
      author: gamePerformance.author,
      date: gamePerformance.date,
      readTime: gamePerformance.readTime,
      image: gamePerformance.image,
      icon: <Target className="w-5 h-5" />,
      slug: gamePerformance.slug
    }
  ];

  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-lynx-dark">
      <Navbar />
      
      <section className="pt-24 pb-16 section-padding">
        <div className="container-width">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              INDUSTRY <span className="text-lynx-pink">INSIGHTS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay ahead of the curve with our latest insights, trends, and expert analysis 
              from the gaming industry.
            </p>
          </div>

          {/* Featured Article */}
          <div className="mb-16 animate-fade-in">
            <Link to={`/insights/${featuredArticle.slug}`} className="block">
              <div className="bg-gradient-to-r from-lynx-gray to-lynx-gray/50 rounded-3xl overflow-hidden hover-glow group cursor-pointer">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={featuredArticle.image} 
                      alt={featuredArticle.title}
                      className="w-full h-64 lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-lynx-pink text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                        {featuredArticle.icon}
                        {featuredArticle.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="space-y-4">
                      <h2 className="text-3xl lg:text-4xl font-bold leading-tight group-hover:text-lynx-pink transition-colors duration-300">
                        {featuredArticle.title}
                      </h2>
                      
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>

                      <div className="flex items-center gap-6 pt-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <User className="w-4 h-4" />
                          <span className="text-sm">{featuredArticle.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{featuredArticle.date}</span>
                        </div>
                        <span className="text-sm text-lynx-pink font-medium">
                          {featuredArticle.readTime}
                        </span>
                      </div>

                      <Button className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 group w-fit mt-6">
                        Read Full Article
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

      

          {/* Regular Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <Link 
                key={index}
                to={`/insights/${article.slug}`}
                className="block"
              >
                <div 
                  className="bg-lynx-gray hover:bg-lynx-gray/80 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover-glow animate-fade-in group cursor-pointer h-full"
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-lynx-pink/90 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                        {article.icon}
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex flex-col h-full">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-lynx-pink transition-colors duration-300">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-lynx-dark">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-400">
                          <User className="w-3 h-3" />
                          <span className="text-xs">{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs">{article.date}</span>
                        </div>
                      </div>
                      
                      <span className="text-xs text-lynx-pink font-medium">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 text-center animate-fade-in">
            <div className="bg-gradient-to-r from-lynx-pink/10 to-purple-500/10 border border-lynx-pink/20 rounded-3xl p-8 lg:p-12">
              <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and get the latest insights, tutorials, and industry news 
                delivered directly to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-lynx-dark border border-lynx-gray rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:border-lynx-pink transition-colors"
                  required
                />
                <Button 
                  type="submit"
                  disabled={isNewsletterLoading}
                  className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isNewsletterLoading ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      
      <Footer />
    </div>
  );
};

export default Insights;
