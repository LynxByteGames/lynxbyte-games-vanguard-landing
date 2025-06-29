
import React from 'react';
import Navbar from '@/components/Navbar';
import { Calendar, User, ArrowRight, TrendingUp, Lightbulb, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Insights = () => {
  const articles = [
    {
      category: 'Industry Trends',
      title: 'The Future of Gaming: AI and Machine Learning in Game Development',
      excerpt: 'Exploring how artificial intelligence is revolutionizing game development, from procedural content generation to intelligent NPCs.',
      author: 'Sarah Johnson',
      date: 'Dec 15, 2024',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      category: 'Development Tips',
      title: 'Optimizing Game Performance Across Multiple Platforms',
      excerpt: 'Best practices and techniques for ensuring your game runs smoothly on PC, console, and mobile devices.',
      author: 'Mike Chen',
      date: 'Dec 10, 2024',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800',
      icon: <Target className="w-5 h-5" />
    },
    {
      category: 'Creative Process',
      title: 'Building Engaging Game Narratives That Captivate Players',
      excerpt: 'How to craft compelling storylines and character development that keep players invested in your game world.',
      author: 'Emma Rodriguez',
      date: 'Dec 5, 2024',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800',
      icon: <Lightbulb className="w-5 h-5" />
    },
    {
      category: 'Market Analysis',
      title: 'Mobile Gaming Market Trends and Monetization Strategies',
      excerpt: 'Understanding the mobile gaming landscape and effective strategies for game monetization in 2024.',
      author: 'David Park',
      date: 'Nov 28, 2024',
      readTime: '15 min read',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800',
      icon: <TrendingUp className="w-5 h-5" />
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
              INDUSTRY <span className="gradient-text">INSIGHTS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay ahead of the curve with our latest insights, trends, and expert analysis 
              from the gaming industry.
            </p>
          </div>

          {/* Featured Article */}
          <div className="mb-16 animate-fade-in">
            <div className="bg-gradient-to-r from-lynx-gray to-lynx-gray/50 rounded-3xl overflow-hidden hover-glow group">
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
          </div>

          {/* Regular Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <div 
                key={index}
                className="bg-lynx-gray hover:bg-lynx-gray/80 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover-glow animate-fade-in group"
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

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold leading-tight group-hover:text-lynx-pink transition-colors duration-300">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
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
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-lynx-dark border border-lynx-gray rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:border-lynx-pink transition-colors"
                />
                <Button className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insights;
