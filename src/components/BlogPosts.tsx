import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import blog posts
import futureGaming from '@/blogposts/future-of-gaming-ai-ml';
import gamePerformance from '@/blogposts/optimizing-game-performance';

const BlogPosts = () => {
  const navigate = useNavigate();
  
  // Use only the 2 blog posts
  const blogPosts = [
    futureGaming,
    gamePerformance
  ];

  const handleBlogPostClick = (slug: string) => {
    navigate(`/insights/${slug}`);
  };

  return (
    <section className="py-20 bg-lynx-dark">
      <div className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              WE LOVE <span className="text-lynx-pink">SHARING KNOWLEDGE</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our latest insights, tips, and industry knowledge to help you succeed in game development
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {blogPosts.map((post, index) => (
              <div 
                key={index} 
                className="bg-lynx-gray rounded-2xl overflow-hidden hover-glow transition-all duration-300 cursor-pointer"
                onClick={() => handleBlogPostClick(post.slug)}
              >
                <div className="aspect-video bg-gradient-to-br from-lynx-pink/20 to-purple-500/20 flex items-center justify-center">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="text-lynx-pink text-sm font-semibold mb-2">{post.category}</div>
                  <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-gray-400 text-sm">
                      <User className="w-4 h-4 mr-2" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      {post.readTime}
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="border-lynx-pink text-lynx-pink hover:bg-lynx-pink hover:text-white group"
                  >
                    Read Article
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
