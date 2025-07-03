
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      title: 'Mystic Quest Adventures',
      category: 'RPG Game',
      description: 'An epic fantasy RPG that captivated millions of players worldwide with its immersive storyline and stunning visuals.',
      image: '/lovable-uploads/322a4f5a-e55f-4082-b120-3cb5cfed1f1f.png',
      stats: {
        downloads: '5M+',
        rating: '4.8/5',
        platforms: 'PC, Console, Mobile'
      }
    },
    {
      title: 'Speed Racer Championship',
      category: 'Racing Game',
      description: 'High-octane racing experience with realistic physics and multiplayer competitions that redefined mobile racing.',
      image: '/lovable-uploads/f880535a-b026-4999-ba66-b041fd37e055.png',
      stats: {
        downloads: '10M+',
        rating: '4.7/5',
        platforms: 'Mobile, PC'
      }
    }
  ];

  return (
    <section className="py-20 bg-lynx-dark">
      <div className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              SUCCESS <span className="gradient-text">STORIES</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how we've helped our clients achieve remarkable success in the gaming industry
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {stories.map((story, index) => (
              <div key={index} className="bg-lynx-gray rounded-2xl overflow-hidden hover-glow transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-lynx-pink/20 to-purple-500/20 flex items-center justify-center">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="text-lynx-pink text-sm font-semibold mb-2">{story.category}</div>
                  <h3 className="text-2xl font-bold mb-4">{story.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{story.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-lynx-pink">{story.stats.downloads}</div>
                      <div className="text-sm text-gray-400">Downloads</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-lynx-pink flex items-center justify-center">
                        <Star className="w-5 h-5 mr-1 fill-current" />
                        {story.stats.rating}
                      </div>
                      <div className="text-sm text-gray-400">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-lynx-pink">{story.stats.platforms}</div>
                      <div className="text-sm text-gray-400">Platforms</div>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="border-lynx-pink text-lynx-pink hover:bg-lynx-pink hover:text-white group"
                  >
                    View Case Study
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

export default SuccessStories;
