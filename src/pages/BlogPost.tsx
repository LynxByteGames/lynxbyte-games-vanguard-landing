import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  // Sample blog posts data - in a real app this would come from an API or CMS
  const blogPosts = {
    'future-of-gaming-ai-ml': {
      title: 'The Future of Gaming: AI and Machine Learning in Game Development',
      content: `
        <h2>Introduction</h2>
        <p>Artificial intelligence and machine learning are revolutionizing the gaming industry in unprecedented ways. From creating more intelligent NPCs to generating vast, procedural worlds, AI is reshaping how we develop and experience games.</p>
        
        <h2>Procedural Content Generation</h2>
        <p>One of the most exciting applications of AI in gaming is procedural content generation. This technology allows developers to create vast, diverse game worlds without manually designing every element. Games like No Man's Sky and Minecraft have shown us the potential of AI-generated content.</p>
        
        <h2>Intelligent NPCs</h2>
        <p>Modern AI enables the creation of non-player characters that can adapt, learn, and respond to player behavior in more realistic ways. These NPCs can remember past interactions, develop preferences, and even form relationships with players.</p>
        
        <h2>Dynamic Difficulty Adjustment</h2>
        <p>AI can analyze player performance in real-time and adjust game difficulty accordingly, ensuring that players remain challenged but not frustrated. This creates a more personalized gaming experience for each individual player.</p>
        
        <h2>The Future Outlook</h2>
        <p>As AI technology continues to advance, we can expect even more innovative applications in gaming. From AI-assisted game development tools to fully AI-generated narratives, the possibilities are endless.</p>
      `,
      author: 'Sarah Johnson',
      date: 'Dec 15, 2024',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800',
      category: 'Industry Trends'
    },
    'optimizing-game-performance': {
      title: 'Optimizing Game Performance Across Multiple Platforms',
      content: `
        <h2>The Challenge of Multi-Platform Development</h2>
        <p>Developing games that run smoothly across PC, console, and mobile platforms presents unique challenges. Each platform has different hardware capabilities, performance constraints, and user expectations.</p>
        
        <h2>Performance Optimization Strategies</h2>
        <p>Effective performance optimization requires a multi-faceted approach including asset optimization, efficient rendering techniques, and smart resource management.</p>
        
        <h2>Platform-Specific Considerations</h2>
        <p>Understanding the strengths and limitations of each target platform is crucial for delivering optimal performance across all devices.</p>
      `,
      author: 'Mike Chen',
      date: 'Dec 10, 2024',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800',
      category: 'Development Tips'
    },
    'building-engaging-narratives': {
      title: 'Building Engaging Game Narratives That Captivate Players',
      content: `
        <h2>The Art of Interactive Storytelling</h2>
        <p>Creating compelling narratives in games requires balancing traditional storytelling techniques with interactive elements that give players agency in the story.</p>
        
        <h2>Character Development</h2>
        <p>Well-developed characters are the heart of any great game narrative. Players need to feel connected to the characters they interact with or control.</p>
        
        <h2>Player Choice and Consequences</h2>
        <p>Meaningful choices that have real consequences help players feel invested in the story and create a personalized narrative experience.</p>
      `,
      author: 'Emma Rodriguez',
      date: 'Dec 5, 2024',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800',
      category: 'Creative Process'
    },
    'mobile-gaming-market-trends': {
      title: 'Mobile Gaming Market Trends and Monetization Strategies',
      content: `
        <h2>The Mobile Gaming Revolution</h2>
        <p>Mobile gaming has become the largest segment of the gaming industry, with billions of players worldwide and innovative monetization models.</p>
        
        <h2>Current Market Trends</h2>
        <p>Understanding current trends in mobile gaming helps developers create games that resonate with modern audiences and succeed in competitive markets.</p>
        
        <h2>Effective Monetization</h2>
        <p>Successful mobile games balance player satisfaction with revenue generation through thoughtful monetization strategies.</p>
      `,
      author: 'David Park',
      date: 'Nov 28, 2024',
      readTime: '15 min read',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800',
      category: 'Market Analysis'
    }
  };

  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;

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
        <div className="container-width max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/insights" className="inline-flex items-center text-lynx-pink hover:text-lynx-pink-hover mb-8 transition-colors">
            <ArrowLeft className="mr-2" size={16} />
            Back to Insights
          </Link>

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
            
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
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
            className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-gray-300 prose-p:leading-relaxed prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-lynx-gray">
            <div className="bg-gradient-to-r from-lynx-pink/10 to-purple-500/10 border border-lynx-pink/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter for more insights and updates from the gaming industry.
              </p>
              <Button className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-6 py-3 rounded-full">
                Subscribe Now
              </Button>
            </div>
          </footer>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
