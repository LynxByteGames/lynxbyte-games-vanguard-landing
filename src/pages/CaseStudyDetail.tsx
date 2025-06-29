
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Calendar, Users, ArrowLeft, Clock, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const caseStudies = {
    'digital-dragons-awards': {
      title: 'Digital Dragons Awards Gala',
      category: 'Event Gaming Platform',
      description: 'Interactive gaming platform for the prestigious Digital Dragons Awards ceremony, featuring real-time voting and engagement systems.',
      image: '/lovable-uploads/f880535a-b026-4999-ba66-b041fd37e055.png',
      stats: {
        duration: '6 months',
        team: '8 developers',
        platform: 'Web & Mobile'
      },
      technologies: ['Unity', 'WebGL', 'Real-time Networking', 'Node.js', 'Socket.io'],
      results: ['500K+ participants', '95% uptime', '40% engagement increase'],
      challenge: 'The Digital Dragons Awards needed a cutting-edge interactive platform that could handle thousands of simultaneous users while providing real-time voting and engagement features. The challenge was to create a seamless experience across multiple devices while maintaining perfect synchronization.',
      solution: 'We developed a robust real-time gaming platform using Unity and WebGL for cross-platform compatibility. The system featured live voting mechanics, interactive mini-games, and social features that kept the audience engaged throughout the ceremony.',
      implementation: [
        'Real-time voting system with instant result visualization',
        'Interactive mini-games between award segments',
        'Social media integration for enhanced engagement',
        'Multi-device synchronization for seamless experience',
        'Advanced analytics dashboard for event organizers'
      ],
      outcome: 'The platform successfully handled over 500,000 concurrent users with 99.5% uptime. Audience engagement increased by 40% compared to previous years, and the innovative approach set new standards for award ceremony interactivity.'
    },
    'apocalypse-survival': {
      title: 'Apocalypse Survival',
      category: 'Action RPG',
      description: 'Post-apocalyptic survival game with immersive gameplay mechanics and stunning visual effects.',
      image: '/lovable-uploads/322a4f5a-e55f-4082-b120-3cb5cfed1f1f.png',
      stats: {
        duration: '18 months',
        team: '12 developers',
        platform: 'PC & Console'
      },
      technologies: ['Unreal Engine 5', 'C++', 'Advanced AI', 'Procedural Generation', 'Multiplayer Networking'],
      results: ['1M+ downloads', '4.8★ rating', 'Steam Top 10'],
      challenge: 'Creating a compelling post-apocalyptic survival experience that balances realistic survival mechanics with engaging gameplay, while delivering AAA-quality visuals and seamless multiplayer functionality.',
      solution: 'We leveraged Unreal Engine 5\'s cutting-edge features to create a visually stunning world with dynamic weather systems, realistic physics, and intelligent AI behavior. The game features procedural world generation and sophisticated crafting systems.',
      implementation: [
        'Advanced AI behavior system for dynamic encounters',
        'Procedural world generation with unique biomes',
        'Complex crafting and base-building mechanics',
        'Dynamic weather and day/night cycle effects',
        'Seamless multiplayer co-op functionality'
      ],
      outcome: 'The game achieved over 1 million downloads within the first month, maintained a 4.8-star rating, and reached the top 10 on Steam. Critics praised its innovative survival mechanics and stunning visual presentation.'
    },
    'mobile-racing-championship': {
      title: 'Mobile Racing Championship',
      category: 'Racing Game',
      description: 'High-performance mobile racing game with realistic physics and multiplayer functionality.',
      image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800',
      stats: {
        duration: '12 months',
        team: '10 developers',
        platform: 'iOS & Android'
      },
      technologies: ['Unity', 'Multiplayer Networking', '3D Graphics', 'Cloud Save', 'In-App Purchases'],
      results: ['2M+ downloads', 'Featured by Apple', 'Google Play Editor\'s Choice'],
      challenge: 'Developing a console-quality racing experience optimized for mobile devices while maintaining 60fps performance across a wide range of hardware specifications and implementing fair multiplayer racing mechanics.',
      solution: 'We created a highly optimized racing engine with adaptive quality settings, realistic physics simulation, and lag-compensation for multiplayer races. The game features dynamic track generation and extensive customization options.',
      implementation: [
        'Adaptive graphics quality system for optimal performance',
        'Real-time multiplayer racing with lag compensation',
        'Dynamic track generation system',
        'Extensive car customization and tuning options',
        'Cloud-based progression and cross-platform saves'
      ],
      outcome: 'The game surpassed 2 million downloads, was featured by Apple as "Game of the Week," and received Google Play\'s Editor\'s Choice award. It maintains a 4.7-star rating with consistent top-grossing performance.'
    }
  };

  const study = slug ? caseStudies[slug as keyof typeof caseStudies] : null;

  if (!study) {
    return (
      <div className="min-h-screen bg-lynx-dark">
        <Navbar />
        <div className="pt-24 section-padding">
          <div className="container-width text-center">
            <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
            <p className="text-gray-300 mb-8">The case study you're looking for doesn't exist.</p>
            <Link to="/case-studies">
              <Button className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-6 py-3 rounded-full">
                <ArrowLeft className="mr-2" size={16} />
                Back to Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lynx-dark">
      <Navbar />
      
      <article className="pt-24 pb-16 section-padding">
        <div className="container-width max-w-5xl mx-auto">
          {/* Back Button */}
          <Link to="/case-studies" className="inline-flex items-center text-lynx-pink hover:text-lynx-pink-hover mb-8 transition-colors">
            <ArrowLeft className="mr-2" size={16} />
            Back to Case Studies
          </Link>

          {/* Project Header */}
          <header className="mb-12">
            <div className="mb-6">
              <span className="bg-lynx-pink text-white px-3 py-1 rounded-full text-sm font-semibold">
                {study.category}
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              {study.title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {study.description}
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-lynx-gray rounded-xl">
                <Calendar className="w-6 h-6 text-lynx-pink mx-auto mb-3" />
                <div className="text-sm text-gray-400 mb-1">Duration</div>
                <div className="font-bold text-lg">{study.stats.duration}</div>
              </div>
              <div className="text-center p-6 bg-lynx-gray rounded-xl">
                <Users className="w-6 h-6 text-lynx-pink mx-auto mb-3" />
                <div className="text-sm text-gray-400 mb-1">Team Size</div>
                <div className="font-bold text-lg">{study.stats.team}</div>
              </div>
              <div className="text-center p-6 bg-lynx-gray rounded-xl">
                <ExternalLink className="w-6 h-6 text-lynx-pink mx-auto mb-3" />
                <div className="text-sm text-gray-400 mb-1">Platform</div>
                <div className="font-bold text-lg">{study.stats.platform}</div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden mb-12">
              <img 
                src={study.image} 
                alt={study.title}
                className="w-full h-64 lg:h-96 object-cover"
              />
            </div>
          </header>

          {/* Project Details */}
          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              <section>
                <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {study.challenge}
                </p>
              </section>

              {/* Solution */}
              <section>
                <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {study.solution}
                </p>
              </section>

              {/* Implementation */}
              <section>
                <h2 className="text-3xl font-bold mb-6">Implementation</h2>
                <ul className="space-y-4">
                  {study.implementation.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-300 text-lg">
                      <CheckCircle className="w-6 h-6 text-lynx-pink mr-3 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Outcome */}
              <section>
                <h2 className="text-3xl font-bold mb-6">Results & Impact</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {study.outcome}
                </p>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Technologies */}
              <div className="bg-lynx-gray p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {study.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-lynx-pink/20 text-lynx-pink rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Results */}
              <div className="bg-lynx-gray p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Key Results</h3>
                <ul className="space-y-3">
                  {study.results.map((result, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-lynx-pink rounded-full mr-3"></div>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-lynx-pink/10 to-purple-500/10 border border-lynx-pink/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how we can bring your gaming vision to life with our expertise and dedication.
            </p>
            <Button className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-8 py-3 rounded-full font-semibold">
              Work With Us
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default CaseStudyDetail;
