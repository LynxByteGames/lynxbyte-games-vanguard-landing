import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import LogoCarousel from './LogoCarousel';

// Carousel data for different games
const carouselData = [
  {
    id: 1,
    title: "YOUR GATEWAY TO GAMING SUCCESS ON",
    subtitle: "CONSOLES PLATFORMS",
    description: "Professional game development studio creating extraordinary gaming experiences across multiple platforms with cutting-edge technology and creative excellence.",
    backgroundImage: "/lovable-uploads/hero.png",
    stats: [50, 8, 0]
  },
  {
    id: 2,
    title: "IMMERSIVE GAMING EXPERIENCES",
    subtitle: "MOBILE GAMES",
    description: "Revolutionary mobile gaming solutions that captivate millions of players worldwide with innovative gameplay mechanics and stunning visuals.",
    backgroundImage: "/lovable-uploads/bl.jpeg",
    stats: [25, 5, 0]
  },
  {
    id: 3,
    title: "NEXT-GENERATION GAMING",
    subtitle: "VR & AR EXPERIENCES",
    description: "Pioneering virtual and augmented reality gaming experiences that push the boundaries of what's possible in interactive entertainment.",
    backgroundImage: "/lovable-uploads/km.png",
    stats: [15, 3, 0]
  },
  {
    id: 4,
    title: "COMPETITIVE ESPORTS",
    subtitle: "MULTIPLAYER GAMES",
    description: "Creating competitive multiplayer experiences that bring communities together and establish new standards in esports gaming.",
    backgroundImage: "/lovable-uploads/image.png",
    stats: [30, 6, 0]
  }
];

const Hero = () => {
  // const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState([0, 0, 0]);
  // const [isTransitioning, setIsTransitioning] = useState(false);

  // const currentData = carouselData[currentSlide];
  const currentData = carouselData[0]; // Always show first slide

  // Auto-advance carousel
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 8000); // Change slide every 8 seconds

  //   return () => clearInterval(interval);
  // }, [currentSlide]);

  // Animate stats when slide changes
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats(currentData.stats.map(target => 
        Math.floor(target * progress)
      ));

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(currentData.stats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [currentData.stats]);

  // const nextSlide = () => {
  //   if (isTransitioning) return;
  //   setIsTransitioning(true);
  //   setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  //   setTimeout(() => setIsTransitioning(false), 500);
  // };

  // const prevSlide = () => {
  //   if (isTransitioning) return;
  //   setIsTransitioning(true);
  //   setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  //   setTimeout(() => setIsTransitioning(false), 500);
  // };

  // const goToSlide = (index: number) => {
  //   if (isTransitioning || index === currentSlide) return;
  //   setIsTransitioning(true);
  //   setCurrentSlide(index);
  //   setTimeout(() => setIsTransitioning(false), 500);
  // };

  return (
    <section className="relative overflow-hidden bg-lynx-dark h-[110vh]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${currentData.backgroundImage})`
        }}
      />
      <div className="absolute inset-0 bg-lynx-dark/70"></div>

      {/* Navigation Arrows */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-lynx-pink/20 hover:bg-lynx-pink/40 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        disabled={isTransitioning}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-lynx-pink/20 hover:bg-lynx-pink/40 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        disabled={isTransitioning}
      >
        <ChevronRight size={24} />
      </button> */}

      {/* Slide Indicators */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-lynx-pink scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            disabled={isTransitioning}
          />
        ))}
      </div> */}

      <div className="section-padding h-full flex items-center justify-center relative z-10">
        <div className="container-width">
          <div className="text-center space-y-8">
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-black leading-tight text-white">
                {currentData.title}
                <span className="block text-lynx-pink relative">
                  {currentData.subtitle}
                </span>
              </h1>
            </div>

            {/* Description */}
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-white/80 leading-relaxed">
                {currentData.description}
              </p>
            </div>

            {/* Work with us Button */}
            <div className="flex justify-center">
              <Button 
                className="bg-lynx-pink hover:bg-lynx-pink-hover text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-lynx-pink/40"
              >
                Work with us
              </Button>
            </div>

            {/* Animated Stats */}
            <div className="flex justify-center space-x-12 mt-8">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-lynx-pink mb-2">
                  {stats[0]}+
                </div>
                <div className="text-sm text-white/70">Games Developed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-lynx-pink mb-2">
                  {stats[1]}+
                </div>
                <div className="text-sm text-white/70">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-lynx-pink mb-2">
                  {stats[2]}h
                </div>
                <div className="text-sm text-white/70">of crunch of your developers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LogoCarousel/>
    </section>
  );
};

export default Hero;
