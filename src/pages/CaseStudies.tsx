
import React from 'react';
import Navbar from '@/components/Navbar';
import { ExternalLink, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CaseStudies = () => {
  const projects = [
    {
      title: 'Digital Dragons Awards Gala',
      category: 'Event Gaming Platform',
      description: 'Interactive gaming platform for the prestigious Digital Dragons Awards ceremony, featuring real-time voting and engagement systems.',
      image: '/lovable-uploads/f880535a-b026-4999-ba66-b041fd37e055.png',
      stats: {
        duration: '6 months',
        team: '8 developers',
        platform: 'Web & Mobile'
      },
      technologies: ['Unity', 'WebGL', 'Real-time Networking'],
      results: ['500K+ participants', '95% uptime', '40% engagement increase']
    },
    {
      title: 'Apocalypse Survival',
      category: 'Action RPG',
      description: 'Post-apocalyptic survival game with immersive gameplay mechanics and stunning visual effects.',
      image: '/lovable-uploads/322a4f5a-e55f-4082-b120-3cb5cfed1f1f.png',
      stats: {
        duration: '18 months',
        team: '12 developers',
        platform: 'PC & Console'
      },
      technologies: ['Unreal Engine', 'C++', 'Advanced AI'],
      results: ['1M+ downloads', '4.8★ rating', 'Steam Top 10']
    },
    {
      title: 'Mobile Racing Championship',
      category: 'Racing Game',
      description: 'High-performance mobile racing game with realistic physics and multiplayer functionality.',
      image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800',
      stats: {
        duration: '12 months',
        team: '10 developers',
        platform: 'iOS & Android'
      },
      technologies: ['Unity', 'Multiplayer Networking', '3D Graphics'],
      results: ['2M+ downloads', 'Featured by Apple', 'Google Play Editor\'s Choice']
    }
  ];

  return (
    <div className="min-h-screen bg-lynx-dark">
      <Navbar />
      
      <section className="pt-24 pb-16 section-padding">
        <div className="container-width">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              CASE <span className="gradient-text">STUDIES</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our portfolio of successful gaming projects that showcase our expertise 
              and commitment to excellence in game development.
            </p>
          </div>

          <div className="space-y-16">
            {projects.map((project, index) => (
              <div 
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center animate-fade-in ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Project Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative group overflow-hidden rounded-2xl">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-lynx-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Project Info */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <span className="text-lynx-pink font-semibold text-sm uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-4">
                      {project.title}
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-lynx-gray rounded-xl">
                      <Calendar className="w-5 h-5 text-lynx-pink mx-auto mb-2" />
                      <div className="text-sm text-gray-400">Duration</div>
                      <div className="font-semibold">{project.stats.duration}</div>
                    </div>
                    <div className="text-center p-4 bg-lynx-gray rounded-xl">
                      <Users className="w-5 h-5 text-lynx-pink mx-auto mb-2" />
                      <div className="text-sm text-gray-400">Team</div>
                      <div className="font-semibold">{project.stats.team}</div>
                    </div>
                    <div className="text-center p-4 bg-lynx-gray rounded-xl">
                      <ExternalLink className="w-5 h-5 text-lynx-pink mx-auto mb-2" />
                      <div className="text-sm text-gray-400">Platform</div>
                      <div className="font-semibold text-xs">{project.stats.platform}</div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-lynx-pink/20 text-lynx-pink rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="font-semibold mb-3">Key Results:</h4>
                    <ul className="space-y-2">
                      {project.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="text-gray-300 flex items-center">
                          <div className="w-1.5 h-1.5 bg-lynx-pink rounded-full mr-3"></div>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                    View Full Case Study
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
