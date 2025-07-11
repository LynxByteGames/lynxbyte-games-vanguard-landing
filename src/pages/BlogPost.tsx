import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SimpleThemeToggle from '@/components/SimpleThemeToggle';
import futureOfGaming from '@/blogposts/future-of-gaming-ai-ml';
import optimizingPerformance from '@/blogposts/optimizing-game-performance';
import { toast } from 'sonner';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  // Blog theme state
  const [blogTheme, setBlogTheme] = useState('bg-white text-black');
  
  // Lead magnet state
  const [reportEmail, setReportEmail] = useState('');
  const [isReportLoading, setIsReportLoading] = useState(false);

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('blogBackgroundTheme');
    if (savedTheme) {
      setBlogTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('blogBackgroundTheme', blogTheme);
  }, [blogTheme]);

  // Blog posts data imported from separate files
  const blogPosts = {
    [futureOfGaming.slug]: futureOfGaming,
    [optimizingPerformance.slug]: optimizingPerformance,
  };

  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;

  // Function to send gaming report request to Discord webhook
  const sendReportToDiscord = async (email: string) => {
    const webhookUrl = 'https://discord.com/api/webhooks/1393033317586047006/6fMJG91n-5HxZA-gonKFbbqIHlbCUHg6XQaRpsesDwbMF0oogooCjahwT_n1AiWwnEbL';
    
    const embed = {
      title: '📊 New Gaming Industry Report Request',
      color: 0xff2e9a, // Lynx pink color
      fields: [
        {
          name: '📧 Email',
          value: email,
          inline: true
        },
        {
          name: '📄 Request Type',
          value: 'Gaming Industry Report',
          inline: true
        },
        {
          name: '🌐 Source',
          value: `Blog Post: ${post?.title || 'Unknown'}`,
          inline: true
        },
        {
          name: '⏰ Timestamp',
          value: new Date().toLocaleString('pl-PL'),
          inline: true
        }
      ],
      footer: {
        text: 'Lynxbyte Games Gaming Industry Report Lead Magnet'
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
        console.log('Discord webhook sent successfully for gaming report request');
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

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportEmail.trim()) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsReportLoading(true);

    try {
      console.log('Gaming report request submitted:', reportEmail);
      
      // Send to Discord webhook
      await sendReportToDiscord(reportEmail);
      
      toast.success('Thank you! We will send your Gaming Industry Report shortly.');
      setReportEmail('');
    } catch (error) {
      console.error('Gaming report request failed:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsReportLoading(false);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-lynx-dark">
        <Navbar />
        <div className="pt-24 section-padding">
          <div className="container-width text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-gray-300 mb-8">The article you're looking for doesn't exist.</p>
            <Link to="/insights">
              <Button className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-6 py-3 rounded-full">
                <ArrowLeft className="mr-2" size={16} />
                Back to Insights
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

    return (
    <div className="min-h-screen bg-lynx-dark">
      <Navbar />
      
      <article className="pt-24 pb-16 section-padding">
        <div className="container-width max-w-3xl mx-auto">
          {/* Back Button */}
          <Link to="/insights" className="inline-flex items-center text-lynx-pink hover:text-lynx-pink-hover mb-8 transition-colors">
            <ArrowLeft className="mr-2" size={16} />
            Back to Insights
          </Link>

          {/* Article Card - Dynamic theme with all content */}
          <div className={`${blogTheme} rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 mb-12`}>
            {/* Article Header */}
            <header className="mb-12">
              <div className="mb-6">
                <span className="bg-lynx-pink text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-lynx-pink font-medium">{post.readTime}</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden mb-8">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-64 lg:h-96 object-cover"
                />
              </div>
            </header>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-black prose-headings:font-bold prose-p:text-black prose-p:leading-relaxed prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6" 
              style={{ fontFamily: `'Georgia', 'Cambria', 'Times New Roman', 'Times', serif` }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>
      
      {/* Lead Magnet Section */}
      <div className="container-width max-w-2xl mx-auto mb-16">
        <div className="bg-gradient-to-r from-lynx-pink/10 via-purple-500/10 to-lynx-pink/10 border border-lynx-pink/20 rounded-2xl p-8 text-center">
          <div className="mb-6">
            <span className="bg-lynx-pink text-white px-4 py-2 rounded-full text-sm font-semibold">
              🎮 FREE GAMING INSIGHTS
            </span>
          </div>
          
          <h2 className="text-3xl font-black mb-4 leading-tight">
            Get Our <span className="text-lynx-pink">Gaming Industry Report</span>
          </h2>
          
          <p className="text-gray-300 mb-6">
            Download our comprehensive 2024 Gaming Market Analysis with market trends, revenue insights, and growth tactics.
          </p>
          
          <form onSubmit={handleReportSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={reportEmail}
              onChange={(e) => setReportEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-lynx-pink"
              required
            />
            <Button 
              type="submit"
              disabled={isReportLoading}
              className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isReportLoading ? 'Sending...' : 'Get Report'}
            </Button>
          </form>
          
          <p className="text-gray-400 text-sm mt-4">
            We won't spam you. Unsubscribe anytime. Your data is safe with us.
          </p>
        </div>
      </div>
      <Contact />
      <Footer />
      <SimpleThemeToggle currentTheme={blogTheme} onThemeChange={setBlogTheme} />
    </div>
  );
};

export default BlogPost;
