
import React from 'react';
import Navbar from '@/components/Navbar';
import { MapPin, Clock, DollarSign, Users, Coffee, Gamepad2, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Careers = () => {
  const jobOpenings = [
    {
      title: 'Senior Game Developer',
      department: 'Engineering',
      location: 'Remote / Warsaw',
      type: 'Full-time',
      salary: '$80,000 - $120,000',
      experience: '5+ years',
      description: 'Join our core development team to create next-generation gaming experiences using Unity and Unreal Engine.',
      requirements: ['5+ years game development experience', 'Proficiency in C# or C++', 'Unity/Unreal Engine expertise', 'Multiplayer systems knowledge'],
      posted: '2 days ago'
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote / Krakow',
      type: 'Full-time',
      salary: '$60,000 - $90,000',
      experience: '3+ years',
      description: 'Design intuitive and engaging user interfaces for mobile and PC gaming platforms.',
      requirements: ['3+ years UI/UX design experience', 'Gaming industry experience preferred', 'Figma/Adobe Creative Suite', 'Understanding of game UX principles'],
      posted: '1 week ago'
    },
    {
      title: 'Game Artist - 3D',
      department: 'Art',
      location: 'Hybrid / Gdansk',
      type: 'Full-time',
      salary: '$50,000 - $75,000',
      experience: '2+ years',
      description: 'Create stunning 3D art assets and environments for our upcoming gaming projects.',
      requirements: ['2+ years 3D art experience', 'Maya/Blender proficiency', 'Texturing and lighting skills', 'Portfolio with game-ready assets'],
      posted: '3 days ago'
    },
    {
      title: 'QA Engineer',
      department: 'Quality Assurance',
      location: 'Remote',
      type: 'Contract',
      salary: '$40,000 - $55,000',
      experience: '2+ years',
      description: 'Ensure quality and performance across multiple gaming platforms through comprehensive testing.',
      requirements: ['2+ years QA experience', 'Game testing expertise', 'Bug tracking tools knowledge', 'Attention to detail'],
      posted: '5 days ago'
    }
  ];

  const benefits = [
    {
      icon: <Coffee className="w-6 h-6" />,
      title: 'Remote-First Culture',
      description: 'Work from anywhere with flexible hours and work-life balance.'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs.'
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: 'Gaming Perks',
      description: 'Free games, gaming equipment, and industry event tickets.'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Professional Growth',
      description: 'Learning budget, conferences, and skill development opportunities.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Collaborative Team',
      description: 'Work with passionate professionals in a creative environment.'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Competitive Package',
      description: 'Attractive salary, bonuses, and equity participation.'
    }
  ];

  return (
    <div className="min-h-screen bg-lynx-dark">
      <Navbar />
      
      <section className="pt-24 pb-16 section-padding">
        <div className="container-width">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              JOIN OUR <span className="gradient-text">TEAM</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Build the future of gaming with passionate developers, designers, and creators 
              who are shaping extraordinary gaming experiences.
            </p>
          </div>

          {/* Company Culture */}
          <div className="mb-16 animate-fade-in">
            <div className="bg-gradient-to-br from-lynx-gray to-lynx-gray/50 rounded-3xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Why Work at <span className="gradient-text">LYNXBYTE?</span>
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    We're more than just a game development studio. We're a community of passionate creators 
                    who believe in pushing boundaries, fostering innovation, and creating games that matter.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-lynx-dark rounded-xl">
                      <div className="text-2xl font-bold text-lynx-pink">50+</div>
                      <div className="text-sm text-gray-400">Team Members</div>
                    </div>
                    <div className="text-center p-4 bg-lynx-dark rounded-xl">
                      <div className="text-2xl font-bold text-lynx-pink">8+</div>
                      <div className="text-sm text-gray-400">Years Experience</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="/lovable-uploads/f880535a-b026-4999-ba66-b041fd37e055.png" 
                    alt="Our Team"
                    className="w-full h-64 lg:h-80 object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              Perks & <span className="gradient-text">Benefits</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-lynx-gray hover:bg-lynx-gray/80 p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover-glow group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-lynx-pink mb-4 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-lynx-pink transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Job Openings */}
          <div className="animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              Open <span className="gradient-text">Positions</span>
            </h2>
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <div 
                  key={index}
                  className="bg-lynx-gray hover:bg-lynx-gray/80 rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:scale-[1.02] hover-glow group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold group-hover:text-lynx-pink transition-colors duration-300">
                          {job.title}
                        </h3>
                        <span className="bg-lynx-pink/20 text-lynx-pink px-3 py-1 rounded-full text-sm font-medium">
                          {job.department}
                        </span>
                      </div>

                      <p className="text-gray-300 leading-relaxed">
                        {job.description}
                      </p>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                        <div className="text-lynx-pink font-medium">
                          Posted {job.posted}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                          {job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="text-gray-300 text-sm flex items-center">
                              <div className="w-1.5 h-1.5 bg-lynx-pink rounded-full mr-3"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-4">
                      <div className="text-center p-4 bg-lynx-dark rounded-xl">
                        <div className="text-lg font-bold text-lynx-pink">{job.experience}</div>
                        <div className="text-sm text-gray-400">Experience</div>
                      </div>
                      <Button className="w-full bg-lynx-pink hover:bg-lynx-pink-hover text-white py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center animate-fade-in">
            <div className="bg-gradient-to-r from-lynx-pink/10 to-purple-500/10 border border-lynx-pink/20 rounded-3xl p-8 lg:p-12">
              <h3 className="text-3xl font-bold mb-4">Don't See Your Role?</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                We're always looking for talented individuals to join our team. 
                Send us your resume and let's discuss how you can contribute to our mission.
              </p>
              <Button className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105">
                Send Your Resume
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
